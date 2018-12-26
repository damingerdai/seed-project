package org.daming.hello.app.web;

import org.daming.hello.app.pojo.User;
import org.daming.hello.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

/**
 * Desc: 登录
 *
 * @author aming
 * @version 2018-12-25 16:01
 * @since 1.0
 */
@Controller
@RequestMapping("/login")
public class LoginController {

    private UserService userService;

    /**
     * 用户登陆
     * @param request
     * @param user
     * @return
     */
    @RequestMapping(path = "/doLogin", produces = "text/html;charset=UTF-8" )
    public ModelAndView login(HttpServletRequest request, User user) {
        boolean b = userService.findUser(user.getUsername(), user.getPassword());
        ModelAndView mav = new ModelAndView();
        mav.setViewName("forward:/login.jsp");
        if (b) {
            mav.setViewName("redirect:"+ "/");
        } else {
            mav.addObject("errorMsg", "用户名不存在");

        }
        return mav;
    }

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }
}
