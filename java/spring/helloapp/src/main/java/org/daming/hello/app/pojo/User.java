package org.daming.hello.app.pojo;

import java.io.Serializable;

/**
 * Desc: User
 *
 * @author aming
 * @version 2018-12-25 16:02
 * @since 1.0
 */
public class User implements Serializable {

    private String id;
    private String username;
    private String password;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
