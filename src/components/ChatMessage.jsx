import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ChatMessage = ({ message }) => {
    const { role, content, isError } = message;

    // Custom renderer for code blocks
    const CodeBlock = ({ node, inline, className, children, ...props }) => {
        const match = /language-(\w+)/.exec(className || '');
        const [copied, setCopied] = useState(false);
        const codeString = String(children).replace(/\n$/, '');

        const handleCopy = () => {
            navigator.clipboard.writeText(codeString);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        };

        return !inline && match ? (
            <div className="code-block-wrapper">
                <div className="code-block-header">
                    <span className="code-lang">{match[1]}</span>
                    <button className="copy-btn" onClick={handleCopy}>
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
                <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{ margin: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                    {...props}
                >
                    {codeString}
                </SyntaxHighlighter>
            </div>
        ) : (
            <code className={`${className} inline-code`} {...props}>
                {children}
            </code>
        );
    };

    return (
        <div className={`message ${role} ${isError ? 'error' : ''}`}>
            <div className="message-avatar">
                {role === 'user' ? '👤' : '🤖'}
            </div>
            <div className="message-content">
                {role === 'assistant' ? (
                    <ReactMarkdown
                        components={{
                            code: CodeBlock
                        }}
                    >
                        {content}
                    </ReactMarkdown>
                ) : (
                    <div className="user-text">{content}</div>
                )}
            </div>
        </div>
    );
};

export default ChatMessage;
