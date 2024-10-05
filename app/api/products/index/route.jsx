import { NextResponse } from 'next/server';
import pool from '@/app/lib/mysql';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 10;
  const sort = searchParams.get('sort') || 'product_id';
  const order = searchParams.get('order') || 'ASC';

  const offset = (page - 1) * limit;

  try {
    const [products] = await pool.query(
      `SELECT * FROM products ORDER BY ${sort} ${order} LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    const [[{ total }]] = await pool.query('SELECT COUNT(*) as total FROM products');

    return NextResponse.json({ 
      products, 
      totalPages: Math.ceil(total / limit),
      currentPage: page 
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(req) {
  const data = await req.json();

  try {
    const [result] = await pool.query(
      'INSERT INTO products (product_name, product_type, product_amount, product_bonus, product_price) VALUES (?, ?, ?, ?, ?)', // Added product_name
      [data.product_name, data.product_type, data.product_amount, data.product_bonus, data.product_price]
    );

    const [newProduct] = await pool.query('SELECT * FROM products WHERE product_id = ?', [result.insertId]);

    return NextResponse.json(newProduct[0], { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
