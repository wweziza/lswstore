import React, { useState, useEffect } from 'react';
import { Edit, Trash, ChevronUp, ChevronDown } from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Input, Button, Select } from '../../components/ui';
import { fetchGames, addGame, updateGame, deleteGame } from './utils/api';

const GameManagement = () => {
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortColumn, setSortColumn] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');
  const [newGame, setNewGame] = useState({
    name: '',
    image: '',
    rating: '',
    players: '',
    type: 'PC',
    game_abr: '',
  });

  useEffect(() => {
    fetchGames(currentPage, 10, sortColumn, sortDirection)
      .then((data) => {
        setGames(data.games);
        setTotalPages(data.totalPages);
      })
      .catch((error) => {
        console.error('Failed to fetch games:', error);
        setGames([]);
      });
  }, [currentPage, sortColumn, sortDirection]);

  const handleAddGame = () => {
    addGame(newGame).then((addedGame) => {
      setGames([...games, addedGame]);
      setNewGame({
        name: '',
        image: '',
        rating: '',
        players: '',
        type: 'PC',
        game_abr: '',
      });
    });
  };

  const handleUpdateGame = (gameId, updates) => {
    updateGame(gameId, updates).then(() => {
      setGames(games.map(game => game.id === gameId ? { ...game, ...updates } : game));
    });
  };

  const handleDeleteGame = (gameId) => {
    deleteGame(gameId).then(() => {
      setGames(games.filter(game => game.id !== gameId));
    });
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="mb-4 grid grid-cols-2 gap-4">
        <Input
          type="text"
          placeholder="Game Name"
          value={newGame.name}
          onChange={(e) => setNewGame({ ...newGame, name: e.target.value })}
        />
        <Input
          type="text"
          placeholder="Image URL"
          value={newGame.image}
          onChange={(e) => setNewGame({ ...newGame, image: e.target.value })}
        />
        <Input
          type="text"
          placeholder="Rating"
          value={newGame.rating}
          onChange={(e) => setNewGame({ ...newGame, rating: e.target.value })}
        />
        <Input
          type="text"
          placeholder="Players"
          value={newGame.players}
          onChange={(e) => setNewGame({ ...newGame, players: e.target.value })}
        />
        <Select
          value={newGame.type}
          onChange={(e) => setNewGame({ ...newGame, type: e.target.value })}
        >
          <option value="PC">PC</option>
          <option value="Mobile">Mobile</option>
          <option value="Console">Console</option>
        </Select>
        <Input
          type="text"
          placeholder="Game Abbreviation"
          value={newGame.game_abr}
          onChange={(e) => setNewGame({ ...newGame, game_abr: e.target.value })}
        />
        <Button onClick={handleAddGame} className="col-span-2">Add Game</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => handleSort('id')}>
              ID
              {sortColumn === 'id' && (sortDirection === 'asc' ? <ChevronUp className="inline ml-1" /> : <ChevronDown className="inline ml-1" />)}
            </TableHead>
            <TableHead onClick={() => handleSort('name')}>
              Name
              {sortColumn === 'name' && (sortDirection === 'asc' ? <ChevronUp className="inline ml-1" /> : <ChevronDown className="inline ml-1" />)}
            </TableHead>
            <TableHead>Image</TableHead>
            <TableHead onClick={() => handleSort('rating')}>
              Rating
              {sortColumn === 'rating' && (sortDirection === 'asc' ? <ChevronUp className="inline ml-1" /> : <ChevronDown className="inline ml-1" />)}
            </TableHead>
            <TableHead onClick={() => handleSort('players')}>
              Players
              {sortColumn === 'players' && (sortDirection === 'asc' ? <ChevronUp className="inline ml-1" /> : <ChevronDown className="inline ml-1" />)}
            </TableHead>
            <TableHead onClick={() => handleSort('type')}>
              Type
              {sortColumn === 'type' && (sortDirection === 'asc' ? <ChevronUp className="inline ml-1" /> : <ChevronDown className="inline ml-1" />)}
            </TableHead>
            <TableHead onClick={() => handleSort('game_abr')}>
              Abbreviation
              {sortColumn === 'game_abr' && (sortDirection === 'asc' ? <ChevronUp className="inline ml-1" /> : <ChevronDown className="inline ml-1" />)}
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {games.map(game => (
            <TableRow key={game.id}>
              <TableCell>{game.id}</TableCell>
              <TableCell>{game.name}</TableCell>
              <TableCell>
                <img src={game.image} alt={game.name} className="w-10 h-10 object-cover" />
              </TableCell>
              <TableCell>{game.rating}</TableCell>
              <TableCell>{game.players}</TableCell>
              <TableCell>{game.type}</TableCell>
              <TableCell>{game.game_abr}</TableCell>
              <TableCell>
                <Button
                  size="sm"
                  variant="outline"
                  className="mr-2"
                  onClick={() => handleUpdateGame(game.id, { rating: game.rating })}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-500"
                  onClick={() => handleDeleteGame(game.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 flex justify-center">
        {[...Array(totalPages)].map((_, index) => (
          <Button key={index} onClick={() => paginate(index + 1)} className="mx-1">
            {index + 1}
          </Button>
        ))}
      </div>
    </>
  );
};

export default GameManagement;