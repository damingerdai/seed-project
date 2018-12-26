package org.daming.hello.app.repository.mapper;

import org.apache.ibatis.annotations.Param;
import org.daming.hello.app.annotations.MyBatisMapper;
import org.daming.hello.app.pojo.User;

/**
 * Desc: 用户Mapper
 *
 * @author aming
 * @version 2018-12-25 15:23
 * @since 1.0
 */
@MyBatisMapper
public interface UserMapper {

    User getUser(@Param("username")String username,@Param("password")String password);
}
