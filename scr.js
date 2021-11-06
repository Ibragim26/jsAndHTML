
let FLAG_ON_DELETE = false;
let FLAG_ON_EDIT = false

const contents = [
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

const headers = [
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

function createTable(header = headers) {
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

function fillTable(content = contents, header = headers) {
    let index = 0;
    content.forEach((elem) => {

        let tr = document.createElement('tr');
        tr.setAttribute('id', `${index++}`)
        tr.setAttribute('class', 'forAnyChange')

        header.forEach(head => {
            let td = document.createElement('td');
            td.setAttribute('name', `${head.field}`);
            td.innerHTML = elem[head.field];
            tr.appendChild(td);
        })
        document.querySelector('.tab').appendChild(tr);
    })
}
function addNew() {
    let temp;
    let formFields = document.forms[0].elements;
    temp = {
        category: formFields.category.value,
        price: formFields.price.value,
        rating: formFields.rating.value
    }
    document.querySelector('.tab').remove();
    contents.push(temp);
    createTable();
    fillTable();
}


createTable(headers);
fillTable(contents, headers);


let trs = document.getElementsByClassName('forAnyChange')

for (let tr of trs) {
    tr.addEventListener('click', () => {

        let formFields = document.forms[0].elements;
        formFields.category.labels[0].innerText = 'Поменяйте категорию';
        formFields.category.value = contents[tr.id].category;

        formFields.price.labels[0].innerText = 'Поменяйте ценовой диапазон';
        formFields.price.value = contents[tr.id].price;

        formFields.rating.labels[0].innerText = 'Поменяйте рейтинг';
        formFields.rating.value = contents[tr.id].rating;



        formFields.category.oninput = () => {
            console.log(2)
            contents[tr.id].category = formFields.category.value;
            createTable();
            fillTable();
        }
        formFields.rating.oninput = () => {
            contents[tr.id].rating = formFields.rating.value;
            createTable();
            fillTable();
        }
        formFields.price.oninput = () => {
            contents[tr.id].price = formFields.price.value;
            createTable();
            fillTable();
        }

    }
)}




document.getElementById('delete').addEventListener('click', ()=> {
    FLAG_ON_DELETE = true;

    if (!FLAG_ON_DELETE) return;

    let trs = document.getElementsByClassName('forAnyChange')

    for (let tr of trs) {
         tr.addEventListener('dblclick', function () {
             let result = confirm(`Удалить ${+this.id + 1} строку ?`);



             if (!result) return;

             FLAG_ON_DELETE = false;

             contents.splice(this.id, 1);

             document.querySelector('.tab').remove();
             createTable();
             fillTable();
        })
    }
})
document.getElementById('send').addEventListener('click', ()=>{addNew()})
