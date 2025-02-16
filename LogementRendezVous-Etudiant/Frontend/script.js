document.getElementById("logement-form").addEventListener("submit", function (event) {
    event.preventDefault();  // Empêcher la soumission par défaut
    addLogement();
});

function addLogement() {
    const newLogement = {
        reference: Number(document.getElementById("reference").value),
        adresse: document.getElementById("adresse").value,
        delegation: document.getElementById("delegation").value, // Correction ici
        gouvernorat: document.getElementById("gouvernorat").value, // Correction ici
        type: document.getElementById("type").value,
        description: document.getElementById("description").value, // Correction ici
        prix: parseFloat(document.getElementById("Prix").value)  // Correction : majuscule "Prix" -> minuscule "prix"
    };

    fetch("http://localhost:7777/LogementRendezVous_Etudiant_war_exploded/api/logement/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newLogement)
    })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text); });
            }
            return response.json();
        })
        .then(() => {
            alert("Logement ajouté avec succès !");
            fetchLogements();  // Recharger la liste après ajout
            document.getElementById("logement-form").reset();  // Réinitialiser le formulaire
        })
        .catch(error => console.error("Erreur lors de l'ajout du logement :", error));
}

// Charger les logements depuis l'API
function fetchLogements() {
    fetch("http://localhost:7777/LogementRendezVous_Etudiant_war_exploded/api/logement/getAll")
        .then(response => response.json())
        .then(logements => {
            displayLogements(logements);
        })
        .catch(error => console.error("Erreur :", error));
}

// Affichage des logements sous forme de cartes
function displayLogements(logements) {
    const container = document.getElementById("logements-container");
    container.innerHTML = "";  // Vider l'affichage avant de charger

    logements.forEach(logement => {
        const logementCard = document.createElement("div");
        logementCard.classList.add("logement-card");

        logementCard.innerHTML = `
            <h3>🏠 ${logement.type}</h3>
            <p><strong>Adresse :</strong> ${logement.adresse}</p>
            <p><strong>Ville :</strong> ${logement.ville}</p>
            <p><strong>Équipements :</strong> ${logement.equipements}</p>
            <p><strong>Description :</strong> ${logement.description}</p>
            <p><strong>Prix :</strong> ${logement.prix}€</p>
            <button class="delete-btn" onclick="deleteLogement(${logement.reference})">🗑 Supprimer</button>
            <button class="update-btn" onclick="updateLogement(${logement.reference})">✏️ Mettre à jour</button>

        `;

        container.appendChild(logementCard);
    });
}

// Supprimer un logement
function deleteLogement(reference) {
    fetch(`http://localhost:7777/LogementRendezVous_Etudiant_war_exploded/api/logement/delete/${reference}`, {
        method: "DELETE"
    })
        .then(response => {
            if (response.ok) {
                fetchLogements();  // Rafraîchir la liste après suppression
            }
        })
        .catch(error => console.error("Erreur :", error));
}

// Ouvrir la modale de mise à jour
function openUpdateModal(reference, adresse, delegation, gouvernorat, type, description, prix) {
    document.getElementById("update-reference").value = reference;
    document.getElementById("update-adresse").value = adresse;
    document.getElementById("update-delegation").value = delegation;
    document.getElementById("update-gouvernorat").value = gouvernorat;
    document.getElementById("update-type").value = type;
    document.getElementById("update-description").value = description;
    document.getElementById("update-prix").value = prix;

    document.getElementById("update-modal").style.display = "block";
}

// Fermer la modale de mise à jour
function closeUpdateModal() {
    document.getElementById("update-modal").style.display = "none";
}

document.getElementById("update-form").addEventListener("submit", function (event) {
    event.preventDefault();  // Empêcher la soumission par défaut
    updateLogement();
});

// Fonction pour mettre à jour un logement
// Fonction pour mettre à jour un logement
function updateLogement(reference) {
    // Demander les nouvelles valeurs de l'adresse et du prix via des prompts
    const updatedAdresse = prompt("Entrez la nouvelle adresse :");
    const updatedPrix = prompt("Entrez le nouveau prix :");

    if (updatedAdresse && updatedPrix) {
        // Créer un objet avec les nouvelles valeurs
        const updatedLogement = {
            reference: reference,  // Référence du logement à mettre à jour
            adresse: updatedAdresse,
            prix: parseFloat(updatedPrix)
        };

        // Envoi de la requête PUT vers l'API pour mettre à jour le logement
        fetch(`http://localhost:7777/LogementRendezVous_Etudiant_war_exploded/api/logement/update/${reference}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedLogement)  // Envoi des données du logement à mettre à jour
        })
            .then(response => response.json())  // Tentative de lecture de la réponse comme JSON
            .then(data => {
                alert(data.message);  // Affichage du message de succès ou d'erreur retourné par le backend
                fetchLogements();  // Recharger la liste des logements après mise à jour
            })
            .catch(error => {
                console.error("Erreur lors de la mise à jour du logement :", error);
                alert("Erreur lors de la mise à jour du logement.");
            });
    } else {
        alert("Mise à jour annulée ou données manquantes.");
    }
}



// Charger les logements au démarrage
fetchLogements();