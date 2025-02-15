const API_URL = "http://localhost:7777/LogementRendezVous_Etudiant_war_exploded/api/logement/getAll";
const API_URL2 = "http://localhost:7777/LogementRendezVous_Etudiant_war_exploded/api/logement/add/";
const API_URL3 = "http://localhost:7777/LogementRendezVous_Etudiant_war_exploded/api/logement";

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

// Ajouter un logement
document.getElementById("logement-form").addEventListener("submit", function (event) {
    event.preventDefault();  // Empêcher la soumission par défaut du formulaire
    addLogement();  // Appeler la fonction pour ajouter le logement
});

function addLogement() {
    const newLogement = {
        reference: document.getElementById("reference").value,
        adresse: document.getElementById("adresse").value,
        ville: document.getElementById("ville").value,
        type: document.getElementById("type").value,
        description: document.getElementById("equipements").value,  // Utiliser "equipements" comme description
        prix: document.getElementById("prix").value
    };

    fetch(API_URL2, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newLogement)
    })
        .then(response => {
            if (response.ok) {
                fetchLogements();  // Recharger les logements après ajout
            } else {
                console.error("Erreur lors de l'ajout du logement");
            }
        })
        .catch(error => console.error("Erreur lors de l'ajout du logement :", error));
}

// Supprimer un logement
function deleteLogement(reference) {
    fetch(API_URL3 + "/delete/" + reference, {
        method: "DELETE"
    })
        .then(response => {
            if (response.ok) {
                fetchLogements();  // Recharger les logements après suppression
            } else {
                console.error("Erreur lors de la suppression du logement");
            }
        })
        .catch(error => console.error("Erreur lors de la suppression du logement :", error));
}