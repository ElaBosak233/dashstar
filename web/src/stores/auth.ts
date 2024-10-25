// 持久化存储用户的登录状态, 如果登录, 就设置 token. token可以用于后续的一系列操作, 例如获取文章, 获取评论, 新建文章等等.

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { TypeUser } from "../models/typeUser.ts";

interface authState {
    user?: TypeUser;
    token?: string;
    setToken: (token: string) => void;
    setUser: (user: TypeUser) => void;
    logout: () => void;
}

const useAuthStore = create<authState>()(
    persist(
        (set) => ({
            setToken: (token: string) => {
                set({ token: token });
            },
            setUser: (user: TypeUser) => {
                set({ user: user });
            },
            logout: () => {
                set({
                    user: undefined,
                    token: undefined,
                });
                localStorage.removeItem("auth_state")
            },
        }),
        {
            name: "auth_state",
            storage: createJSONStorage(() => localStorage),
        },
    ),
);

export default useAuthStore;
