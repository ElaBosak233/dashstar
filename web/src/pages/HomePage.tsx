import React, { useEffect, useState } from "react";
import {
    Autocomplete,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Pagination,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { Article } from "@/models/article.ts";
import { Add, Create } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/stores/auth.ts";
import { api } from "@/utils/axios.ts";
import useSiteStore from "@/stores/site.ts";
import { MD5 } from "crypto-js";

export default function HomePage() {
    const authStore = useAuthStore();
    const siteStore = useSiteStore();
    const navigator = useNavigate();

    const [users, setUsers] = useState<Array<string>>([]);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [articles, setArticles] = useState<Array<Article>>([]);
    const [curPage, setCurPage] = useState<number>(1);
    const [allLabel, setAllLabel] = useState<Array<string>>([]);
    const [selectLabel, setSelectLabel] = useState<Array<string>>([]);

    // 加载文章数据
    useEffect(() => {
        api()
            .get(`/articles/page/${curPage}`)
            .then((res) => {
                const r = res.data;
                setArticles(r.data?.reverse() || []);
                setTotalPage(r.totalPage || 1);

                // 提取标签和作者信息
                const labels = Array.from(
                    new Set(r.data.map((item: Article) => item.label))
                );
                setAllLabel(labels);

                const userName = r.data
                    .map((item: Article) => item.author?.username || "匿名")
                    .reverse();
                setUsers(userName);

                // 仅在首次加载时设置初始标签
                if (selectLabel.length === 0) {
                    setSelectLabel(labels);
                }
            });
    }, [curPage]);

    // 动态颜色生成
    function getColor(label: string) {
        return "#" + MD5(label).toString().slice(0, 6);
    }

    // 分页变化
    function handlePageChange(_e: React.ChangeEvent<unknown>, value: number) {
        setCurPage(value);
    }

    // 搜索框
    function SearchBox() {
        function handleSearchChange(
            _e: React.ChangeEvent<unknown>,
            value: Array<string>
        ) {
            setSelectLabel(value);
        }

        return (
            <Autocomplete
                color={"primary"}
                sx={{ width: 300 }}
                multiple
                options={allLabel}
                getOptionLabel={(option) => option}
                filterSelectedOptions
                onChange={handleSearchChange}
                value={selectLabel}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="筛选标签"
                        placeholder="选择标签"
                    />
                )}
            />
        );
    }

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
                    }}
                >
                    所有文章
                </Typography>

                <SearchBox />

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
                    disabled={authStore?.user?.role !== "admin"}
                >
                    新建文章
                </Button>
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
                        {articles.map((e: Article, index: number) => (
                            <Box key={e.id}>
                                {index > 0 && <Divider />}
                                {selectLabel.includes(e.label || "") && (
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
                                                            textTransform:
                                                                "none",
                                                        }}
                                                        onClick={() => {
                                                            navigator(
                                                                `/articles/${e.id}`
                                                            );
                                                            siteStore.setCurrentTitle(
                                                                e.title || ""
                                                            );
                                                        }}
                                                    >
                                                        <ListItemText
                                                            primary={e.title}
                                                            primaryTypographyProps={{
                                                                variant: "h6",
                                                                color: "text.primary",
                                                            }}
                                                            secondary={new Date(
                                                                Number(
                                                                    e.created_at
                                                                ) * 1000
                                                            ).toLocaleString()}
                                                        />
                                                        <ListItemText
                                                            secondary={`Write BY: ${users[index] || "匿名"}`}
                                                        />
                                                        <Chip
                                                            label={e.label}
                                                            sx={{
                                                                bgcolor:
                                                                    getColor(
                                                                        e.label ||
                                                                            ""
                                                                    ),
                                                            }}
                                                        />
                                                    </Button>

                                                    <IconButton
                                                        color="primary"
                                                        onClick={() => {
                                                            navigator(
                                                                `/articles/${e.id}/edit`
                                                            );
                                                            siteStore.setCurrentTitle(
                                                                "编辑"
                                                            );
                                                        }}
                                                        sx={{
                                                            ml: 2,
                                                            "&:hover": {
                                                                bgcolor:
                                                                    "primary.light",
                                                                color: "primary.contrastText",
                                                            },
                                                        }}
                                                        disabled={
                                                            authStore?.user
                                                                ?.role !==
                                                            "admin"
                                                        }
                                                    >
                                                        <Create />
                                                    </IconButton>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    </ListItem>
                                )}
                            </Box>
                        ))}
                    </List>
                )}

                {/* 分页控件 */}
                {totalPage > 1 && (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Pagination
                            count={totalPage}
                            onChange={handlePageChange}
                            page={curPage}
                            color="primary"
                            size="large"
                            sx={{ my: 2 }}
                        />
                    </Box>
                )}
            </Paper>
        </Container>
    );
}
