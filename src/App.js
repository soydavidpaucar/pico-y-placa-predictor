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
	
	// verified if vehicle is allowed to drive or not
	const isAllowedToDrive = (plateNumber, plateDate, plateTime) => {
		const lastNumber = getLastNumber(plateNumber);
		const dayName = getDayName(plateDate);
		const slateRestrictedDay = picoYPlacaConfig[dayName]?.includes(parseInt(lastNumber));
		const restrictedHours = picoYPlacaConfig.restrictedHours;
		let isHoliday = false;
		
		for (const holiday of holidays) {
			if (plateDate >= holiday.startDate && plateDate < holiday.endDate) {
				isHoliday = true;
			}
		}
		
		if (slateRestrictedDay && !isHoliday) {
			if (plateTime >= restrictedHours.Morning[0] && plateTime <= restrictedHours.Morning[1]) {
				return false;
			}
			return !(plateTime >= restrictedHours.Afternoon[0] && plateTime <= restrictedHours.Afternoon[1]);
		}
		return true;
		
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
				
				{plateNumber !== '' && plateDate !== '' && plateTime !== '' && isAllowedToDrive(plateNumber, plateDate, plateTime) ?
					<div className="bg-emerald-500 shadow-lg shadow-cyan-500/50 rounded-2xl p-3">
						<h2 className="text-1xl text-white">You are allowed to drive &#9989;</h2>
					</div> : plateNumber !== '' && plateDate !== '' && plateTime !== '' ?
						<div className="bg-red-500 shadow-lg shadow-red-500/50 rounded-2xl p-3">
							<p className="text-white">Don't do it! You aren't allowed to drive &#9940;</p>
						</div> : null
				}
			
			</div>
		</div>);
};

export default App;

