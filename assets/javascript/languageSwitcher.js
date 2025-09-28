// Language switcher functionality
class LanguageSwitcher {
    constructor() {
        this.currentLang = this.getStoredLanguage() || 'en';
        this.init();
    }

    init() {
        // Set initial language
        this.setLanguage(this.currentLang);

        // Add event listeners
        this.attachEventListeners();

        // Update button states
        this.updateButtons();
    }

    attachEventListeners() {
        const buttons = document.querySelectorAll('.lang-btn');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = button.id.replace('lang-', '');
                this.switchLanguage(lang);
            });
        });
    }

    switchLanguage(lang) {
        if (lang === this.currentLang) return;

        this.currentLang = lang;
        this.setLanguage(lang);
        this.updateButtons();
        this.saveLanguage(lang);
    }

    setLanguage(lang) {
        // Hide all language content
        document.querySelectorAll('.lang-content').forEach(content => {
            content.style.display = 'none';
        });

        // Show content for selected language
        document.querySelectorAll(`[data-lang="${lang}"]`).forEach(content => {
            content.style.display = 'block';
        });

        // Update titles and other translatable elements
        document.querySelectorAll('[data-en][data-ru]').forEach(element => {
            if (element.hasAttribute(`data-${lang}`)) {
                element.textContent = element.getAttribute(`data-${lang}`);
            }
        });

        // Update page language attribute
        document.documentElement.lang = lang;
    }

    updateButtons() {
        document.querySelectorAll('.lang-btn').forEach(button => {
            button.classList.remove('active');
        });

        const activeButton = document.getElementById(`lang-${this.currentLang}`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
    }

    saveLanguage(lang) {
        try {
            localStorage.setItem('cv-language', lang);
        } catch (e) {
            // localStorage might not be available
            console.warn('Could not save language preference:', e);
        }
    }

    getStoredLanguage() {
        try {
            return localStorage.getItem('cv-language');
        } catch (e) {
            // localStorage might not be available
            console.warn('Could not retrieve language preference:', e);
            return null;
        }
    }
}

// Global function for onclick handlers (backward compatibility)
function switchLanguage(lang) {
    if (window.languageSwitcher) {
        window.languageSwitcher.switchLanguage(lang);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.languageSwitcher = new LanguageSwitcher();
});