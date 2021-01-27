let addMassage = document.querySelector(".message");//доступ к полю со значением
let addButton = document.querySelector(".add");//доступ к кнопке добавления
let todo = document.querySelector(".todo");//доступ к списку для записи
let todoList = [];//пустой масив для вводимых данных и значений
if (localStorage.getItem("todo")) {
    todoList = JSON.parse(localStorage.getItem("todo"));//достаем из хранилища
    displayMassages();
};//проверка хранилища браузера
addButton.addEventListener("click", function () {
    if (!addMassage.value) {
        return;
    };//проверка на пустую строку 
    let newTodo = {
        todo: addMassage.value,
        checked: false,
        important: false
    };//шаблок обькта для масива
    todoList.push(newTodo);//запись данных в масив через метод пуш
    displayMassages();
    localStorage.setItem("todo",JSON.stringify(todoList));//запись в хранилище и преобразование джсона в строку для хранилища
    addMassage.value = "";//стираем значение велуе после добавления
});
function displayMassages() {
    let displayMassage = "";
    if (todoList.length === 0) {
        todo.innerHTML = "";
    }//стирает последнее значение с экрана
    todoList.forEach(function (item, i) {
        displayMassage += `
            <li>
                <input type="checkbox" id="item_${i}" ${item.checked ? "checked" : ' '}>
                <label for="item_${i}" class="${item.important ? "important" : " "}">${item.todo}</label>
            </li>`;//шаблон для вывода данных
        todo.innerHTML = displayMassage;//запись в штмл
    });//функция создания строк со значениями по шаблону
};//функция создания и вывода данных
todo.addEventListener("change", function (event) {
    let idInput = event.target.getAttribute("id");//доступ к айди нужного чекбокса
    let forLabel = todo.querySelector("[for="+idInput+"]");
    let valueLabel = forLabel.innerHTML;
    todoList.forEach(function (item) {
        if (item.todo === valueLabel) {
            item.checked = !item.checked;
            localStorage.setItem("todo",JSON.stringify(todoList));//обновляем хранилище
        };
    });//сохраняет изменения чекбокса в хранилище
});//функция для отмечания чекбокса с сохранением в хранилище
todo.addEventListener("contextmenu", function (event) {
    event.preventDefault();
    todoList.forEach(function (item, i) {
        if (item.todo === event.target.innerHTML) {
            if (event.ctrlKey) {
                todoList.splice(i, 1);//удаление нужного (пкм + контрл)
            }else{
                item.important = !item.important;//отметка важного (пкм)
            };
            displayMassages();
            localStorage.setItem("todo",JSON.stringify(todoList));//обновляем хранилище
        };
    });
});//функция удаления и отметки важного