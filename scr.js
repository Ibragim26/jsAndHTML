const contents = [
    {
        id: 0,
        category: 'Игровые компьютеры',
        rating: '4.6',
        price: '50т.р. - 80т.р',

    },
    {
        id: 1,
        category: 'Офисные компьютеры',
        price: '30т.р. - 60т.р',
        rating: '4.8'
    },
    {
        id: 2,
        category: 'Серверное оборудование',
        price: '100т.р. - 200т.р',
        rating: '4.7'
    },
    {
        id: 3,
        category: 'Ноутбуки',
        price: '50т.р. - 120т.р',
        rating: '4.7'
    },
    {
        id: 4,
        category: 'Принтеры, МФУ',
        price: '10т.р. - 50т.р',
        rating: '4.9'
    },
    {
        id: 5,
        category: 'Смартфоны',
        price: '10т.р. - 120т.р',
        rating: '4.3'
    },
    {
        id: 6,
        category: '3Д принтеры',
        price: '10т.р. - 50т.р',
        rating: '4.9'
    },
    {
        id: 7,
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
    content.forEach((elem) => {

        let tr = document.createElement('tr');
        tr.setAttribute('id', `${elem.id}`);
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


    let maxId = 0;
    contents.forEach(elem => {
         maxId = elem.id;
    })

    contents.push(temp);

    maxId++

    temp.id = maxId;

    let newTr = document.createElement('tr');
    newTr.setAttribute('id', temp.id);
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

    formFields.category.value = '';
    formFields.price.value = '';
    formFields.rating.value = '';

    document.querySelector('.tab').appendChild(newTr);
}


createTable(headers);
fillTable(contents, headers);

let tab = document.getElementsByClassName('tab')[0]

let id = null;

tab.addEventListener('click', () => tableFunction(event))

document.getElementById('delete').addEventListener('click', () => {
    if (id == null) {
        return;
    }
    let result = confirm('Удалить выбранную строку ?');
    if (!result) {
        Array.from(tab.childNodes).forEach(e => {
            if (e.classList.contains('forColor'))
                e.classList.remove('forColor');
        })
        return;
    }

    let nav = document.getElementById(id);
    let formFields = document.forms[0].elements;

    contents.splice(id, 1);
    formFields.category.value = '';
    formFields.price.value = '';
    formFields.rating.value = '';



    formFields.category.labels[0].innerText = 'Введите категорию';
    formFields.price.labels[0].innerText = 'Введите ценовой диапазон';
    formFields.rating.labels[0].innerText = 'Введите рейтинг';

    document.getElementById('send').style.visibility = 'visible';
    document.getElementById('edit').style.visibility = 'hidden';

    tab.remove();
    createTable();
    fillTable(contents);

    document.getElementsByClassName('tab')[0].addEventListener('click', () =>{
        tableFunction(event)
    })

})

document.getElementById('edit').addEventListener('click', () => {
    if (id == null) {
        return;
    }
    let nav = document.getElementById(id);
    let formFields = document.forms[0].elements;

    contents[nav.id].category = formFields.category.value;
    contents[nav.id].price = formFields.price.value;
    contents[nav.id].rating = formFields.rating.value;

    nav.childNodes[0].innerText = formFields.category.value;
    nav.childNodes[1].innerText = formFields.price.value;
    nav.childNodes[2].innerText = formFields.rating.value;

    formFields.category.labels[0].innerText = 'Введите категорию';
    formFields.price.labels[0].innerText = 'Введите ценовой диапазон';
    formFields.rating.labels[0].innerText = 'Введите рейтинг';
    formFields.category.value = '';
    formFields.price.value = '';
    formFields.rating.value = '';

    Array.from(tab.childNodes).forEach(e => {
        if (e.classList.contains('forColor'))
            e.classList.remove('forColor');
    })

    document.getElementById('send').style.visibility = 'visible';
    document.getElementById('edit').style.visibility = 'hidden';

})

document.getElementById('asc').addEventListener('click', ()=>{
    contents.sort( (a, b)=> {
        if (a.category.charAt(0) === b.category.charAt(0)) return 0
        else if (a.category.charAt(0) > b.category.charAt(0)) return 1
        else return -1
    })
    tab.remove();
    createTable();
    fillTable(contents);

    document.getElementsByClassName('tab')[0].addEventListener('click', () =>{
        tableFunction(event)
    })
})

document.getElementById('desc').addEventListener('click', ()=>{
    contents.sort( (a, b)=> {
        if (a.category.charAt(0) === b.category.charAt(0)) return 0
        else if (a.category.charAt(0) < b.category.charAt(0)) return 1
        else return -1
    })
    tab.remove();
    createTable();
    fillTable(contents);

    document.getElementsByClassName('tab')[0].addEventListener('click', () =>{
        tableFunction(event)
    })
})

document.getElementById('send').addEventListener('click', ()=>{addNew()})

document.getElementById('filter').addEventListener('input', (event) => {
    let filter = event.target.value;
    let filteredContent = contents.filter(elem => {
        if (elem.category.toUpperCase().includes(filter.toUpperCase()))
            return elem;
    })
    tab.remove();
    createTable();
    fillTable(filteredContent);
    document.getElementsByClassName('tab')[0].addEventListener('click', () =>{
        tableFunction(event);
    })
})

function tableFunction(event) {
    if (event.target.parentElement.className === 'forAnyChange') {
        Array.from(document.getElementsByClassName('tab')[0].childNodes).forEach(e => {
            if (e.classList.contains('forColor'))
                e.classList.remove('forColor');
        })
        event.target.parentElement.classList.add('forColor')
        let nav = event.target.parentElement;
        let formFields = document.forms[0].elements;

        formFields.category.labels[0].innerText = 'Поменяйте категорию';
        formFields.price.labels[0].innerText = 'Поменяйте ценовой диапазон';
        formFields.rating.labels[0].innerText = 'Поменяйте рейтинг';

        formFields.category.value = contents[nav.id].category;
        formFields.price.value = contents[nav.id].price;
        formFields.rating.value = contents[nav.id].rating;

        document.getElementById('edit').style.visibility = 'visible';
        document.getElementById('send').style.visibility = 'hidden';

        id = nav.id;
    }
}