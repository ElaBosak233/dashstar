// 文章的编辑界面. 如果不是作者本人, 无法编辑.

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Stack, TextField, Typography, Container, Paper } from "@mui/material";
import { api } from "@/utils/axios.ts";

export default function EditArticlePage() {
    const { id } = useParams<{ id: string }>();
    const [title, setTitle] = useState<string>();
    const [content, setContent] = useState<string>();
    const navigation = useNavigate();

    useEffect(() => {
        api().get(`/articles/${id}`).then((res) => {
            const r = res.data;
            setTitle(r.data.title);
            setContent(r.data.content);
        })
    }, []);

    function handleSubmit() {
        api().put("articles/", {
            id: id,
            title: title,
            content: content,
        }).then(() => {
            setTitle("");
            setContent("");
            alert("修改成功");
            navigation("/");
        });
    }

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 4, marginBottom: 4 }}>
                <Stack spacing={4}>
                    {/* 标题区块 */}
                    <Typography
                        variant="h4"
                        align="center"
                        gutterBottom
                        sx={{
                            fontWeight: 600,
                            mb: 4,
                            color: "primary.main",
                        }}
                    >
                        修改文章
                    </Typography>

                    {/* 表单区块 */}
                    <Stack spacing={3}>
                        <TextField
                            label="标题"
                            variant="outlined"
                            fullWidth
                            value={title || ""}
                            onChange={(e) => setTitle(e.target.value)}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 2,
                                },
                            }}
                        />

                        <TextField
                            label="内容"
                            variant="outlined"
                            fullWidth
                            value={content || ""}
                            minRows={8}
                            maxRows={50}
                            multiline
                            onChange={(e) => setContent(e.target.value)}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 2,
                                },
                            }}
                        />
                    </Stack>

                    {/* 按钮区块 */}
                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleSubmit}
                        sx={{
                            py: 1.5,
                            borderRadius: 2,
                            boxShadow: 2,
                            "&:hover": {
                                boxShadow: 4,
                            },
                        }}
                    >
                        提交修改
                    </Button>
                </Stack>
            </Paper>
        </Container>
    );
}
