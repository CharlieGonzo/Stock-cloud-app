package stocks.filters;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import stocks.service.JwtService;
import stocks.service.UserService;


@Component
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter{
	
	private final JwtService jwtService;
	
	private final UserService userService;
	
	public JwtAuthenticationFilter(JwtService jwtService,UserService userService) {
		
		this.jwtService = jwtService;
		this.userService = userService;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		final String authHeader = request.getHeader("Authorization");
		final String jwt;
		final String username;

		if(!StringUtils.hasText(authHeader) ||  !StringUtils.startsWithIgnoreCase(authHeader, "Bearer ")) {
			filterChain.doFilter(request, response);
			return;
		}
		jwt = authHeader.substring(7);
		username = jwtService.extractUserName(jwt);
		
		if(StringUtils.hasLength(authHeader) && SecurityContextHolder.getContext().getAuthentication() == null) {
			UserDetails userDetails = userService.userDetailsService().loadUserByUsername(username);
			if(jwtService.isTokenValid(jwt, userDetails)) {
				

				SecurityContext context = SecurityContextHolder.createEmptyContext();
				UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());

				token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

				context.setAuthentication(token);

				SecurityContextHolder.getContext().setAuthentication(context.getAuthentication());


			}
		}
		filterChain.doFilter(request, response);
	}

}
