// 登录界面

import React, { useState } from "react";
import { api } from "@/utils/axios.ts";
import { Button, Card, Container, InputAdornment, TextField, Typography } from "@mui/material";
import { AccountCircle, Key } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/stores/auth.ts";

export default function LogInPage() {
    const [formData, setFormData] = useState({
        userName: "",
        passWord: "",
    });
    const navigator = useNavigate();

    const authStore = useAuthStore();
    const handleInputChange =
        (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData((prev) => ({
                ...prev,
                [field]: e.target.value,
            }));
        };

    function handleSubmit() {
        api()
            .post("/users/login", {
                username: formData.userName,
                password: formData.passWord,
            })
            .then((res) => {
                console.log(res);
                const r = res.data;
                authStore.setToken(r.token);
                authStore.setUser(r.data);
                navigator("/home");
            });
    }


    return (
        <Card sx={{ padding: "40px" }}>
            <Container
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                }}
            >
                <Typography>登录界面</Typography>

                <TextField
                    fullWidth
                    label="输入用户名"
                    value={formData.userName}
                    onChange={handleInputChange("userName")}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        },
                    }}
                />

                <TextField
                    fullWidth
                    type="password"
                    label="输入密码"
                    value={formData.passWord}
                    onChange={handleInputChange("passWord")}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Key />
                                </InputAdornment>
                            ),
                        },
                    }}
                />

                <Button
                    onClick={handleSubmit}
                    color="primary"
                    variant="contained"
                >
                    登录
                </Button>
            </Container>
        </Card>
    );
}
