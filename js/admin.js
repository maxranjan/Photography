
/**********CONTACT FORM DETAILS FETCHING**************/
const fetchDataFromServer = () => {
    document.querySelector('#table-body').innerHTML = ''
    document.getElementById('loading-svg').style.display = 'block';
    document.querySelector('.table-striped').style.opacity = '0%';
    printMessage('Fetching data From server...', 'info');
    const request = new XMLHttpRequest();
    request.open('GET', 'https://rdsbca.pythonanywhere.com/api/contact-form', true);
    request.send();
    request.onload = () => {
        if (request.status == 200) {
            // printMessage(request.responseText, 'success');
            responseText = JSON.parse(request.responseText);
            console.log(responseText);
            const tableBody = document.getElementById('table-body');
            let i = 1;
            for (let tuple of responseText) {
                let th = document.createElement('th');
                th.innerText = i++;
                let tr = document.createElement('tr');
                tr.appendChild(th);
                for (let item of tuple) {
                    let td = document.createElement('td');
                    td.innerText = item;
                    tr.appendChild(td);
                }
                let deleteElementTd = document.createElement('td');
                deleteElementTd.innerHTML = '<i class="material-icons icons delete-icon" onclick="deleteRow(this)">delete</i>'
                tr.appendChild(deleteElementTd)

                let td = document.createElement('td');
                td.innerHTML = `
                <a href="https://rdsbca.pythonanywhere.com/api/contact-form/${tuple[0]}" target="_blank"><i class="material-icons icons registrationIcons">open_in_new</i></a>
                `
                tr.appendChild(td);
                tableBody.appendChild(tr);
            }
            document.querySelector('.table-striped').style.opacity = '100%';
            document.getElementById('loading-svg').style.display = 'none';
        }
        else {
            printMessage(request.responseText, 'danger');
        }
        console.log(request.responseText);
    }
}

function printMessage(message, alertType) {
    if (document.getElementById('message')) {
        const messageDiv = document.getElementById('message');
        messageDiv.className = `alert alert-${alertType}`; // bootstrap class
        messageDiv.innerText = message;
        return;
    }
    /*if message div does not exist, create it*/
    const messageDiv = document.createElement('div');
    messageDiv.id = 'message';
    messageDiv.className = `alert alert-${alertType}`; // bootstrap class
    // messageDiv.classList.add();
    messageDiv.innerText = message;
    messageDiv.style.cssText = `width: 80%; text-align: center; margin: 0 auto; padding: 0.3%; margin-top: -3%; margin-bottom: 3%;`;
    document.getElementById('loading-svg').appendChild(messageDiv);
}


if (sessionStorage.getItem('login') == 'success') {
    document.body.innerHTML = `
    
        <div class="text-center alert alert-info mt-3">
            <span class="text-center" id="main-title">Welcome to the Admin Panel</span>
        </div>

        <div class="text-center">
            <button type="button" class="btn btn-primary m-1" id="fetch-button" onclick="fetchDataFromServer()">Fetch Data</button>
            <button type="button" class="btn btn-primary m-1" id="logout-button" onclick="logout()">Logout</button>
            <button type="button" class="btn btn-primary m-1" id="logout-button" onclick="window.location.href='/Photography'">Home</button>
        <div>

        <div id="loading-svg" style="display: none;">
            <img src="assets/ball.svg" alt="loading" style="width: 50px; height: 120px">
        </div>

        <div class="mx-auto m-4 text-center" style="width: 100%;">
            <table class="table table-striped table-bordered table-hover" style="width: 90%; text-align:center; margin-left: 4%; opacity: 0%;">
                <thead>
                    <tr>
                        <th scope="col">SNo</th>
                        <th scope="col">ID</th>
                        <th scope="col">Email</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Country</th>
                        <th scope="col">Delete</th>
                        <th scope="col">Detail</th>
                    </tr>
                </thead>
                <tbody id="table-body">
                </tbody>
            </table>
        </div>
    `
}
else {
    document.getElementById('submit-button').addEventListener('click', () => {
        usernames = ['admin']
        passwords = ['admin@123']
        if (usernames.includes(document.getElementById('floatingInputGroup6').value) && passwords.includes(document.getElementById('floatingPassword').value)) {
            sessionStorage.setItem('login', 'success')
            console.log('Logged-In')
            window.location.href = window.location.href;
        }
        else {
            alert("Invalid Credentials")
        }
    })
}
const logout = () => {
    sessionStorage.removeItem('login');
    window.location.href = window.location.href;
}


const deleteRow = (element) => {
    const id = element.parentElement.parentElement.children[1].innerText
    fetch(`https://rdsbca.pythonanywhere.com/api/contact-form/${id}`, { method: 'DELETE' })
        .then(res => {
            if (res.ok) {
                responseText = res.text().then((responseText) => {
                    console.log("Server Response: ", responseText);
                    if (responseText.includes('success')) {
                        element.parentElement.parentElement.remove()
                    }
                    else {
                        alert('Unable to delete the data. Please try again later');
                    }
                })
            }
        })

}