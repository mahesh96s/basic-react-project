import React, {useContext, useState} from 'react';
import { navigate } from '@reach/router';
import { userLogout } from '../../../services/authAPI';
import { UserContext } from '../../../services/UserContext';
import Modal from '../../../modal/Modal';
import user_alt_icon from '../../../assets/user_alt_icon.svg';
import moment from 'moment';

const Header = () => {
    const { currentUser, setCurrentUser }  = useContext(UserContext);
    const [ showUserProfileModal, setShowUserProfileModal ] = useState(false);

    function signOut() {
        userLogout().then(() => {
            setCurrentUser({loggedIn: false, user: {}});
            navigate('/login');
        });
    }

    const toggleUserProfileModal = () => setShowUserProfileModal(!showUserProfileModal);

    function getImage(user) {
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
                <Modal>
                    <div className="view-profile-container">
                        <div className="close-buttons">
                            <button onClick={toggleUserProfileModal}>close</button>
                        </div>
                        <div className="profile-details">
                            <h1 className="view-profile-header">{currentUser.user.firstName} {currentUser.user.lastName}</h1>
                            <img className="profile-pic" src={getImage(currentUser.user)} alt="profile" />
                            <div>Email: {currentUser.user.email}</div>
                            <div>Status: {currentUser.user.active ? (<span className="active">Active</span>) : (<span>InActive</span>)}</div>
                            <div>Last Login: {moment(currentUser.user.lastLogin).format('LL')}</div>
                            <div>Created At: {moment(currentUser.user.createdAt).format('LL')}</div>
                        </div>
                    </div>
                </Modal>) : null
            }
        </div>
    );
}

export default Header;