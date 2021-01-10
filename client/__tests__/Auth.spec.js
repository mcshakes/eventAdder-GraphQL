import React from 'react';
import { render, fireEvent, waitFor, screen, cleanup } from '@testing-library/react';
import { toHaveAttribute } from '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import Auth from '../src/components/Auth';

afterEach(cleanup)

describe('Auth Page', () => {

    test('renders Auth Component with login by default', () => {
        const { getByTestId } = render(<Auth />);
    
        expect(getByTestId('auth-selection')).not.toHaveAttribute('disabled')
        expect(getByTestId('auth-selection')).toHaveTextContent('Switch to Sign Up')
    });

    test('renders Auth with Submit button always', () => {
        const { getByTestId } = render(<Auth />);
    
        expect(getByTestId('auth-submit')).not.toHaveAttribute('disabled')
    });

    describe('Can change state to Sign In', () => {

        test('it allows user to Sign Up instead of Login', () => {
            render(<Auth />);
            
            userEvent.click(screen.getByText("Switch to Sign Up"))
            expect(screen.getByTestId('auth-selection')).toHaveTextContent('Switch to Log In')
        });

        // test('it allows user ti sign up instead of login', () => {
        //     expect(true).toBe(true);
        // });
        
        // test('false is falsy', () => {
        //     expect(false).toBe(false);
        // });
    });
});
