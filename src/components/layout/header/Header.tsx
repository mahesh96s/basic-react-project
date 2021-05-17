import React, {useContext, useState} from 'react';
import { navigate } from '@reach/router';
import { userLogout } from '../../../services/authAPI';
import { UserContext } from '../../../services/UserContext';
import user_alt_icon from '../../../assets/user_alt_icon.svg';
import ViewProfile from '../../user/ViewProfile';
import { User, UserContextType } from '../../../schema/User';

const Header = () => {
    const { currentUser, setCurrentUser }  = useContext(UserContext) as UserContextType;
    const [ showUserProfileModal, setShowUserProfileModal ] = useState(false);

    function signOut() {
        userLogout().then(() => {
            setCurrentUser({loggedIn: false, user: {}});
            navigate('/login');
        });
    }

    const toggleUserProfileModal = () => setShowUserProfileModal(!showUserProfileModal);

    function getImage(user: User) {
        if (user.profileImageURL.endsWith('/profile-image/default.png')) {
            return user_alt_icon;
        }
        return user.profileImageURL;
    }

    return (
        <div className="page-header">
            <span className="logo">
                One Plus
            </span>
            { currentUser && currentUser.loggedIn ? (
                    <span className="float-right">
                        <button className="profile-pic-button" onClick={toggleUserProfileModal}>
                            <img src={getImage(currentUser.user)} alt="profile" />
                        </button>
                        <button className="sign-out-button" onClick={event => {
                            event.preventDefault();
                            signOut()
                        }}>Sign out</button>
                    </span>
                ) : null
            }
            { currentUser && currentUser.loggedIn && showUserProfileModal ? (
                <ViewProfile showUserProfileModal={showUserProfileModal} setShowUserProfileModal={setShowUserProfileModal} />
                ) : null
            }
        </div>
    );
}

export default Header;