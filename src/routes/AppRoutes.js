import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import ConfirmEmailPage from '../pages/ConfirmEmailPage';
import ProfilePage from '../pages/ProfilePage'
import TaskBoard from '../pages/TaskBoard';
import HomePage from '../pages/WorkspacePages/HomePage';
import ThirdPartyLogin from '../pages/ThirdPartyLogin'
import ConfirmEmailUpdatePage from '../pages/ConfirmEmailUpdatePage';
import WorkspaceAI from '../pages/WorkspacePages/WorkspaceAI'
import TrelloMainPage from '../components/TrelloMainPage';
import MainPage from '../pages/WorkspacePages/MainPage';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/resetPassword" element={<ResetPasswordPage />} />
                <Route path="/confirmEmail" element={<ConfirmEmailPage />} />
                <Route path="/profilepage" element={<ProfilePage />} />
                <Route path="/taskboard" element={<TrelloMainPage />} />
                <Route path="/taskboardhomepage" element={<HomePage />} />
                <Route path="/thirdpartylogin" element={<ThirdPartyLogin />} />
                <Route path="/confirmchangeemail" element={<ConfirmEmailUpdatePage />} />
                <Route path="/workspaceAi" element={<WorkspaceAI />} />
                <Route path="/trellomainpage" element={<TrelloMainPage />} />
                <Route path="/workspace/mainpage" element={<MainPage />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
