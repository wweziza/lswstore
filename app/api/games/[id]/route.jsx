import { NextResponse } from 'next/server';
import pool from '@/app/lib/mysql';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function PUT(req, { params }) {
    const session = await getServerSession({ req, ...authOptions });
  
    if (!session || !session.user.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }
  
    const { id } = params;
    const data = await req.json();
  
    try {
      await pool.query(
        'UPDATE game_list SET name = ?, image = ?, rating = ?, players = ?, type = ?, game_abr = ? WHERE id = ?',
        [data.name, data.image, data.rating, data.players, data.type, data.game_abr, id]
      );
  
      const [updatedGame] = await pool.query('SELECT * FROM game_list WHERE id = ?', [id]);
  
      return NextResponse.json(updatedGame[0]);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Failed to update game' }, { status: 500 });
    }
  }
  
  export async function DELETE(req, { params }) {
    const session = await getServerSession({ req, ...authOptions });
  
    if (!session || !session.user.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }
  
    const { id } = params;
  
    try {
      await pool.query('DELETE FROM game_list WHERE id = ?', [id]);
  
      return NextResponse.json({ message: 'Game deleted successfully' });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Failed to delete game' }, { status: 500 });
    }
  }