// Cache DOM elements
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
let header = document.querySelector('header');
let footer = document.querySelector('footer');

// Toggle icon navbar
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// Scroll sections
let lastScrollTime = 0;
const throttleDelay = 100; // 100ms throttle for better performance

window.onscroll = () => {
    // Throttle scroll event handler
    let currentTime = new Date().getTime();
    if (currentTime - lastScrollTime < throttleDelay) return;
    lastScrollTime = currentTime;

    // Handle active section and navbar link on scroll
    let top = window.scrollY;
    sections.forEach(sec => {
        let offset = sec.offsetTop - 600;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            // Active navbar links
            navLinks.forEach(links => {
                links.classList.remove('active');
            });
            document.querySelector('header nav a[href*=' + id + ']').classList.add('active');

            // Active section for animation
            if (!sec.classList.contains('show-animate')) {
                sec.classList.add('show-animate');
            }
        } else {
            sec.classList.remove('show-animate');
        }
    });

    // Sticky navbar
    header.classList.toggle('sticky', top > 100);

    // Remove toggle icon and navbar when clicking navbar links (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    // Footer animation on scroll
    footer.classList.toggle('show-animate', window.innerHeight + window.scrollY >= document.scrollingElement.scrollHeight);
}
