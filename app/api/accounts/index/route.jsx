import { NextResponse } from 'next/server';
import pool from '@/app/lib/mysql';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(req) {
  const session = await getServerSession({ req, ...authOptions });

  if (!session || !session.user.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 10;
  const sort = searchParams.get('sort') || 'id';
  const order = searchParams.get('order') || 'ASC';

  const offset = (page - 1) * limit;

  try {
    const [accounts] = await pool.query(
      `SELECT * FROM accounts ORDER BY ${sort} ${order} LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    const [[{ total }]] = await pool.query('SELECT COUNT(*) as total FROM accounts');

    return NextResponse.json({ 
      accounts, 
      totalPages: Math.ceil(total / limit),
      currentPage: page 
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch accounts' }, { status: 500 });
  }
}

export async function POST(req) {
  const session = await getServerSession({ req, ...authOptions });

  if (!session || !session.user.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const data = await req.json();

  try {
    const [result] = await pool.query(
      'INSERT INTO accounts (name, email, password, isAdmin, balance) VALUES (?, ?, ?, ?, ?)',
      [data.name, data.email, data.password, data.isAdmin, data.balance]
    );

    const [newAccount] = await pool.query('SELECT * FROM accounts WHERE id = ?', [result.insertId]);

    return NextResponse.json(newAccount[0], { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create account' }, { status: 500 });
  }
}