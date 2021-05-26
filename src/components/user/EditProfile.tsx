import React, {useContext, useState, useRef, FormEvent, ChangeEvent, useCallback} from 'react';
import { UserContext } from '../../services/UserContext';
import user_alt_icon from '../../assets/user_alt_icon.svg';
import { updateUser, updateUserProfilePhoto } from '../../services/userAPI';
import { UserContextType, UserFormFieldError, UserFormFields } from '../../schema/User';

interface EditProfileParams {
    profileEditMode: boolean;
    setProfileEditMode(showModal: boolean): void;
}

const EditProfile = ({profileEditMode, setProfileEditMode}: EditProfileParams) => {
    const { currentUser, setCurrentUser }  = useContext(UserContext) as UserContextType;
    const [ state, setState ] = useState<UserFormFields>({
        firstName: currentUser.user.firstName,
        lastName: currentUser.user.lastName,
        email: currentUser.user.email,
        formErrors: {
            firstName: '',
            lastName: '',
            email: ''
        }
    });
    const [ profilePicFile, setProfilePicFile ] = useState<File>();
    const [ profileImageUrl, setProfileImageUrl ] = useState(currentUser.user.profileImageURL);
    const [ invalidFile, setInvalidFile ] = useState(false);
    const fileUploadInput = useRef(null);
    const emailRegExp = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

    const formValidate = (formField: UserFormFields) => {
        let formValid = true;
        Object.entries(formField).map(([key, value]) => {
            if (value.length < 1) {
                const fieldName = key.replace(/([A-Z])/g, "$1");
                value = `${fieldName.charAt(0).toUpperCase()}${fieldName.slice(1)} cannot be empty`;
                formValid = false;
            } else if (key === 'email' && !emailRegExp.test(value)) {
                value = 'Invalid email Id';
                formValid = false;
            } else if (key !== 'formErrors') {
                value = '';
            }
        });
        setState(formField);
        return formValid;
    }

    const saveProfile = (event: FormEvent) => {
        event.preventDefault();
        if (formValidate(state)) {
            const params = {
                firstName: state.firstName,
                lastName: state.lastName,
                email: state.email
            };
            updateUser(params, currentUser.user.id).then(data => {
                setCurrentUser({loggedIn: true, user: data});
                setProfileEditMode(!profileEditMode);
            }, err => {
                console.log(err);
            });
        }
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const { name, value} = event.target;
        const formErrors: UserFormFieldError = state.formErrors;
        if (name === 'firstName') {
            formErrors.firstName = value.length < 1 ? 'First name cannot be empty' : '';
        } else if (name === 'lastName') {
            formErrors.lastName = value.length < 1 ? 'Last name cannot be empty' : '';
        } else {
            formErrors.email = value.length < 1 ? 'Email cannot be empty' : '';
            if (!emailRegExp.test(value)) {
                formErrors.email = 'Invalid email Id';
            }
        }
        setState((prevProps) => ({
          ...prevProps,
          [name]: value,
          formErrors
        }));
    };

    const getImage = (imageUrl: string) => {
        if (imageUrl.endsWith('/profile-image/default.png')) {
            return user_alt_icon;
        }
        return imageUrl;
    }

    const editProfile = useCallback(() => setProfileEditMode(!profileEditMode), [profileEditMode, setProfileEditMode]);

    const onProfileChange = (event: ChangeEvent<HTMLInputElement>) => {
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
                    setProfileImageUrl(reader.result as string);
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
                    <input type="file" hidden={true} name="userProfilePic" onChange={onProfileChange} ref={fileUploadInput} />
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
    );
}

export default EditProfile;