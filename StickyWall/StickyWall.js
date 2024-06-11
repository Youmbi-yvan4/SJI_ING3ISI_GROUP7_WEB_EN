var currentPage = 1;
var remindersPerPage = 8;
var editingIndex = null;

document.getElementById('addReminder').addEventListener('click', function () {
  document.getElementById('reminderForm').style.display = 'flex';
  editingIndex = null;
});

document.getElementById('greeting').textContent = localStorage.getItem('currentUser') + "'s Sticky Wall ";
document.getElementById('clearAll').addEventListener('click', function () {
  localStorage.removeItem('reminders');
  displayReminders();
});

// document.getElementById('logout').addEventListener('click', function () {
//     // Clear the currentUser from local storage
//     localStorage.removeItem('currentUser');

//     // Redirect to Login.html
//     window.location.href = "Login.html";
// });


document.getElementById('saveReminder').addEventListener('click', function () {
  var title = document.getElementById('title').value;
  var description = document.getElementById('description').value;
  var tag = document.getElementById('tag').value;

  var reminder = {
    title: title,
    description: description,
    tag: tag,
    currentUser: localStorage.getItem('currentUser')
  };

  var reminders = JSON.parse(localStorage.getItem('reminders')) || [];
  if (editingIndex !== null) {
    reminders[editingIndex] = reminder;
  } else {
    reminders.push(reminder);
  }
  localStorage.setItem('reminders', JSON.stringify(reminders));

  document.getElementById('reminderForm').style.display = 'none';
  displayReminders();
});

document.getElementById('cancelReminder').addEventListener('click', function () {
  document.getElementById('reminderForm').style.display = 'none';
});

function displayReminders() {
  var reminders = JSON.parse(localStorage.getItem('reminders')) || [];
  var currentUser = localStorage.getItem('currentUser'); // Get the current user

  // Filter the reminders to only include those created by the current user
  var userReminders = reminders.filter(reminder => reminder.currentUser === currentUser);

  var reminderContainer = document.getElementById('reminderContainer');
  reminderContainer.innerHTML = '';

  var startIndex = (currentPage - 1) * remindersPerPage;
  var endIndex = startIndex + remindersPerPage;

  userReminders.slice(startIndex, endIndex).forEach(function (reminder, index) {
    var reminderElement = document.createElement('div');
    reminderElement.classList.add('reminder');
    reminderElement.setAttribute('data-tag', reminder.tag);
    reminderElement.innerHTML = `
    <h2>${reminder.title}</h2>
    <p>${reminder.description}</p>
    <span>${reminder.tag}</span>
    <br>
    
    <button style="background-color: #6d6fff;" onclick="editReminder(${startIndex + index})">Edit</button>

    <button onclick="deleteReminder(${startIndex + index})">Delete</button>
`;
    reminderContainer.appendChild(reminderElement);


    setTimeout(function () {
      reminderElement.classList.add('visible');
    }, 100);
  });


  displayPagination(userReminders.length); // Update this line to use userReminders.length
}


function displayPagination(totalReminders) {
  var paginationContainer = document.getElementById('pagination');
  paginationContainer.innerHTML = '';

  var totalPages = Math.ceil(totalReminders / remindersPerPage);

  for (var i = 1; i <= totalPages; i++) {
    var pageElement = document.createElement('span');
    pageElement.classList.add('page');
    if (i === currentPage) {
      pageElement.classList.add('active');
    }
    pageElement.textContent = i;
    pageElement.addEventListener('click', function () {
      currentPage = parseInt(this.textContent);
      displayReminders();
    });
    paginationContainer.appendChild(pageElement);
  }
}

function deleteReminder(index) {
  var reminders = JSON.parse(localStorage.getItem('reminders'));
  reminders.splice(index, 1);
  localStorage.setItem('reminders', JSON.stringify(reminders));
  displayReminders();
}

function editReminder(index) {
  var reminders = JSON.parse(localStorage.getItem('reminders')) || [];
  var currentUser = localStorage.getItem('currentUser'); // Get the current user

  // Filter the reminders to only include those created by the current user
  var userReminders = reminders.filter(reminder => reminder.currentUser === currentUser);

  var reminder = userReminders[index];

  document.getElementById('title').value = reminder.title;
  document.getElementById('description').value = reminder.description;
  document.getElementById('tag').value = reminder.tag;

  document.getElementById('reminderForm').style.display = 'flex';
  editingIndex = reminders.indexOf(reminder); // Get the index of the reminder in the original reminders array
}


displayReminders();


