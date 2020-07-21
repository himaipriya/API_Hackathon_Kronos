package com.rbs.apihackathonkronos.client.config;


import com.rbs.apihackathonkronos.client.service.PispRemote;
import com.rbs.apihackathonkronos.client.util.PispUtils;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

public class PispContext {

    @Bean
    public PispConfig pispConfig(){
        return new PispConfig();
    }

    @Bean
    public PispUtils pispUtil(PispConfig pispConfig, ClientConfig clientConfig) {
        return new PispUtils(pispConfig, clientConfig);
    }

    @Bean
    public PispRemote pispRemote(@Qualifier("securedRestTemplate") RestTemplate securedRestTemplate,
                                 PispUtils pispUtil) {
        return  new PispRemote(securedRestTemplate, pispUtil);
    }
}