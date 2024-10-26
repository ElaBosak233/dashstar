// 持久化存储用户的登录状态, 如果登录, 就设置 token. token可以用于后续的一系列操作, 例如获取文章, 获取评论, 新建文章等等.

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { User } from "../models/user.ts";

interface AuthState {
    user?: User;
    token?: string;
    setToken: (token: string) => void;
    setUser: (user: User) => void;
    logout: () => void;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            setToken: (token: string) => {
                set({ token: token });
            },
            setUser: (user: User) => {
                set({ user: user });
            },
            logout: () => {
                set({
                    user: undefined,
                    token: undefined,
                });
            },
        }),
        {
            name: "auth_store",
            storage: createJSONStorage(() => localStorage),
        },
    ),
);

export default useAuthStore;
