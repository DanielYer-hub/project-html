function checkInputs() {
    const name = document.getElementById("name").value.trim(),
        sname = document.getElementById("sname").value.trim(),
        mail = document.getElementById("mail").value.trim(),
        password = document.getElementById("password").value.trim();
    return name && sname && mail && password;
}

// localStorage
function addUser() {
    if (!checkInputs()) {
        alert("Please fill in all fields.");
        return;
    }

    const name = document.getElementById("name").value.trim(),
        sname = document.getElementById("sname").value.trim(),
        mail = document.getElementById("mail").value.trim(),
        password = document.getElementById("password").value.trim();

    const user = { name, sname, mail, password, status: "offline" };
    localStorage.setItem(mail, JSON.stringify(user));

    // מחיקה עזור הכתיבה
    document.getElementById("name").value = "";
    document.getElementById("sname").value = "";
    document.getElementById("mail").value = "";
    document.getElementById("password").value = "";

    alert("User added successfully.");
}

// פונקציה בשביל USER
function signIn() {
    const mail = document.getElementById("signin-mail").value.trim(),
        password = document.getElementById("signin-password").value.trim();

    const storedUser = localStorage.getItem(mail);
    if (!storedUser) {
        alert("User not found.");
        return;
    }

    const user = JSON.parse(storedUser);
    if (user.password === password) {
        user.status = "online";
        localStorage.setItem(mail, JSON.stringify(user));
        addUserToTable(user);
        alert("Successfully signed in.");
    } else {
        alert("Incorrect password.");
    }
}

// מוסיפים USER לטבלה
function addUserToTable(user) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.sname}</td>
        <td>${user.mail}</td>
        <td>${user.password}</td>
        <td>${user.status}</td>
        <td>
            <button class="btn btn-danger" onclick="deleteUser('${user.mail}')">Clear</button>
            <button class="btn btn-warning" onclick="toggleStatus('${user.mail}', this)">Change Status</button>
            <button class="btn btn-primary" onclick="highlightRow(this)">Watch On</button>
        </td>`;
    document.getElementById("data").appendChild(row);
}

// מחיקה USER
function deleteUser(mail) {
    localStorage.removeItem(mail);
    const rows = document.getElementById("data").getElementsByTagName("tr");
    for (const row of rows) {
        if (row.cells[2].textContent === mail) {
            row.remove();
            break;
        }
    }
}

// שינוי סטטוס
function toggleStatus(mail, button) {
    const storedUser = localStorage.getItem(mail);
    if (!storedUser) return;

    const user = JSON.parse(storedUser);
    user.status = user.status === "online" ? "offline" : "online";
    localStorage.setItem(mail, JSON.stringify(user));

    const row = button.closest("tr");
    row.cells[4].textContent = user.status;
}

 // שינוי צבע של סטטוס
function highlightRow(button) {
    const row = button.closest("td"); 
    if (row.style.backgroundColor === 'yellow') {
        row.style.backgroundColor = ''; 
    } else {
        row.style.backgroundColor = 'yellow';
    }
}