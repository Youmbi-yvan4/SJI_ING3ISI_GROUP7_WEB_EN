var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
var categories = JSON.parse(localStorage.getItem('categories')) || ['work', 'school', 'home'];
var currentUser = localStorage.getItem('currentUser');
var editIndex = null;

renderTasks();
renderCategories();

function renderTasks() {
    var taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach(function (task, index) {
        var taskItem = document.createElement('li');
        taskItem.classList.add('task');
        taskItem.textContent = task.title + ' - ' + task.description + ' - ' + task.category + ' - ' + task.dueDate;

        var completeButton = document.createElement('i');
        completeButton.classList.add('fas', 'fa-check', task.completed ? 'completed' : 'not-completed');
        completeButton.addEventListener('click', function () {
            task.completed = !task.completed;
            completeButton.classList.toggle('completed');
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        });
        taskItem.appendChild(completeButton);

        var deleteButton = document.createElement('i');
        deleteButton.classList.add('fas', 'fa-trash-alt');
        deleteButton.addEventListener('click', function () {
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        });
        taskItem.appendChild(deleteButton);

        var editButton = document.createElement('i');
        editButton.classList.add('fas', 'fa-edit');
        editButton.addEventListener('click', function () {
            var titleInput = document.getElementById('task-title-input');
            var descriptionInput = document.getElementById('task-description-input');
            var categoryInput = document.getElementById('task-category-input');
            var dueDateInput = document.getElementById('task-due-date-input');

            titleInput.value = task.title;
            descriptionInput.value = task.description;
            categoryInput.value = task.category;
            dueDateInput.value = task.dueDate;

            editIndex = index;
        });
        taskItem.appendChild(editButton);

        taskList.appendChild(taskItem);
    });
}

// Rest of the code remains the same...

function renderCategories() {
    var categoryInput = document.getElementById('task-category-input');
    categoryInput.innerHTML = '';
    categories.forEach(function (category) {
        var option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryInput.appendChild(option);
    });
}

document.getElementById('task-form').addEventListener('submit', function (event) {
    event.preventDefault();
    var titleInput = document.getElementById('task-title-input');
    var descriptionInput = document.getElementById('task-description-input');
    var categoryInput = document.getElementById('task-category-input');
    var dueDateInput = document.getElementById('task-due-date-input');

    tasks.push({
        title: titleInput.value,
        description: descriptionInput.value,
        category: categoryInput.value,
        dueDate: dueDateInput.value,
        completed: false,
        user: currentUser
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));

    titleInput.value = '';
    descriptionInput.value = '';
    dueDateInput.value = '';

    renderTasks();
    renderCategories();
});

document.getElementById('category-form').addEventListener('submit', function (event) {
    event.preventDefault();
    var categoryInput = document.getElementById('category-input');

    categories.push(categoryInput.value);
    localStorage.setItem('categories', JSON.stringify(categories));

    categoryInput.value = '';

    renderCategories();
    renderTasks();
});

renderTasks();
renderCategories();

