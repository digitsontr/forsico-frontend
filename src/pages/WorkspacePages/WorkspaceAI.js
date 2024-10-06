import React, { useState } from 'react';
import '../../styles/workspaceCss/workspaceAi.css'; 

const WorkspaceAIPage = () => {
    const [workspaceName, setWorkspaceName] = useState('New workspace');

    
    const handleNameChange = (e) => {
        setWorkspaceName(e.target.value);
      };


  return (
    <div className="workspaceAi-container">
        <div className='workspaceAi-top'>
            <div className='workspaceAi-title-div'>
                <input
                    className="workspaceAi-title"
                    type="text"
                    value={workspaceName}
                    onChange={handleNameChange}
                />
                <img src="./workspaceAi-title-icon.svg" alt="" />
            </div>
            <div className='workspaceAi-description-div'> 

            </div>
        </div>
        <div className='workspaceAi-input-div'>

        </div>
        <div className='workspaceAi-content'>

        </div>
    </div>
  );
};

export default WorkspaceAIPage;
