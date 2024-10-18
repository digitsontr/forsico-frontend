import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import ConfirmEmailPage from '../pages/ConfirmEmailPage';
import ProfilePage from '../pages/ProfilePage'
import HomePage from '../pages/WorkspacePages/HomePage';
import ThirdPartyLogin from '../pages/ThirdPartyLogin'
import ConfirmEmailUpdatePage from '../pages/ConfirmEmailUpdatePage';
import WorkspaceAI from '../pages/WorkspacePages/WorkspaceAI'
import MainPage from '../pages/WorkspacePages/MainPage';
import MyDocs from '../pages/MyDocs';
import TaskModal from '../modals/TaskModal';
const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/resetPassword" element={<ResetPasswordPage />} />
                <Route path="/confirmEmail" element={<ConfirmEmailPage />} />
                <Route path="/profilepage" element={<ProfilePage />} />
                <Route path="/taskboardhomepage" element={<HomePage />} />
                <Route path="/thirdpartylogin" element={<ThirdPartyLogin />} />
                <Route path="/confirmchangeemail" element={<ConfirmEmailUpdatePage />} />
                <Route path="/workspaceAi" element={<WorkspaceAI />} />
                <Route path="/workspace/mainpage" element={<MainPage />} />
                <Route path="/mydocs" element={<MyDocs />} />
                <Route path="/taskboard" element={<TaskModal />} />                
            </Routes>
        </Router>
    );
};

export default AppRoutes;
