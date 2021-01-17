import { gql } from '@apollo/client';

export const EVENTS_QUERY = gql`
    query {
        events {
            _id
            title
            description
            date
            price
            creator {
                _id
                email
            }
        }
    }
`