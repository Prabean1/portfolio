document.addEventListener('DOMContentLoaded', () => {

  // --- Navbar Scroll Effect ---
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled', 'bg-dark', 'shadow');
      navbar.classList.remove('bg-transparent');
    } else {
      navbar.classList.remove('scrolled', 'bg-dark', 'shadow');
      navbar.classList.add('bg-transparent');
    }
  });

  // the bounce cards have no logic, its all css. the stuff of nightmares really.


});
