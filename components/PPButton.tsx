import React from 'react';
import { useState } from 'react';
import { Button, SxProps, Typography } from '@mui/material';

export function PPButton({text, icon, styling, link, clickFunction}: {text?: string, icon?: JSX.Element, styling?: SxProps | undefined, link?: string, clickFunction?: () => any }) {
    const [isClicked, setIsClicked] = useState(false);

    return (
        <Button 
            variant={isClicked ? "contained" : "outlined"}
            sx={styling}
            onClick={()=> {
                setIsClicked(current => !current);
                {clickFunction ? clickFunction(): console.log('no function listed')}
            }}
            href={link}
        >
            <Typography sx={{fontSize: 18 }} color={isClicked ? 'white' : ''}>
                {text}
            </Typography>
        </Button>
    )
}