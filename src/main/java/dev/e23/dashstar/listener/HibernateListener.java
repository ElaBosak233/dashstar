package dev.e23.dashstar.listener;

import dev.e23.dashstar.util.HibernateUtil;
import jakarta.servlet.ServletContextEvent;
import jakarta.servlet.ServletContextListener;
import jakarta.servlet.annotation.WebListener;
import jakarta.persistence.PersistenceException;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

@WebListener
public class HibernateListener implements ServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        // 创建 EntityManagerFactory，即使得 Hibernate 可以管理实体类并创建数据库连接。若失败，则关闭服务器。
        try {
            HibernateUtil.init();
        } catch (PersistenceException ex) {
            System.err.println("Database connection failed. Server will shut down.");
            shutdownServer();
        }
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        if (HibernateUtil.getEntityManagerFactory() != null && HibernateUtil.getEntityManagerFactory().isOpen()) {
            HibernateUtil.getEntityManagerFactory().close();
        }
    }

    private void shutdownServer() {
        System.exit(1);
    }
}