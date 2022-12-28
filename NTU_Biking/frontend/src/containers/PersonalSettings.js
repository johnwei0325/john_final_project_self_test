import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Lock from "./images/Lock.jpg";
import { Form } from "react-router-dom"
import TextField from '@mui/material/TextField';
import "./buttons.css"

function PersonalSettings () {
    return (
        <Card sx={{ maxWidth: `calc(0.8*vw)` }}>
            <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                    Personal Settings
                </Typography>
            </CardContent>
            <CardMedia
                sx={{ height: `280px`, marginLeft: "10px", marginRight: "10px", borderRadius: "10px"}}
                image={Lock}
                title="green iguana"
            />
            <CardContent> 
                <Typography variant="body2" color="text.secondary">
                </Typography>
                <TextField label="Old Password"  sx={{margin: '10px'}} />
                <br></br>
                <TextField label="New Password" sx={{margin: '10px'}} />
                <br></br>
                <TextField label="Reconfirm New Password" sx={{margin: '10px'}} />
            </CardContent>
            <CardActions>
                <Form method="post"> 
                    <button type='submit' className='button-19' >Set new password</button>
                </Form>
            </CardActions>
        </Card>
    )
}
export default PersonalSettings;