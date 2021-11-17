$(function () {
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
    const contents = [];
    $.ajax({
        url: 'data.json',
        dataType: 'json',
        cache: false,
        success: (data) => {
            data.forEach(e => contents.push(e))
            fillTable()
        }
    });

    let id = -1;

    createTable()
    $('#edit').hide()

    function createTable(header = headers) {
        $('<table class="tab" border="2"></table>').appendTo('.dynTa');
        $('<tr class="tabhead"></tr>').appendTo('.tab');
        header.forEach(head => {
            let th = $('<th></th>').appendTo('.tabhead');
            th.text(head.name);
        });
    }

    function fillTable(content = contents, header = headers) {
        content.forEach((elem) => {
            let tr = $('<tr class="forAnyChange"></tr>').appendTo('.tab');
            tr.attr('id', `${elem.id}`)
            header.forEach(head => {
                let td = $('<td></td>').appendTo(tr)
                td.attr('name', `${head.field}`);
                td.text(elem[head.field]);

            })

        })
    }

    $('#send').click(function(){
        let temp = new Object();
        let formFields = $('form input');
        Array.from(formFields).forEach(ins =>{
            let param = `${ins.name}`
            temp[param] = ins.value;
            ins.value = '';
        })

        let maxId = 0;
        contents.forEach(elem => {
            if (elem.id > maxId)
                maxId = elem.id;
        })
        temp.id = ++maxId;
        contents.push(temp);

        $('.tab').remove();
        createTable()
        fillTable()
    })

    $('.tab').click(()=>{tableFunction(event)})

    $('#delete').click(function () {
        if (id === null || id === undefined) return;
        let result = confirm('Удалить выбранную строку ?');
        if (!result) {
            $('.forColor').removeClass('forColor');
            return;
        }


        $('label[for="field_1"]').text('Введите категорию');
        $('label[for="field_2"]').text('Введите ваш ценовой диапозон');
        $('label[for="field_3"]').text('Введите рейтинг');

        let formFields = $('form input')

        Array.from(formFields).forEach(e => {
            e.value = '';
        })

        let myId = contents.findIndex(e => {
            if (e.id == id)
                return e
        });

        contents.splice(myId, 1);


        $('#edit').hide();
        $('#send').show();

        $('.tab').remove();
        createTable();
        fillTable();


        $('.tab').click(()=>{tableFunction(event)})
    })

    $('#edit').click( () => {
        let formFields = $('form input')
        Array.from(formFields).forEach(e => {
            contents[id][e.name] = e.value;
            e.value = ''
        })
        $('.tab').remove();
        createTable()
        fillTable(contents);

        $('label[for="field_1"]').text('Введите категорию');
        $('label[for="field_2"]').text('Введите ваш ценовой диапозон');
        $('label[for="field_3"]').text('Введите рейтинг');

        $('.tab').click(()=>{tableFunction(event)})

        id = null;
        $('#edit').hide();
        $('#send').show();
    })

    $('#filter').on('input', (event) => {
        let filter = event.target.value;
        let filteredContent = contents.filter(elem => {
            if (elem.category.toUpperCase().includes(filter.toUpperCase()))
                return elem;
        })
        $('.tab').remove();
        createTable();
        fillTable(filteredContent);
        $('.tab').click(()=>{tableFunction(event)})
    })

    $('#asc').click(()=>{
        contents.sort( (a, b)=> {
            if (a.category.charAt(0) === b.category.charAt(0)) return 0
            else if (a.category.charAt(0) > b.category.charAt(0)) return 1
            else return -1
        })
        $('.tab').remove();
        createTable();
        fillTable(contents);
        $('.tab').click(()=>{tableFunction(event)})
    })

    $('#desc').click(()=>{
        contents.sort( (a, b)=> {
            if (a.category.charAt(0) === b.category.charAt(0)) return 0
            else if (a.category.charAt(0) < b.category.charAt(0)) return 1
            else return -1
        })
        $('.tab').remove();
        createTable();
        fillTable(contents);
        $('.tab').click(()=>{tableFunction(event)})
    })

    function tableFunction(event) {
        if (event.target.parentElement.className === 'forAnyChange') {
            let formFields = $('form input');

            $('.forColor').removeClass('forColor');
            id = event.target.parentElement.id;
            event.target.parentElement.classList.add('forColor')

            $('label[for="field_1"]').text('Поменяйте категорию');
            $('label[for="field_2"]').text('Поменяйте ваш ценовой диапозон');
            $('label[for="field_3"]').text('Поменяйте рейтинг');

            Array.from(formFields).forEach(e => {
                e.value = $(`.forColor td[name=${e.name}]`).text()
            })
            $('#edit').show();
            $('#send').hide();
        }
    }
})