const nameForm = document.querySelector(".js-name");
const nameInput = nameForm.querySelector(".js-name > input");
const greeting = document.querySelector(".js-greetings");
const changeBtn = document.querySelector(".js-name-btn");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function noSubmit(event) {
    event.preventDefault();
    const currentValue = nameInput.value;
    paintGreeting(currentValue);    //she wasn't there, but she is now.
    saveName(currentValue);
}

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function getName() {
    nameForm.classList.add("showing");
    nameForm.addEventListener("submit", noSubmit);
    changeBtn.classList.remove(SHOWING_CN);
}

function paintGreeting(text) {
    nameForm.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    changeBtn.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
    changeButton();
}

function changeButton() {
    changeBtn.addEventListener("click", changeName);
}

function changeName(event) {
    event.preventDefault();
    localStorage.removeItem(USER_LS);
    greeting.classList.remove(SHOWING_CN);
    nameForm.classList.add(SHOWING_CN);
    changeBtn.classList.remove(SHOWING_CN);
    nameInput.placeholder = "What is your name?";
    nameInput.value = "";
    init();
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        //she is not there
        getName();
    } else {
        //she is already there
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();