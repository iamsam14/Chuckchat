let deleteID = false
let buttoncounter = 0;
const chatbox = document.querySelector('#chatbox');
const input = document.querySelector('input');
const form = document.querySelector('form');
const button = document.querySelector('button');
const span = document.getElementById(deleteID);
const time = new Date();
const hour = time.getHours();
const minute = time.getMinutes();
const timeStamp = `${hour}:${minute}`;

function createMessage(user, msgText){
    if(!msgText.length) return;
    deleteID++
    const msg =     `<div class='message' id=${deleteID}>
                    <p>${timeStamp}</p>
                    <p class='sender'>${user}</p>
                    <p>${msgText}</p>
                    <p class='delete' onclick='deleteText(${deleteID})'>X</p>
                        </div>`
    chatbox.innerHTML += msg
}

function handleSubmit(event){
    event.preventDefault();
    const user = ['Me', 'Myself', 'I'][Math.floor(Math.random() * 3)];
    createMessage(user, input.value)
    form.reset();
}

function chuckfacts(){
    fetch('https://api.icndb.com/jokes/random')
    .then(res => res.json())
    .then(cfact => createMessage('Chuck', cfact.value.joke));
}

function deleteText(deleteID){
    const text = document.getElementById(deleteID);
    text.remove();
}

function enterChat(){
    button.innerHTML = 'Chuck Norris has entered the chat!';
}

function breakButton(){
    buttoncounter++;
    if(buttoncounter >= 3){
        button.classList.remove('shakeMe')
        button.removeEventListener('click', chuckfacts)
        alert('According to new CCPA laws local hosts only allow up to 5 Chuck Norris jokes.')
    }
}

form.addEventListener('submit', handleSubmit)

button.addEventListener('click', chuckfacts)
button.addEventListener('click', enterChat)
button.addEventListener('click', breakButton)