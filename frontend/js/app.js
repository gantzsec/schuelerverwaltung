function addSchueler(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const alter = document.getElementById('alter').value;
    const fach = document.getElementById('fach').value;

    const newSchueler = { name, alter, fach };

    fetch('http://localhost:3000/api/schueler/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSchueler)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Student added:', data);
        })
        .catch(error => {
            console.error('Ein Fehler beim Anlegen des Schülers ist aufgetreten:', error);
        });
}

function editSchueler(event) {
    event.preventDefault();

    let row = event.target.closest('tr');
    let cells = row.querySelectorAll('td:not(:last-child)');

    cells.forEach(function(cell) {
        let input = document.createElement('input');
        input.type = 'text';
        input.value = cell.textContent;
        cell.textContent = '';
        cell.appendChild(input);
    });

    let editButton = event.target;
    let saveButton = editButton.nextElementSibling;
    editButton.style.display = 'none';
    saveButton.style.display = '';
}

function saveSchueler(event) {
    event.preventDefault();

    let row = event.target.closest('tr');
    let cells = row.querySelectorAll('td:not(:last-child)');

    cells.forEach(function (cell) {
        let inputValue = cell.querySelector('input').value;
        cell.textContent = inputValue;
    });

    let saveButton = event.target;
    let editButton = saveButton.previousElementSibling;
    saveButton.style.display = 'none';
    editButton.style.display = '';

    const schuelerId = event.target.parentNode.parentNode.firstElementChild.textContent;

    schuelerData = {
        name: cells[1].textContent,
        alter: cells[2].textContent,
        fach: cells[3].textContent,
    }

    fetch('http://localhost:3000/api/schueler/update/' + schuelerId, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(schuelerData)
    }).then(response => response.json())
        .then(data => {
            console.log(data.message);
        })
        .catch(error => {
            console.error('Ein Fehler beim Bearbeiten des Schülers ist aufgetreten:', error);
        });
}

function deleteSchueler(event) {
    event.preventDefault();

    const schuelerId = event.target.parentNode.parentNode.firstElementChild.textContent;

    fetch('http://localhost:3000/api/schueler/delete/' + schuelerId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => response.json())
        .then(data => {
            console.log(data.message);
        })
        .catch(error => {
            console.error('Ein Fehler beim Löschen des Schülers ist aufgetreten:', error);
        });
}

document.getElementById('schuelerForm').addEventListener('submit', addSchueler);