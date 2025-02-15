const API_URL = "http://localhost:7777/LogementRendezVous_Etudiant_war_exploded/api/logement/getAll";

// Charger les logements au démarrage
document.addEventListener("DOMContentLoaded", fetchLogements);

// Récupérer et afficher les logements
function fetchLogements() {
    fetch(API_URL)  // Supprimer /getAll, car cela fait déjà partie de l'API_URL
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur HTTP, statut : " + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log("Données reçues :", data); // 🔍 Debugging
            if (Array.isArray(data)) {
                afficherLogements(data);
            } else {
                console.error("Données reçues ne sont pas un tableau :", data);
            }
        })
        .catch(error => console.error("Erreur lors de la récupération des logements :", error));
}

function afficherLogements(logements) {
    const tableBody = document.getElementById("logements-table");
    tableBody.innerHTML = ""; // Nettoyer le tableau avant d'ajouter les nouvelles données

    logements.forEach(logement => {
        const row = `
            <tr>
                <td>${logement.reference}</td>
                <td>${logement.adresse}</td>
                <td>${logement.ville || "N/A"}</td>
                <td>${logement.type}</td>
                <td>${logement.description || "N/A"}</td>
                <td>${logement.prix} €</td>
                <td>
                    <button onclick="deleteLogement(${logement.reference})">🗑️</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}