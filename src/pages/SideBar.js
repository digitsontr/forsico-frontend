const Sidebar = () => {
    return (
      <div className="sidebar">
        <div className="sidebar-top">
          <h2>Forsico</h2>
          <nav>
            <ul>
              <li><i className="fas fa-home"></i> Home</li>
              <li><i className="fas fa-tasks"></i> My Tasks</li>
              <li><i className="fas fa-folder"></i> My Docs</li>
            </ul>
          </nav>
        </div>
        <div className="workspaces">
          <h3>Workspaces</h3>
          <ul>
            <li>Enefitimbu</li>
            <li>Startup</li>
            <li>Forsico</li>
          </ul>
        </div>
      </div>
    );
  };
  
  export default Sidebar;