package com.skillstorm.hotel_reservation_system.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;

import com.skillstorm.hotel_reservation_system.models.User;
import com.skillstorm.hotel_reservation_system.repositories.UserRepository;

@Service
public class CustomLoginService implements OAuth2UserService<OidcUserRequest, OidcUser> {
    private final UserRepository userRepository;

    public CustomLoginService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private final OidcUserService delegate = new OidcUserService();

    @Override
    public OidcUser loadUser(OidcUserRequest userRequest) throws OAuth2AuthenticationException {
        OidcUser oidcUser = delegate.loadUser(userRequest);

        String email = oidcUser.getEmail();
        List<GrantedAuthority> authorities = new ArrayList<>();

        User user = userRepository.findByEmail(email);
        if (user != null && user.getId() > 0) {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + user.getRole().name().toUpperCase()));
        }

        return new DefaultOidcUser(authorities, oidcUser.getIdToken(), oidcUser.getUserInfo());
    }
}
