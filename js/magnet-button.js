/**
 * Magnet Button Effect
 * Makes elements with class .magnet-button magnetically attract to the mouse cursor.
 */

document.addEventListener('DOMContentLoaded', () => {
  const magnets = document.querySelectorAll('.magnet-button');

  magnets.forEach((magnet) => {
    magnet.addEventListener('mousemove', (e) => {
      const rect = magnet.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Strength of the magnet effect
      const strength = 20;

      // Calculate new position
      const xPos = (x / rect.width) * strength;
      const yPos = (y / rect.height) * strength;

      magnet.style.transform = `translate(${xPos}px, ${yPos}px)`;
      magnet.style.transition = 'transform 0.1s ease-out';
    });

    magnet.addEventListener('mouseleave', () => {
      magnet.style.transform = 'translate(0, 0)';
      magnet.style.transition = 'transform 0.5s ease-out';
    });
  });
});
