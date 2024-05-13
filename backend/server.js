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

app.get('/api/schueler', (req, res) => {
    res.status(200).json(schueler);
});

app.get('/api/schueler/:id', (req, res) => {
    const schuelerId = parseInt(req.params.id);
    const gefundenerSchueler = schueler.find(s => s.id === schuelerId);
    if (gefundenerSchueler) {
        res.status(200).json(gefundenerSchueler);
    } else {
        res.status(404).send('Schüler nicht gefunden');
    }
});

app.post('/api/schueler/add', (req, res) => {
    const neuerSchueler = req.body;

    if (!neuerSchueler || !neuerSchueler.name || !neuerSchueler.alter || !neuerSchueler.fach) {
        return res.status(400).json({ error: 'Unvollständige Schülerdaten' });
    }

    const id = schueler.length + 1;

    schueler.push({ id, ...neuerSchueler });

    res.status(201).json({ message: 'Schüler erfolgreich erstellt', student: { id, ...neuerSchueler } });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});