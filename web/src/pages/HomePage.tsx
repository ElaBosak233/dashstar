import useArticleStore from "@/stores/article.ts";
import { useEffect } from "react";
import {
    Box,
    Button,
    IconButton,
    List,
    ListItem,
    Container,
    Typography,
    Paper,
    Divider,
    ListItemText,
    Card,
    CardContent,
    Stack,
} from "@mui/material";
import { Article } from "@/models/article.ts";
import { Create, Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const articleStore = useArticleStore();
    const navigator = useNavigate();

    useEffect(() => {
        articleStore.fetchArticles();
        console.log(articleStore.articles);
    }, []);

    const hasArticles = articleStore.articles && articleStore.articles.length > 0;

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            {/* 页面标题和新建按钮 */}
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 4 }}
            >
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    sx={{
                        fontWeight: 600,
                        mb: 4,
                        color: "primary.main",
                    }}>
                    我的文章
                </Typography>

                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => {
                        navigator("/articles/new");
                        articleStore.setCurrentTitle("新建文章");
                    }}
                    sx={{
                        borderRadius: 2,
                        px: 3,
                        py: 1,
                    }}
                >
                    新建文章
                </Button>
            </Stack>

            {/* 文章列表 */}
            <Paper elevation={2} sx={{ borderRadius: 2 }}>
                {!hasArticles ? (
                    <Box sx={{ p: 4, textAlign: "center" }}>
                        <Typography color="text.secondary" sx={{ mb: 2 }}>
                            还没有写过文章
                        </Typography>
                        <Button
                            variant="outlined"
                            startIcon={<Add />}
                            onClick={() => {
                                navigator("/articles/new");
                                articleStore.setCurrentTitle("新建文章");
                            }}
                        >
                            创建第一篇文章
                        </Button>
                    </Box>
                ) : (
                    <List sx={{ p: 0 }}>
                        {articleStore.articles?.map((e: Article, index: number) => (
                            <Box key={e.id}>
                                {index > 0 && <Divider />}
                                <ListItem
                                    sx={{
                                        "&:hover": {
                                            bgcolor: "action.hover",
                                        },
                                    }}
                                >
                                    <Card
                                        elevation={0}
                                        sx={{
                                            width: "100%",
                                            bgcolor: "transparent",
                                        }}
                                    >
                                        <CardContent sx={{ p: 2 }}>
                                            <Stack
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                            >
                                                <Button
                                                    onClick={() => {
                                                        navigator(`/articles/${e.id}`);
                                                        articleStore.setCurrentTitle(e.title || "");
                                                    }}
                                                    sx={{
                                                        textAlign: "left",
                                                        textTransform: "none",
                                                    }}
                                                >
                                                    <ListItemText
                                                        primary={e.title}
                                                        primaryTypographyProps={{
                                                            variant: "h6",
                                                            color: "text.primary",
                                                        }}
                                                    />
                                                </Button>

                                                <IconButton
                                                    color="primary"
                                                    onClick={() => {
                                                        navigator(`/articles/${e.id}/edit`);
                                                        articleStore.setCurrentTitle("编辑");
                                                    }}
                                                    sx={{
                                                        ml: 2,
                                                        "&:hover": {
                                                            bgcolor: "primary.light",
                                                            color: "primary.contrastText",
                                                        },
                                                    }}
                                                >
                                                    <Create />
                                                </IconButton>
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                </ListItem>
                            </Box>
                        ))}
                    </List>
                )}
            </Paper>
        </Container>
    );
}
