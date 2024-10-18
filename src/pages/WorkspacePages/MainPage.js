import React, { useEffect, useState } from "react";
import Sidebar from '../SideBar';
import Navbar from '../../components/LandingPage/Navbar';
import HomePage from './HomePage'
import Board from "./Board";
import ProfilePage from "../ProfilePage"
import WorkspaceAI from './WorkspaceAI'
import { useDispatch, useSelector } from "react-redux";
import '../../styles/workspaceCss/homepage.css';
const MainPage = () => {
    const selected = useSelector((state) => state.selectedComp);

    const renderComponent = () => {
        switch (selected.selectedComponent) { //TODO redirect according to the url
            case 'home-page':
                return <HomePage />
            case 'workspace-ai':
                return <WorkspaceAI />;
            case 'board-page':
                return <Board />
            case 'profile-page':
                return <ProfilePage />
            default:
                return <HomePage />;
        }
    };
    return (
        <>
            <Navbar />
            <div className='workspaceai-main' style={{ display: "flex" }}>
                <div>
                    <Sidebar />
                </div>
                {renderComponent()}
            </div>
        </>
    )
}
export default MainPage;