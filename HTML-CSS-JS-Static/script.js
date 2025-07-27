
// Animated Token Counter
class TokenCounter {
    constructor() {
        this.priceElement = document.getElementById('tokenPrice');
        this.changeElement = document.getElementById('priceChange');
        this.marketCapElement = document.getElementById('marketCap');
        this.volumeElement = document.getElementById('volume');
        this.holdersElement = document.getElementById('holders');
        
        this.basePrice = 0.00001337;
        this.currentPrice = this.basePrice;
        
        this.init();
    }
    
    init() {
        if (!this.priceElement) return;
        
        // Start the price animation
        this.startPriceAnimation();
        
        // Update market stats periodically
        this.updateMarketStats();
        setInterval(() => this.updateMarketStats(), 15000);
        
        // Simulate price changes
        setInterval(() => this.simulatePriceChange(), 5000);
    }
    
    startPriceAnimation() {
        // Animate the initial price loading
        this.animateValue(this.priceElement, 0, this.basePrice, 2000, (value) => {
            return `$${value.toFixed(8)}`;
        });
    }
    
    simulatePriceChange() {
        if (!this.priceElement) return;
        
        // Generate realistic price fluctuation
        const changePercent = (Math.random() - 0.5) * 0.1; // ±5% max change
        const newPrice = this.currentPrice * (1 + changePercent);
        
        // Update price with animation
        this.animateValue(this.priceElement, this.currentPrice, newPrice, 1000, (value) => {
            return `$${value.toFixed(8)}`;
        });
        
        // Update price change indicator
        const totalChange = ((newPrice - this.basePrice) / this.basePrice) * 100;
        this.updatePriceChange(totalChange);
        
        this.currentPrice = newPrice;
        
        // Add glitch effect occasionally
        if (Math.random() < 0.3) {
            this.addGlitchEffect();
        }
    }
    
    updatePriceChange(changePercent) {
        if (!this.changeElement) return;
        
        const isPositive = changePercent >= 0;
        const sign = isPositive ? '+' : '';
        
        this.changeElement.textContent = `${sign}${changePercent.toFixed(2)}%`;
        this.changeElement.className = isPositive ? 'price-change' : 'price-change negative';
        
        // Add animation
        this.changeElement.style.animation = 'none';
        setTimeout(() => {
            this.changeElement.style.animation = 'pulse 1.5s ease-in-out infinite';
        }, 10);
    }
    
    updateMarketStats() {
        if (!this.marketCapElement || !this.volumeElement || !this.holdersElement) return;
        
        // Simulate market cap changes
        const baseMarketCap = 1337420;
        const marketCapVariation = baseMarketCap * (0.9 + Math.random() * 0.2);
        
        // Simulate volume changes
        const baseVolume = 69420;
        const volumeVariation = baseVolume * (0.5 + Math.random() * 1.5);
        
        // Simulate holder growth
        const baseHolders = 1337;
        const holdersVariation = baseHolders + Math.floor(Math.random() * 100);
        
        // Animate updates
        this.animateValue(this.marketCapElement, 
            parseInt(this.marketCapElement.textContent.replace(/[$,]/g, '')) || 0, 
            marketCapVariation, 
            2000, 
            (value) => `$${Math.floor(value).toLocaleString()}`
        );
        
        this.animateValue(this.volumeElement, 
            parseInt(this.volumeElement.textContent.replace(/[$,]/g, '')) || 0, 
            volumeVariation, 
            2000, 
            (value) => `$${Math.floor(value).toLocaleString()}`
        );
        
        this.animateValue(this.holdersElement, 
            parseInt(this.holdersElement.textContent.replace(/,/g, '')) || 0, 
            holdersVariation, 
            2000, 
            (value) => Math.floor(value).toLocaleString()
        );
    }
    
