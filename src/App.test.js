import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders pico y placa app', () => {
	render(<App />);
	const app = screen.getByText(/pico y placa predictor/i);
	expect(app).toBeInTheDocument();
});

// test handlePlateNumber function
test('input plate number should call handlePlateNumber on change event', () => {
	render(<App />);
	const input = screen.getByLabelText(/plate number/i);
	input.value = '1234';
	fireEvent.change(input);
	expect(input.value).toBe('1234');
});

// test handlePlateDate function
test('input plate date should call handlePlateDate on change event', () => {
	render(<App />);
	const input = screen.getByLabelText(/date to verify/i);
	input.value = '2020-01-01';
	fireEvent.change(input);
	expect(input.value).toBe('2020-01-01');
});

// test handlePlateTime function
test('input plate time should call handlePlateTime on change event', () => {
	render(<App />);
	const input = screen.getByLabelText(/verify restriction time/i);
	input.value = '12:00';
	fireEvent.change(input);
	expect(input.value).toBe('12:00');
});
