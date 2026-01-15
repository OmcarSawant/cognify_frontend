import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/ThemeToggle';
import './Documentation.css';

function Documentation() {
    const { token } = useAuth();

    return (
        <div className="docs-page">
            <ThemeToggle />
            <header className="docs-header">
                <div className="docs-header-content">
                    <Link to="/" className="docs-logo">
                        <div className="docs-logo-icon">C</div>
                        <span>Cognify</span>
                    </Link>
                    <nav className="docs-nav">
                        <a href="#how-to-use">How to Use</a>
                        <a href="#features">Features</a>
                        <a href="#tech-stack">Tech Stack</a>
                        <a href="#about">About</a>
                    </nav>
                    {!token && <Link to="/login" className="docs-login-btn">Login</Link>}
                    {token && <Link to="/projects" className="docs-login-btn">Dashboard</Link>}
                </div>
            </header>

            <main className="docs-content">
                <div className="docs-hero">
                    <h1>Cognify Documentation</h1>
                    <p>Learn how to build and deploy AI-powered chatbot agents</p>
                </div>

                {/* How to Use Section */}
                <section id="how-to-use" className="docs-section">
                    <h2>How to Use</h2>
                    <div className="docs-card">
                        <div className="step-list">
                            <div className="step-item">
                                <div className="step-number">1</div>
                                <div className="step-content">
                                    <h3>Register / Login</h3>
                                    <p>Create an account or sign in to access your dashboard. Your data is securely protected with JWT authentication.</p>
                                </div>
                            </div>
                            <div className="step-item">
                                <div className="step-number">2</div>
                                <div className="step-content">
                                    <h3>Create a Project (Agent)</h3>
                                    <p>Click "Create Project" to set up a new AI agent. Give it a name and description to identify its purpose.</p>
                                </div>
                            </div>
                            <div className="step-item">
                                <div className="step-number">3</div>
                                <div className="step-content">
                                    <h3>Set System Prompt</h3>
                                    <p>Define how your agent should behave by setting a system prompt. This shapes the personality and capabilities of your chatbot.</p>
                                </div>
                            </div>
                            <div className="step-item">
                                <div className="step-number">4</div>
                                <div className="step-content">
                                    <h3>Start Chatting</h3>
                                    <p>Open your project and begin interacting with your AI agent. Ask questions, get responses, and refine your prompts.</p>
                                </div>
                            </div>
                        </div>

                        <div className="info-box">
                            <h4>💡 Context Persistence</h4>
                            <p>Each conversation maintains context within a session. Your agent remembers previous messages in the chat, enabling natural multi-turn conversations.</p>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="docs-section">
                    <h2>Features</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🤖</div>
                            <h3>Project-Based Agents</h3>
                            <p>Create multiple independent AI agents, each tailored for specific use cases and workflows.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">💬</div>
                            <h3>System Prompts</h3>
                            <p>Customize your agent's behavior with powerful system prompts that define personality and capabilities.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🧠</div>
                            <h3>Contextual Memory</h3>
                            <p>Agents maintain conversation context for natural, coherent multi-turn dialogues.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🔐</div>
                            <h3>Secure Authentication</h3>
                            <p>Industry-standard JWT authentication keeps your projects and data protected.</p>
                        </div>
                    </div>
                </section>

                {/* Tech Stack Section */}
                <section id="tech-stack" className="docs-section">
                    <h2>Tech Stack</h2>
                    <div className="docs-card">
                        <div className="tech-grid">
                            <div className="tech-item">
                                <div className="tech-icon">⚛️</div>
                                <div className="tech-info">
                                    <h4>React + Vite</h4>
                                    <p>Modern frontend framework with lightning-fast development experience</p>
                                </div>
                            </div>
                            <div className="tech-item">
                                <div className="tech-icon">🟢</div>
                                <div className="tech-info">
                                    <h4>Node.js + Express</h4>
                                    <p>Robust backend server handling API requests and business logic</p>
                                </div>
                            </div>
                            <div className="tech-item">
                                <div className="tech-icon">🍃</div>
                                <div className="tech-info">
                                    <h4>MongoDB</h4>
                                    <p>Flexible NoSQL database for storing projects and user data</p>
                                </div>
                            </div>
                            <div className="tech-item">
                                <div className="tech-icon">🧠</div>
                                <div className="tech-info">
                                    <h4>OpenAI Responses API</h4>
                                    <p>Cutting-edge AI models powering intelligent conversations</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="docs-section">
                    <h2>About the Author</h2>
                    <div className="docs-card about-card">
                        <div className="author-avatar">👨‍💻</div>
                        <div className="author-info">
                            <h3>Omkar</h3>
                            <p>Full-stack developer passionate about AI and building tools that empower creators. Cognify is built to make AI accessible to everyone.</p>
                            <div className="author-links">
                                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="author-link">
                                    <span>GitHub</span>
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="author-link">
                                    <span>LinkedIn</span>
                                </a>
                                <a href></a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="docs-footer">
                <p>© 2026 Cognify. Built with ❤️ for AI enthusiasts.</p>
            </footer>
        </div>
    );
}

export default Documentation;
