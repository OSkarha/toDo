(function () {
    'use strict'

    let textInput = document.getElementById('textInput'),
        createBtn = document.getElementById('createBtn'),
        form = document.getElementById('form'),
        toDosList = document.getElementById('toDos'),
        compleatedList = document.getElementById('compleated');

    textInput.addEventListener('input',function() {
        if (textInput.value.length){
            createBtn.removeAttribute('disabled');
        } else {
            createBtn.setAttribute('disabled', true);
        }
    });

    form.addEventListener('submit', function(e){
        e.preventDefault();

        createTask(toDosList, textInput.value);

        textInput.value = '';

        createBtn.setAttribute('disabled', true);

    })

    function createTask(target, text) {
        let li = document.createElement('li');
        li.classList.add('list-group-item');
        li.innerHTML = text;

        target.appendChild(li);
        if (target == toDosList) {
            let time = new Date,
                id = `todo-${time.getTime()}`;
            

            li.innerHTML = `
        <div class="form-check mb-2">
            <input type="checkbox" class="form-check-input" id="${id}">
            <label class="form-check-label" for="${id}">${text}</label>
        </div>
            <input type="text" class="form-control mb-2" value='${text}' hidden>
            <button class="btn btn-sm btn-warning editBtn" type="button">Редактировать</button>
            <button class="btn btn-sm btn-danger deleteBtn" type="button">Удалить</button>
            <button class="btn btn-sm btn-success saveBtn" hidden type="button">Сохранить</button>
            <button class="btn btn-sm btn-secondary cancelBtn" hidden type="button">Отменить</button>
        `;

        document.getElementById(id).addEventListener('change', function(e){
            e.target.setAttribute('disabled', true);
            
            let label = e.target.nextElementSibling;
                // parent = e.target.parentElement.parentElement;

            createTask(compleatedList, label.innerText);

            removeTask(li)
        })

        li.querySelector('.deleteBtn').addEventListener('click', function(){
            removeTask(li)
        })

        li.querySelector('.editBtn').addEventListener('click', function(){
            // li.querySelector('.form-check').setAttribute('hidden', true);
            // li.querySelector('.deleteBtn').setAttribute('hidden', true);
            // li.querySelector('.editBtn').setAttribute('hidden', true);

            changeVisibility(li, ['.form-check', '.deleteBtn', '.editBtn'], true);


            // li.querySelector('.saveBtn').removeAttribute('hidden');
            // li.querySelector('.cancelBtn').removeAttribute('hidden');
            // li.querySelector('.form-control').removeAttribute('hidden');

            changeVisibility(li, [
                '.saveBtn', 
                '.cancelBtn', 
                '.form-control'
            ], false)
        })

        li.querySelector('.cancelBtn')
        .addEventListener('click', function(){
            changeVisibility(li, [
                '.form-control',
                '.saveBtn', 
                '.cancelBtn', 
                ], true);


            changeVisibility(li, [
                '.form-check',
                '.deleteBtn', 
                '.editBtn', 
            ], false)
        })
    }
}

    function removeTask (target){
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

})();