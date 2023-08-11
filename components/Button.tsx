import { React, useState } from 'react';
import { Button, Typography } from '@mui/material';

export function Button({text, styling}: {text: string, styling?: SxProps<Theme> | undefined}) {
    const [isClicked, setIsClicked] = useState(false);

    return (
        <Button 
            variant={isClicked ? "contained" : "outlined"}
            sx={styling}
            onClick={()=> {
                setIsClicked(current => !current);
            }}
        >
            <Typography sx={{fontSize: 18 }} color={isClicked ? 'white' : ''}>
                {text}
            </Typography>
        </Button>
    )
}