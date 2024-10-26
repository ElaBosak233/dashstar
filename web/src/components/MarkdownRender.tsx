import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Typography, Link, Box, Paper } from '@mui/material';

// 定义 Markdown 渲染器组件
const MarkdownRenderer = ({ markdown }) => {
    return (
        <Paper sx={{ p: 2 }}>
            <ReactMarkdown
                // 启用 GitHub 风格的 Markdown 支持
                remarkPlugins={[remarkGfm]}
                components={{
                    // 自定义标题渲染
                    h1: ({ node, ...props }) => (
                        <Typography variant="h3" gutterBottom {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                        <Typography variant="h4" gutterBottom {...props} />
                    ),
                    h3: ({ node, ...props }) => (
                        <Typography variant="h5" gutterBottom {...props} />
                    ),
                    h4: ({ node, ...props }) => (
                        <Typography variant="h6" gutterBottom {...props} />
                    ),
                    p: ({ node, ...props }) => <Typography variant="body1" {...props} />,
                    a: ({ node, ...props }) => <Link {...props} />,
                    ul: ({ node, ...props }) => (
                        <Box component="ul" sx={{ pl: 4 }} {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                        <Box component="ol" sx={{ pl: 4 }} {...props} />
                    ),
                    li: ({ node, ...props }) => <Typography component="li" {...props} />,
                    code: ({ node, ...props }) => (
                        <Box
                            component="pre"
                            sx={{
                                backgroundColor: '#f5f5f5',
                                p: 1,
                                borderRadius: 1,
                                overflow: 'auto',
                            }}
                            {...props}
                        />
                    ),
                }}
            >
                {markdown}
            </ReactMarkdown>
        </Paper>
    );
};

export default MarkdownRenderer;
