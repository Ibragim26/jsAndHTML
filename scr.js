
const people = [
    {
        name: 'Name1',
        age: 20
    },
    {
        name: 'Name2',
        age: 21
    },
    {
        name: 'Name3',
        age: 22
    },
]


const person = {
    name: 'Ivan',
    age: 20,
    job: 'developer',
    height: 175,
}
document.querySelector('.wrapper').innerHTML = `
     <table class="person"> </table>`

function dynTable(table, arr) {
    for (let i = 0; i < arr.length; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < arr[i].length; j++) {
            let td = document.createElement('td');
            td.innerHTML = arr[i][j];
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

dynTable(document.querySelector('.person'), Object.entries(person))
console.log(Object.entries(person));