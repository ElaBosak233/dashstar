// 用于新建一个文章.

import { Button, TextField, Typography, Paper, Box, styled } from "@mui/material";
import { api } from "@/utils/axios.ts";
import { useState } from "react";
import useAuthStore from "@/stores/auth.ts";
import { useNavigate } from "react-router-dom";

const StyledPaper = styled(Paper)(({ theme }) => ({
    maxWidth: "800px",
    margin: "40px auto",
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
        borderRadius: theme.spacing(1.5),
    },
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderWidth: "2px",
    },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
    padding: theme.spacing(1.5),
    borderRadius: theme.spacing(1.5),
    fontSize: "1.1rem",
    fontWeight: 600,
    textTransform: "none",
    boxShadow: "none",
    "&:hover": {
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    },
}));

export default function CreateArticlePage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const user = useAuthStore();
    const navigation = useNavigate();

    function handleClick() {
        api().post("articles/", {
            title: title,
            content: content,
            author_id: user.user?.id,
        }).then(
            () => {
                navigation("/");
            },
        );
    }

    return (
        <StyledPaper elevation={0}>
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
                新建文章
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <StyledTextField
                    fullWidth
                    label="文章标题"
                    placeholder="请输入一个吸引人的标题"
                    variant="outlined"
                    onChange={(e) => setTitle(e.target.value)}
                    InputLabelProps={{
                        sx: { fontSize: "1rem" },
                    }}
                />

                <StyledTextField
                    fullWidth
                    label="文章内容"
                    placeholder="请输入文章内容,可以使用markdown格式输入..."
                    multiline
                    rows={12}
                    variant="outlined"
                    onChange={(e) => setContent(e.target.value)}
                    InputLabelProps={{
                        sx: { fontSize: "1rem" },
                    }}
                />

                <SubmitButton
                    variant="contained"
                    onClick={handleClick}
                    sx={{
                        mt: 2,
                        background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
                    }}
                >
                    发布文章
                </SubmitButton>
            </Box>
        </StyledPaper>
    );
}
