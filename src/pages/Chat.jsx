import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { chatAPI } from '../services/api';
import ChatMessage from '../components/ChatMessage';
import './Chat.css';

function Chat() {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingHistory, setIsLoadingHistory] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Fetch existing messages on mount
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                setIsLoadingHistory(true);
                const data = await chatAPI.getMessages(projectId);
                if (data.messages && Array.isArray(data.messages)) {
                    setMessages(data.messages);
                }
            } catch (error) {
                console.error('Failed to load chat history:', error);
            } finally {
                setIsLoadingHistory(false);
            }
        };

        if (projectId) {
            fetchMessages();
        }
    }, [projectId]);

    const handleSend = async () => {
        const message = inputValue.trim();
        if (!message || isLoading) return;

        // Append user message immediately
        const userMessage = { role: 'user', content: message };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            // Call /api/chat with JWT
            const data = await chatAPI.sendMessage(projectId, message);

            // Append assistant response
            const assistantMessage = { role: 'assistant', content: data.response };
            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Chat error:', error);
            const errorMessage = {
                role: 'assistant',
                content: 'Sorry, something went wrong. Please try again.',
                isError: true
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="chat-container">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)} />
            )}

            {/* Sidebar */}
            <aside className={`chat-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h2>Cognify AI</h2>
                </div>
                <nav className="sidebar-nav">
                    <button className="nav-item" onClick={() => navigate('/projects')}>
                        ← Back to Projects
                    </button>
                </nav>
                <div className="sidebar-footer">
                    <p>Project ID: {projectId}</p>
                </div>
            </aside>

            {/* Chat Panel */}
            <main className="chat-panel">
                <header className="chat-header">
                    <button
                        className="mobile-menu-toggle chat-toggle"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        ☰
                    </button>
                    <h1>Chat</h1>
                </header>

                {/* Message List */}
                <div className="messages-container">
                    {isLoadingHistory && (
                        <div className="empty-state">
                            <p>Loading chat history...</p>
                        </div>
                    )}

                    {!isLoadingHistory && messages.length === 0 && (
                        <div className="empty-state">
                            <p>Start a conversation by typing a message below.</p>
                        </div>
                    )}

                    {messages.map((msg, index) => (
                        <ChatMessage key={index} message={msg} />
                    ))}

                    {/* Loading Indicator */}
                    {isLoading && (
                        <div className="message assistant loading">
                            <div className="message-avatar">🤖</div>
                            <div className="message-content">
                                <div className="typing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input Box */}
                <div className="input-container">
                    <textarea
                        className="message-input"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your message here..."
                        disabled={isLoading}
                        rows={1}
                    />
                    <button
                        className="send-button"
                        onClick={handleSend}
                        disabled={isLoading || !inputValue.trim()}
                    >
                        {isLoading ? '...' : 'Send'}
                    </button>
                </div>
            </main>
        </div>
    );
}

export default Chat;
