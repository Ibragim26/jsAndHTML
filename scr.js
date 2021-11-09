
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
];

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
        .innerHTML = `<table class="tab" border="2"></table>`;
    let tr = document.createElement('tr');
    header.forEach( head => {
        let th = document.createElement('th');
        th.innerHTML = head.name;
        tr.appendChild(th);
    });

    document.querySelector('.tab').appendChild(tr);
}

function fillTable(content = contents, header = headers) {
    let index = 0;
    content.forEach((elem) => {

        let tr = document.createElement('tr');
        tr.setAttribute('id', `${index++}`);
        tr.setAttribute('class', 'forAnyChange');

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
    };

    contents.push(temp);

    let newTr = document.createElement('tr');
    newTr.setAttribute('id', contents.length - 1);
    newTr.setAttribute('class', 'forAnyChange');

    let tr1 = document.createElement('td');
    tr1.setAttribute('name', 'category');
    tr1.innerHTML = temp.category;
    newTr.appendChild(tr1);
    let tr2 = document.createElement('td');
    tr2.innerHTML = temp.price;
    tr2.setAttribute('name', 'price');
    newTr.appendChild(tr2);
    let tr3 = document.createElement('td');
    tr3.innerHTML = temp.rating;
    tr3.setAttribute('name', 'rating');
    newTr.appendChild(tr3);

    tab.appendChild(newTr);
}

createTable(headers);
fillTable(contents, headers);



let tab = document.getElementsByClassName('tab')[0]
tab.addEventListener('click', event => {
    if (event.target.parentElement.className === 'forAnyChange') {
        tab.childNodes.forEach(e => {
            if (e.id % 2 === 0) {
                e.style.background = '#C9E3FE';
            } else
                e.style.background = '#fff';
        })
        tab.childNodes[0].style.background = '#fff';
        console.log(1)

        let nav = event.target.parentElement;
        let formFields = document.forms[0].elements;
        formFields.category.labels[0].innerText = 'Поменяйте категорию';
        formFields.price.labels[0].innerText = 'Поменяйте ценовой диапазон';
        formFields.rating.labels[0].innerText = 'Поменяйте рейтинг';

        formFields.category.value = contents[nav.id].category;
        formFields.price.value = contents[nav.id].price;
        formFields.rating.value = contents[nav.id].rating;

        event.target.parentElement.style.background = '#0ff'

        document.getElementById('edit').style.visibility = 'visible';
        document.getElementById('send').style.visibility = 'hidden';

        document.getElementById('edit').addEventListener('click', () => {
            contents[nav.id].category = formFields.category.value;
            contents[nav.id].price = formFields.price.value;
            contents[nav.id].rating = formFields.rating.value;

            nav.childNodes[0].innerText = formFields.category.value;
            nav.childNodes[1].innerText = formFields.price.value;
            nav.childNodes[2].innerText = formFields.rating.value;

            formFields.category.labels[0].innerText = 'Введите категорию';
            formFields.price.labels[0].innerText = 'Введите ценовой диапазон';
            formFields.rating.labels[0].innerText = 'Введите рейтинг';

            document.getElementById('send').style.visibility = 'visible';
            document.getElementById('edit').style.visibility = 'hidden';

            nav.style.background = '#fff'

            formFields.category.value = '';
            formFields.price.value = '';
            formFields.rating.value = '';

            console.log(2)

        }, {capture:true, once: true})

        document.getElementById('delete').addEventListener('click', () => {
            if (event.target.parentElement.className === 'forAnyChange') {
                let color = event.target.parentElement.style.background;
                event.target.parentElement.style.background = '#0ff';
                let result = confirm('Удалить выбранную строку ?');
                if (!result) {
                    event.target.parentElement.style.background = color;
                    return;
                }
                contents.splice(event.target.parentElement.id, 1);
                event.target.parentElement.remove();

            }
        }, {capture: true, once: true});
    }
}, {capture: true})


document.getElementById('send').addEventListener('click', ()=>{addNew()})