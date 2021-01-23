/////////////////сворачивание и розворачивание по нажатию кнопок
// clasic
let clasicAdd = document.getElementById('clasic');
let clasicCalculus = document.getElementById('clasic_block');

  clasicAdd.addEventListener('click', function(e){
    e.preventDefault();

    // remove
    if(curencyCalculus.classList.contains('active')) {
        curencyCalculus.classList.remove('active');
    };
    if(percentCalculus.classList.contains('active')) {
    percentCalculus.classList.remove('active');
    };

    // add
    if(clasicCalculus.classList.contains('active')) {
        clasicCalculus.classList.remove('active');
      }else {
        clasicCalculus.classList.add('active');
    };
  });

// curency
let curencyAdd = document.getElementById('curency');
let curencyCalculus = document.getElementById('curency_block');

curencyAdd.addEventListener('click', function(e){
    e.preventDefault();

    // remove
    if(clasicCalculus.classList.contains('active')) {
        clasicCalculus.classList.remove('active');
    };
    if(percentCalculus.classList.contains('active')) {
        percentCalculus.classList.remove('active');
    };

    // add
    if(curencyCalculus.classList.contains('active')) {
        curencyCalculus.classList.remove('active');
      }else {
        curencyCalculus.classList.add('active');
    }
  });

// percent
let percentAdd = document.getElementById('percent');
let percentCalculus = document.getElementById('percent_block');

