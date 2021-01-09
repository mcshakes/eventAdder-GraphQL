import React from 'react';
import { render, fireEvent, waitFor, screen, cleanup } from '@testing-library/react';
import { toHaveAttribute } from '@testing-library/jest-dom'
import Auth from '../src/components/Auth';

afterEach(cleanup)

describe('Auth Page', () => {
    test('renders Auth with login by default', () => {
        const { getByTestId } = render(<Auth />);
    
        expect(getByTestId('auth-selection')).not.toHaveAttribute('disabled')
        expect(getByTestId('auth-selection')).toHaveTextContent('Switch to Sign Up')
    });

    test('renders Auth with Submit button always', () => {
        const { getByTestId } = render(<Auth />);
    
        expect(getByTestId('auth-submit')).not.toHaveAttribute('disabled')
    });
});
