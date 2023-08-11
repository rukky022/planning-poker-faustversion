import React from 'react';
import {useState} from 'react';
import { Grid, Typography, Card, CardContent, CardActionArea, Button } from '@mui/material';

// function chooseCard() {
//     variant
// }

export function PokerCard({textValue, variantValue, onClick, colorValue}: {textValue: string, variantValue: string, onClick: () => any, colorValue: string}) {
    console.log(onClick);
    let map = new Map();
    map.set('outlined', 'outlined');
    map.set('contained', 'contained');
    map.set('white', 'white');
    map.set('', '');
    return(
    
    <Grid item sx={{ p: '0 1rem' }}>
        <Button 
            variant={map.get(variantValue)}
            sx={{
                width: '1rem',
                height: '5rem',
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
            }}
            onClick={onClick}
        >
            <Typography sx={{fontSize: 18 }} color={map.get(colorValue)}>
                {textValue}
            </Typography>
        </Button>
    </Grid>
)}
