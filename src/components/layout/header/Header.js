import React, { Component } from 'react';
import { userLogout } from '../../../services/authAPI';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.signOut = this.signOut.bind(this);
    }

    signOut(event) {
        event.preventDefault();
        userLogout();
    }

    render () {
        return (
            <div className="page-header">
                <span className="logo">
                    One Plus
                </span>
                <span className="float-right">
                    <button className="sign-out-button" onClick={this.signOut}>Sign Out</button>
                </span>
            </div>
        );
    }
}

export default Header;