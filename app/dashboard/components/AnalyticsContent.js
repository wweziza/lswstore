import React from 'react';
import { Card, CardHeader, CardContent } from '../../components/ui';

const AnalyticsContent = ({ session }) => (
  <Card>
    <CardHeader>
      <h2 className="text-2xl font-semibold">Analytics</h2>
    </CardHeader>
    <CardContent>
      <p>Your analytics data will be displayed here.</p>
    </CardContent>
  </Card>
);

export default AnalyticsContent;