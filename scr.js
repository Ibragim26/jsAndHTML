
const content = [
    {
        category: 'Игровые компьютеры',
        rating: '4.6',
        price: '50т.р. - 80т.р',

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

const header = [
    {
        name: 'Наименование',
        field: 'category'
    },
    {
        name: 'Цены',
        field: 'price'
    },
    {
        name: 'Оценка',
        field: 'rating'
    }
];

function createTable(header) {
    document.querySelector('.dynTa')
        .innerHTML = `<table class="tab" border="2"></table>`
    let tr = document.createElement('tr');
    header.forEach( head => {
        let th = document.createElement('th')
        th.innerHTML = head.name
        tr.appendChild(th)
    });

    document.querySelector('.tab').appendChild(tr);
}

function fillTable(content, header) {
    content.forEach((elem) => {
        let tr = document.createElement('tr');
        header.forEach(head => {
            let td = document.createElement('td');
            td.innerHTML = elem[head.field];
            tr.appendChild(td);
        })
        document.querySelector('.tab').appendChild(tr);
    })
}

function createForm(header) {
    document.querySelector('.insert')
        .innerHTML = `<form class="insertion"></form>`;
    header.forEach((head) => {
        const label = document.createElement('label')
        label.setAttribute('for', `${head.field}`);
        label.innerHTML = `Введите вашу ${head.name}`;
        const input = document.createElement('input');
        input.setAttribute('id',`${head.field}`);
        document.querySelector('.insert').appendChild(label);
        document.querySelector('.insert').appendChild(input);

    })
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('id', 'but');
    button.innerHTML = 'Отправить';

    button.addEventListener('click', ()=>{addNew(header)})


    document.querySelector('.insert').appendChild(button);
}

function addNew(header) {

    let tmpForHeader = header;
    let counter = 0;

    let temp = {};
    header.forEach((head) => {
        if (document.getElementById(`${head.field}`).value === '')
            counter++
        temp[`${head.field}`] = document.getElementById(`${head.field}`).value;
        document.getElementById(`${head.field}`).value = '';
    })
    if (counter === header.length){
        alert('your input is empty')
        return
    }


    content.push(temp);

    document.querySelector('.tab').remove();



    createTable(tmpForHeader);
    fillTable(content, tmpForHeader);
}
createTable(header);
fillTable(content, header);
createForm(header)
