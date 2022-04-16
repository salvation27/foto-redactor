import React from 'react'
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

const SaveImg = ({downloadImage}) => {
  return (
    <Stack direction="row" spacing={2}>
        <Button onClick={downloadImage} variant="contained" endIcon={<SendIcon />}>
        Save
        </Button>
  </Stack>
  )
}

export default SaveImg