    animateValue(element, start, end, duration, formatter) {
        if (!element) return;
        
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = start + (end - start) * easeProgress;
            
            element.textContent = formatter(current);
            element.style.animation = 'countUp 0.3s ease-out';
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    addGlitchEffect() {
        const elements = [this.priceElement, this.marketCapElement, this.volumeElement].filter(el => el);
        if (elements.length === 0) return;
        
        const randomElement = elements[Math.floor(Math.random() * elements.length)];
        
        const originalText = randomElement.textContent;
        const glitchChars = '!@#$%^&*()[]{}|;:,.<>?';
        
        // Create glitch effect
        let glitchText = '';
        for (let i = 0; i < originalText.length; i++) {
            if (Math.random() < 0.3) {
                glitchText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
            } else {
                glitchText += originalText[i];
            }
        }
        
        randomElement.textContent = glitchText;
        randomElement.style.color = '#ff0057';
        
        // Restore original text after short delay
        setTimeout(() => {
            randomElement.textContent = originalText;
            randomElement.style.color = '';
        }, 100);
    }
}

// Enhanced Hustle Effects
class HustleEffects {
    constructor() {
        this.init();
    }
    
    init() {
        this.addScrollAnimations();
        this.addHoverEffects();
        this.addMatrixRain();
        this.addPulseEffect();
    }
    
    addScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'countUp 0.6s ease-out';
                    entry.target.classList.add('animate-in');
                }
            });
        });
        
        document.querySelectorAll('section, .token-counter, .enhanced-table').forEach(section => {
            observer.observe(section);
        });
    }
    
    addHoverEffects() {
        document.querySelectorAll('.cta-buttons a').forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                e.target.style.background = 'linear-gradient(45deg, #dc2626, #ef4444)';
                e.target.style.color = '#fff';
                e.target.style.transform = 'translateY(-2px) scale(1.05) rotateX(5deg)';
                e.target.style.boxShadow = '0 20px 40px rgba(220, 38, 38, 0.6)';
            });
            
            button.addEventListener('mouseleave', (e) => {
                e.target.style.background = '';
                e.target.style.color = '';
                e.target.style.transform = '';
                e.target.style.boxShadow = '';
            });
        });
    }
    
    addMatrixRain() {
        // Create subtle matrix rain effect in background
        const matrixContainer = document.createElement('div');
        matrixContainer.className = 'matrix-rain';
        matrixContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.05;
        `;
        
        for (let i = 0; i < 20; i++) {
            const drop = document.createElement('div');
            drop.textContent = Math.random() < 0.5 ? '1' : '0';
            drop.style.cssText = `
                position: absolute;
                color: #dc2626;
                font-family: 'Courier New', monospace;
                font-size: 14px;
                left: ${Math.random() * 100}%;
                animation: matrixFall ${5 + Math.random() * 10}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            matrixContainer.appendChild(drop);
        }
        
        document.body.appendChild(matrixContainer);
        
        // Add matrix fall animation
        const matrixStyle = document.createElement('style');
        matrixStyle.textContent = `
            @keyframes matrixFall {
                0% { transform: translateY(-100vh); opacity: 0; }
                50% { opacity: 1; }
                100% { transform: translateY(100vh); opacity: 0; }
            }
        `;
        document.head.appendChild(matrixStyle);
    }
    
    addPulseEffect() {
        // Add pulse effect to key elements
        const pulseElements = document.querySelectorAll('.hustle-accent, .price-value');
        pulseElements.forEach(el => {
            el.style.animation = 'hustlePulse 3s ease-in-out infinite';
        });
        
        const pulseStyle = document.createElement('style');
        pulseStyle.textContent = `
            @keyframes hustlePulse {
                0%, 100% { text-shadow: 0 0 5px rgba(220, 38, 38, 0.5); }
                50% { text-shadow: 0 0 20px rgba(220, 38, 38, 0.8), 0 0 30px rgba(220, 38, 38, 0.6); }
            }
        `;
        document.head.appendChild(pulseStyle);
    }
}

