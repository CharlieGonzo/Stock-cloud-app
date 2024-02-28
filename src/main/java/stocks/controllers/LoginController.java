package stocks.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import stocks.repositories.UserRepository;

@Controller
public class LoginController {
	
	@Autowired
	UserRepository user;

}
