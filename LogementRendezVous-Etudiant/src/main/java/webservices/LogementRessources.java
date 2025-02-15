package webservices;

import entities.Logement;
import metiers.LogementBusiness;

import javax.ws.rs.*;
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


    @POST
    @Path("/add")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addLogement(Logement logement) {
        try {
            help.addLogement(logement);  // Implémentation de l'ajout dans LogementBusiness
            return Response.status(201).entity("Logement ajouté avec succès").build();
        } catch (Exception e) {
            return Response.status(500).entity("Erreur lors de l'ajout du logement").build();
        }
    }

    // Supprimer un logement
    @DELETE
    @Path("/delete/{reference}")
    public Response deleteLogement(@PathParam("reference") int reference) {
        try {
            boolean result = help.deleteLogement(reference);  // Implémentation de la suppression dans LogementBusiness
            if (result) {
                return Response.status(200).entity("Logement supprimé avec succès").build();
            } else {
                return Response.status(404).entity("Logement non trouvé").build();
            }
        } catch (Exception e) {
            return Response.status(500).entity("Erreur lors de la suppression du logement").build();
        }
    }



}
