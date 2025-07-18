# 🔐 StrengthX - Luxury Password Tool

**StrengthX** is a stylish, animated web application that helps users evaluate password strength, hash passwords securely (SHA-256), and estimate brute-force cracking time. It also features password visibility toggling, clipboard copy functionality, and a responsive modern design.

---

## 🚀 Features

* ✅ Password strength classification (Weak / Medium / Strong)
* 🔐 SHA-256 hashing
* ⏱ Brute-force attack time estimator
* 👁 Toggle password visibility
* 📋 Copy hashed value to clipboard
* 🎨 Glassmorphism UI with custom animated cursor
* 📱 Fully responsive design
* 💡 Security tips & tricks included

---

## 📂 File Structure

```
project-folder/
│
├── index.html        # Main HTML file
├── style.css         # External CSS file for styling
├── script.js         # JavaScript logic
├── img.jpg           # Image used in the UI
└── README.md         # This file
```

---

## 🛠 How to Run the Project

1. **Download or Clone the Repository**

   ```bash
   git clone https://github.com/your-username/strengthx-password-tool.git
   ```

2. **Navigate to the project folder**

   ```bash
   cd strengthx-password-tool
   ```

3. **Open `index.html` in any modern browser**

   * You can simply **double-click** the file or
   * Use Live Server if you're working in VS Code for live reload:

     ```bash
     code .
     # Then click "Go Live" from the status bar
     ```

---

## 💻 Requirements

This project runs **completely in the browser**, no server or database needed.

* ✅ Google Chrome, Firefox, Edge, Safari (latest versions)
* ✅ Internet connection to load Feather Icons (`https://unpkg.com/feather-icons`)

---

## ✨ How It Works

* **Password Strength Checker**: Dynamically evaluates password based on:

  * Length ≥ 8
  * Includes uppercase, digits, special characters
* **SHA-256 Hashing**: Uses `crypto.subtle.digest()` to generate secure hash
* **Brute-force Estimation**: Calculates time using password entropy (character set length and password length)
* **UI Enhancements**:

  * Copy button toggles icon and feedback
  * Eye button toggles password visibility
  * Custom animated cursor follows mouse movement

---

## 📌 Notes

* The password you enter **is never sent anywhere**. Everything is handled **locally** in your browser.
* Ideal for educational/demo purposes, not for real credential verification or production use.

---

## 🙌 Author

Made by **Lakshay Talwar**
