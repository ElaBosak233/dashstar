package dev.e23.dashstar.util;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

import java.lang.reflect.Field;

public class HibernateUtil {
    private static EntityManagerFactory emf;

    /**
     * 初始化 Hibernate
     * 这个方法需要在应用启动时调用一次
     */
    public static void init() {
        emf = Persistence.createEntityManagerFactory("default");
    }

    /**
     * 从源对象复制非 null 字段到目标对象
     * 用于数据库字段更新
     * @param source 包含更新值的源对象
     * @param target 需要被更新的目标对象
     */
    public static void copyNonNullProperties(Object source, Object target) throws IllegalAccessException {
        Field[] fields = source.getClass().getDeclaredFields();
        for (Field field : fields) {
            field.setAccessible(true);
            Object value = field.get(source);
            if (value != null) {
                field.set(target, value);
            }
        }
    }

    public static EntityManagerFactory getEntityManagerFactory() {
        return emf;
    }

    /**
     * 获取 Hibernate 的 EntityManager
     * @return 一个 EntityManager 实例
     */
    public static EntityManager getEntityManager() {
        return emf.createEntityManager();
    }
}
