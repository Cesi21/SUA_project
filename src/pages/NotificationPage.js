import React from 'react';
//import { useParams } from 'react-router-dom';

function NotificationPage() {
  //let { id } = useParams(); // Gets the event ID from the URL

  return (
    <div>
      <h1>Obvestila</h1>
      <p>Vsa obvestila prijavljenega uporabnika</p>
      {/* Event details should be fetched and displayed here */}
    </div>
  );
}

export default NotificationPage;