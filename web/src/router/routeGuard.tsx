// 路由守卫组件, 如果没有登录, 那么它会自动让你跳转到登录界面

import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "@/stores/auth.ts";

const RouteGuard: React.FC = () => {
    const navigator = useNavigate();
    const location = useLocation();
    const token = useAuthStore((state) => state.token);
    useEffect(() => {
        if (!token) {
            navigator("/login", { replace: true, state: location.pathname });
            return;
        }else{
            console.log("token是:");
            console.log(token)
        }
    }, [token, navigator, location]);
    return <><Outlet /></>;
};

export default RouteGuard;
