// markdown 渲染器. 把传入的文本渲染成 markdown 样式
import React from "react";
import Markdown from "mui-markdown"; // 使用 mui-markdown 作为渲染器
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import javascript from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import { Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
// 虽然使用 mui-markdown，但保留 react-markdown 的类型定义，因为它们结构兼容
import type { Components } from "react-markdown";

// 注册语言
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("javascript", javascript);

interface MarkdownRendererProps {
    content: string;
}

const MarkdownContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    "& img": {
        maxWidth: "100%",
        height: "auto",
    },
    "& h1": {
        ...theme.typography.h4,
        marginBottom: theme.spacing(2),
    },
    "& h2": {
        ...theme.typography.h5,
        marginBottom: theme.spacing(2),
    },
    "& h3": {
        ...theme.typography.h6,
        marginBottom: theme.spacing(1.5),
    },
    "& p": {
        ...theme.typography.body1,
        marginBottom: theme.spacing(2),
    },
    "& ul, & ol": {
        marginBottom: theme.spacing(2),
        paddingLeft: theme.spacing(2),
    },
    "& li": {
        ...theme.typography.body1,
        marginBottom: theme.spacing(1),
    },
    "& blockquote": {
        borderLeft: `4px solid ${theme.palette.grey[300]}`,
        margin: theme.spacing(2, 0),
        padding: theme.spacing(0, 2),
        color: theme.palette.text.secondary,
    },
    "& a": {
        color: theme.palette.primary.main,
        textDecoration: "none",
        "&:hover": {
            textDecoration: "underline",
        },
    },
    // 内联代码样式
    "& code": {
        backgroundColor: theme.palette.grey[100],
        padding: "2px 6px",
        borderRadius: 4,
        fontSize: "0.875em",
        fontFamily: "Consolas, Monaco, \"Andale Mono\", \"Ubuntu Mono\", monospace",
        color: theme.palette.primary.main,
        // 确保内联代码不会换行
        whiteSpace: "nowrap",
        display: "inline-block",
    },
    // 代码块样式
    "& pre": {
        margin: theme.spacing(2, 0),
        padding: "0 !important",
        borderRadius: `${theme.shape.borderRadius}px !important`,
        "& code": {
            backgroundColor: "transparent",
            padding: 0,
            color: "inherit",
            // 代码块需要保持换行和块级显示
            whiteSpace: "pre",
            display: "block",
        },
    },
}));

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {

    const components: Components = {
        // 代码处理组件
        code({ inline, className, children }) {
            const match = /language-(\w+)/.exec(className || "");

            // 内联代码直接返回 code 标签
            if (inline) {
                return <code className={className}>{children}</code>;
            }

            // 代码块使用 SyntaxHighlighter
            return (
                <SyntaxHighlighter
                    style={oneDark}
                    language={match ? match[1] : "text"}
                    PreTag="div"
                >
                    {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
            );
        },
        // 段落处理组件
        p({ children }) {
            return (
                <Typography component="p" variant="body1" gutterBottom>
                    {children}
                </Typography>
            );
        },
    };

    return (
        <MarkdownContainer elevation={1}>
            <Markdown components={components}>{content}</Markdown>
        </MarkdownContainer>
    );
};

export default MarkdownRenderer;
