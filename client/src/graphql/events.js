
export const EVENTS_QUERY = `
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