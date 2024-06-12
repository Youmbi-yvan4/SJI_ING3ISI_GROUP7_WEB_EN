window.onload = function () {
    document.querySelector('.button').addEventListener('click', function () {
      document.querySelector('.register').classList.add('visible');
    });
  };

  document.addEventListener('DOMContentLoaded', (event) => {
    const button = document.querySelector('.button');
    button.addEventListener('mouseover', function () {
      button.style.backgroundColor = "#e6b800";
    });
    button.addEventListener('mouseout', function () {
      button.style.backgroundColor = "#ffcc00";
    });
  });
  document.addEventListener('DOMContentLoaded', (event) => {
    const button = document.querySelector('.button');
    button.addEventListener('mouseover', function () {
      button.style.backgroundColor = "#e6b800";
    });
    button.addEventListener('mouseout', function () {
      button.style.backgroundColor = "#ffcc00";
    });
  });

  var text = document.getElementById('animatedText');
  var letters = text.textContent.split('');
  text.textContent = '';
  for (let i = 0; i < letters.length; i++) {
    text.innerHTML += '<span>' + letters[i] + '</span>';
  }

  var spans = document.querySelectorAll('#animatedText span');
  var counter = 0;
  setInterval(function () {
    spans[counter].classList.add('jump');
    setTimeout(function () {
      spans[counter].classList.remove('jump');
      counter++;
      if (counter >= spans.length) {
        counter = 0;
      }
    }, 700);
  }, 7000);
