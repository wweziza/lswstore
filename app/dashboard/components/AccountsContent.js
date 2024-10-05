import React from 'react';
import { Card, CardHeader, CardContent } from '../../components/ui';

const AccountsContent = ({ session }) => (
  <Card>
    <CardHeader>
      <h2 className="text-2xl font-semibold">Accounts</h2>
    </CardHeader>
    <CardContent>
      <p>Manage your accounts here, {session.user.name}.</p>
    </CardContent>
  </Card>
);

export default AccountsContent;