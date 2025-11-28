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

// Animate benchmark chart bars
const animateBenchmarkBars = () => {
    const bars = document.querySelectorAll('.bar');
    
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.style.width;
                bar.style.width = '0%';
                
                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, index * 100);
                
                barObserver.unobserve(bar);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    });
    
    bars.forEach(bar => {
        barObserver.observe(bar);
    });
};

// Animate chart items on scroll
const animateChartItems = () => {
    const chartItems = document.querySelectorAll('.chart-item');
    
    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    chartItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        chartObserver.observe(item);
    });
};

// Animate Open Benchmark bars
const animateOpenBenchmarkBars = () => {
    const openBars = document.querySelectorAll('.open-bar');
    
    // Store target height and set initial height to 0
    openBars.forEach(bar => {
        const height = bar.style.height;
        if (height) {
            bar.setAttribute('data-height', height);
            bar.style.height = '0px';
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetHeight = bar.getAttribute('data-height');
                
                // Add a small random delay for a more natural effect or rely on CSS transition
                // Using a slight delay to ensure the browser has rendered the 0 height frame
                requestAnimationFrame(() => {
                    bar.style.height = targetHeight;
                });
                
                observer.unobserve(bar);
            }
        });
    }, {
        threshold: 0.2
    });

    openBars.forEach(bar => observer.observe(bar));
};

// Initialize chart animations on page load
window.addEventListener('load', () => {
    setTimeout(() => {
        animateBenchmarkBars();
        animateChartItems();
        animateOpenBenchmarkBars();
    }, 300);
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
