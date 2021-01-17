import React from 'react';
import { render, fireEvent, waitFor, screen, cleanup } from '@testing-library/react';
import { toHaveAttribute } from '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { MockedProvider } from '@apollo/client/testing';
import Events from '../../src/pages/Events/components/Events';
import { EVENTS_QUERY } from "../../src/graphql/events";
import gql from 'graphql-tag'

afterEach(cleanup)

const eventMocks = [
        {
        request: {
            query: EVENTS_QUERY,
            variables: {}
        },
        result: {
            data: {
                events: [
                    {
                        _id: "1234",
                        title: "Moon Dancing",
                        description: "What it sounds like",
                        price: 22.00,
                        date: "2021-01-25T20:30:00.000Z",
                        creator: {
                            _id: "80082",
                            email: "fake@gmail.com"
                        }
                    }
                ]
            }
        }
    }
]
describe('Unauthenticated User visits Events Page', () => {
    
    test('it renders Mocked Events Component without error', () => {
        // jest.mock("/graphql")
        // const { container } = render(<Events />);
        render(
            <MockedProvider mocks={eventMocks}>
              <Events />
            </MockedProvider>
        )

        const eventsList = container.querySelector("[class='events__list']")
        // console.log(eventsList)
    
    });
    // test('it allows user ti sign up instead of login', () => {
    //     expect(true).toBe(true);
    // });
    
    // test('false is falsy', () => {
    //     expect(false).toBe(false);
    // });
});
