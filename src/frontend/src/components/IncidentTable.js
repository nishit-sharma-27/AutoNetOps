import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Typography } from '@mui/material';

const statusColors = {
  Critical: 'error',
  Major: 'warning',
  Minor: 'success',
  Investigating: 'warning',
  Mitigating: 'info',
  Resolved: 'success',
};

export default function IncidentTable({ incidents }) {
  return (
    <TableContainer component={Paper} sx={{ mt: 1 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Active Incident Feed
      </Typography>
      <Table sx={{ minWidth: 650 }} aria-label="incident table">
        <TableHead>
          <TableRow>
            <TableCell>Incident ID</TableCell>
            <TableCell>Device</TableCell>
            <TableCell>Severity</TableCell>
            <TableCell>Root Cause</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Updated</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {incidents.map((incident) => (
            <TableRow key={incident.incidentId}>
              <TableCell>{incident.incidentId}</TableCell>
              <TableCell>{incident.deviceId}</TableCell>
              <TableCell>{incident.severity}</TableCell>
              <TableCell>{incident.rootCause}</TableCell>
              <TableCell>
                <Chip
                  label={incident.status}
                  color={statusColors[incident.status] || 'default'}
                  size="small"
                />
              </TableCell>
              <TableCell>{incident.lastUpdated}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
