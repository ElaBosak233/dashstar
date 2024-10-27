// 当访问了不存在的路由, 就跳转到这个界面.

import { Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                height: "100vh", // 占满视口高度
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                bgcolor:   "grey.100", // 动态背景
                color:  "text.secondary", // 动态文本颜色
                textAlign: "center",
                padding: 4,
            }}
        >
            <Typography
                variant="h1"
                sx={{
                    fontSize: "6rem",
                    fontWeight: 700,
                    marginBottom: 2,
                }}
            >
                404
            </Typography>
            <Typography
                variant="h6"
                sx={{
                    marginBottom: 4,
                }}
            >
                Oops! The page you're looking for doesn't exist.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/")}
                sx={{
                    textTransform: "none",
                }}
            >
                返回首页
            </Button>
        </Box>
    );
}
