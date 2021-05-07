import React, {useContext} from 'react';
import { navigate } from '@reach/router';
import { userLogout } from '../../../services/authAPI';
import { UserContext } from '../../../services/UserContext';

const Header = () => {
    const { currentUser, setCurrentUser }  = useContext(UserContext);

    function signOut() {
        userLogout().then(() => {
            setCurrentUser({loggedIn: false, user: {}});
            navigate('/login');
        });
    }

    return (
        <div className="page-header">
            <span className="logo">
                One Plus
            </span>
            { currentUser && currentUser.loggedIn ? (
                    <span className="float-right">
                        <button className="sign-out-button" onClick={event => {
                            event.preventDefault();
                            signOut()
                        }}>Sign Out</button>
                    </span>
                ) : null
            }
        </div>
    );
}

export default Header;