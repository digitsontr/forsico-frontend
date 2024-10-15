import React, { useState } from 'react';
import '../styles/profilepage.css';
import Authentication from '../api/AuthApi/authentication.js';
import { useSelector, useDispatch } from 'react-redux';
import { setCredentials } from '../store/authSlice';
import Navbar from '../components/LandingPage/Navbar';
import Sidebar from '../pages/SideBar.js';

const Profile = () => {
    const dispatch = useDispatch();
    const authentication = new Authentication();
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);

    const [editProfileOpen, setEditProfileOpen] = useState(false);
    const [changePasswordOpen, setChangePasswordOpen] = useState(false);
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

    const handleProfileEditToggle = () => {
        setEditProfileOpen(!editProfileOpen);
    };

    const handleChangePasswordToggle = () => {
        setChangePasswordOpen(!changePasswordOpen);
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
                setEditProfileOpen(false);
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
                setChangePasswordOpen(false);
            } else {
                console.error('Password update failed', response.errors);
            }
        } catch (error) {
            console.error('Error updating password:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className='profilepage-sidebar'>
                <Sidebar />
            </div>
            <div className='edit-profile-main'>
                <div className='edit-profile-title'>
                    <h2 className='edit-profile-title'>Edit Profile</h2>
                </div>
                <div className='edit-profile-form'>
                    <div className='edit-profile-image-area'>
                    <img className='edit-profile-image' src={profile.profileImage} alt="" />
                        <input type="file" onChange={handleImageChange} />
                        <div className='btn-area'>
                        <button className='image-area-edit-btn' onClick={handleImageChange}>Edit</button>
                        <button className='image-area-delete-btn'>Delete</button>
                        </div>
                    </div>
                    <div className='edit-profile-form-area'>
                        <div className='account-settings'>
                            <p className='gray-letter'>Account settings</p>
                            <h3 onClick={handleProfileEditToggle}>Edit profile</h3>
                            {editProfileOpen && (
                                <div className='edit-profile-fields'>
                                    <input type="text" placeholder="User name" value={username} onChange={(e) => setUsername(e.target.value)} />
                                    <input type="text" placeholder="Full name" value={profile.firstName + ' ' + profile.lastName} onChange={(e) => setProfile({ ...profile, firstName: e.target.value.split(' ')[0], lastName: e.target.value.split(' ')[1] })} />
                                    <input type="email" placeholder="e-mail address" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <input type="date" placeholder="Birthday" value={profile.birthDate} onChange={(e) => setProfile({ ...profile, birthDate: e.target.value })} />
                                    <button onClick={updateProfile}>Update</button>
                                </div>
                            )}

                            <h3 onClick={handleChangePasswordToggle}>Change password</h3>
                            {changePasswordOpen && (
                                <div className='change-password-fields'>
                                    <input type="password" name="oldPassword" placeholder="Old Password" value={password.oldPassword} onChange={handlePasswordChange} />
                                    <input type="password" name="newPassword" placeholder="New Password" value={password.newPassword} onChange={handlePasswordChange} />
                                    <input type="password" name="confirmPassword" placeholder="Confirm Password" value={password.confirmPassword} onChange={handlePasswordChange} />
                                    <button onClick={updatePassword}>Update</button>
                                </div>
                            )}

                            <div className='push-notifications'>
                                <label>Push notifications</label>
                                <label className="switch">
                                    <input type="checkbox"/>
                                    <span className='slider round'></span>
                                    </label>
                            </div>

                            <div className='more'>
                                <p className='gray-letter'>More</p>
                                <h4>Privacy policy</h4>
                                <h4>Terms and conditions</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;