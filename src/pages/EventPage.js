import React from 'react';
import { useParams } from 'react-router-dom';

function EventPage() {
  let { id } = useParams(); // Gets the event ID from the URL

  return (
    <div>
      <h1>Event Details</h1>
      <p>Displaying details for event ID: {id}</p>
      {/* Event details should be fetched and displayed here */}
    </div>
  );
}

export default EventPage;