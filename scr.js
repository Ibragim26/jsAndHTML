

const person = {
    name: 'Ivan',
    age: 20,
    job: 'developer',
    height: 175,
}

function dynTable(arr) {
    document.querySelector('body')
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
