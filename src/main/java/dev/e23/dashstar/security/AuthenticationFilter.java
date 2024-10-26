package dev.e23.dashstar.security;

import dev.e23.dashstar.model.User;
import dev.e23.dashstar.repository.UserRepository;
import dev.e23.dashstar.util.JwtUtil;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.annotation.Priority;
import jakarta.inject.Inject;
import jakarta.ws.rs.NotAuthorizedException;
import jakarta.ws.rs.Priorities;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.container.ResourceInfo;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;
import jakarta.ws.rs.ext.Provider;

import java.io.IOException;
import java.lang.reflect.AnnotatedElement;
import java.lang.reflect.Method;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.logging.Logger;
import java.util.logging.Level;

@Secured
@Provider
@Priority(Priorities.AUTHENTICATION)
public class AuthenticationFilter implements ContainerRequestFilter {

    private static final Logger LOGGER = Logger.getLogger(AuthenticationFilter.class.getName());

    @Context
    private ResourceInfo resourceInfo;

    @Inject
    private UserRepository userRepository;

    @Override
    public void filter(ContainerRequestContext containerRequestContext) throws IOException {
        Method resourceMethod = resourceInfo.getResourceMethod();  // 获取当前请求的资源方法
        List<String> methodRoles = extractRoles(resourceMethod);

        String authorizationHeader = containerRequestContext.getHeaderString(HttpHeaders.AUTHORIZATION);

        // 我们规定，JWT 必须放在请求头 Authorization 中，并且必须以 Bearer 开头
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            throw new NotAuthorizedException("invalid_authorization_header");
        }

        String token = authorizationHeader.substring("Bearer ".length()).trim();
        Integer id = null;

        try {
            id = Integer.valueOf(JwtUtil.validateToken(token));
        } catch (Exception e) {
            containerRequestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED).build());
            return;
        }

        final String finalID = id.toString();
        containerRequestContext.setSecurityContext(new SecurityContext() {
            @Override
            public Principal getUserPrincipal() {
                return () -> finalID;  // 给 SecurityContext 设置用户 ID，后续有需要使用到 SecurityContext 的地方，就可以通过 getUserPrincipal() 方法获取到用户 ID
            }

            @Override
            public boolean isUserInRole(String s) {
                return false;
            }

            @Override
            public boolean isSecure() {
                return false;
            }

            @Override
            public String getAuthenticationScheme() {
                return "";
            }
        });

        User user = userRepository.findByID(id);
        for (String role : methodRoles) {  // 检查用户角色是否满足要求
            if (user.getRole().equals(role)) {
                return;
            }
        }
        // 如果用户角色不满足要求，就返回 403 Forbidden
        containerRequestContext.abortWith(Response.status(Response.Status.FORBIDDEN).build());
    }

    private List<String> extractRoles(AnnotatedElement annotatedElement) {
        if (annotatedElement == null) {
            return new ArrayList<>();
        } else {
            Secured secured = annotatedElement.getAnnotation(Secured.class);  // 获取注解 Secured
            if (secured == null) {
                return new ArrayList<>();
            } else {
                String[] allowedRoles = secured.value();  // 获取注解 Secured 中的 value 属性，这个属性是一个字符串数组，表示允许访问的角色
                return Arrays.asList(allowedRoles);
            }
        }
    }
}
