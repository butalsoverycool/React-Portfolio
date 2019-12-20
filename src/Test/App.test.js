import React from 'react';
import { render } from '@testing-library/react';
//import App from '../components/App';

const testFunc = (a,b) => a * b;

/* test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
  
}); */

test('My custom tests', () => {
    expect(testFunc(x,x)).toBe(res);
});