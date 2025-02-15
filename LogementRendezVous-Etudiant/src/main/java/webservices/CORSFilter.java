//package webservices;
//
//import javax.ws.rs.container.*;
//import javax.ws.rs.core.Response;
//import javax.ws.rs.ext.Provider;
//import java.io.IOException;
//
//@Provider
//public class CORSFilter implements ContainerResponseFilter, ContainerRequestFilter {
//
//    @Override
//    public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext) throws IOException {
//        responseContext.getHeaders().add("Access-Control-Allow-Origin", "*");
//        responseContext.getHeaders().add("Access-Control-Allow-Headers", "origin, content-type, accept, authorization");
//        responseContext.getHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
//        responseContext.getHeaders().add("Access-Control-Allow-Credentials", "true");
//    }
//
//    @Override
//    public void filter(ContainerRequestContext requestContext) throws IOException {
//        if (requestContext.getMethod().equalsIgnoreCase("OPTIONS")) {
//            requestContext.abortWith(Response.ok().build());
//        }
//    }
//}
