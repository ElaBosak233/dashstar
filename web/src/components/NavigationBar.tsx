import {
    AppBar,
    Button,
    IconButton,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { AccountCircle, Home, Brightness4, Brightness7 } from "@mui/icons-material";
import useAuthStore from "@/stores/auth.ts";
import { useNavigate } from "react-router-dom";
import useArticleStore from "@/stores/article.ts";
import React, { createContext, useContext, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

// 创建 ThemeContext
const ThemeContext = createContext({
    toggleTheme: () => {},
    isDarkMode: false,
});

// 创建自定义 hook 来访问主题上下文
export const useThemeContext = () => useContext(ThemeContext);

// 主题切换上下文组件
export const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const theme = useMemo(() => createTheme({
        palette: {
            mode: isDarkMode ? "dark" : "light",
        },
    }), [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    return (
        <ThemeContext.Provider value={{ toggleTheme, isDarkMode }}>
            <ThemeProvider theme={theme}>
                <CssBaseline /> {/* 确保 MUI 的样式全局生效 */}
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};


export default function NavigationBar() {
    const [articleTitle, setArticleTitle] = useState<string>();
    const authStore = useAuthStore();
    const token = useAuthStore((state) => state.token);
    const navigator = useNavigate();
    const articleStore = useArticleStore();
    const { toggleTheme, isDarkMode } = useThemeContext();  // 使用上下文

    useEffect(() => {
        setArticleTitle(articleStore?.currentTitle);
        console.log(articleTitle);
    }, [articleStore.currentTitle]);

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
                        justifyContent: "space-between",
                        paddingX: 2,
                    }}
                >
                    {/* 首页按钮 */}
                    <IconButton
                        onClick={() => {
                            navigator("/");
                            articleStore.setCurrentTitle("首页");
                        }}
                        color="inherit"
                        sx={{
                            marginRight: 2,
                        }}
                    >
                        <Home />
                    </IconButton>

                    {/* 文章标题 */}
                    <Typography
                        variant="h6"
                        color="inherit"
                        sx={{
                            flexGrow: 1,
                            textAlign: "center",
                            fontWeight: 500,
                        }}
                    >
                        {articleTitle}
                    </Typography>

                    {/* 明暗模式切换按钮 */}
                    <Tooltip title="Toggle light/dark theme">
                        <IconButton onClick={toggleTheme} color="inherit">
                            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
                        </IconButton>
                    </Tooltip>

                    {/* 用户操作区 */}
                    {token ? (
                        <>
                            <Tooltip title="Logout">
                                <IconButton
                                    onClick={() => {
                                        authStore.logout();
                                    }}
                                    color="inherit"
                                    sx={{
                                        marginLeft: 2,
                                    }}
                                >
                                    <AccountCircle />
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
                </Toolbar>
            </AppBar>

            <Toolbar />
        </>
    );
}
