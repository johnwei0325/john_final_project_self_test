import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import NTU_at_night from "../containers/images/NTU_at_night.jpg"

function MyBike () {
    const [parked, setParked] = useState(true);
    return ( 
        <Card sx={{ maxWidth: `calc(0.8*vw)` }}>
            <CardMedia
                sx={{ height: `400px` }}
                image={NTU_at_night}
                title="NTU at night"
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    Status of My Bike: &nbsp;
                    { parked? <Chip label="Parked" color="primary" size='medium'/>
                    : <Chip label="Riding" color="secondary" size='medium'/>}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                    Parked at: &nbsp;
                    Barry Lam Hall
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={()=> setParked(!parked)}>{parked? "Ride my bike" : "Park my bike"}</Button>
                <Button size="small">Back to Home</Button>
            </CardActions>
        </Card>        
    )
}
export default MyBike;