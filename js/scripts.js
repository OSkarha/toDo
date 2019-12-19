(function () {
    'use strict';

    let textInput = document.getElementById('textInput'),
        createBtn = document.getElementById('createBtn'),
        form = document.getElementById('form'),
        toDosList = document.getElementById('toDos'),
        compleatedList = document.getElementById('compleated'),
        tasks = getData();

    tasks.forEach((task) => {
        createTask(toDosList, {
            text : task.text,
            id : task.id
            })
        })

    textInput.addEventListener('input',function() {
        if (textInput.value.length){
            createBtn.removeAttribute('disabled');
        } else {
            createBtn.setAttribute('disabled', true);
        }
    });

    form.addEventListener('submit', function(e){
        e.preventDefault();

        createTask(toDosList, {
            text : textInput.value,
            id : null
        });

        textInput.value = '';
        createBtn.setAttribute('disabled', true);

    })

    function createTask(target, task) {
        let li = document.createElement('li');
        li.classList.add('list-group-item');
        li.innerHTML = task.text;

        target.appendChild(li);

        if (target == toDosList) {
            let time = new Date,
                id =  task.id ? task.id : `todo-${time.getTime()}`,
                tasks = getData();

                tasks.push({
                    id : id,
                    text : task.text
                });
                if(!task.id){
                    storeData(tasks);
                }

            li.innerHTML = `
                <div class="form-check mb-2">
                    <input type="checkbox" class="form-check-input" id="${id}">
                    <label class="form-check-label" for="${id}">${task.text}</label>
                </div>
                    <input type="text" class="form-control mb-2" value='${task.text}' hidden>
                    <button class="btn btn-sm btn-warning editBtn" type="button">Редактировать</button>
                    <button class="btn btn-sm btn-danger deleteBtn" type="button">Удалить</button>
                    <button class="btn btn-sm btn-success saveBtn" hidden type="button">Сохранить</button>
                    <button class="btn btn-sm btn-secondary cancelBtn" hidden type="button">Отменить</button>
                `;

            document.getElementById(id).addEventListener('change', function(e){
                e.target.setAttribute('disabled', true);
                
                let label = e.target.nextElementSibling;
                    // parent = e.target.parentElement.parentElement;

                createTask(compleatedList, {
                    text : label.innerText,
                    id : null
                });

                removeTask(li);
            })

            li.querySelector('.deleteBtn').addEventListener('click', function(){
                removeTask(li);
            })

            li.querySelector('.editBtn').addEventListener('click', function(){
                makeEditMode(li);
            })

            li.querySelector('.cancelBtn')
            .addEventListener('click', function(){

                rebootTask(li);
            })

            li.querySelector('.saveBtn')
            .addEventListener('click', function(){

                let editText = li.querySelector('input[type="text"]').value;
                li.querySelector('label').innerText = editText;
                
                makeReadMode(li);
                
            })

            li.querySelector('input[type="text"]')
            .addEventListener('keypress', function(e){
                if (e.keyCode==13){
                    saveTask(li);
                }
            })
                
            li.querySelector('input[type="text"]')
            .addEventListener('keyup', function(e){
                if (e.keyCode==27){
                    rebootTask(li);
                }

            })

        
        }
    }

    function saveTask(target){
        let editText = target.querySelector('input[type="text"]').value;
            target.querySelector('label').innerText = editText;
            
                makeReadMode(target);
    }

    function makeReadMode(target){
        changeVisibility(target, [
            '.form-control',
            '.saveBtn', 
            '.cancelBtn', 
            ], true);

        changeVisibility(target, [
            '.form-check',
            '.deleteBtn', 
            '.editBtn', 
        ], false);
    }

    function rebootTask(target){
        let defaultText = target.querySelector('label').innerText
        target.querySelector('input[type="text"]').value = defaultText;

        makeReadMode(target);
    }


    function makeEditMode(target){
        // li.querySelector('.form-check').setAttribute('hidden', true);
            // li.querySelector('.deleteBtn').setAttribute('hidden', true);
            // li.querySelector('.editBtn').setAttribute('hidden', true);

            changeVisibility(target, ['.form-check', '.deleteBtn', '.editBtn'], true);


            // li.querySelector('.saveBtn').removeAttribute('hidden');
            // li.querySelector('.cancelBtn').removeAttribute('hidden');
            // li.querySelector('.form-control').removeAttribute('hidden');

            changeVisibility(target, [
                '.saveBtn', 
                '.cancelBtn', 
                '.form-control'
            ], false);
    }

    function removeTask (target){
        let id = target.querySelector('[type="checkbox"]').getAttribute('id'),
            tasks = getData(),
            index = -1;

        tasks.forEach((task, i) => {
            if(task.id == id) {
                index = i;
            }
        })

        tasks.splice(index, 1);

        storeData(tasks);

        target.remove();
    }

    function changeVisibility(parent, elems, hide) {
        // elems.forEach(function(elem) {})
        elems.forEach(elem => {
            if (hide)  {
                parent.querySelector(elem)
                .setAttribute('hidden', hide);
            } else{
                parent.querySelector(elem)
                .removeAttribute('hidden', hide);
            }

        })
    }

    function storeData (data){
        localStorage.setItem('tasks', JSON.stringify(data));
    }

    function getData() {
        let data = localStorage.getItem('tasks');
        return data ? JSON.parse(data) : [];
    }

    console.log(getData());
})();