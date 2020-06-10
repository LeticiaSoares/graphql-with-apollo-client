import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import { Route } from 'react-router'
import gql from "graphql-tag";

const IS_LOGGED_IN = gql`
    query IsUserLoggedIn {
        session_id @client
    }
`;

const PrivateRoute = ({ href = '/login', ...restProps }) => {
    const { data } = useQuery(IS_LOGGED_IN);
    if (data.session_id) {
        return <Route
            {...restProps}
        />
    }
    window.location.href = '/login'
    return null
}

export default PrivateRoute
