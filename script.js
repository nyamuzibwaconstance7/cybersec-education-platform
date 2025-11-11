// Password Strength Checker
const passwordInput = document.getElementById('passwordInput');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');

passwordInput.addEventListener('input', function() {
    const password = this.value;
    const strength = calculatePasswordStrength(password);
    
    updateStrengthMeter(strength.score, strength.text, strength.color);
});

function calculatePasswordStrength(password) {
    let score = 0;
    
    // Length check
    if (password.length >= 8) score += 25;
    // Uppercase check
    if (/[A-Z]/.test(password)) score += 25;
    // Number check
    if (/[0-9]/.test(password)) score += 25;
    // Special character check
    if (/[^A-Za-z0-9]/.test(password)) score += 25;
    
    if (score === 0) return { score: 0, text: "Very Weak", color: "#e53e3e" };
    if (score <= 25) return { score: 25, text: "Weak", color: "#ed8936" };
    if (score <= 50) return { score: 50, text: "Fair", color: "#ecc94b" };
    if (score <= 75) return { score: 75, text: "Good", color: "#48bb78" };
    return { score: 100, text: "Strong", color: "#38a169" };
}

function updateStrengthMeter(score, text, color) {
    strengthBar.style.width = score + '%';
    strengthBar.style.backgroundColor = color;
    strengthText.textContent = `Strength: ${text}`;
    strengthText.style.color = color;
}

// Website Safety Check
function checkWebsite() {
    const websiteInput = document.getElementById('websiteInput');
    const safetyResult = document.getElementById('safetyResult');
    const url = websiteInput.value.trim();
    
    if (!url) {
        safetyResult.textContent = "Please enter a website URL";
        safetyResult.style.color = "#e53e3e";
        return;
    }
    
    // Simple HTTPS check
    if (url.startsWith('https://')) {
        safetyResult.textContent = "✅ This website uses HTTPS (Secure)";
        safetyResult.style.color = "#38a169";
    } else if (url.startsWith('http://')) {
        safetyResult.textContent = "⚠️ This website uses HTTP (Not Secure)";
        safetyResult.style.color = "#ed8936";
    } else {
        safetyResult.textContent = "❓ Please include http:// or https://";
        safetyResult.style.color = "#e53e3e";
    }
}

// Contact Form Handler - FRONTEND ONLY
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const formMessage = document.getElementById('formMessage');
    
    // Get form values
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simulate successful database save
    formMessage.innerHTML = "✅ Message would be saved securely to MySQL database!<br><small>Using Prepared Statements to prevent SQL injection</small>";
    formMessage.style.color = "#38a169";
    formMessage.style.background = "#f0fff4";
    formMessage.style.padding = "15px";
    formMessage.style.borderRadius = "8px";
    
    // Show in console what would happen
    console.log("=== DATABASE OPERATION SIMULATION ===");
    console.log("SQL: INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)");
    console.log("Parameters:", { name, email, message });
    console.log("Security: Using Prepared Statements - SQL Injection Protected");
    
    // Reset form
    this.reset();
    
    // Clear message after 5 seconds
    setTimeout(() => {
        formMessage.textContent = "";
        formMessage.style.background = "none";
    }, 5000);
});

// Initialize - Set some demo values
console.log("🔒 Security Demo Loaded Successfully");
console.log("Features: Password Strength + HTTPS Check + Secure Contact Form");