// 从 index 跳转而来, 显示所有文章, 评论. 可以在这里看写过的文章, 编辑评论


import { useParams } from "react-router-dom";
import useArticleStore from "@/stores/article";
import { useEffect, useState } from "react";
import MarkdownRenderer from "@/components/MarkdownRender.tsx";

export default function ShowArticlePage() {
    const { id } = useParams<{id:string}>()
    const articleStore = useArticleStore()
    const[ content, setContent] = useState<string>()
    useEffect(() => {
        setContent(articleStore.articles?.find((item) => item.id === Number(id))?.content);
    }, []);
   return(
        <>

            <MarkdownRenderer content={content}></MarkdownRenderer>
            {
                content
            }

        </>
   )
}