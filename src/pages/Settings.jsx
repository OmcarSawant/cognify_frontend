import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import './Settings.css';

// Helper function to decode JWT payload
const decodeJWT = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
};

function Settings() {
    const navigate = useNavigate();
    const { token, logout } = useAuth();

    // Account state
    const [userEmail, setUserEmail] = useState('');
    const [accountName, setAccountName] = useState('');

    // Appearance state
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // Decode JWT token to get user email
        if (token) {
            const payload = decodeJWT(token);
            if (payload && payload.email) {
                setUserEmail(payload.email);
            }
        }

        // Load account name from localStorage
        const savedName = localStorage.getItem('accountName') || '';
        setAccountName(savedName);

        // Load theme preference
        const savedTheme = localStorage.getItem('theme');
        const isDark = savedTheme === 'dark';
        setDarkMode(isDark);
        applyTheme(isDark);
    }, [token]);

    const applyTheme = (isDark) => {
        if (isDark) {
            document.documentElement.classList.add('dark-theme');
        } else {
            document.documentElement.classList.remove('dark-theme');
        }
    };

    const handleAccountNameChange = (e) => {
        const name = e.target.value;
        setAccountName(name);
        localStorage.setItem('accountName', name);
    };

    const handleThemeToggle = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
        applyTheme(newDarkMode);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="settings-page">
            <Sidebar />
            <div className="settings-content">
                <div className="settings-header">
                    <h1>Settings</h1>
                    <p>Manage your account and preferences</p>
                </div>

                {/* Account Section */}
                <section className="settings-section">
                    <h2>Account</h2>
                    <div className="settings-card">
                        <div className="setting-item">
                            <label>Email Address</label>
                            <input
                                type="email"
                                value={userEmail}
                                readOnly
                                className="input-readonly"
                            />
                        </div>
                        <div className="setting-item">
                            <label>Account Name</label>
                            <input
                                type="text"
                                value={accountName}
                                onChange={handleAccountNameChange}
                                placeholder="Enter your name"
                                className="input-editable"
                            />
                        </div>
                        <div className="setting-item">
                            <button className="logout-button" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    </div>
                </section>

                {/* Appearance Section */}
                <section className="settings-section">
                    <h2>Appearance</h2>
                    <div className="settings-card">
                        <div className="setting-item toggle-item">
                            <div className="toggle-info">
                                <label>Dark Mode</label>
                                <span className="toggle-description">
                                    Switch between light and dark themes
                                </span>
                            </div>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={darkMode}
                                    onChange={handleThemeToggle}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                </section>

                {/* Profile Section */}
                <section className="settings-section">
                    <h2>Profile</h2>
                    <div className="settings-card">
                        <div className="profile-display">
                            <div className="avatar-placeholder">
                                <span>👤</span>
                            </div>
                            <div className="profile-info">
                                <p className="profile-name">{accountName || 'User'}</p>
                                <p className="profile-email">{userEmail}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Settings;
