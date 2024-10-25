// 路由的配置文件.
// writeArticlePage , homePage,  showArticlePage 组件都添加了路由守卫, 防止退出登录后撤回到之前账号的显示和写的界面.

import { lazy } from "react";
import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";

// 使用懒加载提升性能.

const HomePage = lazy(() => import("@/pages/homePage"));
const LogInPage = lazy(() => import("@/pages/logInPage.tsx"));
const LogOnPage = lazy(() => import("@/pages/logOnPage.tsx"));
const ShowArticlePage = lazy(() => import("@/pages/showArticlePage"));
const WriteArticlePage = lazy(() => import("@/pages/writeArticlePage"));
const NotFoundPage = lazy(() => import("@/pages/notFoundPage"));
const Layout = lazy(() => import("@/layouts"));
const RouteGuard = lazy(() => import("./routeGuard.tsx"));
const routes: RouteObject[] = [
    {
        // 根路由是 layout 保证布局永远被用到.
        path: "/",
        element: <Layout />,
        children: [
            // 把 / 重定向到 /home, 保证默认页面是 /home
            {
                index: true,
                element: <Navigate to="/home" />,
            },
            {
                element: <RouteGuard />,
                children: [
                    {
                        path: "/home",
                        element: <HomePage />,
                    }, {
                        path: "/showArticle",
                        element: <ShowArticlePage />,
                    }, {
                        path: "/writeArticle",
                        element: <WriteArticlePage />,
                    },

                ],
            },
            {
                path: "/login",
                element: <LogInPage />,
            },
            {
                path: "/logon",
                element: <LogOnPage />,
            },
            {
                path: "*",
                element: <NotFoundPage />,
            },
        ],

    },
];
const router = createBrowserRouter(routes);

export default router;
