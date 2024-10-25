// 文章的类型, 包括:
// author_id => 作者的索引(id)
// content => 文章内容
// created_at => 创建时间
// title => 文章标题

export interface Article {
    author_id: number;
    content: string;
    created_at: number;
    title: string;
}
