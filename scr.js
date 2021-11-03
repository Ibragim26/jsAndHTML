
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
    document.querySelector('.dynTa');
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
            document.querySelector('.tab').appendChild(tr);
        })
    })
}


createTable(header);
fillTable(content, header);

