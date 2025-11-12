//ждём загрузки стр
document.addEventListener("DOMContentLoaded",function(){
    //перем
    //js можно класть не только тип нои состояния
    // тегов из html
    const slidesContener = document.querySelector('.slides');// контенер со слайда
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next')

    // переменая с текушим слайд с 0
    let currentSlide = 0
    const totalSlides = slides.length;
})