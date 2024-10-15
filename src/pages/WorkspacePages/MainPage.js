import React, { useEffect, useState } from "react";
import Sidebar from '../SideBar';
import Navbar from '../../components/LandingPage/Navbar';
import HomePage from './HomePage'
import WorkspaceAI from './WorkspaceAI'
import { useDispatch, useSelector } from "react-redux";
import '../../styles/taskboardhomepage.css'; 
const MainPage = () => {
    const selected = useSelector((state) => state.selectedComp);

    const renderComponent = () => {
        switch (selected.selectedComponent) {
        case 'home-page':
            return <HomePage/>
        case 'workspace-ai':
            return <WorkspaceAI/>;
        default:
            return <HomePage />;
        }
    };
    return(
        <>
            <Navbar />
            <div className='workspaceai-main' style={{display:"flex"}}>
                <div>
                    <Sidebar />
                </div>
                {renderComponent()}
            </div>
        </>
    )
}
export default MainPage;