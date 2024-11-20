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
import java.util.List;
import java.util.Map;

@Path("/articles")  // /api/articles/*
public class ArticleHandler {

    @Inject  // 要求注入一个 ArticleRepository 实例
    private ArticleRepository articleRepository;

    @Inject  // 要求注入一个 CommentRepository 实例
    private CommentRepository commentRepository;

    @Inject  // 要求注入一个 UserRepository 实例
    private UserRepository userRepository;

    @GET  // 指定 HTTP GET 请求
    @Path("/page/{page}")  // /api/articles/page
    @Produces(MediaType.APPLICATION_JSON)  // 指定返回的数据类型是 JSON
    public Response getAllArticles(@PathParam("page") Integer page) {
        List<Article> articles = articleRepository.findAll();
        int begin = (page - 1) * 5;
        int end = Math.min(begin + 5, articles.size());
        Map<String, Object> res = new HashMap<>();
        res.put("code", Response.Status.OK);
        res.put("data", articles.subList(begin, end));
        res.put("totalPage", articles.size() / 5 + 1);
        return Response.status(Response.Status.OK).entity(res).build();
    }

    @GET  // 指定 HTTP GET 请求
    @Path("/{id}")  // /api/articles/{id}
    @Produces(MediaType.APPLICATION_JSON)  // 返回 JSON 格式的数据
    public Response getArticleById(@PathParam("id") Integer id) {
        Article article = articleRepository.findByID(id);
        Map<String, Object> res = new HashMap<>();
        res.put("code", Response.Status.OK);
        res.put("data", article);
        return Response.status(Response.Status.OK).entity(res).build();
    }

    @GET  // 指定 HTTP GET 请求
    @Path("/{id}/comments")  // /api/articles/{id}/comments
    @Produces(MediaType.APPLICATION_JSON)  // 返回 JSON 格式的数据
    public Response getComments(@PathParam("id") Integer id) {
        List<Comment> comments = commentRepository.findByArticleId(id);
        Map<String, Object> res = new HashMap<>();
        res.put("code", Response.Status.OK);
        res.put("data", comments);
        return Response.status(Response.Status.OK).entity(res).build();
    }

    @POST  // 指定 HTTP POST 请求
    @Path("/")  // /api/articles
    @Secured({"admin"})  // 限制只有真正的 admin 才可访问这个接口，毕竟只有管理员才能在自己的博客上发文章
    @Consumes(MediaType.APPLICATION_JSON)  // 接收 JSON 格式的数据
    @Produces(MediaType.APPLICATION_JSON)  // 返回 JSON 格式的数据
    public Response createArticle(Article article /* 接收的 JSON 实际上需要是一个 Article 的模型 */, @Context SecurityContext securityContext /* 从请求上下文中获得在 AuthenticationFilter 中的 SecurityContext */) {
        User author = userRepository.findByID(Integer.valueOf(securityContext.getUserPrincipal().getName()));  // 从 SecurityContext 中获得当前登录的用户
        article.setAuthor(author);  // 设置文章的作者
        article.setCreatedAt(System.currentTimeMillis() / 1000);  // 设置文章的创建时间
        articleRepository.create(article);  // 创建文章
        Map<String, Object> res = new HashMap<>();
        res.put("code", Response.Status.OK);
        return Response.status(Response.Status.OK).entity(res).build();
    }

    @PUT  // 指定 HTTP PUT 请求
    @Path("/")  // /api/articles
    @Secured({"admin"})  // 限制只有真正的 admin 才可访问这个接口，毕竟只有管理员才能在自己的博客上更新文章
    @Consumes(MediaType.APPLICATION_JSON)  // 接收 JSON 格式的数据
    @Produces(MediaType.APPLICATION_JSON)  // 返回 JSON 格式的数据
    public Response updateArticle(Article article /* 接收的 JSON 实际上需要是一个 Article 的模型 */, @Context SecurityContext securityContext /* 从请求上下文中获得在 AuthenticationFilter 中的 SecurityContext */) {
        article.setAuthorId(Integer.valueOf(securityContext.getUserPrincipal().getName()));  // 设置文章的作者
        articleRepository.update(article);  // 更新文章
        Map<String, Object> res = new HashMap<>();
        res.put("code", Response.Status.OK);
        return Response.status(Response.Status.OK).entity(res).build();
    }
}
