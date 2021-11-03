

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
// const arr = [
//
//     ['Игровые компьютеры', '50т.р. - 80т.р', '4.6'],
//     ['Офисные компьютеры', '30т.р. - 60т.р', '4.8'],
//     ['Серверное оборудование', '100т.р. - 200т.р', '4.4'],
//     ['Ноутбуки', '50т.р. - 120т.р', '4.7'],
//     ['Принтеры, МФУ', '10т.р. - 50т.р', '4.9'],
//     ['Смартфоны', '10т.р. - 120т.р', '4.3'],
//     ['3Д принтеры', '10т.р. - 80т.р', '4.2'],
//     ['DIY электроника', '10т.р. - 50т.р', '4.1'],
//
// ]

const content = [
    {
        category: 'Наименование',
        price: 'Цены',
        rating: 'Оценка'
    },
    {
        category: 'Игровые компьютеры',
        price: '50т.р. - 80т.р',
        rating: '4.6'
    },
    {
        category: 'Офисные компьютеры',
        price: '30т.р. - 60т.р',
        rating: '4.8'
    },
    {
        category: 'Серверное оборудование',
        price: '100т.р. - 200т.р',
        rating: '4.7'
    },
    {
        category: 'Ноутбуки',
        price: '50т.р. - 120т.р',
        rating: '4.7'
    },
    {
        category: 'Принтеры, МФУ',
        price: '10т.р. - 50т.р',
        rating: '4.9'
    },
    {
        category: 'Смартфоны',
        price: '10т.р. - 120т.р',
        rating: '4.3'
    },
    {
        category: '3Д принтеры',
        price: '10т.р. - 50т.р',
        rating: '4.9'
    },
    {
        category: 'DIY электроник',
        price: '10т.р. - 50т.р',
        rating: '4.1'
    },
]

// const heads = {
//     category: 'Наименование',
//     price: 'Цены',
//     rating: 'Оценка'
// }
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

function dynTable(content, category) {
    document.querySelector('.dynTa')
        .innerHTML = `<table class="tab" border="2"></table>`



    const temp = content[0]
    content.forEach((elem) => {
        let counter = 0
        let tr = document.createElement('tr');
        let trHead = document.createElement('tr')
        category.forEach(cat => {
            if (elem === temp ){
                let thHead = document.createElement('th')
                thHead.innerHTML = elem[cat]
                trHead.appendChild(thHead)
            }else {
                let td = document.createElement('td');
                if (counter === 0) {
                    let a = document.createElement('a')
                    a.setAttribute('src', '#')
                    a.setAttribute('class', 'category')
                    a.innerHTML = elem[cat]
                    td.appendChild(a)
                } else {
                    td.innerHTML = elem[cat]
                }
                counter++
                tr.appendChild(td);
                document.querySelector('.tab').appendChild(tr)
            }
            document.querySelector('.tab').appendChild(trHead)
        })




    })
    // let trHead = document.createElement('tr')
    // heads.forEach((elem) => {
    //     let thHead = document.createElement('th')
    //     thHead.innerHTML = elem
    //     trHead.appendChild(thHead)
    // })
    //
    // document.querySelector('.tab').appendChild(trHead)
    //
    // content.forEach((elem) => {
    //     let counter = 0
    //     let tr = document.createElement('tr');
    //
    //     for (let key in elem){
    //         let td = document.createElement('td');
    //         if (counter === 0)
    //         {
    //             let a = document.createElement('a')
    //             a.setAttribute('src', '#')
    //             a.setAttribute('class', 'category')
    //             a.innerHTML = elem[key]
    //             td.appendChild(a)
    //         }else {
    //             td.innerHTML = elem[key]
    //         }
    //         counter++
    //         tr.appendChild(td);
    //     }
    //     document.querySelector('.tab').appendChild(tr)
    // })
}


dynTable(content, ['category'])

