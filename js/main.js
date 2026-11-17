const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((element) => {
    revealObserver.observe(element);
});

document.querySelectorAll('.toggle-more').forEach((button) => {
    button.addEventListener('click', () => {
        const description = button.previousElementSibling;
        const isCollapsed = description.classList.toggle('collapsed');
        button.textContent = isCollapsed ? 'Show more' : 'Show less';
    });
});

document.querySelectorAll('.flip-card').forEach((card) => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
});

const lightbox = document.getElementById('lightbox');
const lightboxIcon = document.getElementById('lightbox-icon');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxText = document.getElementById('lightbox-text');

function openLightbox(card) {
    lightboxIcon.textContent = card.querySelector('.hobby-icon').textContent;
    lightboxTitle.textContent = card.querySelector('h3').textContent;
    lightboxText.textContent = card.querySelector('.hobby-detail').textContent;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('.hobby-card').forEach((card) => {
    card.addEventListener('click', () => openLightbox(card));
    card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            openLightbox(card);
        }
    });
});

document.getElementById('lightbox-close').addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeLightbox();
    }
});

document.getElementById('year').textContent = new Date().getFullYear();

const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 400);
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});