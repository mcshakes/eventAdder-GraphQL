import React from "react";
import { EVENTS_QUERY } from "../../../graphql/events";
import { gql, useQuery } from '@apollo/client';

function AllEvents() {
    const {loading, error, data} = useQuery(EVENTS_QUERY)

    if (loading) return <h3>Loading Masterpieces...</h3>
    if (error) return `Error! ${error.message}`

    return (
        <h4>
            {data}
        </h4>
    )

}

export default AllEvents;