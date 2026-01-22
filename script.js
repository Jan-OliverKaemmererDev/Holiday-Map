// Karte initialisieren (Zentriert auf Europa)
const map = L.map('map').setView([48.0, 10.0], 4);

// Karten-Kacheln von OpenStreetMap hinzufügen
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Funktion, die beim Klicken auf die Karte ausgeführt wird
function onMapClick(e) {
    const { lat, lng } = e.latlng;

    // Erstelle ein Formular im Popup
    const formHtml = `
        <div class="popup-form">
            <h3>Neuer Bericht</h3>
            <input type="text" id="placeName" placeholder="Ort/Hotel Name">
            <textarea id="review" placeholder="Wie war dein Urlaub?"></textarea>
            <input type="file" id="imageInput" accept="image/*">
            <button onclick="saveReport(${lat}, ${lng})">Bericht speichern</button>
        </div>
    `;

    L.popup()
        .setLatLng(e.latlng)
        .setContent(formHtml)
        .openOn(map);
}

map.on('click', onMapClick);

// Funktion zum "Speichern" und Anzeigen des Markers
function saveReport(lat, lng) {
    const name = document.getElementById('placeName').value;
    const review = document.getElementById('review').value;
    const imageFile = document.getElementById('imageInput').files[0];

    if (!name || !review) {
        alert("Bitte fülle alle Felder aus!");
        return;
    }

    // Marker erstellen
    const marker = L.marker([lat, lng]).addTo(map);

    // Bild-URL generieren (lokal für die Session)
    let imgHtml = "";
    if (imageFile) {
        const imgUrl = URL.createObjectURL(imageFile);
        imgHtml = `<img src="${imgUrl}" class="uploaded-img">`;
    }

    // Popup-Inhalt für den fertigen Marker
    const markerHtml = `
        <div style="max-width: 250px">
            <strong>${name}</strong><br>
            <p>${review}</p>
            ${imgHtml}
        </div>
    `;

    marker.bindPopup(markerHtml);
    map.closePopup(); // Schließt das Eingabefenster
}