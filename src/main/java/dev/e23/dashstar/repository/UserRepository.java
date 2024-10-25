package dev.e23.dashstar.repository;

import dev.e23.dashstar.model.User;
import dev.e23.dashstar.util.HibernateUtil;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceException;
import org.testng.annotations.Test;


import java.util.List;

@ApplicationScoped  // 声明这是一个应用范围的 Bean，需要的地方可以使用 @Inject 注入
public class UserRepository {

    public List<User> findAll() throws PersistenceException {
        EntityManager em = HibernateUtil.getEntityManager();
        List<User> users = null;
        try {
            em.getTransaction().begin();  // 开始事务
            users = em
                    .createQuery("SELECT u FROM User u", User.class)
                    .getResultList();  // 查询所有用户
            em.getTransaction().commit();  // 提交事务
        } catch (PersistenceException e) {
            em.getTransaction().rollback();  // 当出了异常时回滚事务
            throw new RuntimeException("", e);
        } finally {
            em.close();  // 关闭 EntityManager
        }
        return users;
    }


    public User findByID(Integer id) throws PersistenceException {
        EntityManager em = HibernateUtil.getEntityManager();
        User user = null;
        try {
            em.getTransaction().begin();  // 开始事务
            user = em
                    .createQuery("SELECT u FROM User u WHERE u.id = :id", User.class)
                    .setParameter("id", id)
                    .getSingleResult();  // 查询指定 ID 的用户
            em.getTransaction().commit();  // 提交事务
        } catch (PersistenceException e) {
            em.getTransaction().rollback();  // 当出了异常时回滚事务
            throw new RuntimeException("user_not_found", e);
        } finally {
            em.close();  // 关闭 EntityManager
        }
        return user;
    }

    public User findByUsername(String username) throws PersistenceException {
        EntityManager em = HibernateUtil.getEntityManager();
        User user = null;
        try {
            em.getTransaction().begin();  // 开始事务
            user = em
                    .createQuery("SELECT u FROM User u WHERE u.username = :username", User.class)
                    .setParameter("username", username)
                    .getSingleResult();  // 查询指定 username 的用户
            em.getTransaction().commit();
        } catch (PersistenceException e) {
            em.getTransaction().rollback();  // 当出了异常时回滚事务
            throw new RuntimeException("user_not_found", e);
        } finally {
            em.close();  // 关闭 EntityManager
        }
        return user;
    }

    public void create(User user) throws PersistenceException {
        EntityManager em = HibernateUtil.getEntityManager();
        try {
            em.getTransaction().begin();  // 开始事务
            em.persist(user);  // 保存用户
            em.getTransaction().commit();  // 提交事务
        } catch (PersistenceException e) {
            em.getTransaction().rollback();  // 当出了异常时回滚事务
            throw new RuntimeException("user_already_exists", e);
        } finally {
            em.close();  // 关闭 EntityManager
        }
    }
}
