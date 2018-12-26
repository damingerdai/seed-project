package org.daming.hello.app.service;

/**
 * Desc: 用户接口
 *
 * @author aming
 * @version 2018-12-25 15:59
 * @since 1.0
 */
public interface UserService {

    boolean findUser(String username, String password);
}
