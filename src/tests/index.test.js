// import React from 'react';
// import { render, fireEvent, getByTestId } from '@testing-library/react';
// import Index from '../pages/index';
// import '@testing-library/jest-dom/extend-expect';
// describe('Index Component', () => {

// //   test('Displays error when submitting empty form', () => {
// //     const { getByTestId, getByText } = render(<Index />);

// //     const form = getByTestId('login-form');
// //     fireEvent.submit(form);

// //     expect(getByText('Email is required.')).toBeInTheDocument();
// //     expect(getByText('Password is required.')).toBeInTheDocument();
// //   });

//   test('Displays error when entering invalid email', () => {
//     const { getByLabelText, getByText } = render(<Index />);

//     const emailInput = getByLabelText('Email');
//     fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
//     fireEvent.blur(emailInput);

//     expect(getByText('Invalid email format.')).toBeInTheDocument();
//   });

// //   test('Shows password input when valid email is entered', () => {
// //     const { getByLabelText, getByText , container } = render(<Index />);

// //     const emailInput = getByLabelText('Email');
// //     fireEvent.change(emailInput, { target: { value: 'admin@test.com' } });
// //     fireEvent.blur(emailInput);

// //     const passwordInput = getByTestId('Password');
// //     expect(passwordInput).toBeInTheDocument();

// //     fireEvent.change(passwordInput, { target: { value: 'password123' } });
// //     fireEvent.click(getByText('Login'));

// //     expect(getByText('Login successful')).toBeInTheDocument();
// //   });

//   test('Navigates to generate password page when password is not generated', () => {
//     const { getByLabelText, getByText } = render(<Index />);

//     const emailInput = getByLabelText('Email');
//     fireEvent.change(emailInput, { target: { value: 'nonexistentuser@test.com' } });
//     fireEvent.blur(emailInput);

//     expect(getByText('click here')).toBeInTheDocument();

//     fireEvent.click(getByText('click here'));
//     // Assert the navigation to the generate password page
//   });

//   // Additional test cases can be added for different scenarios
// });
