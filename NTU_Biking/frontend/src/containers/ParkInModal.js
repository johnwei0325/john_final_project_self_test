// import "./ParkInModal.scss"
// import { useEffect,useState, useRef } from "react"
// import Pictures from "./switchPictures"

// function ParkInModal({open, scroll, setScroll, data, calculateRoute}){

//   // const buttonClicked = () => {

//   // }
//   // $('.button').click(function(){
//   //   var buttonId = $(this).attr('id');
//   //   $('#modal-container').removeAttr('class').addClass(buttonId);
//   //   $('body').addClass('modal-active');
//   // })
  
//   // $('#modal-container').click(function(){
//   //   $(this).addClass('out');
//   //   $('body').removeClass('modal-active');
//   // });
//   return (<>

// <h1>Popup/Modal Windows without JavaScript</h1>
// <div id="wrapper">
//   <p><a class="button" href="#popup1">Click Me</a></p>
// 	<p><a class="button" href="#popup2">Click Me Too</a></p>
// </div>

// <div id="popup1" class="overlay">
// 	<div class="popup">
// 		<h2>Info box</h2>
// 		<a class="close" href="#">&times;</a>
// 		<div class="content">
// 			<p>This is done totally without JavaScript. Just HTML and CSS.</p>
// 		</div>
// 	</div>
// </div>

// <div id="popup2" class="overlay light">
// 	<a class="cancel" href="#"></a>
// 	<div class="popup">
// 		<h2>What the what?</h2>
// 		<div class="content">
//       <p>Click outside the popup to close.</p>
// 		</div>
// 	</div>
// </div>
//   </>)

// }
// export default ParkInModal
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ParkInModal({openParking, setOpenParking}) {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={openParking}
        onClose={()=>setOpenParking(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}