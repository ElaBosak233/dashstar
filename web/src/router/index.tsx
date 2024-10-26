// 路由的配置文件.
// writeArticlePage , homePage,  showArticlePage 组件都添加了路由守卫, 防止退出登录后撤回到之前账号的显示和写的界面.
import { createBrowserRouter, RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
    {
        // 根路由是 layout 保证布局永远被用到.
        path: "/",
        lazy: async () => {
            const Layout = await import("@/layouts");
            return { Component: Layout.default };
        },
        children: [
            {
                index: true,
                lazy: async () => {
                    const Home = await import("@/pages/HomePage");
                    return { Component: Home.default };
                },
            },
            {
                lazy: async () => {
                    const RouteGuard = await import("./routeGuard");
                    return { Component: RouteGuard.default };
                },
                children: [
                    {
                        path: "/articles/:id",
                        lazy: async () => {
                            const ShowArticle = await import("@/pages/ShowArticlePage");
                            return { Component: ShowArticle.default };
                        },
                    }, {
                        path: "/articles/:id/edit",
                        lazy: async () => {
                            const EditArticle = await import("@/pages/EditArticle.tsx");
                            return { Component: EditArticle.default };
                        },
                    }, {
                        path: "/articles/new",
                        lazy: async () => {
                            const CreateArticle = await import("@/pages/CreateArticle.tsx");
                            return { Component: CreateArticle.default };
                        },
                    },
                ],
            },
            {
                path: "/login",
                lazy: async () => {
                    const LoginPage = await import("@/pages/LogInPage");
                    return { Component: LoginPage.default };
                },
            },
            {
                path: "/logon",
                lazy: async () => {
                    const LogonPage = await import("@/pages/LogOnPage");
                    return { Component: LogonPage.default };
                },
            },
            {
                path: "*",
                lazy: async () => {
                    const NotFoundPage = await import("@/pages/NotFoundPage");
                    return { Component: NotFoundPage.default };
                },
            },
        ],

    },
];
const router = createBrowserRouter(routes);

export default router;
