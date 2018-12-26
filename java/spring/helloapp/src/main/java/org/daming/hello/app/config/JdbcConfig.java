package org.daming.hello.app.config;

import com.zaxxer.hikari.HikariDataSource;
import org.daming.hello.app.annotations.MyBatisMapper;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.mapper.MapperScannerConfigurer;
import org.springframework.context.EnvironmentAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;
import javax.validation.constraints.NotNull;

/**
 * Desc: Jdbc配置
 *
 * @author aming
 * @version 2018-12-25 14:44
 * @since 1.0
 */
@Configuration
@PropertySource(value = {"classpath:application.properties"})
public class JdbcConfig  implements EnvironmentAware {

    private Environment environment;

    @Bean
    public DataSource dataSource() {
        HikariDataSource hikariDataSource = new HikariDataSource();
        hikariDataSource.setDriverClassName(environment.getProperty("jdbc.driverClassName"));
        hikariDataSource.setJdbcUrl(environment.getProperty("jdbc.url"));
        hikariDataSource.setUsername(environment.getProperty("jdbc.username"));
        hikariDataSource.setPassword(environment.getProperty("jdbc.password"));
        return hikariDataSource;
    }

    @Bean
    public JdbcTemplate jdbcTemplate(DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }

    @Bean
    public PlatformTransactionManager transactionManager(DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }

    @Bean("sqlSessionFactory")
    public SqlSessionFactoryBean sqlSessionFactoryBean(DataSource dataSource) {
        SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
        bean.setDataSource(dataSource);
        bean.setTypeAliasesPackage("org.daming");
        ResourceLoader mapperLocationLoader = new DefaultResourceLoader();
        Resource mapperLocation =  mapperLocationLoader.getResource("org/daming/hello/app/repository/mapper/User-Mapper.xml");
        bean.setMapperLocations(new Resource[] {mapperLocation});
        ResourceLoader configLocationLoader = new DefaultResourceLoader();
        Resource configLocation = new ClassPathResource("mybatis/mybatis-config.xml");
        bean.setConfigLocation(configLocation);
        return bean;
    }

    @Bean
    public MapperScannerConfigurer mapperScannerConfigurer(SqlSessionFactoryBean sqlSessionFactoryBean) {
        MapperScannerConfigurer configurer = new MapperScannerConfigurer();
        configurer.setSqlSessionFactoryBeanName("sqlSessionFactory");
        configurer.setBasePackage("org.daming");
        configurer.setAnnotationClass(MyBatisMapper.class);
        return configurer;
    }

    @Override
    public void setEnvironment(@NotNull Environment environment) {
        this.environment = environment;
    }
}
