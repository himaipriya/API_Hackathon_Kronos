package com.rbs.apihackathonkronos.config;


import com.rbs.apihackathonkronos.client.config.AispContext;
import com.rbs.apihackathonkronos.client.config.ClientConfig;
import com.rbs.apihackathonkronos.client.config.PispContext;
import com.rbs.apihackathonkronos.client.config.RemoteContext;
import com.rbs.apihackathonkronos.client.service.AispRemote;
import com.rbs.apihackathonkronos.client.service.PispRemote;
import com.rbs.apihackathonkronos.client.service.TokenRemote;
import com.rbs.apihackathonkronos.service.AispService;
import com.rbs.apihackathonkronos.service.PispService;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.web.filter.OncePerRequestFilter;

@Configuration
@Import({RemoteContext.class, AispContext.class, PispContext.class})
public class RootContext {

    @Bean
    public AispService aispService(AispRemote aispRemote,
                                   TokenRemote tokenRemote,
                                   ClientConfig clientConfig)  {
        return new AispService(aispRemote, tokenRemote, clientConfig);
    }

    @Bean
    public PispService pispService(PispRemote pispRemote,
                                   TokenRemote tokenRemote,
                                   ClientConfig clientConfig)  {
        return new PispService(pispRemote, tokenRemote, clientConfig);

    }

    @Bean
    public FilterRegistrationBean<OncePerRequestFilter> httpRequestFilter(){
        FilterRegistrationBean<OncePerRequestFilter> registrationBean
            = new FilterRegistrationBean<>();

        registrationBean.setFilter(new HttpRequestFilter());
        registrationBean.addUrlPatterns("/open-banking/*");

        return registrationBean;
    }
}