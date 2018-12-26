package org.daming.hello.app.service.impl;

import org.daming.hello.app.repository.mapper.UserMapper;
import org.daming.hello.app.service.UserService;
import org.springframework.stereotype.Service;

import java.util.Objects;

/**
 * Desc:
 *
 * @author aming
 * @version 2018-12-25 16:05
 * @since 1.0
 */
@Service
public class UserServiceImpl implements UserService {

    private UserMapper userMapper;

    @Override
    public boolean findUser(String username, String password) {
        System.out.println(userMapper);
        return Objects.nonNull(userMapper.getUser(username, password));
    }

    public UserServiceImpl(UserMapper userMapper) {
        this.userMapper = userMapper;
    }
}
