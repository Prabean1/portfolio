document.addEventListener('DOMContentLoaded', () => {

  const navbar = document.querySelector('.navbar');
  let isScrolled = false;

  window.addEventListener('scroll', () => {
    const shouldBeScrolled = window.scrollY > 50;
    if (shouldBeScrolled === isScrolled) return;
    isScrolled = shouldBeScrolled;

    if (isScrolled) {
      navbar.classList.add('scrolled', 'bg-dark', 'shadow');
      navbar.classList.remove('bg-transparent');
    } else {
      navbar.classList.remove('scrolled', 'bg-dark', 'shadow');
      navbar.classList.add('bg-transparent');
    }
  });

});
