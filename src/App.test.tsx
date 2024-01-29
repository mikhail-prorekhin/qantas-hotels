import React from "react";
import { render , screen} from '@testing-library/react';
import App from './App';

test('App', () => {
  render(<App />);
   const testId = screen.getByTestId('main-container')
   expect(testId).toBeInTheDocument();
});
