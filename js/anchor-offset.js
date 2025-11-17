document.addEventListener('DOMContentLoaded', function () {
  // Adjust this selector if your nav wrapper is different
  const header = document.querySelector('header');
  const extraPadding = 16; // pixels of breathing room under the navbar
  const headerOffset = header ? header.offsetHeight + extraPadding : 0;

  // Handle all in-page anchor links (href starting with "#")
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const hash = this.getAttribute('href');
      const id = hash.slice(1);
      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault(); // stop the default jump

      const targetY =
        target.getBoundingClientRect().top +
        window.pageYOffset -
        headerOffset;

      window.scrollTo({
        top: targetY,
        behavior: 'smooth'
      });

      // Keep the URL hash in sync
      if (history.pushState) {
        history.pushState(null, '', hash);
      } else {
        window.location.hash = hash;
      }
    });
  });
});