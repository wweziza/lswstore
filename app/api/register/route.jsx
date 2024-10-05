
import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';

const dbConnection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

export async function POST(req) {
  try {
    
    const { username, email, password } = await req.json();

    const [existingUsers] = await dbConnection.execute(
      'SELECT * FROM accounts WHERE username = ? OR email = ?',
      [username, email]
    );

    if (existingUsers.length > 0) {
      return NextResponse.json({ message: 'Username or email already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await dbConnection.execute(
      'INSERT INTO accounts (username, email, password, admin, balance) VALUES (?, ?, ?, ?, ?)',
      [username, email, hashedPassword, 0, 0.00]
    );

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ message: 'An error occurred during registration' }, { status: 500 });
  }
}