percentAdd.addEventListener('click', function(e){
    e.preventDefault();

    // remove
    if(clasicCalculus.classList.contains('active')) {
        clasicCalculus.classList.remove('active');
    };
    if(curencyCalculus.classList.contains('active')) {
        curencyCalculus.classList.remove('active');
    };

    // add
    if(percentCalculus.classList.contains('active')) {
        percentCalculus.classList.remove('active');
      }else {
        percentCalculus.classList.add('active');
    };
  });
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////класический калькулятор
  const output = document.querySelector('output')// доступ к аутпуту

  const div = document.createElement('div') //создаем див
  div.classList.add('keyboard') //добавляем клас диву
  document.querySelector('.calculator').appendChild(div)//вставляем в штмл
  
  'C CE % / 7 8 9 * 4 5 6 - 1 2 3 + 0 ( ) ='.split(' ')//делим по пробелу
      .map(symbol => {
          div.insertAdjacentHTML('beforeend', `<button value="${symbol}">${symbol}</button>`)
      })
  
  div.addEventListener('click', e => {
      if(e.target.tagName === 'BUTTON') {
          calc(e.target.value)
      }
  })//добаляем слушатель события
  
  document.addEventListener('keydown', e => {
      if ((e.key).match(/[0-9%\/*\-+\(\)=]|Backspace|Enter/)) calc(e.key)
  })//добаляем слушатель события
  
  function calc(value) {
      if (value.match(/=|Enter/)) {
          try {
              if (output.textContent !== '') {
                  output.textContent = Math.trunc(math.evaluate(output.textContent))
              }
          } catch {
              let oldValue = output.textContent
              let newValue = 'недопустимое выражение'
  
              output.textContent = newValue
              const timer = setTimeout(() => {
                  output.textContent = oldValue
                  clearTimeout(timer)
              }, 1500)
          }
      } else if (value === 'C') {
          output.textContent = ''
      } else if (value.match(/CE|Backspace/)) {
          output.textContent = output.textContent.substring(0, output.textContent.length - 1)
      } else {
          output.textContent += value
      }
  }//функция работы с калькулятором

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////// работа с апи

// coingecko апи + создание карточек через цикл

request("GET", "https://api.coingecko.com/api/v3/coins/list")//адрес запроса где взять данные
.then((geko) => {
    let gekoParsing = JSON.parse(geko.target.responseText)// парсит джсон для работы с js обьектом

    for (let i = 0; i <= gekoParsing.length; i++) {
        
        let coinName = gekoParsing[i].name;// имя монеты
        let coinSymbol = gekoParsing[i].symbol;// символ монеты
        let coinId = gekoParsing[i].id;// идентификатор монеты, нужен для определения цены
        let curencyChart = document.getElementById('curency_chart');// доступ к елементу для вставки карточек
        let div = document.createElement('div');// создаем контейнер для карточки

        let select = document.getElementById('dropdown')// доступ к выпадающему списку селект
        let optionAdd = document.createElement('option');//создаем опшины
        
        div.id = coinId;//присваиваем айди созданым дивам
        div.className = "curency_card";//присваиваем клас созданым дивам
        div.innerHTML = `<h2> <b>Имя:</b> ${coinName} </h2> <span> <b>Тикер:</b> ${coinSymbol}</span>`// записываем внутрь карточки
        curencyChart.append(div); // записываем в html по айди блока

        optionAdd.value = coinId;//присваиваем vale созданым опшинам
        optionAdd.innerHTML = `${coinSymbol}`;// записываем в опшины
        select.append(optionAdd);// записываем в html по айди селекта

    }

}).catch()

function request(method, url) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = resolve;
        xhr.onerror = reject;
        xhr.send();
    });// что делать при запуске функции и в каких случаях
};// функция запроса на апи сервер по методу и адресу из реквеста выше

// работа калькулятора валют
 
function getValue() {

    let getCoin = document.getElementById("dropdown");//получаем доступ к полю
    let getCoinValue = getCoin.value;//получаем значения для испльзования в апи в качестве айди

    let getNumber = document.getElementById("curence_get_number");//получаем доступ к полю
    let getNumberValue = getNumber.value;//получаем количество монет

    let getPrice = document.getElementById("dropdown_price");//получаем доступ к полю
    let getPriceValue = getPrice.value;//получаем начения для испльзования в апи в качестве айди

    request("GET", "https://api.coingecko.com/api/v3/simple/price?ids="+getCoinValue+"&vs_currencies="+getPriceValue)
    .then((coin) => {

        let coinParsing = JSON.parse(coin.target.responseText)// парсит джсон для работы с js обьектом        
        let curencyResult = getNumberValue*coinParsing[getCoinValue][getPriceValue];//умножает количество на цену
        document.getElementById("curency_result").innerHTML = curencyResult;//записывает результат в штмл
    }).catch();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//процентный калькулятор

function calculate() {
    let percentInput = document.getElementById("percent_input");// доступ к полю с искомым значением
    let percentInputValue = percentInput.value;// нужное количество процентов

    let percentGetNumber = document.getElementById("percent_get_number");// доступ к полю откуда считать искомое
    let percentGetNumberValue = percentGetNumber.value;// цифра от которой считать процент

    let percentDropdown = document.getElementById("percent_type");// доступ к списку режимов
    let percentDropdownValue = percentDropdown.value;// режим работы калькулятора

    let percentResultPrint = document.getElementById("percent_result");// доступ к полю для вывода результата
    
    if (percentInputValue > 0 && percentGetNumberValue > 0) {// проверка больше ли нуля наши значения
        switch (percentDropdownValue) {//условие на выбраный режим для калькулятора
            case "0"://сработает если не выбран режим
                alert('Ой, похоже вы не выбрали нужный режим.');
                break;
            case "1":// Процент составляет от числа
                let percentResult_1 = percentGetNumberValue * percentInputValue / 100;
                percentResultPrint.innerHTML = percentResult_1;
                break;
            case "2":// Сколько прoцентов составляет число
                let percentResult_2 = percentInputValue / percentGetNumberValue * 100;
                percentResultPrint.innerHTML = percentResult_2;
                break;
            case "3":// Прибавить процент к числу
                let percentResult_3 = ((percentGetNumberValue / 100)*percentInputValue) + Number(percentGetNumberValue);
                percentResultPrint.innerHTML = percentResult_3;
                break;
            case "4"://Вычесть процент из числа
                let percentResult_4 = Number(percentGetNumberValue) - ((percentGetNumberValue / 100)*percentInputValue);
                percentResultPrint.innerHTML = percentResult_4;
                break;
            default: // на случай непредвиденых ошибок
                alert("Ой, что-то пошло не по плану. Проверьте введеные данные");
                break;
        };
    }else{//сработает если значения меньше или равны нулю
        alert("Введеные цифры должны быть больше нуля.");
    };
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    