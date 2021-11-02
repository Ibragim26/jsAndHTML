

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

function dynTable(arr) {
    document.querySelector('.dynTa')
        .innerHTML = `<table class="tab"></table>`
    for (let i = 0; i < arr.length; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < arr[i].length; j++) {
            let td = document.createElement('td');
            td.innerHTML = arr[i][j];
            tr.appendChild(td);
        }
        document.querySelector('.tab').appendChild(tr)
    }
}

dynTable(Object.entries(person))

