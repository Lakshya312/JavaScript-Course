const todoList = [{
    name:'wash clothes ',
    dueDate: '2025-03-12'},
    {
     name:'make breakfast',
     dueDate: '2025-04-11'}
    ];
renderTodoList();
function renderTodoList(){

    let todoListHTML = '';
    
    for(let i = 0; i<todoList.length; i++){
        const todoObject = todoList[i];
      //  const name = todoList.name
        const {name, dueDate} = todoObject ;
        const html = `<div>${name} </div>
        <div>${dueDate}</div>
        <button class="delete-todo-button" 
        onclick = "
        todoList.splice(${i},1);
        renderTodoList();
        ">Delete</button>
        `;
        todoListHTML += html ;
    }

    document.querySelector('.js-todo-list')
    .innerHTML = todoListHTML;
}

function addTodo(){
    const inputElement = document.querySelector('.js-name-input');
    const name = inputElement.value;

    const dueDateInput = document.querySelector('.js-due-date-input');
    
    const dueDate = dueDateInput.value;
    todoList.push({
        //name: name,
        name,
        //dueDate: dueDate
        dueDate
    });

    inputElement.value = '';
    dueDateInput.value = '';
    renderTodoList();
}