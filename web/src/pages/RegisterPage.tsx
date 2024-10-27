// 注册界面. 如果用户名已存在就报错, 注册成功就跳转到主页.

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
import { AccountCircle, BadgeRounded, Key } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        userName: "",
        passWord: "",
        nickName: "",
    });
    const [error, setError] = useState(false);
    const navigator = useNavigate();

    const handleInputChange =
        (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData((prev) => ({
                ...prev,
                [field]: e.target.value,
            }));
        };

    function handleSubmit() {
        api()
            .post("users/register", {
                username: formData.userName,
                password: formData.passWord,
                nickname: formData.nickName || formData.userName,
            })
            .then((res) => {
                const r = res.data;
                if (r.code === "CREATED") {
                    alert("注册成功");
                    navigator("/");
                }
            }).catch(() => {
            setError(true);
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
                        注册账号
                    </Typography>

                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        <TextField
                            error={error}
                            helperText={error ? "用户已存在" : ""}
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
                            fullWidth
                            variant="outlined"
                            label="昵称"
                            value={formData.nickName}
                            onChange={handleInputChange("nickName")}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <BadgeRounded color="primary" />
                                    </InputAdornment>
                                ),
                            }}
                            helperText="选填项，默认与用户名相同"
                        />

                        <TextField
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
                            sx={{
                                mt: 2,
                                height: "48px",
                                borderRadius: "8px",
                                textTransform: "none",
                                fontSize: "1rem",
                            }}
                        >
                            立即注册
                        </Button>
                    </Box>
                </Box>
            </Card>
        </Box>
    );
}
