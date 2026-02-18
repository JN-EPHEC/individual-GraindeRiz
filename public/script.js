document.addEventListener('DOMContentLoaded', async function () {
    await loadUsers();

    const form = document.getElementById('userForm');
    form.addEventListener('submit', onFormSubmit);
});

function showMessage(text, type = 'danger') {
    const box = document.getElementById('messageBox');
    box.textContent = text;
    box.className = 'alert alert-' + type;
}

function clearMessage() {
    const box = document.getElementById('messageBox');
    box.textContent = '';
    box.className = 'd-none';
}

async function loadUsers() {
    clearMessage();

    const response = await fetch('/api/users');
    if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        showMessage(data.error || data.erreur || 'Erreur lors du chargement des utilisateurs');
        return;
    }

    const users = await response.json();

    let html = '';
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        html +=
            '<li>' +
            user.firstName + ' ' + user.lastName +
            ' <button onclick="deleteUser(' + user.id + ')">X</button>' +
            '</li>';
    }

    document.getElementById('usersList').innerHTML = html;
}

async function onFormSubmit(event) {
    event.preventDefault();
    clearMessage();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;

    const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName
        })
    });

    if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        showMessage(data.error || data.erreur || 'Erreur pendant la creation');
        return;
    }

    showMessage('Utilisateur ajoute', 'success');
    document.getElementById('userForm').reset();
    // rafraichit la liste sans reload
    await loadUsers();
}

async function deleteUser(id) {
  clearMessage();

  const response = await fetch('/api/users/' + id, {
    method: 'DELETE'
  });

  if (!response.ok && response.status !== 204) {
    const data = await response.json().catch(() => ({}));
    showMessage(data.error || data.erreur || 'Erreur pendant la suppression');
    return;
  }

  showMessage('Utilisateur supprime', 'success');
  // recharge la liste    
  await loadUsers(); 
}

window.deleteUser = deleteUser;
