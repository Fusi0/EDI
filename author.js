document.addEventListener('DOMContentLoaded', function () {
  const author1 = document.getElementById('author1');
  const author2 = document.getElementById('author2');
  const author3 = document.getElementById('author3');
  const author4 = document.getElementById('author4');

  // Dodanie obsługi zdarzeń onmouseover i onmouseout dla każdego autora
  author1.addEventListener('mouseover', function() {
    event.target.style.lineHeight = '1.5'
    author1.textContent = 'Jakub Fus - opis';
  });

  author1.addEventListener('mouseout', function() {
    author1.textContent = 'Jakub Fus - team leader';
  });

  author2.addEventListener('mouseover', function() {
    event.target.style.lineHeight = '1.5'
    author2.textContent = 'Adam Ronkiewicz - opis';
  });

  author2.addEventListener('mouseout', function() {
    author2.textContent = 'Adam Ronkiewicz';
  });

  author3.addEventListener('mouseover', function() {
    event.target.style.lineHeight = '1.5'
    author3.textContent = 'Bartosz Banach - opis';
  });

  author3.addEventListener('mouseout', function() {
    author3.textContent = 'Bartosz Banach';
  });

  author4.addEventListener('mouseover', function() {
    event.target.style.lineHeight = '1.5'
    author4.textContent = 'Jestem studentem pierwszego roku na Uniwersytecie Ekonomicznym w Krakowie. Studiuję na kierunku Informatyka Stosowana. Urodziłem się 07.06.2003r. w Oświęcimiu. W wolnym czasie lubię grać w gry i czytać książki.';
  });

  author4.addEventListener('mouseout', function() {
    author4.textContent = 'Krystian Byrgiel';
  });
});