// 整体布局, 导航条和页脚或者侧边栏可以放在这里. 为了简化流程, 这里只放导航条

import NavigationBar from "@/components/NavigationBar.tsx";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";

export default function Layout(){
    return (
        <>
            <NavigationBar />
            <Container>

            <Outlet />
            </Container>
        </>
    )
}
