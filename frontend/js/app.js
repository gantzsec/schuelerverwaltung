function addSchueler(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const alter = document.getElementById('alter').value;
    const fach = document.getElementById('fach').value;

    const newStudent = { name, alter, fach };

    fetch('http://localhost:3000/api/schueler/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newStudent)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Student added:', data);
        })
        .catch(error => {
            console.error('Error adding student:', error);
        });
}

document.getElementById('schuelerForm').addEventListener('submit', addSchueler);