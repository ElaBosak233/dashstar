package dev.e23.dashstar.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;

@Data
@Entity
@Table(name = "articles")  // 表示这个实体类对应的数据库表名是 articles
public class Article implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @ManyToOne(fetch = FetchType.EAGER)  // 表示这个字段是多对一的关系，即一篇文章只能属于一个用户
    @JoinColumn(name = "author_id")  // 表示这个字段对应的数据库表中的列名是 author_id
    private User author;  // 表示这个字段对应的实体类是 User，实际上存储进数据库的是 User 的 id

    @Column(name = "author_id", insertable = false, updatable = false)
    @JsonProperty("author_id")  // 表示这个字段在 JSON 序列化时，字段名是 author_id（不然就会是 authorId）
    private Integer authorId;

    @Column(name = "created_at")
    @JsonProperty("created_at")  // 表示这个字段在 JSON 序列化时，字段名是 created_at（不然就会是 createdAt）
    private Long createdAt;

    @Column(name = "label")
    private String label;
}
