# Pico y Placa Predictor 🚦

The Pico y Placa is a vehicle restriction measure implemented in different cities. It's a transport demand
management measure to ration the use of a scarse supply of transport vehicles in the roads due of excessive demand.

This is an application which helps to predict if you can drive or not in a specific day based on the Pico y Placa
information of Quito - Ecuador city.

[Current Pico y Placa Restrictions](https://www.primicias.ec/noticias/sociedad/pico-placa-quito-trafico-movilidad/)

_Note to take in mind: Holidays were sourced from the Google Calendar API to avoid hard-coded holiday dates and this 
may vary a little from local holiday as holiday day could be moved by the government._ 

## 📄 Reference Documentation

For further reference, please consider the following sections:

* [ReactJs](https://reactjs.org)
* [Tailwind CSS](https://tailwindcss.com/docs)
* [Google Calendar Api](https://developers.google.com/calendar/api/v3/reference)

## 🛠 Installation

Follow the next steps to install the application in your local machine:

1. Clone the repository in your local machine.
2. Install the dependencies with the following command
   ```sh
   yarn
	 ```
	 or
	 ```sh
	 npm install
	 ```
3. To generate your own secret api key to use Google Calendar API please follow the next steps:
	1. Go to the [Google Developers Console](https://console.developers.google.com/apis/credentials) and create a new
		 project.
	2. Go to the [Credentials](https://console.developers.google.com/apis/credentials) select the project that you've
		 created and
		 create a new
		 key.
	3. Go to the [API Access](https://console.developers.google.com/apis/api/calendar) and enable the Calendar API.
4. Add your created key to `.env` file.
5. Run the application with the following command
	 ```sh
   yarn
	 ```
	 or
   ```sh
   npm install
   ```