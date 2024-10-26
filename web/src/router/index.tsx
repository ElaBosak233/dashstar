// 路由的配置文件.
// writeArticlePage , homePage,  showArticlePage 组件都添加了路由守卫, 防止退出登录后撤回到之前账号的显示和写的界面.
import { createBrowserRouter, RouteObject } from "react-router-dom";
import ShowArticlePage from "@/pages/ShowArticlePage.tsx";

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
                path: "/articles/:id",
                element: <ShowArticlePage />,
            }, {
                path: "/articles/:id/edit",
                lazy: async () => {
                    const EditArticle = await import("@/pages/EditArticlePage.tsx");
                    return { Component: EditArticle.default };
                },
            }, {
                path: "/articles/new",
                lazy: async () => {
                    const CreateArticle = await import("@/pages/CreateArticlePage");
                    return { Component: CreateArticle.default };
                },
            },
            {
                path: "/login",
                lazy: async () => {
                    const LoginPage = await import("@/pages/LogInPage");
                    return { Component: LoginPage.default };
                },
            },
            {
                path: "/register",
                lazy: async () => {
                    const RegisterPage = await import("@/pages/RegisterPage.tsx");
                    return { Component: RegisterPage.default };
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
