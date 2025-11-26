document.addEventListener('DOMContentLoaded', () => {
  const magnets = document.querySelectorAll('.magnet-button');

  magnets.forEach((magnet) => {
    magnet.addEventListener('mousemove', (e) => {
      const rect = magnet.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const strength = 20;

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
