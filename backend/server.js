const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

let schueler = [
    { id: 1, name: "Anna Schmidt", alter: 23, fach: "Physik" },
    { id: 2, name: "Tom Müller", alter: 19, fach: "Chemie" }
];

// Endpoint zum Aufrufen aller Schüler
app.get('/api/schueler', (req, res) => {
    res.status(200).json(schueler);
});

// Endpoint zum Aufrufen einzelner Schüler
app.get('/api/schueler/:id', (req, res) => {
    const schuelerId = parseInt(req.params.id);
    const gefundenerSchueler = schueler.find(s => s.id === schuelerId);
    if (gefundenerSchueler) {
        res.status(200).json(gefundenerSchueler);
    } else {
        res.status(404).send('Schüler nicht gefunden');
    }
});

// Endpoint zum Hinzufügen von Schülern
app.post('/api/schueler/add', (req, res) => {
    const neuerSchueler = req.body;

    if (!neuerSchueler || !neuerSchueler.name || !neuerSchueler.alter || !neuerSchueler.fach) {
        return res.status(400).json({ error: 'Unvollständige Schülerdaten' });
    }

    /*
        const id = schueler.length + 1 erzeugt Probleme beim Anlegen neuer Schüler nach dem Löschen, da so doppelte
        IDs erzeugt werden. Dies lässt sich lösen, indem man die ID des letzten Schüleres nimmt und um 1 erhöht.
     */
    const id = schueler.length > 0 ? schueler[schueler.length - 1].id + 1 : 1;

    schueler.push({ id, ...neuerSchueler });

    res.status(201).json({ message: 'Schüler erfolgreich erstellt', student: { id, ...neuerSchueler } });
});

// Endpoint zum Ändern von Schülerdaten
app.put('/api/schueler/update/:id', (req, res) => {
    console.log(req.params, req.body)

    // Die Daten des gefundenen Schülers werden ausgetauscht
    schueler.find(function(s) {
        if (s.id == req.params.id) {
            s.name = req.body.name;
            s.alter = req.body.alter;
            s.fach = req.body.fach;

            res.status(201).json({ message: 'Schüler erfolgreich bearbeitet' });

            return true;
        } else {
            res.status(404).json({ message: 'Schüler nicht gefunden' });
        }
    });
})

// Endpoint zum Löschen von Schülern
app.delete('/api/schueler/delete/:id', (req, res) => {
    const schuelerId = parseInt(req.params.id);

    // Der Schüler wird gesucht und entfernt.
    schueler = schueler.filter(s => s.id !== schuelerId);

    res.status(201).json({ message: 'Schüler erfolgreich gelöscht' });
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});