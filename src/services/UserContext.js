import React, { Component, createContext } from "react";
import { isLoggedIn } from './authAPI';

export const UserContext = createContext();

class UserContextProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            user: {}
        }
    }

    updateUser = (user) => {
        this.setState(user);
    };

    componentDidMount() {
        isLoggedIn().then(data => {
            this.setState(data);
        });
    }

    render() {
        return (
            <UserContext.Provider value={{ ...this.state, updateUser: this.updateUser}}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}

export default UserContextProvider;