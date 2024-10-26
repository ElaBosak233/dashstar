// 在这里可以编辑文章 => 可以用于新建一个文章, 也可以更新已有的文章. 由一个布尔值判断用来新建还是更新


import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useArticleStore from "@/stores/article.ts";
import { Button, TextField, Typography } from "@mui/material";
import article from "@/stores/article.ts";
import { api } from "@/utils/axios.ts";


export default function EditArticle() {
    const { isUpdate, id } = useParams<{ isUpdate: string, id: string }>();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const articleStore = useArticleStore();

    useEffect(() => {
        const article = articleStore.articles?.find((item) =>
            item.id === Number(id));
        setTitle(article.title || "");
        setContent(article.content || "");

    }, []);

    function handleSubmit() {
        // api().put("api/articles/")
    }

    return (
        <>
            <Typography>修改文章</Typography>
            <TextField defaultValue={title} onChange={(e) => setTitle(e.target.value)}></TextField>
            <TextField defaultValue={content} onChange={(e) => setContent(e.target.value)}></TextField>
            <Button onClick={handleSubmit}>提交</Button>
        </>
    );
}

