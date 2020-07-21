package com.rbs.apihackathonkronos.client.config;


import com.rbs.apihackathonkronos.client.service.TokenRemote;
import com.rbs.apihackathonkronos.client.util.TokenUtils;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

public class TokenContext {


    @Bean
    public TokenRemote tokenRemote(@Qualifier("securedRestTemplate") RestTemplate securedRestTemplate,
                                   TokenUtils tokenUtil,
                                   ClientConfig clientConfig) {
        return new TokenRemote(securedRestTemplate, tokenUtil, clientConfig);
    }

    @Bean
    public TokenUtils tokenUtil() {
        return new TokenUtils();
    }

}