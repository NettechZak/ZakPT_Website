/**
 * ADHD Focus Mode
 * Built by someone with ADHD, for people with ADHD 💜
 * 
 * Features:
 * - Toggle focus mode (reduced motion, enhanced readability)
 * - Focus highlighting (dim inactive sections)
 * - Keyboard shortcuts (Alt+F to toggle)
 * - Welcome message on first use
 */

document.addEventListener('DOMContentLoaded', () => {
    initADHDMode();
});

function initADHDMode() {
    // Clear ADHD mode on page load (auto-disable when changing pages)
    // This ensures focus mode turns off automatically when navigating
    localStorage.removeItem('adhd-mode');

    // Make sure body doesn't have the class on load
    document.body.classList.remove('adhd-mode');

    // Setup toggle button listener
    setupToggleBtn();

    // Setup focus highlighting
    setupFocusHighlighting();

    // Setup keyboard shortcuts
    setupKeyboardShortcuts();
}

function setupToggleBtn() {
    const btn = document.getElementById('adhd-toggle-btn');
    if (btn) {
        // Update initial state
        const isEnabled = document.body.classList.contains('adhd-mode');
        updateBtnState(btn, isEnabled);

        btn.addEventListener('click', () => {
            toggleADHDMode();
        });

        // Add tooltip
        btn.title = 'Toggle Focus Mode (Alt+F)\nBuilt by someone with ADHD, for people with ADHD 💜';
    }
}

function updateBtnState(btn, isEnabled) {
    if (isEnabled) {
        btn.classList.add('active');
        btn.querySelector('span').textContent = 'FOCUS: ON';
        btn.setAttribute('aria-pressed', 'true');
    } else {
        btn.classList.remove('active');
        btn.querySelector('span').textContent = 'FOCUS';
        btn.setAttribute('aria-pressed', 'false');
    }
}

function toggleADHDMode() {
    const body = document.body;
    const isEnabled = body.classList.toggle('adhd-mode');

    // Save preference (only for current session)
    localStorage.setItem('adhd-mode', isEnabled);

    // Update button state
    const btn = document.getElementById('adhd-toggle-btn');
    if (btn) {
        updateBtnState(btn, isEnabled);
    }

    // Show welcome message on first activation
    if (isEnabled && !sessionStorage.getItem('adhd-welcome-shown')) {
        showWelcomeMessage();
        sessionStorage.setItem('adhd-welcome-shown', 'true');
    }

    // Dispatch event for other scripts
    window.dispatchEvent(new CustomEvent('adhd-mode-change', {
        detail: { enabled: isEnabled }
    }));
}

function enableADHDMode() {
    document.body.classList.add('adhd-mode');
    const btn = document.getElementById('adhd-toggle-btn');
    if (btn) {
        updateBtnState(btn, true);
    }
}

function setupFocusHighlighting() {
    // Add focus-section class to main sections
    const sections = document.querySelectorAll('section, header, footer, .modal-content');

    sections.forEach(section => {
        section.addEventListener('mouseenter', () => {
            if (document.body.classList.contains('adhd-mode')) {
                // Remove active class from all
                sections.forEach(s => s.classList.remove('focus-active'));
                // Add to current
                section.classList.add('focus-active');
            }
        });
    });

    // Clear when clicking outside or leaving body
    document.body.addEventListener('mouseleave', () => {
        sections.forEach(s => s.classList.remove('focus-active'));
    });
}

function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Alt+F to toggle Focus Mode
        if (e.altKey && e.key === 'f') {
            e.preventDefault();
            toggleADHDMode();
        }

        // Double-tap Escape to toggle (track last escape press)
        if (e.key === 'Escape') {
            const now = Date.now();
            const lastEscape = window.lastEscapePress || 0;

            if (now - lastEscape < 500) { // 500ms window for double-tap
                toggleADHDMode();
                window.lastEscapePress = 0;
            } else {
                window.lastEscapePress = now;
            }
        }
    });
}

function showWelcomeMessage() {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, var(--accent-green), #00ff9d);
        color: #000;
        padding: 2rem 3rem;
        border-radius: 12px;
        font-family: var(--font-mono);
        font-weight: 700;
        font-size: 1.1rem;
        z-index: 999999;
        box-shadow: 0 10px 40px rgba(0, 255, 102, 0.5);
        text-align: center;
        animation: fadeIn 0.3s;
    `;
    message.innerHTML = `
        <div style="font-size: 2rem; margin-bottom: 0.5rem;">🧠</div>
        <div>Focus Mode Activated</div>
        <div style="font-size: 0.9rem; margin-top: 0.5rem; opacity: 0.8;">
            Built by someone with ADHD, for people with ADHD 💜
        </div>
        <div style="font-size: 0.75rem; margin-top: 1rem; opacity: 0.7;">
            Tip: Press Alt+F to toggle anytime
        </div>
    `;

    document.body.appendChild(message);

    // Auto-remove after 3 seconds
    setTimeout(() => {
        message.style.animation = 'fadeOut 0.3s';
        setTimeout(() => message.remove(), 300);
    }, 3000);
}
