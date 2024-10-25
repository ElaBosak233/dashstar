// 持久化存储文章数据

import { Article } from "@/models/article.ts";
import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";
import { api } from "@/utils/axios.ts";


interface articleState {
    Article?: Array<Article>;
    setAllArticle: () => void;
}


const useArticleStore = create<articleState>()(
    persist(
        (set, get) => ({
            setAllArticle: async () => {
                api().get("/articles").then(
                    (res) => {
                        set({ Article: res.data.data });
                    },
                );
            },

        }), {
            name: "article_store",
            storage: createJSONStorage(() => localStorage),
        },
    ),
);

export default useArticleStore;
