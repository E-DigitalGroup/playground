'use client';

import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

const CodeBlock = ({ className, children }) => {
	const [isCopied, setIsCopied] = useState(false);
	const language = className?.replace('language-', '') || 'plaintext';

	const handleCopy = () => {
		navigator.clipboard.writeText(children);
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 2000);
	};

	return (
		<div style={{ position: 'relative' }}>
			<button
				onClick={handleCopy}
				style={{
					position: 'absolute',
					top: '10px',
					right: '10px',
					padding: '5px 10px',
					background: '#f5f5f5',
					border: 'none',
					cursor: 'pointer',
				}}
			>
				{isCopied ? 'Copied' : 'Copy'}
			</button>
			<SyntaxHighlighter language={language}>{children}</SyntaxHighlighter>
		</div>
	);
};

export default CodeBlock;
