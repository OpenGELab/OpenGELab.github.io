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

// Animate modern width-based bars (AndroidDaily)
const animateModernBars = () => {
    const bars = document.querySelectorAll('.chart-bar-fill-modern, .comparison-bar-fill-modern');
    
    bars.forEach(bar => {
        const width = bar.style.width;
        if (width && width !== '0%') {
            bar.setAttribute('data-width', width);
            bar.style.width = '0%';
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const bar = entry.target;
            const targetWidth = bar.getAttribute('data-width');
            
            if (entry.isIntersecting) {
                // Grow
                requestAnimationFrame(() => {
                    bar.style.width = targetWidth;
                });
            } else {
                // Shrink
                bar.style.width = '0%';
            }
        });
    }, {
        threshold: 0.1
    });

    bars.forEach(bar => observer.observe(bar));
};

// Adjust and animate Open Benchmark bars (Height-based with Dynamic Baseline)
const animateOpenBenchmarkBars = () => {
    // Process each benchmark group separately to calculate local baselines
    const benchmarkGroups = document.querySelectorAll('.open-benchmark-bars');

    benchmarkGroups.forEach(group => {
        const bars = group.querySelectorAll('.open-bar');
        if (bars.length === 0) return;

        // 1. Extract values and find min/max for this group
        let minVal = Infinity;
        let maxVal = -Infinity;
        const barValues = [];

        bars.forEach(bar => {
            // Get value from inline height style (assumed to be the data source)
            const hStr = bar.style.height;
            let val = 0;
            if (hStr && hStr.includes('px')) {
                val = parseFloat(hStr);
            }
            barValues.push({ element: bar, value: val });
            
            if (val < minVal) minVal = val;
            if (val > maxVal) maxVal = val;
        });

        // 2. Determine baseline (start point) to exaggerate differences
        // We set baseline slightly below the minimum value to ensure the smallest bar is visible but short
        // Ensure baseline doesn't make bars negative. 
        // If minVal is 50, baseline 40. Diff = 10.
        // If minVal is small, careful not to go < 0.
        const BASELINE_OFFSET = 15; // The smallest bar will appear as if it has this value relative to baseline
        let baseline = Math.max(0, minVal - BASELINE_OFFSET);

        // 3. Calculate scaling factor to fit the container height
        // Target max height in pixels (container is ~320px, leave room for text)
        const TARGET_MAX_HEIGHT_PX = 240; 
        const maxEffectiveValue = maxVal - baseline;
        
        // Avoid division by zero
        const scale = maxEffectiveValue > 0 ? (TARGET_MAX_HEIGHT_PX / maxEffectiveValue) : 1;

        // 4. Apply new heights
        barValues.forEach(item => {
            const effectiveValue = Math.max(0, item.value - baseline);
            const newHeightPx = effectiveValue * scale;
            
            // Set the new target height
            item.element.setAttribute('data-height', newHeightPx + 'px');
            
            // Initialize at 0 for animation
            item.element.style.height = '0px';
        });
    });

    // Observer for animation (same as before)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const bar = entry.target;
            const targetHeight = bar.getAttribute('data-height');
            
            if (entry.isIntersecting) {
                // Grow
                requestAnimationFrame(() => {
                    bar.style.height = targetHeight;
                });
            } else {
                // Shrink
                bar.style.height = '0px';
            }
        });
    }, {
        threshold: 0.1
    });

    const allBars = document.querySelectorAll('.open-bar');
    allBars.forEach(bar => observer.observe(bar));
};

// Initialize chart animations on page load
window.addEventListener('load', () => {
    setTimeout(() => {
        // animateBenchmarkBars(); // Deprecated old function
        animateChartItems();
        animateModernBars();
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

// Benchmark Scroll Button Logic
const scrollRightBtn = document.getElementById('scrollRightBtn');
const benchmarkGrid = document.getElementById('openBenchmarkGrid');

if (scrollRightBtn && benchmarkGrid) {
    scrollRightBtn.addEventListener('click', () => {
        // Scroll by one item width (340px) + gap (24px = 1.5rem)
        const scrollAmount = 364; 
        benchmarkGrid.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    // Optional: Hide button when scrolled to end
    const handleScrollButtonVisibility = () => {
        const maxScrollLeft = benchmarkGrid.scrollWidth - benchmarkGrid.clientWidth;
        // If content fits or scrolled to end, hide button (or dim it)
        if (benchmarkGrid.scrollWidth <= benchmarkGrid.clientWidth || Math.ceil(benchmarkGrid.scrollLeft) >= maxScrollLeft) {
            scrollRightBtn.style.opacity = '0.5';
            scrollRightBtn.style.cursor = 'default';
        } else {
            scrollRightBtn.style.opacity = '1';
            scrollRightBtn.style.cursor = 'pointer';
        }
    };

    benchmarkGrid.addEventListener('scroll', handleScrollButtonVisibility);
    window.addEventListener('resize', handleScrollButtonVisibility);
    
    // Initial check after animations might have settled
    setTimeout(handleScrollButtonVisibility, 1000);
}
