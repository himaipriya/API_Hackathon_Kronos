package com.rbs.apihackathonkronos.client.config;


import com.rbs.apihackathonkronos.client.service.AispRemote;
import com.rbs.apihackathonkronos.client.util.AispUtils;
import com.rbs.apihackathonkronos.client.util.BaseApiUtils;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;


public class AispContext {

    @Bean
    public AispConfig aispConfig(){
        return new AispConfig();
    }

    @Bean("aispUtils")
    public BaseApiUtils aispUtil(AispConfig aispConfig, ClientConfig clientConfig) {
        return new AispUtils(aispConfig, clientConfig);
    }

    @Bean
    public AispRemote aispRemote(@Qualifier("securedRestTemplate") RestTemplate securedRestTemplate,
                                 @Qualifier("aispUtils") BaseApiUtils apiUtils) {
        return new AispRemote(securedRestTemplate, apiUtils);
    }
}