// 入口页面, 如果未登录, 可以在这个页面登录.
// 如果登陆成功可以看到登陆的账户写过的所有文章.
// 如果没写过文章可以点击创建文章跳转到 writeArticle 页面编辑并写一篇文章.
// 也可以在这里更新已经写过的文章, 按下文章右边的 铅笔按钮可以跳转到 wriArticle页面进行编辑, 然后发送并更新文章.

import useArticleStore from "@/stores/article.ts";
import { useEffect } from "react";
import { Box, Button, Divider, IconButton, List, ListItem } from "@mui/material";
import { Article } from "@/models/article.ts";
import { Create, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const articleStore = useArticleStore();
    const navigator = useNavigate();
    useEffect(() => {
        articleStore.fetchArticles();
        console.log(articleStore.articles);

    }, []);


    return (
        <>
            <Button onClick={()=>{
                navigator("/articles/new")
            }}>
                新建文章
            </Button>
                <List>
                    {
                        articleStore.articles?.map((e: Article) => {
                            return (
                                <ListItem key={e.id}>
                                    <Box>
                                        <Button onClick={() => {
                                            navigator(`/articles/${e.id}`);
                                        }}
                                        variant="outlined"
                                        >
                                            {e.title}
                                        </Button>
                                        <IconButton onClick={()=>{
                                            navigator(`/articles/${e.id}/edit`)
                                        }}>
                                            <Create />
                                        </IconButton>
                                        <IconButton>
                                            <Delete />
                                        </IconButton>
                                    </Box>
                                        <Divider  />
                                </ListItem>
                            );
                        })
                    }
                </List>
        </>
    );
}
