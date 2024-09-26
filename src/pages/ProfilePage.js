import React, { useState } from 'react';
import '../styles/profilepage.css';
import Authentication from '../api/AuthApi/authentication.js';
import { useSelector, useDispatch } from 'react-redux';
import { setCredentials } from '../store/authSlice';

const Profile = () => {
    const dispatch = useDispatch();
    const authentication = new Authentication();
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);
    const isThirdParty = useSelector((state) => state.auth.thirdParty);

    const [editProfile, setEditProfile] = useState(false);
    const [email, setEmail] = useState(user?.email || '');
    const [username, setUsername] = useState(user?.userName || '');
    const [profile, setProfile] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        birthDate: user?.dateOfBirth || '',
        profileImage: user?.profileImage || './default-profile-image.jpg'
    });

    const [password, setPassword] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [editEmail, setEditEmail] = useState(false);

    const handleProfileEdit = () => {
        setEditProfile(!editProfile);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setProfile({ ...profile, profileImage: event.target.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePasswordChange = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value });
    };

    const handleEmailChange = () => {
        setEditEmail(!editEmail);
    };

    const updateProfile = async () => {
        try {
            const response = await authentication.updateProfile(email, username, profile.firstName, profile.lastName, profile.birthDate, token.token);
            if (response.success) {

                dispatch(setCredentials({
                    user: {
                        email,
                        username,
                        firstName: profile.firstName,
                        lastName: profile.lastName,
                        birthDate: profile.birthDate,
                        profileImage: profile.profileImage
                    },
                    token: token
                }));
                setEditProfile(false); 
            } else {
                console.error('Profile update failed', response.errors);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const updatePassword = async () => {
        if (password.newPassword !== password.confirmPassword) {
            alert("New password and confirm password do not match!");
            return;
        }
        try {
            const response = await authentication.updatePassword(email, password.oldPassword, password.newPassword, token.token);
            if (response.success) {
                alert('Password updated successfully!');
                setPassword({ oldPassword: '', newPassword: '', confirmPassword: '' });
            } else {
                console.error('Password update failed', response.errors);
            }
        } catch (error) {
            console.error('Error updating password:', error);
        }
    };

    const emailUpdate = async () => {
        try {
            const response = await authentication.initiateEmailUpdate(user.email, email, token.token);
            if (response.success) {
                alert('Email update initiated! Please check your new email for confirmation.');
                setEditEmail(false); 
            } else {
                console.error('Email update failed', response.errors);
            }
        } catch (error) {
            console.error('Error updating email:', error);
        }
    };

    return (
        <>
            <div className="profilepage-container">
                {/* Profile Card */}
                <div className="profilepage-card">
                    <h2 className='profilepage-h2'>Profile</h2>
                    <div className="profilepage-info">
                        <div className="profilepage-image-container">
                            <img className="profilepage-image" src={profile.profileImage} alt="Profile" />
                        </div>
                        {editProfile ? (
                            <div>
                                <input
                                    className='profilepage-input'
                                    type="text"
                                    placeholder="First Name"
                                    value={profile.firstName}
                                    onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                                />
                                <input
                                    className='profilepage-input'
                                    type="text"
                                    placeholder="Last Name"
                                    value={profile.lastName}
                                    onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                                />
                                <input
                                    className='profilepage-input'
                                    type="date"
                                    value={profile.birthDate}
                                    onChange={(e) => setProfile({ ...profile, birthDate: e.target.value })}
                                />
                                <input
                                    className='profilepage-input'
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </div>
                        ) : (
                            <div>
                                <p className='profilepage-p'>First Name: {profile.firstName}</p>
                                <p className='profilepage-p'>Last Name: {profile.lastName}</p>
                                <p className='profilepage-p'>Birth Date: {profile.birthDate}</p>
                            </div>
                        )}
                        <button className='profilepage-button' onClick={editProfile ? updateProfile : handleProfileEdit}>
                            {editProfile ? 'Save' : 'Edit Profile'}
                        </button>
                    </div>
                </div>
                { isThirdParty === true  ? (
                    <div></div>
                ):(
                    <>
                    {/* Change Password Card */}
                    <div className="profilepage-card">
                    <h2>Change Password</h2>
                    <div className="profilepage-password-change">
                        <input
                            className='profilepage-input'
                            type="password"
                            placeholder="Old Password"
                            name="oldPassword"
                            value={password.oldPassword}
                            onChange={handlePasswordChange}
                        />
                        <input
                            className='profilepage-input'
                            type="password"
                            placeholder="New Password"
                            name="newPassword"
                            value={password.newPassword}
                            onChange={handlePasswordChange}
                        />
                        <input
                            className='profilepage-input'
                            type="password"
                            placeholder="Confirm New Password"
                            name="confirmPassword"
                            value={password.confirmPassword}
                            onChange={handlePasswordChange}
                        />
                        <button className='profilepage-button' onClick={updatePassword}>Confirm</button>
                    </div>
                    </div>

                    {/* Change Email Card */}
                    <div className="profilepage-card">
                    <h2>Change Email</h2>
                    {editEmail ? (
                        <div className="profilepage-email-change">
                            <input className='profilepage-input' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <button className='profilepage-button' onClick={emailUpdate}>Save Email</button>
                        </div>
                    ) : (
                        <div>
                            <p className='profilepage-p'>{email}</p>
                            <button className='profilepage-button' onClick={handleEmailChange}>Change Email</button>
                        </div>
                    )}
                    </div>
                    </>
                )}
              
            </div>
        </>
    );
};

export default Profile;
