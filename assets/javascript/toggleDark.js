// Dark mode toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    var checkbox = document.querySelector('input[name=mode]');

    if (!checkbox) {
        console.warn('Dark mode checkbox not found');
        return;
    }

    // Check for saved theme preference or default to light mode
    var currentTheme = localStorage.getItem('theme') || 'light';

    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    checkbox.checked = currentTheme === 'dark';

    // Listen for toggle
    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
});