import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import App from '../src/App';

afterEach(cleanup)

describe('App', () => {
    test('renders App component', () => {
      const { asFragment } = render(<App />)
    
      expect(asFragment(<App />)).toMatchSnapshot()
    });
});

// describe('true is truthy and false is falsy', () => {
//     test('true is truthy', () => {
//       expect(true).toBe(true);
//     });
   
//     test('false is falsy', () => {
//       expect(false).toBe(false);
//     });
//   });