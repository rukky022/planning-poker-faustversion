import React from 'react';
import {useState} from 'react';
import { Typography, Card, CardContent, CardActions, TextField } from '@mui/material';
import { PPButton } from './PPButton';

export function InputName() {
    const [username, setUsername] = useState('');
    let nameSubmitted = false;

    return(    
        <Card sx={{display: 'flex', justifyContent: 'center'}}>
            <CardContent>
                <Typography variant="h3">
                    Enter your name
                </Typography>
            </CardContent>
            <CardActions>
                <TextField required id="username" label="Required" defaultValue="Name" onChange={(event) => {setUsername(event.target.value);}}/>
                <PPButton text='Join' clickFunction={() => {localStorage.setItem("userName", username); nameSubmitted = true;}}/>
            </CardActions>
        </Card>
)}
