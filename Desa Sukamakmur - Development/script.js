// ========================================
// WEBSITE DESA SUKAMAKMUR - COMPLETE SCRIPT
// ========================================

// === DOM CONTENT LOADED ===
document.addEventListener('DOMContentLoaded', function() {
    initPreloader();
    initHeader();
    initHeroSlider();
    initSearch();
    initThemeToggle();
    initMobileMenu();
    initSmoothScroll();
    initBackToTop();
    initStatCounters();
    initTabs();
    initGalleryFilter();
    initScrollAnimations();
    initFormValidation();
    initNewsFilter();
});

// === PRELOADER ===
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    
    // Fungsi untuk hide preloader
    function hidePreloader() {
        if (preloader) {
            preloader.classList.add('hidden');
            // Hapus dari DOM setelah animasi selesai
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    }
    
    // Hide preloader setelah DOM ready (fallback cepat)
    setTimeout(() => {
        hidePreloader();
    }, 800);
    
    // Juga hide saat window load (jika belum)
    window.addEventListener('load', () => {
        hidePreloader();
    });
}

// === STICKY HEADER ===
function initHeader() {
    const header = document.getElementById('mainHeader');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// === HERO SLIDER ===
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');
    const indicatorsContainer = document.querySelector('.slider-indicators');
    
    let currentSlide = 0;
    let slideInterval;
    
    // Create indicators
    slides.forEach((_, index) => {
        const indicator = document.createElement('span');
        indicator.classList.add('indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });
    
    const indicators = document.querySelectorAll('.indicator');
    
    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        indicators[currentSlide].classList.remove('active');
        
        currentSlide = (n + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    function startAutoPlay() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoPlay() {
        clearInterval(slideInterval);
    }
    
    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoPlay();
        startAutoPlay();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoPlay();
        startAutoPlay();
    });
    
    // Start autoplay
    startAutoPlay();
    
    // Pause on hover
    document.querySelector('.hero-section').addEventListener('mouseenter', stopAutoPlay);
    document.querySelector('.hero-section').addEventListener('mouseleave', startAutoPlay);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
}

// === SEARCH FUNCTIONALITY ===
function initSearch() {
    const searchBtn = document.getElementById('searchBtn');
    const searchOverlay = document.getElementById('searchOverlay');
    const closeSearch = document.getElementById('closeSearch');
    const searchInput = document.querySelector('.search-input');
    
    searchBtn.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        setTimeout(() => searchInput.focus(), 300);
    });
    
    closeSearch.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
    });
    
    searchOverlay.addEventListener('click', (e) => {
        if (e.target === searchOverlay) {
            searchOverlay.classList.remove('active');
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            searchOverlay.classList.remove('active');
        }
    });
    
    // Search functionality
    document.querySelector('.search-submit').addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });
    
    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            console.log('Searching for:', query);
            // Implement actual search logic here
            alert(`Mencari: ${query}\nFitur pencarian akan segera diaktifkan.`);
        }
    }
}

// === THEME TOGGLE ===
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    
    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        icon.classList.replace('fa-moon', 'fa-sun');
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
}

// === MOBILE MENU ===
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const nav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !hamburger.contains(e.target) && nav.classList.contains('active')) {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// === SMOOTH SCROLL ===
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// === BACK TO TOP ===
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// === ANIMATED COUNTERS ===
function initStatCounters() {
    const statCards = document.querySelectorAll('.stat-card');
    let counted = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                counted = true;
                statCards.forEach(card => {
                    const target = parseInt(card.getAttribute('data-count'));
                    const counter = card.querySelector('.stat-number');
                    animateCounter(counter, 0, target, 2000);
                });
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.statistics-section');
    if (statsSection) {
        observer.observe(statsSection);
    }
    
    function animateCounter(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                element.textContent = end.toLocaleString('id-ID');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString('id-ID');
            }
        }, 16);
    }
}

// === TAB FUNCTIONALITY ===
function initTabs() {
    // News tabs
    const newsTabs = document.querySelectorAll('.news-tab');
    newsTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            newsTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const filter = tab.getAttribute('data-tab');
            filterNews(filter);
        });
    });
    
    // Demographics tabs
    const demoTabs = document.querySelectorAll('.demo-tab');
    demoTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            demoTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const filter = tab.getAttribute('data-demo');
            showDemoData(filter);
        });
    });
}

function filterNews(category) {
    // Implement news filtering logic
    console.log('Filtering news by:', category);
    // You can add actual filtering here
}

function showDemoData(category) {
    // Implement demographics data switching
    console.log('Showing demographics:', category);
    // You can add actual data switching here
}

