import { RouteComponentProps } from '@reach/router';
import React from 'react';

const PageNotFound = ({ path } : RouteComponentProps) => {
    return (
        <div className="page-not-found">
            <span>404</span>
            <span className="page-not-found-text">Page Not Found</span>
        </div>
    );
}

export default PageNotFound;