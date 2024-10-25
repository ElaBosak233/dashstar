package dev.e23.dashstar.handler;

import dev.e23.dashstar.model.User;
import dev.e23.dashstar.model.request.UserLoginRequest;
import dev.e23.dashstar.repository.UserRepository;
import dev.e23.dashstar.security.Secured;
import dev.e23.dashstar.util.BCryptUtil;
import dev.e23.dashstar.util.JwtUtil;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.testng.annotations.Test;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Path("/users")  // /api/users/*
public class UserHandler {

    @Inject  // 要求注入一个 UserRepository 实例（依赖于 UserRepository 中的 @ApplicationScoped 注解）
    private UserRepository userRepository;


    @GET  // 需要使用 HTTP GET 方法访问
    @Path("/")  // /api/users
    @Secured({"user", "admin"})  // 限制只有真正的 user 和 admin 才可访问这个接口
    @Produces(MediaType.APPLICATION_JSON)  // 返回 JSON 格式的数据
    public Response getAllUsers() {
        List<User> users = userRepository.findAll();
        Map<String, Object> res = new HashMap<>();
        res.put("code", Response.Status.OK);
        res.put("data", users);
        return Response.status(Response.Status.OK).entity(res).build();
    }

    @GET  // 需要使用 HTTP GET 方法访问
    @Path("/{id}")  // /api/users/{id}
    @Produces(MediaType.APPLICATION_JSON)
    public User getUserById(@PathParam("id") int id /* 从路由的 {id} 中获得 id */) {
        return userRepository.findByID(id);
    }

    @POST  // 需要使用 HTTP POST 方法访问
    @Path("/login")  // /api/users/login
    @Produces(MediaType.APPLICATION_JSON)  // 返回 JSON 格式的数据
    @Consumes(MediaType.APPLICATION_JSON)  // 接收 JSON 格式的数据
    public Response login(UserLoginRequest request /* 接收的 JSON 实际上需要是一个 UserLoginRequest 的模型 */) {
        /*
        * 这里补充说明一下上面使用到的 UserLoginRequest，我们管这种在业务层、控制层使用到的模型叫 DTO，数据传输对象，他们通常不会被用来存储进数据库。
        * 但是他们所提供的某些字段，会与其相关的模型有直接联系，比如我们这里的 UserLoginRequest 就是需要它的 username 和 password 字段，用于与数据库交互以及进行业务层校验。
        */
        User user = userRepository.findByUsername(request.getUsername());  // 根据用户名查找用户
        if (user == null) {  // 用户不存在
            Map<String, Object> res = new HashMap<>();
            res.put("code", Response.Status.BAD_REQUEST);
            return Response.status(Response.Status.BAD_REQUEST).entity(res).build();
        }
        if (!BCryptUtil.checkPassword(request.getPassword(), user.getPassword())) {  // 密码错误
            Map<String, Object> res = new HashMap<>();
            res.put("code", Response.Status.BAD_REQUEST);
            res.put("msg", "wrong");
            return Response.status(Response.Status.BAD_REQUEST).entity(res).build();
        }
        String token = JwtUtil.generateToken(user.getId());  // 生成 JWT，并且在 JWT 内部存储用户的 ID
        Map<String, Object> res = new HashMap<>();
        res.put("code", Response.Status.OK);
        res.put("token", token);
        res.put("data", user);
        return Response.status(Response.Status.OK).entity(res).build();
    }

    @POST  // 需要使用 HTTP POST 方法访问
    @Path("/register")  // /api/users/register
    @Produces(MediaType.APPLICATION_JSON)  // 返回 JSON 格式的数据
    @Consumes(MediaType.APPLICATION_JSON)  // 接收 JSON 格式的数据
    public Response register(User user /* 接收的 JSON 实际上需要是一个 User 模型 */) {
        user.setRole("user");  // 默认赋予 user 权限
        List<User> users = userRepository.findAll();
        if (users.isEmpty()) {
            user.setRole("admin");  // 当数据库中没有用户时，第一个注册的用户就是管理员
        }
        user.setPassword(BCryptUtil.hashPassword(user.getPassword()));  // 将提供的密码经过 BCrypt 加密后存储
        userRepository.create(user);
        Map<String, Object> res = new HashMap<>();
        res.put("code", Response.Status.CREATED);
        return Response.status(Response.Status.CREATED).entity(res).build();
    }
}
