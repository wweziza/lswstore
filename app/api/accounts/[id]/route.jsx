import { NextResponse } from 'next/server';
import pool from '@/app/lib/mysql';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(req, { params }) {
  const session = await getServerSession({ req, ...authOptions });

  if (!session || !session.user.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }
  
  const { id } = params;

  try {
    const [accounts] = await pool.query('SELECT * FROM accounts WHERE id = ?', [id]);

    if (accounts.length === 0) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    return NextResponse.json(accounts[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch account' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const session = await getServerSession({ req, ...authOptions });

  if (!session || !session.user.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { id } = params;
  const data = await req.json();

  try {
    await pool.query(
      'UPDATE accounts SET username = ?, email = ?, admin = ?, balance = ? WHERE id = ?',
      [data.username, data.email, data.isAdmin, data.balance, id]
    );

    const [updatedAccounts] = await pool.query('SELECT * FROM accounts WHERE id = ?', [id]);

    return NextResponse.json(updatedAccounts[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update account' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const session = await getServerSession({ req, ...authOptions });

  if (!session || !session.user.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { id } = params;

  try {
    await pool.query('DELETE FROM accounts WHERE id = ?', [id]);

    return NextResponse.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete account' }, { status: 500 });
  }
}
