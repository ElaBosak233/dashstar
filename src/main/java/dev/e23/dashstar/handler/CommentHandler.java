package dev.e23.dashstar.handler;

import dev.e23.dashstar.model.Article;
import dev.e23.dashstar.model.Comment;
import dev.e23.dashstar.model.User;
import dev.e23.dashstar.repository.ArticleRepository;
import dev.e23.dashstar.repository.CommentRepository;
import dev.e23.dashstar.repository.UserRepository;
import dev.e23.dashstar.security.Secured;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;

import java.util.HashMap;
import java.util.Map;

@Path("/comments")  // /api/comments/*
public class CommentHandler {

    @Inject  // 要求注入一个 CommentRepository 实例
    private CommentRepository commentRepository;

    @Inject  // 要求注入一个 UserRepository 实例
    private UserRepository userRepository;

    @Inject  // 要求注入一个 ArticleRepository 实例
    private ArticleRepository articleRepository;

    @POST  // 指定 HTTP POST 请求
    @Path("/")  // /api/comments
    @Secured({"user", "admin"})  // 限制只有真正的 user 和 admin 才可访问这个接口，只有经过认证的用户才能发评论，不然乱套了
    @Consumes(MediaType.APPLICATION_JSON)  // 指定请求体的媒体类型为 JSON
    @Produces(MediaType.APPLICATION_JSON)  // 接收 JSON 格式的数据
    public Response createComment(Comment comment /* 接收的 JSON 实际上需要是一个 Comment 的模型 */, @Context SecurityContext securityContext /* 从请求上下文中获得在 AuthenticationFilter 中的 SecurityContext */) {
        User user = userRepository.findByID(Integer.valueOf(securityContext.getUserPrincipal().getName()));  // 从 SecurityContext 中获得当前登录的用户
        comment.setUser(user);  // 设置评论的用户
        Article article = articleRepository.findByID(comment.getArticleId());  // 根据评论中的文章 ID 获得文章
        comment.setArticle(article);  // 设置评论的文章
        comment.setCreatedAt(System.currentTimeMillis() / 1000);  // 设置评论的创建时间（Unix 时间戳）
        commentRepository.create(comment);  // 创建评论
        Map<String, Object> res = new HashMap<>();
        res.put("code", Response.Status.OK);
        return Response.status(Response.Status.OK).entity(res).build();
    }

    // 附加题：删除评论
    // 调用 DAO 层的方法即可
    @DELETE
    @Path("/{id}") // /api/comments/{id}
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteComment(@PathParam("id") Integer id) {
        commentRepository.delete(id);
        Map<String, Object> res = new HashMap<>();
        res.put("code", Response.Status.OK);
        return Response.status(Response.Status.OK).entity(res).build();
    }
}
