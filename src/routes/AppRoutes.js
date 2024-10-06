import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import ConfirmEmailPage from '../pages/ConfirmEmailPage';
import ProfilePage from '../pages/ProfilePage'
import TaskBoard from '../pages/TaskBoard';
import TaskBoardHomePage from '../pages/TaskBoardHomePage';
import ThirdPartyLogin from '../pages/ThirdPartyLogin'
import ConfirmEmailUpdatePage from '../pages/ConfirmEmailUpdatePage';
import WorkspaceAI from '../pages/WorkspacePages/WorkspaceAI'

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/resetPassword" element={<ResetPasswordPage />} />
                <Route path="/confirmEmail" element={<ConfirmEmailPage />} />
                <Route path="/profilepage" element={<ProfilePage />} />
                <Route path="/taskboard" element={<TaskBoard />} />
                <Route path="/taskboardhomepage" element={<TaskBoardHomePage />} />
                <Route path="/thirdpartylogin" element={<ThirdPartyLogin />} />
                <Route path="/confirmchangeemail" element={<ConfirmEmailUpdatePage />} />
                <Route path="/workspaceAi" element={<WorkspaceAI />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
