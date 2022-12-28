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
    {label: '1st Student Activity Center 第一學生活動中心'},
    {label: 'Astronomy Mathematics Building 天文數學館'},
    {label: 'Barry Lam Hall 博理館'},
    {label: 'Boya Lecture Building 博雅教學館'},
    {label: 'Center for Condensed Matter Sciences 凝態科學中心/物理系'},
    {label: 'College of Liberal Arts 文學院'},
    {label: 'CSIE Der Tain Hall 德田館(資工系)'},
    {label: 'CSIE Der Tain Hall Northside 德田館(資工系)北側'},
    {label: 'Department of Psychology North Hall 心理系北館'},
    {label: 'Department of Psychology South Hall 心理系南館'},
    {label: 'EE-2 building Southside 電機二館南側'},
    {label: 'EE-2 building Northside 電機二館北側'},
    {label: 'Gontong Lecture Building 共同教學館'},
    {label: 'Main Library 總圖書館'},
    {label: 'Ming Dar Hall 明達館'},
    {label: 'MK Innovation Hall 學新館'},
    {label: 'Putong Lecture Building 普通教學館'},
    {label: 'Social Sciences Building 社科院'},
    {label: 'Xinsheng Lecture Building 新生教學館'},
    {label: 'Zonghe Lecture Building 綜合教學館'},
]
export default MyBike;
export async function action(){
    //const contact = await createContact();
    //return { contact }
    console.log("Called action in my bike.js")
    return redirect("/")
}