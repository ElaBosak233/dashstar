// 导航条组件

import { AppBar, Avatar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import { Home } from "@mui/icons-material";
import useAuthStore from "@/stores/auth.ts";
import { useNavigate } from "react-router-dom";

export default function NavigationBar() {
    const [ArticleTitle, setArticleTitle] = useState("11");
    const [openMenu, setOpenMenu] = useState(false);
    const token = useAuthStore((state) => state.token);
    const navigator = useNavigate();

    return (
        <>
            <AppBar>
                <Toolbar>
                    <IconButton onClick={()=>{navigator("/home")}}>
                        <Home />
                    </IconButton>
                    <Typography sx={{ flexGrow: 1 }}>
                        {ArticleTitle}
                    </Typography>
                    {token ? (
                        <>
                            <Box>
                                <Avatar onClick={() => {
                                    setOpenMenu(true);
                                }} />
                                <Menu open={openMenu} onClose={() => {
                                    setOpenMenu(false);
                                }}>
                                    <MenuItem></MenuItem>
                                </Menu>
                            </Box>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" onClick={() => {
                                navigator("/login");
                            }}> 登录</Button>
                            <Button color="inherit" onClick={() => {
                                navigator("/logon");
                            }}> 注册</Button>
                        </>
                    )
                    }
                </Toolbar>
            </AppBar>
            <Toolbar />
        </>
    );
}
