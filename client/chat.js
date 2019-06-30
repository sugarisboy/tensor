const chat = [];

function requestMessages(requestData) {
    return fetch('/messages', requestData)
        .then(response => response.json())
        .then(renderChat)
        .catch(showError);
}

function updateChat() {
    requestMessages({ method: 'GET' });
}

function showError(error) {
    //alert(error.message);
    console.log(error.message)
}

function removeAllEntries() {
    const entries = document.querySelectorAll('.entry');
    entries.forEach(elem => elem.remove());
}

function div(className, text, children) {
    const div = document.createElement('div');
    div.className = className;

    if (text) {
        div.textContent = text;
    }

    if (children) {
        children.forEach(child => div.appendChild(child));
    }

    return div;
}

function createEntry(message) {
    return div(
        'entry' + (message.isMine ? ' mine' : ''),
        '',
        [
            div('author', message.author, [
                div('time', new Date(message.time).toLocaleTimeString())
            ]),
            div('message', message.text)
        ]);
}

function renderChat(messages) {
    removeAllEntries();

    const chat = document.getElementById('chat');

    messages
        .map(createEntry)
        .forEach(entry => chat.appendChild(entry));

    chat.lastElementChild && chat.lastElementChild.scrollIntoView();
}

function sendMessage(text) {
    return requestMessages({
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text
        })
    });
}

function sendButtonClick() {
    const text = document.getElementById('text').value;

    if (text) {
        sendMessage(text).then(() => {
            document.getElementById('text').value = '';
        });
    }
}

updateChat();
const updateInterval = setInterval(updateChat, 2000);