// Advanced Scroll Animations
class ScrollAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        this.createScrollObserver();
        this.addParallaxEffect();
        this.addProgressBar();
    }
    
    createScrollObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Add stagger delay for list items
                    const listItems = entry.target.querySelectorAll('li');
                    listItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.animationDelay = `${index * 0.1}s`;
                            item.classList.add('animate-in');
                        }, index * 100);
                    });
                    
                    // Add table row animations
                    const tableRows = entry.target.querySelectorAll('.table-row-animated');
                    tableRows.forEach((row, index) => {
                        setTimeout(() => {
                            row.style.animation = `slideInRight 0.6s ease-out ${index * 0.1}s forwards`;
                        }, index * 100);
                    });
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        document.querySelectorAll('section, h2, .token-counter, .enhanced-table').forEach(el => {
            observer.observe(el);
        });
    }
    
    addParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            // Enhanced 3D parallax background
            document.body.style.backgroundPosition = `0 ${rate}px`;
            
            // 3D floating buttons with rotation
            document.querySelectorAll('.cta-buttons a').forEach((btn, index) => {
                const speed = (index + 1) * 0.05;
                const rotateSpeed = scrolled * 0.02;
                btn.style.transform = `translateY(${scrolled * speed}px) rotateX(${rotateSpeed}deg) rotateY(${rotateSpeed * 0.5}deg)`;
            });
            
            // 3D table rotation on scroll
            const table = document.querySelector('.enhanced-table');
            if (table) {
                const tableRect = table.getBoundingClientRect();
                const isVisible = tableRect.top < window.innerHeight && tableRect.bottom > 0;
                
                if (isVisible) {
                    const scrollProgress = (window.innerHeight - tableRect.top) / (window.innerHeight + tableRect.height);
                    const rotateX = (scrollProgress - 0.5) * 5;
                    const rotateY = (scrollProgress - 0.5) * 2;
                    
                    table.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
                }
            }
            
            // Hero section 3D transform
            const hero = document.querySelector('.hero-content');
            if (hero && scrolled < window.innerHeight) {
                const progress = scrolled / window.innerHeight;
                hero.style.transform = `translateZ(${progress * 50}px) rotateX(${progress * 5}deg)`;
                hero.style.opacity = 1 - progress * 0.3;
            }
        });
    }
    
    addProgressBar() {
        // Add scroll progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #dc2626, #ef4444);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = `${scrollPercent}%`;
        });
    }
}

// Enhanced Button Effects
class ButtonEffects {
    constructor() {
        this.init();
    }
    
    init() {
        this.addRippleEffect();
        this.addHoverSounds();
        this.addClickAnimations();
    }
    
    addRippleEffect() {
        document.querySelectorAll('.cta-buttons a').forEach(button => {
            button.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
        
        // Add ripple styles
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = `
            .cta-buttons a {
                position: relative;
                overflow: hidden;
            }
            
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.4);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
            
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(50px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
        `;
        document.head.appendChild(rippleStyle);
    }
    
    addHoverSounds() {
        // Visual feedback for hover effects
        document.querySelectorAll('.cta-buttons a, .stat, th').forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.filter = 'brightness(1.2) saturate(1.2)';
                element.style.textShadow = '0 0 10px rgba(255, 0, 87, 0.5)';
                element.style.transition = 'all 0.3s ease';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.filter = '';
                element.style.textShadow = '';
            });
        });
    }
    
    addClickAnimations() {
        // Add satisfying click animations
        document.querySelectorAll('.cta-buttons a').forEach(button => {
            button.addEventListener('mousedown', () => {
                button.style.transform = 'scale(0.95) translateY(-5px)';
            });
            
            button.addEventListener('mouseup', () => {
                button.style.transform = '';
            });
        });
    }
}

// Premium 3D Cursor Effect
class Premium3DCursor {
    constructor() {
        this.cursor = null;
        this.init();
    }
    
    init() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'premium-cursor';
        this.cursor.innerHTML = '💎';
        this.cursor.style.cssText = `
            position: fixed;
            width: 30px;
            height: 30px;
            pointer-events: none;
            z-index: 9999;
            font-size: 20px;
            animation: cursorFloat 2s ease-in-out infinite;
            filter: drop-shadow(0 0 10px rgba(220, 38, 38, 0.8));
            transition: all 0.1s ease;
        `;
        document.body.appendChild(this.cursor);
        
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = (e.clientX - 15) + 'px';
            this.cursor.style.top = (e.clientY - 15) + 'px';
        });
        
        // Hide cursor when mouse leaves window
        document.addEventListener('mouseleave', () => {
            this.cursor.style.opacity = '0';
        });
        
        document.addEventListener('mouseenter', () => {
            this.cursor.style.opacity = '1';
        });
        
        // Add cursor styles
        const cursorStyle = document.createElement('style');
        cursorStyle.textContent = `
            @keyframes cursorFloat {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-10px) rotate(180deg); }
            }
        `;
        document.head.appendChild(cursorStyle);
    }
}

