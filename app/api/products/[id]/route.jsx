import { NextResponse } from 'next/server';
import pool from '../../../lib/mysql';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(req, { params }) {
  const session = await getServerSession({ req, ...authOptions });
  
  if (!session || !session.user.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { id } = params;

  try {
    const [products] = await pool.query('SELECT * FROM products WHERE product_id = ?', [id]);

    if (products.length === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(products[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
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
      'UPDATE products SET product_type = ?, product_amount = ?, product_bonus = ?, product_price = ? WHERE product_id = ?',
      [data.product_type, data.product_amount, data.product_bonus, data.product_price, id]
    );

    const [updatedProducts] = await pool.query('SELECT * FROM products WHERE product_id = ?', [id]);

    return NextResponse.json(updatedProducts[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const session = await getServerSession({ req, ...authOptions });
  
  if (!session || !session.user.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }
  
  const { id } = params;

  try {
    await pool.query('DELETE FROM products WHERE product_id = ?', [id]);

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}