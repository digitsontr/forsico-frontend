import React, { useState } from "react";
import '../styles/taskboardhomepage.css'; // CSS dosyasını ayrı tutuyoruz
import Sidebar from './SideBar';
import Navbar from '../components/LandingPage/Navbar';

const HomePage = () => {
    const [workspaces] = useState([
        {
            name: "Forsico",
            sections: [
                { id: "general", name: "General", members: 8, image: "img/general.png" },
                { id: "uxui", name: "UX/UI", members: 8, image: "img/uxui.png" },
                { id: "software", name: "Software", members: 8, image: "img/software.png" },
                { id: "socialmedia", name: "Social Media", members: 8, image: "img/socialmedia.png" },
            ]
        },
        {
            name: "Startup",
            sections: [
                { id: "general", name: "General", members: 5, image: "img/general.png" },
                { id: "uxui", name: "UX/UI", members: 8, image: "img/uxui.png" },
                { id: "software", name: "Software", members: 8, image: "img/software.png" },
            ]
        },
        {
            name: "Enefitimbu",
            sections: [
                { id: "general", name: "General", members: 8, image: "img/general.png" },
            ]
        }
    ]);

    return (
        <>
            <Navbar />
            <div className="taskboard-homepage-layout">
                <div className="meet-message">
                    <span>Good Morning, Murat!</span>
                </div>
                <div className="workspace-general-info">
                    <div className="general-info-leftside">
                        <div className="double-card">
                            <div className="active-workspaces">
                                <h2 className="fs-96">3</h2>
                                <span>workspaces</span>
                            </div>
                            <div className="active-task">
                                <h2 className="fs-96">26</h2>
                                <span>tasks</span>
                            </div>
                        </div>
                        <div className="percent-of-completed">
                            <div>
                                <span>You have completed</span>
                                <span>of your tasks</span>
                            </div>
                            <div>
                                <span>30%</span>
                            </div>
                        </div>
                    </div>
                    <div className="general-info-middleside">
                        <img className="graphic" src="./workspacehomepage-graphic.svg" alt="graphic" />
                    </div>
                    <div className="general-info-rightside">
                        <div className="rightside-elements">
                            <span>Another Info</span>
                        </div>
                        <div className="rightside-elements">
                            <span>Another Info</span>
                        </div>
                        <div className="rightside-elements">
                            <span>Another Info</span>
                        </div>
                    </div>
                </div>
                
                <div className="workspaces-info">
                    <div className="workspace-general-info-title">
                        <span>Your workspaces</span>
                    </div>

                    {workspaces.map((workspace, index) => (
                        <div key={index} className="workspace">
                            <span className="workspace-title">{workspace.name}</span>
                            <div className="workspace-sections">
                                {workspace.sections.map(section => (
                                    <div key={section.id} className="workspace-card">
                                        <div className="workspace-card-upperside">
                                            <span className="workspace-card-title">{section.name}</span>
                                            <span className="workspace-card-icon">
                                                <img src={section.image} alt={section.name} />
                                            </span>
                                        </div>
                                        <div className="workspace-card-middleside">
                                            <span className="workspace-card-line">------------------</span>
                                        </div>
                                        <div className="workspace-card-lowerside">
                                            <div className="members-image">
                                                {/* Placeholder for member images */}
                                                <img src="img/member.png" alt="member" />
                                                <img src="img/member.png" alt="member" />
                                                <img src="img/member.png" alt="member" />
                                            </div>
                                            <span className="total-members">+{section.members}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default HomePage;