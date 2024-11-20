// 文章的类型, 包括:
// author_id => 作者的索引(id)
// content => 文章内容
// created_at => 创建时间
// title => 文章标题

// 附加题：文章分类
// 添加一个标签属性用于文章分类

import { User } from "@/models/user.ts";

export interface Article {
    id?: number;
    author_id?: number;
    content?: string;
    created_at?: number;
    title?: string;
    author?: User;
    label?: string;
}
