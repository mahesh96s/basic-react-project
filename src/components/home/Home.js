import React from 'react';
import { Redirect } from '@reach/router';

const Home = () => {
    return (<Redirect noThrow to="/login" />)
}

export default Home;