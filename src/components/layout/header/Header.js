import React, { Component } from 'react';
import { navigate } from '@reach/router';
import { userLogout } from '../../../services/authAPI';
import { UserContext } from '../../../services/UserContext';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.signOut = this.signOut.bind(this);
    }

    signOut(event) {
        event.preventDefault();
        userLogout().then(() => {
            const { updateUser } = this.context;
            updateUser({loggedIn: false, user: {}});
            navigate('/login');
        });
    }

    render () {
        return (
            <div className="page-header">
                <span className="logo">
                    One Plus
                </span>
                <UserContext.Consumer>
                    {(user) => user && user.loggedIn ? (
                            <span className="float-right">
                                <button className="sign-out-button" onClick={this.signOut}>Sign Out</button>
                            </span>
                        ) : null
                    }
                </UserContext.Consumer>
            </div>
        );
    }
}

Header.contextType = UserContext;

export default Header;