// ── THEME TOGGLE ─────────────────────────────────────
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Load saved theme — default is dark
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'light') {
    body.classList.add('light');
    themeToggle.textContent = '☀️';
} else {
    themeToggle.textContent = '🌙';
}

themeToggle.addEventListener('click', () => {
    const isLight = body.classList.toggle('light');
    themeToggle.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// ── HAMBURGER MENU ────────────────────────────────────
const hamburger    = document.getElementById('hamburger');
const mobileNav    = document.getElementById('mobileNav');
const mobileClose  = document.getElementById('mobileNavClose');
const mobileLinks  = document.querySelectorAll('.mobile-link');

function openMobileNav() {
    hamburger.classList.add('open');
    mobileNav.classList.add('open');
    body.style.overflow = 'hidden';
}

function closeMobileNav() {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
    if (mobileNav.classList.contains('open')) {
        closeMobileNav();
    } else {
        openMobileNav();
    }
});
mobileClose.addEventListener('click', closeMobileNav);

mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
});

// Close on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileNav();
});

// ── EMAILJS ───────────────────────────────────────────
(function () { emailjs.init("Dp-b-j8s-i4iHowEq"); })();

document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = this.querySelector('.form-btn');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    emailjs.send("service_p5q0dok", "template_6udyg97", {
        name:    document.getElementById('name').value,
        email:   document.getElementById('email').value,
        message: document.getElementById('message').value
    }).then(() => {
        btn.textContent = 'Message Sent ✓';
        btn.style.background = '#10b981';
        btn.style.color = '#fff';
        this.reset();
    }, () => {
        btn.textContent = 'Failed — Try Again';
        btn.style.background = '#ef4444';
        btn.style.color = '#fff';
        btn.disabled = false;
    });
});

// ── SCROLL FADE-IN ────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ── ACTIVE NAV LINK ON SCROLL ─────────────────────────
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 120) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${current}`
            ? 'var(--accent)'
            : '';
    });
});

// ── DYNAMIC FOOTER YEAR ───────────────────────────────
document.getElementById('footerYear').textContent = new Date().getFullYear();