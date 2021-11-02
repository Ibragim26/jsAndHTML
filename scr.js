

// const PHONE_NUMBER = {
//     'Пожарная служба': [
//         ['num1', '101'],
//         ['num2', '102'],
//         ['num3', '103'],
//     ],
//     'Полиция': [
//         ['num1', '101'],
//         ['num2', '202']
//     ],
//     'Скорая помощь': [
//         ['num1', '03']
//     ]
// }
//
// document.querySelector('.wrapper').innerHTML =
//     `<table class="phone"> </table>`
// for (key in PHONE_NUMBER){
//     let row = document.createElement('tr')
//     row.innerHTML = `<td colspan="2">${key}</td>`
//     document.querySelector('.wrapper').appendChild(row)
//     for (let i = 0; i < PHONE_NUMBER[key].length; i++){
//         let row = document.createElement('tr')
//         row.innerHTML = `
//             <td>${PHONE_NUMBER[key][i][0]}</td>
//             <td>${PHONE_NUMBER[key][i][1]}</td>
//         `
//         document.querySelector('.wrapper').appendChild(row)
//     }
// }


const person = {
    name: 'Ivan',
    age: 20,
    job: 'developer',
    height: 175,
}
const arr = [

    ['Игровые компьютеры', '50т.р. - 80т.р', '4.6'],
    ['Офисные компьютеры', '30т.р. - 60т.р', '4.8'],
    ['Серверное оборудование', '100т.р. - 200т.р', '4.4'],
    ['Ноутбуки', '50т.р. - 120т.р', '4.7'],
    ['Принтеры, МФУ', '10т.р. - 50т.р', '4.9'],
    ['Смартфоны', '10т.р. - 120т.р', '4.3'],
    ['3Д принтеры', '10т.р. - 80т.р', '4.2'],
    ['DIY электроника', '10т.р. - 50т.р', '4.1'],

]
const heads = ['Наименование', 'Цены', 'Оценка']
// function dynTable(arr) {
//     document.querySelector('.dynTa')
//         .innerHTML = `<table class="tab"></table>`
//     for (let i = 0; i < arr.length; i++) {
//         let tr = document.createElement('tr');
//         for (let j = 0; j < arr[i].length; j++) {
//             let td = document.createElement('td');
//             td.innerHTML = arr[i][j];
//             tr.appendChild(td);
//         }
//         document.querySelector('.tab').appendChild(tr)
//     }
// }

function dynTable(heads, arr) {
    document.querySelector('.dynTa')
        .innerHTML = `<table class="tab"></table>`

    let trHead = document.createElement('tr')
    for (let x in heads){
        let thHead = document.createElement('th')
        thHead.innerHTML = heads[x]
        trHead.appendChild(thHead)
    }

    document.querySelector('.tab').appendChild(trHead)

    //for (let i = 0; i < arr.length; i++) {
    for (let keyX in arr){
        let counter = 0
        let tr = document.createElement('tr');
       // for (let j = 0; j < arr[i].length; j++) {
        for (let keyY in arr[keyX]){

            let td = document.createElement('td');

            if (counter === 0)
            {
                let a = document.createElement('a')
                a.setAttribute('src', '#')
                a.setAttribute('class', 'category')
                a.innerHTML = arr[keyX][keyY]
                td.appendChild(a)
            }else {
                td.innerHTML = arr[keyX][keyY];
            }
            counter++
            tr.appendChild(td);

        }
        document.querySelector('.tab').appendChild(tr)
    }
}

dynTable(heads,arr)

