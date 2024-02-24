// Initialize an empty array to store tasks
let tasks = [];

// Get references to HTML elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Event listener for form submission
todoForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    const taskText = todoInput.value.trim(); // Get the task text

    if (taskText !== '') {
        // Create a new task object
        const task = {
            id: Date.now(),
            text: taskText,
            checked: false,
        };

        // Add the task to the array
        tasks.push(task);

        // Render the task
        renderTodo(task);

        // Clear the input field
        todoInput.value = '';
    }
});

// Render a task
function renderTodo(todo) {
    const listItem = document.createElement('li');
    listItem.setAttribute('data-key', todo.id);
    listItem.innerHTML = `
        <input type="checkbox" id="${todo.id}" />
        <label for="${todo.id}" class="tick"></label>
        <span>${todo.text}</span>
        <button class="delete-todo">Delete</button>
    `;

    // Add event listener for checkbox
    const checkbox = listItem.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', function () {
        todo.checked = !todo.checked;
        listItem.classList.toggle('done');
    });

    // Add event listener for delete button
    const deleteButton = listItem.querySelector('.delete-todo');
    deleteButton.addEventListener('click', function () {
        tasks = tasks.filter((item) => item.id !== todo.id);
        listItem.remove();
    });

    // Append the list item to the ul
    todoList.appendChild(listItem);
}

// Initial rendering of tasks
tasks.forEach(renderTodo);
