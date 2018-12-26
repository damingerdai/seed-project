package org.daming.hello.app.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Desc: 页面控制器
 *
 * @author aming
 * @version 2018-12-25 14:53
 * @since 1.0
 */
@Controller
public class IndexController {

    @RequestMapping("/login")
    public String login() {
        return "login";
    }
}
