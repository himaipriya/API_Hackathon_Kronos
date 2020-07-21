package com.rbs.apihackathonkronos.client.config;

import org.springframework.context.annotation.Import;

@Import({ SecurityContext.class, TokenContext.class, ClientConfig.class, SecurityConfig.class})
public class RemoteContext {

}