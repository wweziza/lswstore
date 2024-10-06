import { NextResponse } from 'next/server';
import pool from '@/app/lib/mysql';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 10;
  const sort = searchParams.get('sort') || 'id';
  const order = searchParams.get('order') || 'ASC';

  const offset = (page - 1) * limit;

  try {
    if (query) {
      const [game] = await pool.query('SELECT * FROM game_list WHERE game_abr = ?', [query]);

      if (game.length === 0) {
        return new NextResponse('Game not found', { status: 404 });
      }

      return NextResponse.json(game[0]);
    } else {
      const [games] = await pool.query(
        `SELECT * FROM game_list ORDER BY ${sort} ${order} LIMIT ? OFFSET ?`,
        [limit, offset]
      );

      const [[{ total }]] = await pool.query('SELECT COUNT(*) as total FROM game_list');

      return NextResponse.json({ 
        games, 
        totalPages: Math.ceil(total / limit),
        currentPage: page 
      });
    }
  } catch (error) {
    console.error('Error fetching games:', error);
    return new NextResponse('Error fetching games', { status: 500 });
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
      'INSERT INTO game_list (name, image, rating, players, type, game_abr) VALUES (?, ?, ?, ?, ?, ?)', 
      [data.name, data.image, data.rating, data.players, data.type, data.game_abr]
    );

    const [newGame] = await pool.query('SELECT * FROM game_list WHERE id = ?', [result.insertId]);

    return NextResponse.json(newGame[0], { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create game' }, { status: 500 });
  }
}