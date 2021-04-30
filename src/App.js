import React from 'react';
import { render } from 'react-dom';
import { Link, Router } from '@reach/router';

const App = () => {
    return (
      <React.StrictMode>
        <div>
            <header>
                <Link to="/">React</Link>
            </header>
            <Router>

            </Router>
        </div>
      </React.StrictMode>
    )
};

render(<App />, document.getElementById("root"));