// 持久化存储文章数据

import { Article } from "@/models/article.ts";
import { create } from "zustand";
import { api } from "@/utils/axios.ts";


interface ArticleState {
    articles?: Array<Article>;
    currentTitle?: string;
    fetchArticles: () => void;
    setCurrentTitle: (title: string) => void;
}


const useArticleStore = create<ArticleState>()(
    (set, _get) => ({
        fetchArticles: async () => {
            api().get("/articles").then(
                (res) => {
                    set({ articles: res.data.data });
                },
            );
        },
        setCurrentTitle: (title: string) => {
            set({ currentTitle: title });
        },
    }),
);

export default useArticleStore;
