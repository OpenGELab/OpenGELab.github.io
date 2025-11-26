// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 20px -1px rgba(0, 0, 0, 0.3)';
    }
    
    lastScroll = currentScroll;
});

// Tab switching functionality
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// Animate progress bars when they come into view
const progressBars = document.querySelectorAll('.progress-fill');

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        }
    });
}, observerOptions);

progressBars.forEach(bar => {
    progressObserver.observe(bar);
});

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.code-card, .benchmark-card, .showcase-item, .task-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
};

// Video placeholder click handlers
document.querySelectorAll('.video-placeholder').forEach(placeholder => {
    placeholder.addEventListener('click', () => {
        alert('Video demo coming soon!\n\nPlease replace this placeholder with actual video content.');
    });
});

// Handle image loading error
const architectureImg = document.getElementById('architecture-img');
if (architectureImg) {
    architectureImg.addEventListener('error', function() {
        this.style.display = 'none';
        const fallback = this.nextElementSibling;
        if (fallback && fallback.classList.contains('image-fallback')) {
            fallback.style.display = 'block';
        }
    });
    
    architectureImg.addEventListener('load', function() {
        const fallback = this.nextElementSibling;
        if (fallback && fallback.classList.contains('image-fallback')) {
            fallback.style.display = 'none';
        }
    });
}

// Page load animations
window.addEventListener('load', () => {
    animateOnScroll();
    
    // Fade in page content
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});

// Active nav link highlighting based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Console easter egg
console.log(`
%c
  ██████╗ ███████╗██╗      █████╗ ██████╗       ███████╗███████╗██████╗  ██████╗ 
 ██╔════╝ ██╔════╝██║     ██╔══██╗██╔══██╗      ╚══███╔╝██╔════╝██╔══██╗██╔═══██╗
 ██║  ███╗█████╗  ██║     ███████║██████╔╝        ███╔╝ █████╗  ██████╔╝██║   ██║
 ██║   ██║██╔══╝  ██║     ██╔══██║██╔══██╗       ███╔╝  ██╔══╝  ██╔══██╗██║   ██║
 ╚██████╔╝███████╗███████╗██║  ██║██████╔╝      ███████╗███████╗██║  ██║╚██████╔╝
  ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝╚═════╝       ╚══════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ 
                                                                                   
  Next-Generation GUI Agent for Mobile Devices
  Visit us at: https://github.com/OpenGELab
%c
`, 'color: #6366f1; font-weight: bold;', '');
