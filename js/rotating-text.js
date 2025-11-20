document.addEventListener('DOMContentLoaded', () => {
  const words = [
    "mechatronics student",
    "guitarist",
    "programmer",
    "problem creator / problem fixer (depends on the day)"
  ];

  const textElement = document.getElementById('rotating-text');
  let currentIndex = 0;

  if (!textElement) return;

  const rotateText = () => {
    // Fade out
    textElement.classList.remove('fade-in');
    textElement.classList.add('fade-out');

    setTimeout(() => {
      // Update text
      currentIndex = (currentIndex + 1) % words.length;
      const newText = words[currentIndex];
      textElement.textContent = newText;

      // Fade in
      textElement.classList.remove('fade-out');
      textElement.classList.add('fade-in');
    }, 500); // Wait for fade out transition (0.5s)
  };

  // Initial Fade In
  textElement.classList.add('fade-in');

  // Start rotation
  setInterval(rotateText, 3000); // Change every 3 seconds
});