// Advanced Loading Animation
class LoadingEffects {
    constructor() {
        this.init();
    }
    
    init() {
        // Create loading overlay
        const overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.innerHTML = `
            <div class="loading-content">
                <div class="hustle-loader">
                    <div class="loader-text">$REPHUSTLE</div>
                    <div class="loader-bar"></div>
                    <div class="loader-subtitle">Loading Hustle Protocol...</div>
                </div>
            </div>
        `;
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #000, #1a0000);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeOut 2s ease 1.5s forwards;
        `;
        document.body.appendChild(overlay);
        
        // Add loading styles
        const loadingStyle = document.createElement('style');
        loadingStyle.textContent = `
            .loading-content {
                text-align: center;
            }
            
            .loader-text {
                font-family: 'Orbitron', monospace;
                font-size: 3em;
                font-weight: 900;
                color: #dc2626;
                margin-bottom: 30px;
                animation: pulse 1s ease-in-out infinite;
            }
            
            .loader-subtitle {
                font-family: 'Inter', sans-serif;
                font-size: 1.2em;
                color: #666;
                margin-top: 20px;
                animation: typewriter 2s steps(20) infinite;
            }
            
            .loader-bar {
                width: 300px;
                height: 4px;
                background: rgba(220, 38, 38, 0.2);
                border-radius: 2px;
                overflow: hidden;
                position: relative;
                margin: 0 auto;
            }
            
            .loader-bar::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 50%;
                height: 100%;
                background: linear-gradient(90deg, #dc2626, #ef4444);
                border-radius: 2px;
                animation: loadingBar 1.5s ease-in-out infinite;
            }
            
            @keyframes loadingBar {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(300%); }
            }
            
            @keyframes fadeOut {
                to { opacity: 0; pointer-events: none; }
            }
            
            @keyframes typewriter {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }
        `;
        document.head.appendChild(loadingStyle);
        
        // Remove overlay after loading
        setTimeout(() => {
            overlay.remove();
        }, 3500);
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.init();
    }
    
    init() {
        // Monitor performance and optimize animations
        let frameCount = 0;
        let lastTime = performance.now();
        
        const checkPerformance = () => {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                
                // Reduce animations if FPS is low
                if (fps < 30) {
                    document.body.classList.add('reduced-motion');
                } else {
                    document.body.classList.remove('reduced-motion');
                }
                
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(checkPerformance);
        };
        
        checkPerformance();
        
        // Add reduced motion styles
        const perfStyle = document.createElement('style');
        perfStyle.textContent = `
            .reduced-motion * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(perfStyle);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 $REPHUSTLE loaded! We rep the hustle! 💪');
    
    // Initialize all systems
    new LoadingEffects();
    new TokenCounter();
    new HustleEffects();
    new ScrollAnimations();
    new ButtonEffects();
    new Premium3DCursor();
    new PerformanceMonitor();
    
    console.log('✨ Advanced UI animations activated! ✨');
    console.log('💎 Premium 3D effects loaded! 💎');
    console.log('🎯 All systems operational! 🎯');
});

// Easter egg: Konami code for extra effects
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        // Activate hustle mode!
        document.body.style.animation = 'rainbow 1s linear infinite';
        
        // Add rainbow animation
        const rainbowStyle = document.createElement('style');
        rainbowStyle.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(rainbowStyle);
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
        
        alert('🌈 HUSTLE MODE ACTIVATED! 🚀');
    }
});

// Prevent right-click context menu for premium feel
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'h') {
        e.preventDefault();
        document.querySelector('.hero-content').scrollIntoView({ behavior: 'smooth' });
    }
    if (e.ctrlKey && e.key === 't') {
        e.preventDefault();
        document.querySelector('#tokenomics').scrollIntoView({ behavior: 'smooth' });
    }
});
