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
  /////////////////////////////////////////////////////////

  //////////////////класический калькулятор
  const output = document.querySelector('output')

  const div = document.createElement('div')
  div.classList.add('keyboard')
  document.querySelector('.calculator').appendChild(div)
  
  'C CE % / 7 8 9 * 4 5 6 - 1 2 3 + 0 ( ) ='.split(' ')
      .map(symbol => {
          div.insertAdjacentHTML('beforeend', `<button value="${symbol}">${symbol}</button>`)
      })
  
  div.addEventListener('click', e => {
      if(e.target.tagName === 'BUTTON') {
          calc(e.target.value)
      }
  })
  
  document.addEventListener('keydown', e => {
      if ((e.key).match(/[0-9%\/*\-+\(\)=]|Backspace|Enter/)) calc(e.key)
  })
  
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
  }
////////////////////////////////////////////////////////////////

////////////////////////////////////// работа с апи

/* запрос на коин маркет кап апи

                    // coinamrketcat api key - b41bb78d-89c9-4514-9f0a-d180b691d8f7

                    let coinMarketCapKey = "b41bb78d-89c9-4514-9f0a-d180b691d8f7";

                    request("GET", "https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest?CMC_PRO_API_KEY=" + coinMarketCapKey)//адрес запроса где взять данные и по какому ключу
                    .then((r1) => {
                        let parsing = JSON.parse(r1.target.responseText)// парсит джсон для работы с конкретным показателем
                        console.log(parsing.data.quote.USD.total_market_cap);
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

запрос на коин маркет кап апи*/


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

        div.className = "curency_card";//присваиваем клас созданым дивам
        div.innerHTML = `<h2> <b>Имя:</b> ${coinName} </h2> <span> <b>Тикер:</b> ${coinSymbol}</span>`// записываем внутрь карточки
        curencyChart.append(div) // записываем в html по айди блока
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

