import { NextResponse } from 'next/server';
import pool from '@/app/lib/mysql'; 

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  try {
    if (query) {
      const [game] = await pool.query('SELECT id, name, image, rating, players, type, game_abr FROM game_list WHERE game_abr = ?', [query]);

      if (game.length === 0) {
        return new NextResponse('Game not found', { status: 404 });
      }

      return NextResponse.json(game);
    } else {
      const [games] = await pool.query('SELECT * FROM game_list');

      return NextResponse.json(games);
    }
  } catch (error) {
    console.error('Error fetching games:', error);
    return new NextResponse('Error fetching games', { status: 500 });
  }
}
