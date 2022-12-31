import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    HStack,
    IconButton,
    Input,
    SkeletonText,
    Text,
} from '@chakra-ui/react'
import { FaLocationArrow, FaTimes } from 'react-icons/fa'
import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
    InfoWindow,
} from '@react-google-maps/api'
import { useRef, useState, useEffect } from 'react'
import usePlacesAutocomplete, { getGeocode, getLatLng, } from "use-places-autocomplete";
import React from 'react';
import { formatRelative } from "date-fns";
import "./btn.css"
      // import TestModal from './modal';
      // import Modal from './test';
import Modal from "./modal"
import LittleCircle from './littleCircle';
// import pic from "./images/Barry_Lam_Hall.PNG"
import mapStyle from './mapStyle';
      // import pic2 from "./images/EE-2_Building_Southside.PNG"
import stations from './stationsData/stations';
import NavigationIcon from '@mui/icons-material/Navigation';
import { display } from '@mui/system';
import ParkInModal from "./ParkInModal"

// console.log("s", stations)
const center = { lat: 48.8584, lng: 2.2945 }


function Map () {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyAS6qKe7myrJ0Sd06EorAE_zNG4mi2fwLw",
        libraries: ['places'],
    })
    
    const [map, setMap] = useState(/** @type google.maps.Map */ (null))
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const [selected, setSelected]  = useState(null);/*儲存現在位置 */
    const [markers, setMarkers] = useState();/*儲存所有marker的arr */
    const [markerSelected, setMarkerSelected] = useState(null);/*點選到的marker(markerSelected)會跳出infowindows，且可以點選詳細內容 */
    const [modalOpen, setModalOpen] = useState(false)
    const [scroll, setScroll] = useState(false)
    const [stationData, setStationDta] = useState(null)
    const [destination, setDestination] = useState(null);
    const [origin, setOrigin] = useState(null);
    const [showStation, setShowStation]= useState(true)
    const [time_dis, setTime_Dis] = useState({dis: "", dur: ""})
    const [openParking, setOpenParking] = useState(false)
        /** @type React.MutableRefObject<HTMLInputElement> */
    const originRef = useRef("")
        /** @type React.MutableRefObject<HTMLInputElement> */
    const destinationRef = useRef('')
    const time_disRef = useRef({dis: "", dur: ""})
    // let destination=null;
    // let origin=null;
    console.log("hi", markers)   
    
    
        /*找到使用者現在定位 */
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition((position)=> {
            setSelected({lat: position.coords.latitude, lng: position.coords.longitude, time: new Date()})
            let arr = {location : {lat: position.coords.latitude, lng: position.coords.longitude, time: new Date()}}
            let tok1=[]
            for(let i=0; i<stations.length; i++){
              let tok3 = {lat: stations[i].location.lat,    lng: stations[i].location.lng, time: new Date()}
              let tok2=
                {label: stations[i].label, dist: stations[i].dist, density: stations[i].density, pics: stations[i].pics,
                location:tok3}
              tok1.push(tok2)
        // console.log(stations[i].location, stations[i].label)
    }
            setMarkers(tok1);
        })
    }, [])
       
    
        /*右鍵加入新的marker */
    const onMapClick = React.useCallback((e) => {
        setMarkers((current) => [
            ...current,
            {
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
                time: new Date(),
            },
        ]);
    }, []);
      
    
      
        
      
        /*顯示出路徑 */
    async function calculateRoute(mode) {
        const origin = originRef==='' ? selected : originRef;
        // console.log("val: ", origin,destinationRef.current.value)
        if (/*originRef.current.value === '' || */destinationRef.current.value === '') {
            return
        }
        // let destination = destinationRef.current.value
        // console.log('a',destination)
          // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService()
        const results = await directionsService.route({
            origin: originRef.current,
            destination: destinationRef.current,
            // eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.BICYCLING,
        }) 
        // if(mode===1) return {dis: results.routes[0].legs[0].distance.text, dur: results.routes[0].legs[0].duration.text}
        setDirectionsResponse(results)
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
    }
      
    function clearRoute() {
      console.log(destinationRef.current)
        setDirectionsResponse(null)
        setDistance('')
        setDuration('')
        setDestination('')
        // destination=''
        originRef.current = ''
        destinationRef.current = ''
        window.location.reload()
        setOrigin('')
        // calculateRoute(1)
        // origin=''
    }
    
    async function getTime_Dis(location) {
      // eslint-disable-next-line no-undef
      const directionsService = new google.maps.DirectionsService()
        const results = await directionsService.route({
            origin: selected,
            destination: location,
            // eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.BICYCLING,
        })
      // setTime_Dis()
      let dis = results.routes[0].legs[0].distance.text;
      let dur = results.routes[0].legs[0].duration.text
      console.log("dis: ", dis, dur)
      setTime_Dis({dis: dis, dur: dur})
      time_disRef.current = {dis: dis, dur: dur}
      return  {dis: dis, dur: dur}
    }  

    // useEffect(()=>{
    //   let tok = []
    //   for(let i=0; i<stations.length; i++){
    //   }
    // })

    // async function getDistance() {
    //   const directionsService = new google.maps.DirectionsService()
    //     const results = await directionsService.route({
    //         origin: originRef.current,
    //         destination: destinationRef.current,
    //         // eslint-disable-next-line no-undef
    //         travelMode: google.maps.TravelMode.BICYCLING,
    //     })
    //   setDistance(results.routes[0].legs[0].distance.text)
    // }

    const getUrl = (marker, value) => {
          if(value===0) {return "placeholder.png"}
          // console.log("fuck2", marker);
          return "bicycle-solid.svg"
    }
    if (!isLoaded) {
      return <p>error</p>
      // return <SkeletonText />
    }
    return (<>
        <Flex
            position='relative'
            flexDirection='column'
            alignItems='center'
            top="5%"
            left="5%"
            h='80vh'
            w='80vw'
            // h='100vh'
            // w='100vw'
          >
            
            <Box className='box'  position='absolute' left={0} top={0} h='100%' w='100%'>
                <button className="btn" style={{marginLeft: "auto", marginRight: "auto", }} 
                onClick={()=>{setOpenParking(true); setScroll(false);
                }}>Park In</button>
                <IconButton
                    bottom="2%"
                    right="auto"
                    aria-label='center back'
                    height="30px"
                    width="30px"
                    borderRadius="50px"
                    icon={<FaLocationArrow />}
                    isRound="true"
                    onClick={() => {
                      map.panTo(selected)
                      map.setZoom(15)
                    }}
                  />
                <IconButton
                      bottom="2%"
                      right="auto"
                      aria-label='center back'
                      height="30px"
                      width="30px"
                      borderRadius="50px"
                      icon={<FaTimes />}
                      onClick={()=>{clearRoute();}}
                />
                {/* <div bottom="5%"
                      right="auto"
                      aria-label='center back'
                      height="30px"
                      width="30px"
                      borderRadius="50px"> */}
                  <img src="no-bicycle.png" bottom="5%" height="30px" width="30px" onClick={()=>setShowStation(!showStation)}></img>
                {/* </div> */}
            
              {/* Google Map Box */}
              <GoogleMap
                center={selected ? selected : {lat:44, lng:-80}}
                zoom={15}
                mapContainerStyle={{ width: '100%', height: '100%' }}
                options={{
                  // styles: mapStyle,
                  zoomControl: false,
                  streetViewControl: false,
                  // mapTypeControl: false,
                  fullscreenControl: false,
                }}
                onLoad={map => setMap(map)}
                onRightClick={mapsMouseEvent=>{onMapClick(mapsMouseEvent)}}//右鍵時加入新marker
              >
                <Marker key={selected} position={selected} icon={{
                    url: "placeholder.png",
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(15, 15),
                    scaledSize: new window.google.maps.Size(30, 30),
                    
                  }}
                />
                {markers&&showStation ? markers.map((marker, idx)=>(   
                  <Marker key={marker.location.lat+idx} position={marker.location} icon={{
                    url: "bicycle-solid.svg",
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(15, 15),
                    scaledSize: new window.google.maps.Size(30, 30),
                    
                  }}
                  onClick={() => {
                    setTime_Dis(getTime_Dis(marker.location)) 
                    //點選marker時跳出infowindows
                    console.log("fuck: ",getTime_Dis(marker.location))
                    // setTimeout(function(){
                    //   console.log("I am the third log after 5 seconds");
                    // },5000);
                    setMarkerSelected(idx);
                    setModalOpen(true)
                    setScroll(!scroll)
                    
                    // setDestination(marker.location)
                    // setOrigin(selected)
                    destinationRef.current = marker.location
                    originRef.current=selected
                  }}
                  />
                )): ''}
                {directionsResponse && (
                  <DirectionsRenderer directions={directionsResponse} />//與路徑有關
                )}
                {/* {markerSelected ? (
                <InfoWindow
                  position={{ lat: markerSelected.lat, lng: markerSelected.lng }}
                  onCloseClick={() => {
                    setMarkerSelected(null);
                  }}
                >
                  <div className='fuck'>
                    <p>{formatRelative(markerSelected.time, new Date())}<br/></p>
                    <Button className='btn'  onClick={()=>setScroll(!scroll)} >more</Button> 
                     <Modal></Modal> 
                  </div>
                   <p>hi</p>
                </InfoWindow>
              ) : null}  */}
              
              </GoogleMap>
              <Modal open={modalOpen} scroll={scroll} setScroll={setScroll} data={stations[markerSelected]} calculateRoute={calculateRoute} time_dis={time_dis} setOpenParking={setOpenParking}></Modal>
              {openParking? <ParkInModal openParking={openParking} setOpenParking={setOpenParking}></ParkInModal> : null}

            </Box>
            
            {/* <Box
              p={4}
              borderRadius='lg'
              m={4}
              bgColor='white'
              shadow='base'
              minW='container.md'
              zIndex='1'
            >
              <LittleCircle position='absolute'></LittleCircle> 
               <HStack spacing={2} justifyContent='space-between'>
                <Box flexGrow={1}>
                  <Autocomplete>
                    <Input type='text' placeholder='Origin' ref={originRef} />
                  </Autocomplete>
                </Box>
                <Box flexGrow={1}>
                  <Autocomplete>
                    <Input
                      type='text'
                      placeholder='Destination'
                      ref={destinationRef}
                    />
                  </Autocomplete>
                </Box>
      
                <ButtonGroup>
                  <Button colorScheme='pink' type='submit' onClick={calculateRoute}>
                    Calculate Route
                  </Button>
                  
                </ButtonGroup>
              </HStack>
              <HStack spacing={4} mt={4} justifyContent='space-between'>
                <Text>Distance: {distance} </Text>
                <Text>Duration: {duration} </Text>
                
              </HStack>
            </Box> */}
           </Flex></>
         )
      }
export default Map;