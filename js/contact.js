(() => {
    const submitButton = document.querySelector('#submit-button');
    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        const formData = getFormData()
        if (formData) {
            sendDataToServer(formData);
        }
        else {
            alert('Please fill all fields. All fields are mandatory.', 'danger');
        }
    });
})()

function getFormData() {
    const data = {
        firstname: document.querySelector('input[name = firstname]').value,
        lastname: document.querySelector('input[name = lastname]').value,
        country: document.querySelector('#country').value,
        email: document.querySelector('input[name = email]').value,
        content: document.querySelector('textarea[name = content]').value,
    }
    for (let key in data) {
        if (data[key] == '') {
            console.log('Please fill all fields');
            return false;
        }
    }
    return data;
}
function sendDataToServer(data) {
    console.log(data);
    printMessage('Sending data to server...', 'info');
    const request = new XMLHttpRequest();
    request.open('POST', 'https://rdsbca.pythonanywhere.com/api/contact-form', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify(data));
    request.onload = () => {
        if (request.status == 200) {
            printMessage(request.responseText, 'success');
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
    messageDiv.style.cssText = `width: 80%; text-align: center; margin: 0 auto; padding: 0.3%; margin-top: 0.1%; margin-bottom: 0.1%;`;
    document.body.appendChild(messageDiv);
    document.getElementsByClassName('container')[0].insertBefore(messageDiv, document.getElementsByClassName('container')[0].childNodes[0]);
}