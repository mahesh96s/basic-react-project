import React, {useContext, useState, useCallback} from 'react';
import { UserContext } from '../../services/UserContext';
import Modal from '../../modal/Modal';
import user_alt_icon from '../../assets/user_alt_icon.svg';
import moment from 'moment';
import { UserContextType } from '../../schema/User';
import EditProfile from './EditProfile';

interface ViewProfileParams {
    showUserProfileModal: boolean;
    setShowUserProfileModal(showModal: boolean): void;
}

const ViewProfile = ({showUserProfileModal, setShowUserProfileModal}: ViewProfileParams) => {
    const { currentUser }  = useContext(UserContext) as UserContextType;
    const [ profileEditMode, setProfileEditMode ] = useState(false);

    const toggleUserProfileModal = useCallback(() => setShowUserProfileModal(!showUserProfileModal), [showUserProfileModal, setShowUserProfileModal]);

    const getImage = (imageUrl: string) => {
        if (imageUrl.endsWith('/profile-image/default.png')) {
            return user_alt_icon;
        }
        return imageUrl;
    }

    const editProfile = useCallback(() => setProfileEditMode(!profileEditMode), [profileEditMode, setProfileEditMode]);

    return (
        <Modal>
            <div className="user-profile">
                { profileEditMode ? (
                    <EditProfile profileEditMode={profileEditMode} setProfileEditMode={setProfileEditMode}/>
                ) : (
                    <div className="view-profile-container">
                        <div className="profile-details">
                            <h1 className="profile-header">{currentUser.user.firstName} {currentUser.user.lastName}</h1>
                            <div className="profile-photo-preview">
                                <img className="profile-pic" src={getImage(currentUser.user.profileImageURL)} alt="profile" />
                            </div>
                            <div>Email: {currentUser.user.email}</div>
                            <div>Status: {currentUser.user.active ? (<span className="active">Active</span>) : (<span>InActive</span>)}</div>
                            <div>Last Login: {moment(currentUser.user.lastLogin).format('LL')}</div>
                            <div>Created At: {moment(currentUser.user.createdAt).format('LL')}</div>
                        </div>
                        <div className="profile-action-buttons">
                            <button className="edit-button" onClick={editProfile}>Edit</button>
                            <button className="close-button" onClick={toggleUserProfileModal}>Close</button>
                        </div>
                    </div>
                )
                }
            </div>
        </Modal>
    );
}

export default ViewProfile;