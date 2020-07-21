package com.rbs.apihackathonkronos.config;


import com.rbs.apihackathonkronos.model.common.HttpRequestHeader;

public final class HttpRequestContext {
    public static final ThreadLocal<HttpRequestHeader> httpRequestContext = new ThreadLocal();

    public static boolean available() {
        return httpRequestContext.get() != null;
    }

    public static void set(HttpRequestHeader var0) {
        httpRequestContext.set(var0);
    }

    public static HttpRequestHeader get() {
        return httpRequestContext.get();
    }

    public static void clear() {
        if (available()) {
            set(null);
        }
    }
}