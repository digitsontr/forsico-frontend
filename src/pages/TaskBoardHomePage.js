import React, { useState } from "react";
import '../styles/taskboardhomepage.css'; // CSS dosyasını ayrı tutuyoruz

const HomePage = () => {
    const [workspaces] = useState([
        {
            name: "Forsico",
            sections: [
                { id: "general", name: "General", members: 8 },
                { id: "uxui", name: "UX/UI", members: 8 },
                { id: "software", name: "Software", members: 8 },
                { id: "socialmedia", name: "Social Media", members: 8 },
            ]
        },
        {
            name: "Startup",
            sections: [
                { id: "general", name: "General", members: 5 },
                { id: "uxui", name: "UX/UI", members: 8 },
                { id: "software", name: "Software", members: 8 },
            ]
        },
        {
            name: "Enefitimbu",
            sections: [
                { id: "general", name: "General", members: 8 },
            ]
        }
    ]);

    return (
        <div className="homepage-layout">
            <Sidebar />
            <div className="workspace-general-info">
                <div className="general-info-leftside"></div>
                <div className="gneral-info-middleside"></div>
                <div className="general-info-rightside"></div>
            </div>
            <div className="workspaces-info">
                <div className="workspaces-info-title"></div>
                <div className=""></div>
                <div></div>
                <div></div>

            </div>
        </div>
    );
};
export default HomePage;