// const contents = [
//     {
//         id: 0,
//         category: 'Игровые компьютеры',
//         rating: '4.6',
//         price: '50т.р. - 80т.р',
//
//     },
//     {
//         id: 1,
//         category: 'Офисные компьютеры',
//         price: '30т.р. - 60т.р',
//         rating: '4.8'
//     },
//     {
//         id: 2,
//         category: 'Серверное оборудование',
//         price: '100т.р. - 200т.р',
//         rating: '4.7'
//     },
//     {
//         id: 3,
//         category: 'Ноутбуки',
//         price: '50т.р. - 120т.р',
//         rating: '4.7'
//     },
//     {
//         id: 4,
//         category: 'Принтеры, МФУ',
//         price: '10т.р. - 50т.р',
//         rating: '4.9'
//     },
//     {
//         id: 5,
//         category: 'Смартфоны',
//         price: '10т.р. - 120т.р',
//         rating: '4.3'
//     },
//     {
//         id: 6,
//         category: '3Д принтеры',
//         price: '10т.р. - 50т.р',
//         rating: '4.9'
//     },
//     {
//         id: 7,
//         category: 'DIY электроник',
//         price: '10т.р. - 50т.р',
//         rating: '4.1'
//     },
// ];

const contents = [];
let timeOnQuery = Date.now();
const xhr = new XMLHttpRequest();
xhr.open('GET', 'data.json');
xhr.onreadystatechange = function() {
    if (xhr.readyState !== 4 || xhr.status !== 200) {
        return;
    }
    const response = JSON.parse(xhr.responseText);
    response.forEach(e => contents.push(e))
    fillTable(contents)
}
xhr.send();
timeOnQuery = Date.now() - timeOnQuery + 1;

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
createTable(headers);
let id = null;
let tab = document.getElementsByClassName('tab')[0]

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
        tr.setAttribute('class', 'forAnyChange');
        tr.setAttribute('id', `${elem.id}`);

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
        if (elem.id > maxId)
         maxId = elem.id;
    })
    temp.id = ++maxId;
    contents.push(temp);


    console.log(contents)

    let newTr = document.createElement('tr');
    newTr.setAttribute('class', 'forAnyChange');
    newTr.setAttribute('id', maxId);


    let td1 = document.createElement('td');
    td1.setAttribute('name', 'category');
    td1.innerHTML = temp.category;
    newTr.appendChild(td1);
    let td2 = document.createElement('td');
    td2.innerHTML = temp.price;
    td2.setAttribute('name', 'price');
    newTr.appendChild(td2);
    let td3 = document.createElement('td');
    td3.innerHTML = temp.rating;
    td3.setAttribute('name', 'rating');
    newTr.appendChild(td3);

    formFields.category.value = '';
    formFields.price.value = '';
    formFields.rating.value = '';

    document.getElementsByClassName('tab')[0].appendChild(newTr);
}

tab.addEventListener('click', () => tableFunction(event))

document.getElementById('delete').addEventListener('click', () => {
    if (id === null || id === undefined) return;
    let result = confirm('Удалить выбранную строку ?');
    let nav = document.getElementsByClassName('forColor')[0]
    if (!result) {
        Array.from(tab.childNodes).forEach(e => {
            if (e.classList.contains('forColor')){

                e.classList.remove('forColor');
            }
        })
        return;
    }
    pagination();

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
    let formFields = document.forms[0].elements;

    contents[id].category = formFields.category.value;
    contents[id].price = formFields.price.value;
    contents[id].rating = formFields.rating.value;

    document.getElementsByClassName('tab')[0].remove();

    createTable()
    fillTable(contents);

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

document.getElementById('send').addEventListener('click', ()=>{
    addNew();
})

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


function pagination() {
    if (document.getElementsByClassName('pagination')[0] != null ||
        document.getElementsByClassName('pagination')[0] !== undefined)
            document.getElementsByClassName('pagination')[0].remove();

    let ul = document.createElement('ul');
    ul.setAttribute('class', 'pagination');
    document.getElementsByClassName('paging')[0].appendChild(ul);
    let notesOnPage = 3;
    let countOfPage = Math.ceil(contents.length / notesOnPage);
    let listLi = [];
    for (let i = 0; i < countOfPage; i++) {
        let li = document.createElement('li');
        li.setAttribute('class', 'liPage');
        li.innerHTML = (i + 1).toString();
        listLi.push(li)
        ul.appendChild(li);
    }

    let defaultArr = contents.slice(0, notesOnPage)
    fillTable(defaultArr)
    ul.addEventListener('click', ev => {
        if (ev.target.className === 'liPage') {

            Array.from(ul.childNodes).forEach(e => {
                if (e.classList.contains('active'))
                    e.classList.remove('active');
            })
            ev.target.classList.add('active')

            let pageNum = ev.target.innerHTML - 1;

            let start = pageNum * notesOnPage;
            let end = start + notesOnPage;

            let notes = contents.slice(start, end);

            document.getElementsByClassName('tab')[0].remove();

            createTable();
            fillTable(notes);

            document.getElementsByClassName('tab')[0].addEventListener('click', () => tableFunction(event))
    }
    })
}

function tableFunction(event) {
    if (event.target.parentElement.className === 'forAnyChange') {
        Array.from(document.getElementsByClassName('tab')[0].childNodes).forEach(e => {
            if (e.classList.contains('forColor'))
                e.classList.remove('forColor');
        })
        id = event.target.parentElement.id;
        event.target.parentElement.classList.add('forColor')
        let nav = document.getElementsByClassName('forColor')[0];
        let formFields = document.forms[0].elements;

        formFields.category.labels[0].innerText = 'Поменяйте категорию';
        formFields.price.labels[0].innerText = 'Поменяйте ценовой диапазон';
        formFields.rating.labels[0].innerText = 'Поменяйте рейтинг';

        formFields.category.value = nav.childNodes[0].innerHTML;
        formFields.price.value = nav.childNodes[1].innerHTML;
        formFields.rating.value = nav.childNodes[2].innerHTML;

        document.getElementById('edit').style.visibility = 'visible';
        document.getElementById('send').style.visibility = 'hidden';

    }
}