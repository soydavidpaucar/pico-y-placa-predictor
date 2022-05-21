import { useEffect, useState } from 'react';

const apiKey = process.env.REACT_APP_APIKEY;

// get data from google calendar api
const handleFetchHolidays = async () => {
	const endpoint = `https://www.googleapis.com/calendar/v3/calendars/en.ec%23holiday%40group.v.calendar.google.com/events?key=${apiKey}`;
	const response = await fetch(endpoint);
	return await response.json();
};

const App = () => {

};

export default App;

