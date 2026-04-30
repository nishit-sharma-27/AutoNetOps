import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

export default function StatusCard({ title, value, detail, statusColor }) {
  return (
    <Card sx={{ minWidth: 220, flex: 1, margin: '8px' }}>
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" component="div" sx={{ color: statusColor || '#fff' }}>
          {value}
        </Typography>
        {detail && (
          <Typography sx={{ mt: 1.5 }} color="text.secondary">
            {detail}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
