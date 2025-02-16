package webservices;

import entities.Logement;
import metiers.LogementBusiness;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/logement")
public class LogementRessources {
    private static LogementBusiness help = new LogementBusiness(); // Instance unique

    @GET
    @Path("/getAll")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll() {
        return Response
                .status(200)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
                .header("Access-Control-Allow-Headers", "Content-Type, Authorization")
                .entity(help.getLogements())
                .build();
    }

    @POST
    @Path("/add")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addLogement(Logement logement) {
        if (logement == null) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Les données du logement sont invalides.")
                    .build();
        }

        boolean added = help.addLogement(logement);
        if (added) {
            return Response.status(Response.Status.CREATED)
                    .entity(logement)
                    .build();
        } else {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Échec de l'ajout du logement.")
                    .build();
        }
    }

    @DELETE
    @Path("/delete/{reference}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteLogement(@PathParam("reference") int reference) {
        boolean deleted = help.deleteLogement(reference);
        if (deleted) {
            return Response.status(Response.Status.OK)
                    .entity("Logement supprimé avec succès !")
                    .build();
        } else {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("Logement non trouvé !")
                    .build();
        }
    }

    @PUT
    @Path("/update/{reference}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateLogement(@PathParam("reference") int reference, Logement logement) {
        if (logement == null || reference != logement.getReference()) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("{\"message\": \"Les données du logement ou la référence sont invalides.\"}")
                    .build();
        }

        boolean updated = help.updateLogement(reference, logement);
        if (updated) {
            return Response.status(Response.Status.OK)
                    .entity("{\"message\": \"Logement mis à jour avec succès !\"}")
                    .build();
        } else {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("{\"message\": \"Logement non trouvé pour la mise à jour !\"}")
                    .build();
        }
    }





}
