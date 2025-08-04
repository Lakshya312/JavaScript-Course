const todoList = JSON.parse(localStorage.getItem('todo-items-list')) || [{
    name:'wash clothes ',
    dueDate: '2025-03-12'},
    {
     name:'make breakfast',
     dueDate: '2025-04-11'}
    ];

document.querySelector('.js-add-todo-button')
    .addEventListener('click', () => {
        addTodo();
        saveToStorage();
    })

renderTodoList();
function renderTodoList(){

    let todoListHTML = '';
    
    todoList.forEach((todoObject, index) => {
          const {name, dueDate} = todoObject ;
          const html = `<div>${name} </div>
          <div>${dueDate || 'No due date'}</div>
          <button class="delete-todo-button js-delete-todo-button">
          Delete
          </button>
          `;
          todoListHTML += html ;
    })

 /*   for(let i = 0; i<todoList.length; i++){
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
*/
document.querySelector('.js-todo-list')
.innerHTML = todoListHTML;

document.querySelectorAll('.js-delete-todo-button')
   .forEach((deleteButton, index) => {
   deleteButton.addEventListener('click', ()=>{
   checkButton = document.querySelector('.js-configuration-button');
   checkButton.innerHTML = `<div>Are you sure you want to delete this from list?</div><div>
   <button class="js-yes-button yes-button">Yes</button> <button class="js-no-button no-button">No</button>
   </div>`;

   document.querySelector('.js-yes-button')
      .addEventListener('click',() => {
      todoList.splice(index, 1);
      saveToStorage();
      removeConfiguration();
      clearInputValue();
      renderTodoList();
      });

   document.querySelector('.js-no-button')
      .addEventListener('click',() => {
         removeConfiguration();
         });
   });
});
}

let inputElement;
let dueDateInput;

function addTodo(){
    inputElement = document.querySelector('.js-name-input');
    dueDateInput = document.querySelector('.js-due-date-input');
  
    const nameInput = inputElement.value.trim();
    const dueDateInputValue = dueDateInput.value.trim();
  
    const isDuplicate = todoList.some(item => item.name.trim() === nameInput && item.dueDate.trim() === dueDateInputValue
    );
  
    if (isDuplicate) {
      sameTodoListConfiguration();
    } else {
      configurationButton();
    }
  }

function saveToStorage(){
    localStorage.setItem('todo-items-list',JSON.stringify(todoList));
}

let checkButton;

function configurationButton(){
    if(!inputElement.value.trim()){
        alert(`You haven't added anyting to the list.
Please add something. `);
  }else if (!dueDateInput.value.trim()){
    checkButton = document.querySelector('.js-configuration-button');

    checkButton.innerHTML = '<div>Are you sure you want to add this  to list without due date ?</div><div><button class="js-yes-button yes-button">Yes</button> <button class="js-no-button no-button">No</button></div>'
    document.querySelector('.js-yes-button')
        .addEventListener('click',() => {
            todoList.push({
                //name: name,
                name: inputElement.value,
                //dueDate: dueDate
                dueDate: dueDateInput.value
            });
            saveToStorage(); 
            removeConfiguration();
            clearInputValue();
            renderTodoList();
        });

    document.querySelector('.js-no-button')
        .addEventListener('click',() => {
            removeConfiguration();
            });

          }
  else{
      todoList.push({
          //name: name,
          name: inputElement.value,
          //dueDate: dueDate
          dueDate: dueDateInput.value
      });
      renderTodoList();
      clearInputValue();
  }            
}

function sameTodoListConfiguration(){

    checkButton = document.querySelector('.js-configuration-button');

    checkButton.innerHTML = '<div>This todo already exists in your list. Add again?</div><div><button class="js-yes-same-button yes-button">Yes</button> <button class="js-no-same-button no-button">No</button></div>'

    document.querySelector('.js-yes-same-button')
        .addEventListener('click', ()=>{
            todoList.push({
                //name: name,
                name: inputElement.value,
                //dueDate: dueDate
                dueDate: dueDateInput.value
            });
            saveToStorage(); 
            renderTodoList();
            removeConfiguration();
            clearInputValue();
        });

    document.querySelector('.js-no-same-button')
        .addEventListener('click', ()=>{
            removeConfiguration();
            clearInputValue();
        });

}

function removeConfiguration(){
checkButton.innerHTML = '';
}

function clearInputValue(){
    inputElement.value = '';
    dueDateInput.value = '';
}