import {
    Card, CardHeader, CardContent,
    Table, TableHeader, TableBody, TableRow, TableHead, TableCell
  } from '../../components/ui';

const GameHistory = () => (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-semibold flex items-center text-gray-800">
          Game History
        </h2>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Game</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={3}>No game history available</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
  
export default GameHistory;