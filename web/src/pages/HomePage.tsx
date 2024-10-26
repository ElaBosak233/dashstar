import { useEffect, useState } from "react";
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
import useAuthStore from "@/stores/auth.ts";
import { api } from "@/utils/axios.ts";
import useSiteStore from "@/stores/site.ts";

export default function HomePage() {
    const authStore = useAuthStore();
    const siteStore = useSiteStore();
    const navigator = useNavigate();

    const [articles, setArticles] = useState<Array<Article>>();

    useEffect(() => {
        api().get("/articles").then(
            (res) => {
                const r = res.data;
                setArticles(r.data?.reverse());
            },
        );
    }, []);

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

                {authStore?.user?.role === "admin" && (
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={() => {
                            navigator("/articles/new");
                            siteStore.setCurrentTitle("新建文章");
                        }}
                        sx={{
                            borderRadius: 2,
                            px: 3,
                            py: 1,
                        }}
                    >
                        新建文章
                    </Button>
                )}
            </Stack>

            {/* 文章列表 */}
            <Paper elevation={2} sx={{ borderRadius: 2 }}>
                {!articles?.length ? (
                    <Box sx={{ p: 4, textAlign: "center" }}>
                        <Typography color="text.secondary" sx={{ mb: 2 }}>
                            还没有写过文章
                        </Typography>
                        <Button
                            variant="outlined"
                            startIcon={<Add />}
                            onClick={() => {
                                navigator("/articles/new");
                                siteStore.setCurrentTitle("新建文章");
                            }}
                        >
                            创建第一篇文章
                        </Button>
                    </Box>
                ) : (
                    <List sx={{ p: 0 }}>
                        {articles?.map((e: Article, index: number) => (
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
                                                    fullWidth
                                                    sx={{
                                                        textAlign: "left",
                                                        textTransform: "none",
                                                    }}
                                                    onClick={() => {
                                                        navigator(`/articles/${e.id}`);
                                                        siteStore.setCurrentTitle(e.title || "");
                                                    }}
                                                >
                                                    <ListItemText
                                                        primary={e.title}
                                                        primaryTypographyProps={{
                                                            variant: "h6",
                                                            color: "text.primary",
                                                        }}
                                                        secondary={new Date(Number(e.created_at) * 1000).toLocaleString()}
                                                    />
                                                </Button>


                                                {authStore?.user?.role === "admin" && (
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() => {
                                                            navigator(`/articles/${e.id}/edit`);
                                                            siteStore.setCurrentTitle("编辑");
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
                                                )}
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
