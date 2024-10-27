// 显示文章的界面. 包含文章的显示区, 和评论区.

import { useParams } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import { Grid, Typography, Box, Paper, Container, Skeleton } from "@mui/material";
import MarkdownRenderer from "@/components/MarkdownRender";
import Comments from "@/components/Comments.tsx";
import { api } from "@/utils/axios.ts";

export default function ShowArticlePage() {
    const { id } = useParams<{ id: string }>();
    const [content, setContent] = useState<string>();

    useEffect(() => {
        api().get(`/articles/${id}`).then((res) => {
            const r = res.data;
            setContent(r.data.content);
        });
    }, []);

    const LoadingSkeleton = () => (
        <Box sx={{ width: "100%" }}>
            <Skeleton variant="text" sx={{ fontSize: "2rem", mb: 2 }} />
            <Skeleton variant="rectangular" height={200} sx={{ mb: 2 }} />
            {/*<Skeleton variant="text" sx={{ fontSize: '1rem' }} count={3} />*/}
        </Box>
    );

    return (
        <Container
            maxWidth="lg"
            sx={{
                py: 4,
                px: { xs: 2, md: 4 }, // 响应式内边距
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 2, md: 4 },
                    borderRadius: 2,
                    bgcolor: "background.paper",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                    mb: 4,
                    flex: 1,
                }}
            >
                <Grid container spacing={4}>
                    {/* 文章内容区域 */}
                    <Grid item xs={12} md={8}>
                        <Suspense fallback={<LoadingSkeleton />}>
                            {content ? (
                                <Box sx={{
                                    "& img": {
                                        maxWidth: "100%",
                                        height: "auto",
                                        borderRadius: 1,
                                        my: 2,
                                    },
                                    "& h1, & h2, & h3, & h4, & h5, & h6": {
                                        color: "text.primary",
                                        fontWeight: 600,
                                        mt: 3,
                                        mb: 2,
                                    },
                                    "& p": {
                                        color: "text.secondary",
                                        lineHeight: 1.7,
                                        my: 2,
                                    },
                                    "& pre": {
                                        bgcolor: "grey.900",
                                        color: "common.white",
                                        p: 2,
                                        borderRadius: 2,
                                        overflow: "auto",
                                    },
                                    "& blockquote": {
                                        borderLeft: 4,
                                        borderColor: "primary.main",
                                        pl: 2,
                                        ml: 0,
                                        my: 2,
                                        color: "text.secondary",
                                    },
                                    "& a": {
                                        color: "primary.main",
                                        textDecoration: "none",
                                        "&:hover": {
                                            textDecoration: "underline",
                                        },
                                    },
                                    "& ul, & ol": {
                                        pl: 3,
                                        my: 2,
                                        "& li": {
                                            mb: 1,
                                        },
                                    },
                                }}>
                                    <MarkdownRenderer markdown={content} />
                                </Box>
                            ) : (
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        minHeight: 200,
                                        bgcolor: "grey.50",
                                        borderRadius: 2,
                                    }}
                                >
                                    <Typography
                                        color="text.secondary"
                                        sx={{ textAlign: "center" }}
                                    >
                                        文章内容加载失败或不存在。
                                    </Typography>
                                </Box>
                            )}
                        </Suspense>
                    </Grid>

                    {/* 评论区域 */}
                    <Grid item xs={12} md={4}>
                        <Box sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                        }}>
                            <Box sx={{
                                flex: 1,
                                maxHeight: "800px",  // 设置最大高度
                                overflowY: "auto",
                                "&::-webkit-scrollbar": {
                                    width: "8px",
                                },
                                "&::-webkit-scrollbar-thumb": {
                                    backgroundColor: "rgba(0,0,0,0.1)",
                                    borderRadius: "4px",
                                },
                                "&::-webkit-scrollbar-track": {
                                    backgroundColor: "transparent",
                                },
                            }}>
                                <Comments id={Number(id)} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}
