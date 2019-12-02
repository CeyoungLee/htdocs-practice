const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = document.querySelector(".js-toDoInput"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];


function deleteToDo(event) {
    const btn = event.target;
    const deleteLi = btn.parentNode;
    toDoList.removeChild(deleteLi);
    const cleanToDos = toDos.filter(function (toDo) {
        return toDo.id !== parseInt(deleteLi.id);
    });
    console.log(cleanToDos);
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
   // toDoList.parentElement.classList.add(SHOWING_CN);
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    const newId = toDos.length + 1;
    delBtn.innerText = " X ";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    if (currentValue.length <= 40) {
     //   if (toDoList.length <= 10) {
            paintToDo(currentValue);
            toDoInput.value = "";
     //   }else{
    //        alert("Too many To-dos!");

    } else {
        alert("Too long!");
    }
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    toDoForm.classList.add("showing");
    if (loadedToDos) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function (toDo) {
            paintToDo(toDo.text)
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();