import React, {useContext, useState, useRef} from 'react';
import { UserContext } from '../../services/UserContext';
import Modal from '../../modal/Modal';
import user_alt_icon from '../../assets/user_alt_icon.svg';
import moment from 'moment';
import { updateUser, updateUserProfilePhoto } from '../../services/userAPI';

const ViewProfile = ({showUserProfileModal, setShowUserProfileModal}) => {
    const { currentUser, setCurrentUser }  = useContext(UserContext);
    const [ profileEditMode, setProfileEditMode ] = useState(false);
    const [ state, setState ] = useState({
        firstName: currentUser.user.firstName,
        lastName: currentUser.user.lastName,
        email: currentUser.user.email,
        formErrors: {
            firstName: '',
            lastName: '',
            email: ''
        }
    });
    const [ profilePicFile, setProfilePicFile ] = useState();
    const [ profileImageUrl, setProfileImageUrl ] = useState(currentUser.user.profileImageURL);
    const [ invalidFile, setInvalidFile ] = useState(false);
    const fileUploadInput = useRef(null);
    const emailRegExp = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

    const formValidate = formField => {
        let formValid = true;
        let formErrors = state.formErrors;
        Object.entries(formField).forEach(([key, value]) => {
            if (value.length < 1) {
                formErrors[key] = `${key.toLowerCase()} cannnot be empty`;
                formValid = false;
            } else if (key === 'email' && !emailRegExp.test(value)) {
                formErrors.email = 'Invalid email Id';
                formValid = false;
            } else if (key !== 'formErrors') {
                formErrors[key] = '';
            }
        });
        setState((prevProps) => ({
            ...prevProps,
            formErrors
        }));
        return formValid;
    }

    const saveProfile = (event) => {
        event.preventDefault();
        if (formValidate(state)) {
            const params = {
                firstName: state.firstName,
                lastName: state.lastName,
                email: state.email,
                password: state.password
            };
            updateUser(params, currentUser.user.id).then(data => {
                setCurrentUser({loggedIn: true, user: data});
                setShowUserProfileModal(true);
                setProfileEditMode(!profileEditMode);
            }, err => {
                console.log(err);
            });
        }
    }

    const handleInputChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let formErrors = state.formErrors;
        if (value.length < 1) {
            formErrors[name] = `${name.toLowerCase()} cannnot be empty`;
        } else if (name === 'email' && !emailRegExp.test(value)) {
            formErrors.email = 'Invalid email Id';
        } else {
            formErrors[name] = '';
        }
        setState((prevProps) => ({
          ...prevProps,
          [name]: value,
          formErrors
        }));
    };


    const toggleUserProfileModal = () => setShowUserProfileModal(!showUserProfileModal);

    const getImage = (imageUrl) => {
        if (imageUrl.endsWith('/profile-image/default.png')) {
            return user_alt_icon;
        }
        return imageUrl;
    }

    const editProfile = () => setProfileEditMode(!profileEditMode);

    const onProfileChange = event => {
        event.preventDefault();
        const file = event.target.files[0];
        if (file) {
            const mimeType = [
                'image/png', 'image/jpg', 'image/jpeg', 'image/gif'
            ];
            const validFile = file && mimeType.some(type => type === file.type);
            if (validFile) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    setProfileImageUrl(reader.result);
                };
                setProfilePicFile(file);
                setInvalidFile(false);
            } else {
                setProfilePicFile(null);
                setProfileImageUrl(currentUser.user.profileImageURL);
                setInvalidFile(true);
            }
        }
    }

    const saveProfilePicture = () => {
        const formData = new FormData();
        formData.append('newProfilePicture', profilePicFile);
        updateUserProfilePhoto(formData).then(data => {
            const userData = currentUser.user;
            userData.profileImageURL = data.profileImageURL;
            setProfileImageUrl(data.profileImageURL);
            setCurrentUser({loggedIn: true, user: userData});
            setProfilePicFile(null);
        });
    }

    const cancelFileUpload = () => {
        setProfilePicFile(null);
        setProfileImageUrl(currentUser.user.profileImageURL);
    }

    const uploadProfilePicture = () => {
        fileUploadInput.current.click();
    }

    return (
        <Modal>
            <div className="user-profile">
                { profileEditMode ? (
                    <div className="edit-profile-container">
                        <div className="profile-details">
                            <h1 className="profile-header">Edit Profile</h1>
                            <div className="profile-photo-preview">
                                <img className="profile-pic" src={getImage(profileImageUrl)} alt="profile" />
                                { invalidFile &&
                                    (<div className="error-message">
                                        Invalid File type
                                    </div>)
                                }
                                <input type="file" hidden name="userProfilePic" onChange={onProfileChange} ref={fileUploadInput} />
                                { profilePicFile ? (
                                    <div className="upload-picture-action">
                                        <button className="upload-button" onClick={saveProfilePicture}>Save</button>
                                        <button className="cancel-button" onClick={cancelFileUpload}>Cancel</button>
                                    </div>
                                    ) : (
                                        <div className="upload-picture-action">
                                            <button className="upload-button" onClick={uploadProfilePicture}>Upload</button>
                                        </div>
                                    )
                                }
                            </div>
                            <form>
                                <label className="profile-label">
                                    First name
                                    <div className="profile-text-field">
                                        <input type="text" name="firstName" value={state.firstName} onChange={handleInputChange}/>
                                    </div>
                                    {state.formErrors.firstName.length > 0 && (
                                        <div className="error-message">
                                            {state.formErrors.firstName}
                                        </div>)
                                    }
                                </label>
                                <label className="profile-label">
                                    Last name
                                    <div className="profile-text-field">
                                        <input type="text" name="lastName" value={state.lastName} onChange={handleInputChange}/>
                                    </div>
                                    {state.formErrors.lastName.length > 0 && (
                                        <div className="error-message">
                                            {state.formErrors.lastName}
                                        </div>)
                                    }
                                </label>
                                <label className="profile-label">
                                    Email
                                    <div className="profile-text-field">
                                        <input type="email" name="email" value={state.email} onChange={handleInputChange}/>
                                    </div>
                                    {state.formErrors.email.length > 0 && (
                                        <div className="error-message">
                                            {state.formErrors.email}
                                        </div>)
                                    }
                                </label>
                            </form>
                        </div>
                        <div className="profile-action-buttons">
                            <button className="edit-button" onClick={saveProfile}>Save</button>
                            <button className="close-button" onClick={editProfile}>Cancel</button>
                        </div>
                    </div>
                ) : (
                    <div className="view-profile-container">
                        <div className="profile-details">
                            <h1 className="profile-header">{currentUser.user.firstName} {currentUser.user.lastName}</h1>
                            <div className="profile-photo-preview">
                                <img className="profile-pic" src={getImage(profileImageUrl)} alt="profile" />
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