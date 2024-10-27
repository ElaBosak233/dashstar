// markdown渲染器组件

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Typography, Link, Box, Paper } from '@mui/material';

// 定义 Markdown 渲染器组件
const MarkdownRenderer = ({ markdown }: { markdown: any}) => {
    return (
        <Paper sx={{ p: 2 }}>
            <ReactMarkdown
                // 启用 GitHub 风格的 Markdown 支持
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({ children }) => (
                        <Typography component="h1" variant="h3" gutterBottom>
                            {children}
                        </Typography>
                    ),
                    h2: ({ children }) => (
                        <Typography component="h2" variant="h4" gutterBottom>
                            {children}
                        </Typography>
                    ),
                    h3: ({ children }) => (
                        <Typography component="h3" variant="h5" gutterBottom>
                            {children}
                        </Typography>
                    ),
                    h4: ({ children }) => (
                        <Typography component="h4" variant="h6" gutterBottom>
                            {children}
                        </Typography>
                    ),
                    p: ({ children }) => (
                        <Typography component="p" variant="body1">
                            {children}
                        </Typography>
                    ),
                    a: ({ href, children }) => (
                        <Link href={href} target="_blank" rel="noopener">
                            {children}
                        </Link>
                    ),
                    ul: ({ children }) => (
                        <Box component="ul" sx={{ pl: 4 }}>
                            {children}
                        </Box>
                    ),
                    ol: ({ children }) => (
                        <Box component="ol" sx={{ pl: 4 }}>
                            {children}
                        </Box>
                    ),
                    li: ({ children }) => (
                        <Typography component="li" variant="body1">
                            {children}
                        </Typography>
                    ),
                    code: ({ children }) => (
                        <Box
                            component="code"
                            sx={{
                                p: 1,
                                borderRadius: 1,
                                overflow: 'auto',
                                fontFamily: 'monospace',
                            }}
                        >
                            {children}
                        </Box>
                    ),
                }}
            >
                {markdown}
            </ReactMarkdown>
        </Paper>
    );
};

export default MarkdownRenderer;
