import React, { useState } from 'react';
import '../styles/profilepage.css';

const Profile = () => {
    <Navbar />
    const [editProfile, setEditProfile] = useState(false);
    const [profile, setProfile] = useState({
        firstName: 'John',
        lastName: 'Doe',
        birthDate: '1990-01-01',
        profileImage: './default-profile-image.jpg' // Default profile image
    });

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


    const [password, setPassword] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [email, setEmail] = useState('john.doe@example.com');
    const [editEmail, setEditEmail] = useState(false);


    const handlePasswordChange = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value });
    };

    const handleEmailChange = () => {
        setEditEmail(!editEmail);
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
                                {/* Image input field */}
                                <input
                                    className='profilepage-input'
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange} />
                            </div>
                        ) : (
                            <div>
                                <p className='profilepage-p'>First Name: {profile.firstName}</p>
                                <p className='profilepage-p'>Last Name: {profile.lastName}</p>
                                <p className='profilepage-p'>Birth Date: {profile.birthDate}</p>
                            </div>
                        )}
                        <button className='profilepage-button' onClick={handleProfileEdit}>{editProfile ? 'Save' : 'Edit Profile'}</button>
                    </div>
                </div>

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
                        <button className='profilepage-button'>Confirm</button>
                    </div>
                </div>

                {/* Change Email Card */}
                <div className="profilepage-card">
                    <h2>Change Email</h2>
                    {editEmail ? (
                        <div className="profilepage-email-change">
                            <input className='profilepage-input' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <button className='profilepage-button' onClick={handleEmailChange}>Save Email</button>
                        </div>
                    ) : (
                        <div>
                            <p className='profilepage-p'>{email}</p>
                            <button className='profilepage-button' onClick={handleEmailChange}>Change Email</button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Profile;