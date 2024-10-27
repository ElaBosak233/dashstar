// 登陆界面.

import React, { useState } from "react";
import { api } from "@/utils/axios.ts";
import {
    Button,
    Card,
    InputAdornment,
    TextField,
    Typography,
    Box,
} from "@mui/material";
import { AccountCircle, Key } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/stores/auth.ts";

export default function LogInPage() {
    const [formData, setFormData] = useState({
        userName: "",
        passWord: "",
    });
    const [error, setError] = useState({ username: false, password: false });
    const navigator = useNavigate();
    const authStore = useAuthStore();

    const handleInputChange =
        (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData((prev) => ({
                ...prev,
                [field]: e.target.value,
            }));
        };
    // 登录的网络请求
    function handleSubmit() {
        api()
            .post("/users/login", {
                username: formData.userName,
                password: formData.passWord,
            })
            .then((res) => {
                const r = res.data;
                authStore.setToken(r.token);
                authStore.setUser(r.data);
                navigator("/");
            }).catch(() => {
            setError({ username: true, password: true });
            setFormData({
                userName: "",
                passWord: "",
            });
        });
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f5f5f5",
            }}
        >
            <Card
                sx={{
                    maxWidth: 450,
                    width: "100%",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                    borderRadius: "16px",
                }}
            >
                <Box sx={{ p: 4 }}>
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
                        欢迎登录
                    </Typography>

                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        <TextField
                            error={error.username}
                            helperText={error.username ? "用户名或密码错误" : ""}
                            fullWidth
                            variant="outlined"
                            label="用户名"
                            value={formData.userName}
                            onChange={handleInputChange("userName")}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle color="primary" />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            error={error.password}
                            helperText={error.password ? "用户名或者密码错误" : ""}
                            fullWidth
                            variant="outlined"
                            type="password"
                            label="密码"
                            value={formData.passWord}
                            onChange={handleInputChange("passWord")}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Key color="primary" />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            size="large"
                            fullWidth
                            sx={{
                                mt: 2,
                                height: "48px",
                                borderRadius: "8px",
                                textTransform: "none",
                                fontSize: "1rem",
                            }}
                        >
                            立即登录
                        </Button>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mt: 1,
                                px: 1,
                            }}
                        >
                            <Typography
                                variant="body2"
                                sx={{
                                    color: "primary.main",
                                    cursor: "pointer",
                                    "&:hover": {
                                        textDecoration: "underline",
                                    },
                                }}
                                onClick={() => navigator("/forgot-password")}
                            >
                                忘记密码？
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: "primary.main",
                                    cursor: "pointer",
                                    "&:hover": {
                                        textDecoration: "underline",
                                    },
                                }}
                                onClick={() => navigator("/register")}
                            >
                                注册账号
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Card>
        </Box>
    );
}
