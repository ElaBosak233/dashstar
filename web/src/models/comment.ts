// 评论的类型. 包含:
// 1. 用户id => author_id, 表明这条评论是由谁发出的
// 2. 文章id => article_id, 表明这条评论是评论了那篇文章
// 3. 创建时间=> created_id, 评论的时间
// 4. 评论内容=> content

import { User } from "@/models/user.ts";

export interface Comment {
    user_id?: number;
    article_id?: number;
    created_at?: number;
    content?: string
    user?:User
}
