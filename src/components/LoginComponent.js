import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginComponent.css'; // Import CSS

function LoginComponent() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://192.168.247.38:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (data.success) {
            setMessage('Login successful');
            navigate('/admin'); 
        } else {
            setMessage('Invalid username or password');
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>เข้าสู่ระบบสำหรับผู้ดูแลระบบ</h2>
                <label>
                    ชื่อผู้ใช้ :
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label>
                    รหัสผ่าน :
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button type="submit">เข้าสู่ระบบ</button>
                <p className="login-message">{message}</p>
            </form>
        </div>
    );
}

export default LoginComponent;
