import { useEffect, useState } from 'react';
import picoYPlacaConfig from './config/pico-y-placa-configs.json';

const apiKey = process.env.REACT_APP_APIKEY;

// get data from google calendar api
const handleFetchHolidays = async () => {
	const endpoint = `https://www.googleapis.com/calendar/v3/calendars/en.ec%23holiday%40group.v.calendar.google.com/events?key=${apiKey}`;
	const response = await fetch(endpoint);
	return await response.json();
};

const App = () => {
	// handle variable states
	const [plateNumber, setPlateNumber] = useState('');
	const [plateDate, setPlateDate] = useState('');
	const [plateTime, setPlateTime] = useState('');
	const [holidays, setHolidays] = useState({});
	
	// fetch holidays from google calendar
	useEffect(() => {
		handleFetchHolidays().then(response => {
			const holidays = response.items.map(item => {
				return {
					startDate: item.start.date,
					endDate: item.end.date,
				};
			});
			
			setHolidays(holidays);
			
		}).catch(error => {
			console.log(error);
		});
	}, []);
	
	
	const handlePlateNumber = (event) => {
		const limit = 4;
		setPlateNumber(event.target.value.slice(0, limit));
	};
	
	const handlePlateDate = (event) => {
		setPlateDate(event.target.value);
	};
	
	const handlePlateTime = (event) => {
		setPlateTime(event.target.value);
	};
	
	// get last number from plate number
	const getLastNumber = (plateNumber) => {
		return plateNumber.slice(-1);
	};
	
	// get day name from plate date
	const getDayName = (plateDate) => {
		const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
		const day = new Date(plateDate).getDay();
		return days[day];
	};
	
	return (
		<div className="h-screen flex items-center justify-center bg-slate-900 ">
			<div className="flex flex-col">
				<h1 className="text-xl md:text-4xl text-white mb-6">Pico y Placa Predictor &#128678;</h1>
				
				
				<label htmlFor="plateNumber" className="text-white mb-2 text-sm">Plate Number</label>
				<input type="number"
							 name="plateNumber"
							 id="plateNumber"
							 placeholder="Insert your plate number"
							 className="bg-white border-0 p-2 outline-0 mb-7 rounded-2xl"
							 value={plateNumber}
							 onChange={handlePlateNumber}></input>
				
				<label htmlFor="picoYPlacaDate" className="text-white mb-2 text-sm">Date to Verify</label>
				<input type="date"
							 name="picoYPlacaDate"
							 id="picoYPlacaDate"
							 className="bg-white border-0 p-2 outline-0 mb-7 rounded-2xl" onChange={handlePlateDate}></input>
				
				<label htmlFor="picoYPlacaTime" className="text-white mb-2 text-sm">Verify Restriction Time</label>
				<input type="time"
							 name="picoYPlacaTime"
							 id="picoYPlacaTime"
							 className="bg-white border-0 p-2 outline-0 mb-7 rounded-2xl" onChange={handlePlateTime}></input>
			
			</div>
		</div>);
};

export default App;

