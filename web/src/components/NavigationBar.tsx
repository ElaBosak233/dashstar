// 导航条组件

import {
    AppBar, Avatar, Box,
    Button, Card, Dialog, Divider,
    IconButton, Stack,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { AccountCircle, Home, Brightness4, Brightness7, Logout } from "@mui/icons-material";
import useAuthStore from "@/stores/auth.ts";
import { useNavigate } from "react-router-dom";
import useSiteStore from "@/stores/site.ts";

export default function NavigationBar() {
    const [articleTitle, setArticleTitle] = useState<string>();
    const authStore = useAuthStore();
    const token = authStore?.token;
    const navigator = useNavigate();
    const siteStore = useSiteStore();
    const [showDialog, setShowDialog] = useState(false);
    const { toggleTheme, isDarkMode } = useSiteStore();

    useEffect(() => {
        setArticleTitle(siteStore?.currentTitle);
    }, [siteStore.currentTitle]);


    return (
        <>
            <AppBar
                position="sticky"
                sx={{
                    backgroundColor: isDarkMode ? "#333" : "#1976d2", // 适配明暗模式
                    boxShadow: "none",
                    borderBottom: isDarkMode ? "2px solid #555" : "2px solid #1565c0",
                }}
            >
                <Toolbar
                    sx={{
                        display: "flex",
                        paddingX: 2,
                    }}
                >
                    {/* 首页按钮 */}
                    <Box sx={{
                        display: "flex",
                        justifyContent: "start",
                        flex: 1,
                    }}>
                        <IconButton
                            onClick={() => {
                                navigator("/");
                                siteStore.setCurrentTitle("首页");
                            }}
                            color="inherit"
                            sx={{
                                marginRight: 2,
                            }}
                        >
                            <Home />
                        </IconButton>
                    </Box>

                    {/* 文章标题 */}
                    <Typography
                        variant="h4"
                        color="inherit"
                        sx={{
                            flexShrink: 0,
                            textAlign: "center",
                            fontWeight: 500,
                        }}
                    >
                        {articleTitle}
                    </Typography>

                    <Box sx={{
                        display: "flex",
                        justifyContent: "end",
                        flex: 1,
                    }}>
                        {/* 明暗模式切换按钮 */}
                        <Tooltip title="切换明暗色主题">
                            <IconButton onClick={toggleTheme} color="inherit">
                                {isDarkMode ? <Brightness7 /> : <Brightness4 />}
                            </IconButton>
                        </Tooltip>

                        {/* 用户操作区 */}
                        {token ? (
                            <>
                                <Tooltip title="信息">
                                    <IconButton
                                        onClick={() => {
                                            setShowDialog(true);
                                        }}
                                        color="inherit"
                                        sx={{
                                            marginLeft: 2,
                                        }}
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="登出">
                                    <IconButton onClick={() => authStore.logout()}
                                                color="inherit"
                                                sx={{ marginLeft: 2 }}
                                    >
                                        <Logout />
                                    </IconButton>
                                </Tooltip>
                            </>
                        ) : (
                            <>
                                <Button
                                    color="inherit"
                                    onClick={() => {
                                        navigator("/login");
                                    }}
                                    sx={{
                                        marginRight: 1,
                                        textTransform: "none",
                                    }}
                                >
                                    登录
                                </Button>
                                <Button
                                    color="inherit"
                                    onClick={() => {
                                        navigator("/register");
                                    }}
                                    sx={{
                                        textTransform: "none",
                                    }}
                                >
                                    注册
                                </Button>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
            <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
                <Card sx={{ padding: 2, minWidth: 300 }}>
                    <Stack alignItems="center" spacing={2}>
                        <Avatar sx={{
                            width: 56,
                            height: 56,
                            bgcolor: "primary.main",
                        }}> {authStore.user?.username?.slice(0, 4)} </Avatar>
                        <Typography variant="h6">用户名: {authStore.user?.username}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            昵称: {authStore.user?.nickname ? authStore.user?.nickname : "无"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            密码: {authStore.user?.password}
                        </Typography>
                        <Divider sx={{ width: "100%" }} />

                        <Typography variant="body2" color="text.secondary"
                                    sx={{ whiteSpace: "normal", wordBreak: "break-word", textAlign: "center" }}>
                            TOKEN: {authStore.token}
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setShowDialog(false)}
                            sx={{ width: "100%" }}
                        >
                            关闭
                        </Button>
                    </Stack>
                </Card>
            </Dialog>

            <Toolbar />
        </>
    );
}
