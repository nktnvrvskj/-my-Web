// === ПЕРЕМЕННЫЕ === //
// находм все необходимые элементы на странице и сохраняем в переменные //
const buttonTheme = document.getElementById('themeThoggle');
const tasksInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const totalTasksSpan = document.getElementById('totalTasks');
const completedTasksSpan = document.getElementById('completedTasks');

// Массив для хранения данных (задач)
let tasks = [];

function toggleTheme(){
    
    document.body.classList.toggle('dark-theme');
    
    if(document.body.classList.contains('dark-theme')){
        
        buttonTheme.textContent = 'Светлый';
        localStorage.setItem('darkTheme','enabled');
        //локальное хранилище состояния темы (чтобы сохранить тему после загрузки)
    }else{
        buttonTheme.textContent = 'Темный';
        localStorage.setItem('darkTheme','disabled');
    }
}
// === ФУНКЦИИ ДЛЯ РАБОТЫ С ЗАДАЧАМИ ===

// функция добавления новой задачи
function addTask(){
    //trim - убирает лишние пробелы в значении
    const taskText = tasksInput.value.trim();

    //проверка на пустое поле ввода
    if (taskText == ''){
        alert('пожалуйста введите задачу!');
        return; // выход из функции (перрываеие выполнения функции)
    }
    //создание объекта задачи
    //объекты - это структура, которая хранит данные в виде пар - ключ, значение
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    }
    //добавление нашей задачи в список (массив) задач
    //push() - добавление элемента в конец списка(appened в Pyton)
    tasks.push(newTask)
    
    //очищаем поля ввода после получения данных
    tasksInput.value = '';
    savedTask();
    //обновляем список задач (отображение списка)
    renderTasks();

    // обервляем счетчики задач
    updateCounters();
}

function toggleTaskCompletion(taskid){
    const task = tasks.find(task => task.id === taskid);

    if(task){
        task.completed = !task.completed;
        savedTask();
        renderTasks();
        updateCounters();
    }

}

function deleteTask(taskid){
    tasks = tasks.filter(task => task.id !== taskid);
    savedTask();
    renderTasks();
    updateCounters();
}

function updateCounters(){
    const totalTasks = tasks.length;

    const completedTasks =tasks.filter(task => task.completed).length; 
    totalTasksSpan.textContent = totalTasks;
    completedTasksSpan.textContent = completedTasks;
}



//функция отображения(обновления) всего списка задач
function renderTasks(){
    //очищение текущего списка
    taskList.innerHTML = '';

    //перебераем все элементы в массиве
    //forEach() - метод перебора каждго элемента массива
    tasks.forEach(task => {
        //создание элемента списка
        // CreateElemment() - метод создаия нового HTML-элемента
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';

        //добавление класса если задача выполнена
        if(task.completed){
            taskItem.classList.add('completed');
        }

        //Создание HTMl структуру для новой задачи
        taskItem.innerHTML =`
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
            <span class="task-text">${task.text}</span>
            <button class="delete-task">✕</button>
        `;
        

        const checkbox = taskItem.querySelector('.task-checkbox');
        const deletebtn = taskItem.querySelector('.delete-task');

        checkbox.addEventListener('click', () =>{
            toggleTaskCompletion(task.id);
        });

        deletebtn.addEventListener('click', () =>{
            deleteTask(task.id);
        });

        //добавляем задачу в список HTML
        //appedChild() - метод добавления элемента в конец другого элемента
        taskList.appendChild(taskItem);

    });
}



// === ОБРАБОТЧИКИ СОБЫТИЙ ===
buttonTheme.addEventListener('click', toggleTheme);

addTaskBtn.addEventListener('click', addTask);

// === ИНИЦИАЛИЗАЦИЯ ===
// проверка сохранённой темы
if(localStorage.getItem('darkTheme') ==='enabled'){
    document.body.classList.add('dark-theme');
    buttonTheme.textContent = 'Светлый';
}

// загружаем задачи из localStorage при загрузке страницы
function loadTasks(){
    const savedTask = localStorage.getItem("tasks");
    if(savedTask){
        tasks = JSON.parse(savedTask)

        renderTasks();
        updateCounters()
    }
}

function savedTask(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// const originalAddTasks = addTask;
// addTask = function(){
//     originalAddTasks();
//     savedTask();

// }

loadTasks();