// 注册界面

import { useState } from "react";
import { api } from "@/utils/axios.ts";
import { Button, Card, Container, InputAdornment, TextField, Typography } from "@mui/material";
import { AccountCircle, BadgeRounded, Key } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function LogOnPage() {
    const [formData, setFormData] = useState({
        userName: "",
        passWord: "",
        nickName: "",
    });
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
                console.log(r);
                if (r.code === "CREATED") {
                    alert("注册成功");
                    navigator("/");
                }
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
                <Typography> 注册界面</Typography>

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
                    label="输入你的昵称"
                    value={formData.nickName}
                    onChange={handleInputChange("nickName")}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <BadgeRounded />
                                </InputAdornment>
                            ),
                        },
                    }}
                    placeholder="可以为空"
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
                    注册
                </Button>
            </Container>
        </Card>
    );
}
