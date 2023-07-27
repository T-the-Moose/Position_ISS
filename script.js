let position = document.createElement("p");
let map = L.map("map").setView([51.505, -0.09], 9);

// Carte
L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 19,
    subdomains:['mt0','mt1','mt2','mt3']
    //attribution: '© OpenStreetMap'
}).addTo(map);


// Variable pour stocker le marqueur de la position de l'ISS
let marker;
let autreMarker;


//Définition de l'icone personnalisé ISS.jpg
const customIcon = L.icon({
    iconUrl: 'img/startup.png',
    iconSize: [50, 50], // Taille de l'icône en pixels
    iconAnchor: [16, 32], // Point d'ancrage de l'icône (position du marqueur)
});

const customIcon2 = L.icon({
    iconUrl: 'img/fire.png',
    iconSize: [20, 20], // Taille de l'icône en pixels
    iconAnchor: [16, 32], // Point d'ancrage de l'icône (position du marqueur)
});

//Fond de particules
Particles.init({
    selector: '.particules',
    color: ["#0000FF", "#FFFFFF", "#FF0000"],
    maxParticles: 200,
    speed: 1,
    connectParticles: true,
});

function afficherPositionISS () {
    fetch("http://api.open-notify.org/iss-now.json")
        .then(response => response.json())
        .then(
            json => {
                const latitude = json["iss_position"]["latitude"];
                const longitude = json["iss_position"]["longitude"];

                position.textContent = "Latitude = " + latitude + "  " + "|  Longitude = " + longitude;
                document.getElementById("positionISS").appendChild(position);
                console.log(latitude + "," + longitude);

                // Mettre à jour le marqueur de la carte avec la nouvelle position de l'ISS
                if (!marker) {
                    // Créer le marqueur si il n'existe pas encore
                    marker = L.marker([latitude, longitude], {icon: customIcon}).addTo(map);
                } else {
                    // Mettre à jour la position du marqueur
                    marker.setLatLng([latitude, longitude]);
                }

                autreMarker = L.marker([latitude, longitude], {icon: customIcon2}).addTo(map);

                //Centrer la carte en la position de l'ISS
                map.flyTo([latitude, longitude]);

            });
}

const interval = setInterval(afficherPositionISS, 1000);

// Appeler afficherPositionISS immédiatement pour la première fois
afficherPositionISS();