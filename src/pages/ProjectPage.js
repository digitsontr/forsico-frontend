import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProjectPage = () => {
    const [projectName, setProjectName] = useState('');
    const [assignedUsers, setAssignedUsers] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCreateProject = () => {
        if (projectName.trim()) {
            // Burada API çağrısı yapılarak proje oluşturulabilir
            console.log('Proje Oluştur:', projectName, assignedUsers);

            // Proje oluşturulduktan sonra, örneğin proje listesini güncellemek gibi işlemler yapabilirsin
            // dispatch(addProject({ name: projectName, users: assignedUsers }));

            // Sonra kullanıcıyı proje yönetim sayfasına yönlendirebilirsin
            navigate('/tasks');
        }
    };

    return (
        <div>
            <h1>Create a New Project</h1>
            <input
                type="text"
                placeholder="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
            />
            {/* Kullanıcıları ekleyebileceğin bir alan */}
            <div>
                <h3>Assign Users</h3>
                {/* Basit bir dropdown ya da autocomplete özelliği ile kullanıcıları seçebilirsin */}
                {/* Örnek kullanıcı listesi */}
                <ul>
                    <li>
                        <input
                            type="checkbox"
                            value="user1"
                            onChange={(e) =>
                                setAssignedUsers([...assignedUsers, e.target.value])
                            }
                        />
                        User 1
                    </li>
                    <li>
                        <input
                            type="checkbox"
                            value="user2"
                            onChange={(e) =>
                                setAssignedUsers([...assignedUsers, e.target.value])
                            }
                        />
                        User 2
                    </li>
                    {/* Diğer kullanıcılar */}
                </ul>
            </div>
            <button onClick={handleCreateProject}>Create Project</button>
        </div>
    );
};

export default ProjectPage;
