const moveButton = document.getElementById('moveButton');

moveButton.addEventListener('click', function() {
  const maxX = window.innerWidth - moveButton.offsetWidth;
  const maxY = window.innerHeight - moveButton.offsetHeight;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  moveButton.style.position = 'absolute';
  moveButton.style.left = `${randomX}px`;
  moveButton.style.top = `${randomY}px`;
});
