// 用户的类型包含:
// 1. id => 用户的索引
// 2. username => 用户名
// 3. password => 密码
// 4. nickname => 昵称
export interface User {
    id?: number;
    username?: string;
    nickname?: string;
    password?: string;
    role?: string;
}