// === NEWS FILTER ===
function initNewsFilter() {
    const newsCards = document.querySelectorAll('.news-card');
    
    // Add fade-in animation
    newsCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// === GALLERY FILTER ===
function initGalleryFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// === SCROLL ANIMATIONS ===
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(`
        .service-card,
        .stat-card,
        .news-card,
        .potential-card,
        .budget-item,
        .org-card,
        .gallery-item
    `);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll', 'animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
}

// === FORM VALIDATION ===
function initFormValidation() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const inputs = contactForm.querySelectorAll('input[required], textarea[required], select[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ef4444';
                    
                    // Remove error styling after input
                    input.addEventListener('input', () => {
                        input.style.borderColor = '';
                    });
                }
            });
            
            if (isValid) {
                // Show success message
                showNotification('Pesan berhasil dikirim! Kami akan segera menghubungi Anda.', 'success');
                contactForm.reset();
            } else {
                showNotification('Mohon lengkapi semua field yang wajib diisi.', 'error');
            }
        });
    }
}

// === NOTIFICATION SYSTEM ===
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 0.75rem;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// === ACTIVE NAVIGATION ===
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// === LAZY LOADING IMAGES ===
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// === DROPDOWN FUNCTIONALITY ===
document.querySelectorAll('.dropdown').forEach(dropdown => {
    const menu = dropdown.querySelector('.dropdown-menu');
    
    // For touch devices
    if ('ontouchstart' in window) {
        dropdown.addEventListener('click', (e) => {
            e.preventDefault();
            dropdown.classList.toggle('active');
        });
    }
});

// === MODAL FUNCTIONALITY (for gallery) ===
function initModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.cssText = `
        display: none;
        position: fixed;
        z-index: 10000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        align-items: center;
        justify-content: center;
    `;
    
    const modalContent = document.createElement('img');
    modalContent.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 1rem;
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Gallery item click
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            modalContent.src = img.src;
            modal.style.display = 'flex';
        });
    });
    
    // Close modal
    modal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

initModal();

// === PROGRESS BARS ANIMATION ===
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar, .demo-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => observer.observe(bar));
}

animateProgressBars();

// === COPY TO CLIPBOARD ===
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Berhasil disalin ke clipboard!', 'success');
    }).catch(() => {
        showNotification('Gagal menyalin ke clipboard.', 'error');
    });
}

// === PRINT PAGE ===
function printPage() {
    window.print();
}

// === SHARE FUNCTIONALITY ===
async function sharePage() {
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Website Resmi Desa Sukamakmur',
                text: 'Kunjungi website resmi Desa Sukamakmur untuk informasi terbaru',
                url: window.location.href
            });
        } catch (err) {
            console.log('Error sharing:', err);
        }
    } else {
        copyToClipboard(window.location.href);
        showNotification('Link website disalin ke clipboard!', 'success');
    }
}

// === VISITOR COUNTER (Simulated) ===
function updateVisitorCounter() {
    const stats = {
        today: Math.floor(Math.random() * 150) + 50,
        yesterday: Math.floor(Math.random() * 200) + 100,
        week: Math.floor(Math.random() * 1500) + 1000,
        month: Math.floor(Math.random() * 5000) + 3000,
        total: Math.floor(Math.random() * 50000) + 40000
    };
    
    // Update in footer
    const statRows = document.querySelectorAll('.stat-row strong');
    if (statRows.length >= 5) {
        statRows[0].textContent = stats.today;
        statRows[1].textContent = stats.yesterday;
        statRows[2].textContent = stats.week.toLocaleString('id-ID');
        statRows[3].textContent = stats.month.toLocaleString('id-ID');
        statRows[4].textContent = stats.total.toLocaleString('id-ID');
    }
}

updateVisitorCounter();

// === KEYBOARD SHORTCUTS ===
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('searchBtn').click();
    }
    
    // Ctrl/Cmd + D for dark mode
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        document.getElementById('themeToggle').click();
    }
});

// === PERFORMANCE MONITORING ===
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`✅ Website loaded in ${(loadTime / 1000).toFixed(2)}s`);
});

// === EASTER EGG ===
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        showNotification('🎉 Selamat! Anda menemukan easter egg!', 'success');
        document.body.style.animation = 'pulse 1s ease-in-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 1000);
    }
});

// === CONSOLE MESSAGE ===
console.log('%c🏘️ Website Desa Sukamakmur', 'font-size: 24px; font-weight: bold; color: #1e40af;');
console.log('%cDeveloped with ❤️ for better village governance', 'font-size: 14px; color: #64748b;');
console.log('%cKebijakan: Jangan gunakan console ini untuk tujuan yang tidak bertanggung jawab.', 'font-size: 12px; color: #ef4444; font-weight: bold;');

// === EXPORT FUNCTIONS FOR GLOBAL USE ===
window.showNotification = showNotification;
window.copyToClipboard = copyToClipboard;
window.printPage = printPage;
window.sharePage = sharePage;