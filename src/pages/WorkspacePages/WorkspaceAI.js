import React, { useState } from 'react';
import '../../styles/workspaceCss/workspaceAi.css';
import Sidebar from "../SideBar";
import Navbar from "../../components/LandingPage/Navbar";
import WorkspaceTitleİcon from "../../assets/workspaceAi-title-icon.svg"
import Tickİcon from "../../assets/ai-message-tick-icon.svg"
import Crossİcon from "../../assets/ai-message-cross-icon.svg"


const WorkspaceAIPage = () => {
    const [workspaceName, setWorkspaceName] = useState('Workspace Name');
    const [description, setDescription] = useState('Description');
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [workspaceDescription, setWorkspaceDescription] = useState('');
    const [tasks, setTasks] = useState([
        { id: 1, name: 'Create design system for Forsico', tags: ['ui design', 'marketing'] },
        { id: 2, name: 'Create content strategy for Forsico', tags: ['content', 'marketing'] }
    ]);

    // Workspace adı değişikliği
    const handleNameChange = (e) => {
        setWorkspaceName(e.target.value);
    };

    const handleNameEditClick = () => {
        setIsEditingName(true);
    };

    const handleNameSaveClick = () => {
        setIsEditingName(false);
    };

    // Description değişikliği
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleDescriptionEditClick = () => {
        setIsEditingDescription(true);
    };

    const handleDescriptionSaveClick = () => {
        setIsEditingDescription(false);
    };

    return (
        <>

                <div className="workspaceAi-container">
                    <div className='workspaceAi-top'>
                        {/* Workspace adı ve description alanı */}
                        <div className='workspaceAi-title-div'>
                            {isEditingName ? (
                                <>
                                    <input
                                        className="workspaceAi-title-input"
                                        type="text"
                                        placeholder="Workspace Name"
                                        onChange={handleNameChange}
                                        value={workspaceName}
                                    />
                                    <button className="workspaceAi-save-btn" onClick={handleNameSaveClick}>Save</button>
                                </>
                            ) : (
                                <>
                                    <span className="workspaceAi-title" onClick={handleNameEditClick}>{workspaceName}</span>
                                    <img src={WorkspaceTitleİcon} alt="Workspace Icon" />
                                </>
                            )}
                        </div>

                        {/* Description alanı */}
                        <div className='workspaceAi-description-div'>
                            {isEditingDescription ? (
                                <>
                                    <input
                                        className="workspaceAi-description-input"
                                        type="text"
                                        placeholder="Description"
                                        onChange={handleDescriptionChange}
                                        value={description}
                                    />
                                    <button className="workspaceAi-description-save-btn" onClick={handleDescriptionSaveClick}>Save</button>
                                </>
                            ) : (
                                <>
                                    <span className="workspaceAi-description" onClick={handleDescriptionEditClick}>{description}</span>
                                </>
                            )}
                        </div>

                        {/* Kullanıcı girdisi */}
                        <div className='workspaceAi-input-div'>
                            <div className='textarea-container'>
                                <textarea
                                    className='workspaceAi-input'
                                    value={workspaceDescription}
                                    onChange={(e) => setWorkspaceDescription(e.target.value)}
                                    placeholder="Describe the job you want to do in a few sentences. You can upload visuals or documents related to your business idea so that you can get a more detailed plan."
                                />
                                <div className='textarea-icons'>
                                    <img className='workspaceAi-icon' src="./workspaceAi-image-icon.svg" alt="Upload Image" />
                                    <img className='workspaceAi-icon' src="./workspaceAi-link-icon.svg" alt="Attach Link" />
                                    <img className='workspaceAi-icon' src="./workspaceAi-file-icon.svg" alt="Attach File" />
                                    <button className="workspaceAi-generate-btn" disabled={workspaceDescription.trim() === ''}>Generate</button>
                                </div>
                            </div>
                        </div>

                        {/* Girdi ve çıktı alanı textarea'nın altında */}
                        <div className='workspaceAi-message'>
                            {tasks.map((task) => (
                                <div key={task.id} className='workspaceAi-task'>
                                    <div className='workspaceAi-task-card'>
                                        <div className='task-header'>
                                            <p>{task.name}</p>
                                        </div>
                                        <div className='task-tags'>
                                            {task.tags.map((tag, index) => (
                                                <span key={index} className='task-tag'>{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className='task-icons'>
                                        <span className='task-icon'><img src={Tickİcon} alt="tick" /></span>
                                        <span className='task-icon'><img src={Crossİcon} alt="cross" /></span>
                                    </div>
                                </div>
                            ))}
                            <div>

                            </div>
                        </div>
                    </div>
                </div>
            
        </>
    );
};

export default WorkspaceAIPage;