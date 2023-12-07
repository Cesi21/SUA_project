import { wait } from '@testing-library/user-event/dist/utils';
import React from 'react';
//import { useParams } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';
function NotificationPage() {
  //const navigate = useNavigate();
  let  id  = 0; // Gets the event ID from the URL
  if(localStorage.getItem('jwtToken') === "null"){
    id = 1;
  }else{
   localStorage.setItem('userID', "nic")
   localStorage.setItem('jwtToken', "null")
    id = 0;
  wait(1000);}
  if(id === 0){
  return(
    <h1>Uspešno ste se odjavili!</h1>
  )}else{
    return(
      
      <h1>Niste prijavljeni!</h1>
    )
  }
  
}

export default NotificationPage;