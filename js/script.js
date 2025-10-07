//docinemt - это объект,который предоставляет всю html страницу 
const buttonTheme = document.getElementById('themeThoggle');
function toggleTheme(){
    //body - из html
    //classlist - получает весь список классов у элемента
    //toggle - переключает класс (если класса нет - создает, если есть - удалаяет)
    document.body.classList.toggle('dark-theme');
    //contains() - проверяет существование класса у элемента 
    if(document.body.classList.contains('dark-theme')){
        //используем переменную в которой хранится кнопка
        //buttonTheme переменная в которой хранится кнопка
        //textContent изменить содержимое текста тэга
        buttonTheme.textContent = 'Светлый';
    }else{
        buttonTheme.textContent = 'Темный';
    }
}

//добавим обработчика события (нажатие на кнопку)
//addEventListener() - 'слушает' событие на элементе
// 'click' = тип события (клик мышкой)
// toggleTheme - выполнить функцию при нажатии 
buttonTheme.addEventListener('click', toggleTheme);



const homeButton = document.getElementById('aoftheweb');

function aoftheweb(){
    document.body.classList.toggle('dark-theme');
    if(document.body.classList.contains('dark-theme')){
        homeButton.textContent = 'мой сайт';

    }else{
        homeButton.textContent = 'мой сайт';
    }
}

homeButton.addEventListener('click', aoftheweb);
