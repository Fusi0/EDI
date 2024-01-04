document.addEventListener('DOMContentLoaded', function () {
  const author1 = document.getElementById('author1');
  const author2 = document.getElementById('author2');
  const author3 = document.getElementById('author3');
  const author4 = document.getElementById('author4');

  const descriptions = {
      'author1': 'Jakub Fus - opis',
      'author2': 'Adam Ronkiewicz - opis',
      'author3': 'Studiuje informatykę stosowaną na Uniwersytecie Ekonomicznym w Krakowie. Aktualnie jestem na pirewszym roku studiów. Urodziłem się 06.06.2004r. w Krakowie. W wolnym czasie gram w gry komputerowe oraz oglądam filmy.',
      'author4': 'Jestem studentem pierwszego roku na Uniwersytecie Ekonomicznym w Krakowie. Studiuję na kierunku Informatyka Stosowana. Urodziłem się 07.06.2003r. w Oświęcimiu. W wolnym czasie lubię grać w gry i czytać książki'
  };

  const originalTexts = {
      'author1': author1.textContent,
      'author2': author2.textContent,
      'author3': author3.textContent,
      'author4': author4.textContent
  };

  [author1, author2, author3, author4].forEach(author => {
      author.addEventListener('mouseover', function() {
          author.style.transition = 'opacity 0.3s ease-in-out';
          author.style.opacity = '0';
          event.target.style.lineHeight = '1'
          setTimeout(() => {
              author.textContent = descriptions[author.id];
              author.style.opacity = '1';
          }, 500);
      });

      author.addEventListener('mouseout', function() {
          author.style.transition = 'opacity 0.3s ease-in-out';
          author.style.opacity = '0';
          event.target.style.lineHeight = '0'
          setTimeout(() => {
              author.textContent = originalTexts[author.id];
              author.style.opacity = '1';
          }, 500);
      });
  });
});
