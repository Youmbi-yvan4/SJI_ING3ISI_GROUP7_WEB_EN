// Get the modal
var modal = document.getElementById("reminderForm");

// Get the button that opens the modal
var btn = document.getElementById("addReminder");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    var title = document.getElementById('title').value;
    var description = document.getElementById('description').value;
    var tag = document.getElementById('tag').value;

    // Create new reminder object
    var reminder = {
        title: title,
        description: description,
        tag: tag
    };

    // Get existing reminders from local storage or create new array if none exist
    var reminders = JSON.parse(localStorage.getItem('reminders')) || [];

    // Add new reminder to reminders array
    reminders.push(reminder);

    // Save reminders array to local storage
    localStorage.setItem('reminders', JSON.stringify(reminders));

    // Clear form
    document.getElementById('form').reset();

    // Close modal
    modal.style.display = "none";

    // Refresh reminders display
    displayReminders();
});

// function displayReminders() {
//     // Get reminders from local storage
//     var reminders = JSON.parse(localStorage.getItem('reminders')) || [];

//     // Get container element
//     var container = document.getElementById('reminderContainer');

//     // Clear existing reminders display
//     container.innerHTML = '';

//     // Add each reminder to container
//     reminders.forEach(function(reminder, index) {
//         var div = document.createElement('div');
//         div.classList.add('reminder');
//         div.style.backgroundColor = getRandomLightColor();
//         div.innerHTML = '<h2>' + reminder.title + '</h2><p>' + reminder.description + '</p><p>' + reminder.tag + '</p><button onclick="deleteReminder(' + index + ')">Delete</button>';
//         container.appendChild(div);
//     });
// }
function displayReminders() {
  var reminders = JSON.parse(localStorage.getItem('reminders')) || [];
  var html = '';
  for (var i = 0; i < reminders.length; i++) {
      var color = getColorBasedOnTag(reminders[i].tag);
      html += '<div class="card" style="background-color: ' + color + '">';
      html += '<h2>' + reminders[i].title + '</h2>';
      html += '<p>' + reminders[i].description + '</p>';
      html += '<button onclick="deleteReminder(' + i + ')">Delete</button>';
      html += '</div>';
  }
  document.getElementById('reminders').innerHTML = html;
}


function deleteReminder(index) {
    // Get reminders from local storage
    var reminders = JSON.parse(localStorage.getItem('reminders')) || [];

    // Delete reminder at specified index
    reminders.splice(index, 1);

    // Save reminders array to local storage
    localStorage.setItem('reminders', JSON.stringify(reminders));

    // Refresh reminders display
    displayReminders();
}

function getRandomLightColor() {
    var letters = 'BCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}

function getColorBasedOnTag(tag) {
  var color;
  switch(tag) {
      case 'Urgent':
          color = '#FF0000'; // Red
          break;
      case 'Important':
          color = '#FFA500'; // Orange
          break;
      case 'To remember':
          color = '#FFFF00'; // Yellow
          break;
      case 'If you have time':
          color = '#008000'; // Green
          break;
      case 'Optional':
          color = '#0000FF'; // Blue
          break;
      default:
          color = '#FFFFFF'; // White
  }
  return color;
}

// Display reminders when page loads
displayReminders();
