package dev.e23.dashstar.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Date;

public class JwtUtil {

    private static final String SECRET_KEY = "20101010201010102010101020101010";  // 32 位密钥
    private static final Key key = new SecretKeySpec(SECRET_KEY.getBytes(), SignatureAlgorithm.HS256.getJcaName());

    /**
     * 生成 token
     * @param userId 要生成 token 的用户 id
     * @return 生成的 token
     */
    public static String generateToken(Integer userId) {
        long expirationTimeMillis = 1000 * 60 * 60 * 2;  // 2 小时
        Date expirationDate = new Date(System.currentTimeMillis() + expirationTimeMillis);

        return Jwts.builder().setSubject(userId.toString()).signWith(key).setExpiration(expirationDate).compact();
    }

    /**
     * 验证 token 是否有效
     * @param token 要验证的 token
     * @return token 的 subject，即用户 id
     */
    public static String validateToken(String token) throws MalformedJwtException {
        Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
        return claims.getSubject();
    }

}
