feather.replace();

const passwordInput = document.getElementById('password');
const strengthEl = document.getElementById('strength');
const passwordHashInput = document.getElementById('password-hash');
const hashEl = document.getElementById('hash');
const passwordBruteInput = document.getElementById('password-brute');
const estimateBtn = document.getElementById('estimate-btn');
const bruteResult = document.getElementById('brute-result');
const timeEl = document.getElementById('time');
const copyBtn = document.getElementById('copyHashBtn');

passwordInput.addEventListener('input', handleInputAll);
passwordHashInput.addEventListener('input', async function () {
    const pwd = passwordHashInput.value;
    hashEl.textContent = pwd.length > 0 ? await sha256(pwd) : "";
});

passwordBruteInput.addEventListener('input', () => {
    const pwd = passwordBruteInput.value;
    timeEl.textContent = pwd.length > 0 ? formatTime(estimateBruteForceTime(pwd)) : "";
});

estimateBtn.addEventListener('click', () => {
    bruteResult.style.display = 'block';
    bruteResult.style.opacity = 0;
    bruteResult.style.transform = 'translateY(20px)';
    setTimeout(() => {
        bruteResult.style.transition = 'all 0.5s';
        bruteResult.style.opacity = 1;
        bruteResult.style.transform = 'translateY(0)';
    }, 50);
    const pwd = passwordInput.value;
    passwordBruteInput.value = pwd;
    if (pwd.length > 0) {
        timeEl.textContent = formatTime(estimateBruteForceTime(pwd));
    }
});

async function handleInputAll() {
    const pwd = passwordInput.value;
    const strength = getStrength(pwd);
    strengthEl.textContent = strength.label;
    strengthEl.className = `strength ${strength.class}`;
    passwordHashInput.value = pwd;
    hashEl.textContent = pwd.length > 0 ? await sha256(pwd) : "";
    passwordBruteInput.value = pwd;
    timeEl.textContent = pwd.length > 0 && bruteResult.offsetParent !== null
        ? formatTime(estimateBruteForceTime(pwd))
        : "";
}

function getStrength(password) {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (score <= 1) return { label: 'Weak', class: 'weak' };
    else if (score === 2) return { label: 'Medium', class: 'medium' };
    else return { label: 'Strong', class: 'strong' };
}

async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function estimateBruteForceTime(password) {
    let charset = 0;
    if (/[a-z]/.test(password)) charset += 26;
    if (/[A-Z]/.test(password)) charset += 26;
    if (/[0-9]/.test(password)) charset += 10;
    if (/[^A-Za-z0-9]/.test(password)) charset += 32;
    return Math.pow(charset, password.length) / 1e9;
}

function formatTime(seconds) {
    if (seconds < 60) return `${seconds.toFixed(2)} seconds`;
    else if (seconds < 3600) return `${(seconds / 60).toFixed(2)} minutes`;
    else if (seconds < 86400) return `${(seconds / 3600).toFixed(2)} hours`;
    else if (seconds < 31536000) return `${(seconds / 86400).toFixed(2)} days`;
    else return `${(seconds / 31536000).toFixed(2)} years`;
}

function togglePassword() {
    const toggleIcon = document.getElementById('toggleIcon');
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleIcon.setAttribute("data-feather", "eye");
    } else {
        passwordInput.type = "password";
        toggleIcon.setAttribute("data-feather", "eye-off");
    }
    feather.replace();
}

copyBtn.addEventListener('click', () => {
    const text = hashEl.textContent;
    if (text) {
        navigator.clipboard.writeText(text).then(() => {
            copyBtn.innerHTML = `<i data-feather="check-circle"></i> Copied`;
            feather.replace();
            setTimeout(() => {
                copyBtn.innerHTML = `<i data-feather="copy"></i> Copy`;
                feather.replace();
            }, 1500);
        });
    }
});
document.getElementById('togglePasswordBtn').addEventListener('click', togglePassword);

const cursor = document.querySelector('.cursor');
let mouseX = 0, mouseY = 0, currentX = 0, currentY = 0;
window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
function animateCursor() {
    currentX += (mouseX - currentX) * 0.15;
    currentY += (mouseY - currentY) * 0.15;
    cursor.style.transform = `translate(${currentX}px, ${currentY}px)`;
    requestAnimationFrame(animateCursor);
}
animateCursor();
