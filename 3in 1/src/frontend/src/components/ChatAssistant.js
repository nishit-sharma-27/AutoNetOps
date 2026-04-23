import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function ChatAssistant({ history, onSend }) {
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (!message.trim()) return;
    onSend(message.trim());
    setMessage('');
  };

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        NOC Virtual Assistant
      </Typography>
      <List sx={{ maxHeight: 260, overflowY: 'auto', bgcolor: '#081126', color: '#fff', borderRadius: 2, p: 1 }}>
        {history.map((entry, index) => (
          <ListItem key={index} disableGutters>
            <ListItemText
              primary={entry.text}
              secondary={entry.role === 'assistant' ? 'AutoNetOps AI' : entry.role === 'user' ? 'Engineer' : 'System'}
              primaryTypographyProps={{ color: entry.role === 'assistant' ? '#a5f3fc' : '#e2e8f0' }}
              secondaryTypographyProps={{ color: '#94a3b8' }}
            />
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Ask the NOC assistant..."
        />
        <Button variant="contained" endIcon={<SendIcon />} onClick={handleSubmit}>
          Send
        </Button>
      </Box>
    </Paper>
  );
}
