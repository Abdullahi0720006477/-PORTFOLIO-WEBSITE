document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeToggle.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    };

    const initialTheme = localStorage.getItem('theme') || 'light';
    setTheme(initialTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });

    // Mobile Menu
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', navLinks.classList.contains('active'));
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            navLinks.classList.remove('active');
        });
    });

    // Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    document.querySelectorAll('.skill-card, .project-card').forEach(element => {
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition = "all 0.6s ease-out";
        observer.observe(element);
    });
});
// Add to script.js
function createProjectModal(content) {
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>${content.title}</h3>
            <div class="dashboard-preview">
                <div class="sidebar-menu">
                    ${content.menuItems.map(item => `
                        <div class="menu-item ${item.checked ? 'active' : ''}">
                            <div class="checkbox-system">
                                ${item.checked ? '<i class="fas fa-check-circle"></i>' : '<div class="checkbox"></div>'}
                                <span>${item.text}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="main-content">
                    <h4>${content.welcomeMessage}</h4>
                    <p>${content.description}</p>
                </div>
            </div>
        </div>
    `;
    
    modal.addEventListener('click', (e) => {
        if(e.target.classList.contains('project-modal')) {
            modal.remove();
        }
    });
    
    document.body.appendChild(modal);
    return modal;
}

// Initialize project modals
document.querySelectorAll('.project-links .cta-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const projectContent = {
            title: "Almadina High School Dashboard",
            menuItems: [
                { text: "Dashboard", checked: false },
                { text: "School Management", checked: true },
                { text: "SM Student", checked: false },
                { text: "SM Accounting", checked: false },
                { text: "SM Administration", checked: true },
                { text: "Profile", checked: false },
                { text: "Logout", checked: false }
            ],
            welcomeMessage: "WELCOME TO AL-MADINA HIGH SCHOOL",
            description: "Comprehensive school management system with AI-powered features and real-time monitoring."
        };
        
        const modal = createProjectModal(projectContent);
        modal.style.display = 'flex';
    });
});