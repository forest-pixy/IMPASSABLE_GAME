'use strict';

// Элементы из HTML
const replenishElement = document.getElementById(`replenish`);
const withdrawElement = document.getElementById(`withdraw`);
const startElement = document.getElementById(`start`);
const balanceElement = document.getElementById(`balance`);
let containerElement = document.querySelector(`.container`);
const modalWindowElement = document.getElementById(`modal_window`);
const windowCloseElement = document.getElementById(`close`);
const paragraphElement = document.getElementById(`p1`);

// Глобальные переменные
let number = Math.ceil(Math.random() * 3600);
balanceElement.textContent = 0;
let balance = 0;
let sumScore = 0;
let game = false;
let staps = true;

//  Закрыть Модальное окно нажав на кнопку
windowCloseElement.addEventListener(`click`, function() {
    modalWindowElement.style.display = "none";
});

// Закрыть модальное окно в любой части экрана
window.onclick = function(event) {
    if (event.target == modalWindowElement) {
      modalWindowElement.style.display = "none";
    };
};

// Добавить средства
replenishElement.addEventListener(`click`, function replenish(){
    balanceElement.textContent = 1000;
    balance = 1000;
    sumScore = 1000;
    game = true;
});

// Игра
startElement.addEventListener(`click`, function() { 
    if(game && staps) {
        staps = false;
    // Крутит колесо
    containerElement.style.transform = "rotate("+ number +"deg)"; 
    number += Math.ceil(Math.random() * 3600); 
    // Определяет выпавший блок
    const arrow = document.querySelectorAll('.span')[0] 
    Promise.all(containerElement.getAnimations().map((animation) => animation.finished)).then( 
        () => { 
            const result = document.elementsFromPoint(getOffset(arrow).left + arrow.offsetWidth/2, getOffset(arrow).top)  
            // Добавить средства
            balance = balanceElement.textContent; 
            if(Number(balance) > 0) {
                let fund = result[1].textContent;
                console.log(fund);
                if(fund.typeof === `number` || fund > 0) {
                    sumScore += Number(fund);
                    balanceElement.textContent = sumScore;
                    staps = true;
                } else if(fund.typeof === `number` || fund < 0) {
                    sumScore += Number(fund);
                    balanceElement.textContent = sumScore;
                    staps = true;
                }  else {
                    game = false;
                    balanceElement.textContent = 0;
                    sumScore = 1000;
                    game = false;
                    modalWindowElement.style.display = "";
                    paragraphElement.textContent = ``;
                    document.getElementById(`heading`).textContent = `GAME OVER`;
                    staps = true;
                };
            } else if(Number(balance) <= 0) {
                game = false;
                balanceElement.textContent = 0;
                sumScore = 1000;
                game = false;
                let fund = balanceElement.textContent;
                modalWindowElement.style.display = "";
                paragraphElement.style.textAlign = "center";
                paragraphElement.textContent = `Fund: ${fund}`;
                document.getElementById(`heading`).textContent = `GAME OVER`;
                staps = true;
            };
    });
    };
});

// Координаты
function getOffset(el) { 
    const rect = el.getBoundingClientRect(); 
    return { 
      left: rect.left + window.scrollX, 
      top: rect.top + window.scrollY 
    }; 
};

// Вывод средств
withdrawElement.addEventListener(`click`, function(){
    let balance = balanceElement.textContent;
    if(balance > 10000) {
        let fund = balanceElement.textContent;
        paragraphElement.style.textAlign = "center";
        modalWindowElement.style.display = "";
        paragraphElement.textContent = `Fund: ${fund}`;
        document.getElementById(`heading`).textContent = `YOU WIN`;
        balanceElement.textContent = 0;
        sumScore = 1000;
        game = false;
        staps = true;
    } else {
        let fund = balanceElement.textContent;
        modalWindowElement.style.display = "";
        paragraphElement.textContent = `Withdrawal from 10000 \n fund: ${fund}`;
        paragraphElement.style.textAlign = "center";
    };
});