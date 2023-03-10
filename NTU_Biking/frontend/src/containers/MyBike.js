import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import NTU_at_night from "../containers/images/NTU_at_night.jpg";
//Form
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Form, redirect } from 'react-router-dom';
import "./buttons.css";

function MyBike () {
    const [parked, setParked] = useState(true);
    const [parkLocation, setParkLocation] = useState("")
    return ( 
        <Card sx={{ maxWidth: `calc(0.8*vw)` }}>
            <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                    My Bike
                </Typography>
            </CardContent>
            <CardMedia
                sx={{ height: `360px`, marginLeft: "10px", marginRight: "10px", borderRadius: "10px" }}
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
                    {parkLocation}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                
                </Typography>
                <br></br>
                <Autocomplete
                    disablePortal
                    onInputChange={(event, newInputValue) => {
                        setParkLocation(newInputValue);
                    }}
                    id="bike-parking-spots-list"
                    options={parkingSpots}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Parking Spot" />}
                />
            </CardContent>
            <CardActions>
                <Form>
                    <button type='submit' className='button-19'
                    onClick={()=> setParked(!parked)}>{parked? "Ride my bike" : "Park my bike"}</button>
                </Form>
                &nbsp;
                <Form method="post"> 
                    <button type='submit' className='button-19'>Back to Home</button>
                </Form>
            </CardActions>
        </Card>        
    )
}

const parkingSpots = [
    {label: '1st Student Activity Center ????????????????????????'},
    {label: 'Astronomy Mathematics Building ???????????????'},
    {label: 'Barry Lam Hall ?????????'},
    {label: 'Boya Lecture Building ???????????????'},
    {label: 'Center for Condensed Matter Sciences ??????????????????/?????????'},
    {label: 'College of Liberal Arts ?????????'},
    {label: 'CSIE Der Tain Hall ?????????(?????????)'},
    {label: 'CSIE Der Tain Hall Northside ?????????(?????????)??????'},
    {label: 'Department of Psychology North Hall ???????????????'},
    {label: 'Department of Psychology South Hall ???????????????'},
    {label: 'EE-2 building Southside ??????????????????'},
    {label: 'EE-2 building Northside ??????????????????'},
    {label: 'Gontong Lecture Building ???????????????'},
    {label: 'Main Library ????????????'},
    {label: 'Ming Dar Hall ?????????'},
    {label: 'MK Innovation Hall ?????????'},
    {label: 'Putong Lecture Building ???????????????'},
    {label: 'Social Sciences Building ?????????'},
    {label: 'Xinsheng Lecture Building ???????????????'},
    {label: 'Zonghe Lecture Building ???????????????'},
]
export default MyBike;
export async function action(){
    //const contact = await createContact();
    //return { contact }
    console.log("Called action in my bike.js")
    return redirect("/")
}