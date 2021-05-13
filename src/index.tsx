import React from 'react';
import ReactDOM from 'react-dom';
import BasicRoute from './router/index';

const App = () => {
    return <BasicRoute />
};

ReactDOM.render(<App />, document.getElementById('app'));