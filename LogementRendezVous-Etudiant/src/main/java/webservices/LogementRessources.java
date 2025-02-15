package webservices;

import metiers.LogementBusiness;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
@Path("/logement")
public class LogementRessources {
    LogementBusiness help = new LogementBusiness();
    @GET
    @Path("/getAll")
    @Produces(MediaType.APPLICATION_JSON)
    public Response  getAll(){
        return Response
                .status(200)
                .header("Access-Control-Allow-Origin", "*")  // Permet toutes les origines
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")  // Permet les méthodes spécifiques
                .header("Access-Control-Allow-Headers", "Content-Type, Authorization")  // Permet des en-têtes spécifiques
                .entity(help.getLogements())
                .build();
    }


}
