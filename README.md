# Employee Directory – Frontend Assignment (AJACKUS)

This is a responsive and interactive Employee Directory web app built using **HTML**, **CSS (Flexbox)**, and **Vanilla JavaScript**. It includes core UI features like adding/editing employees, filtering, searching, sorting, and pagination — all without backend APIs, as per the assignment scope.

---

## 📁 Project Structure

employee/
├── src/
│ ├── main/
│ │ ├── resources/
│ │ │ ├── static/
│ │ │ │ ├── css/
│ │ │ │ │ └── style.css
│ │ │ │ └── js/
│ │ │ │ ├── data.js
│ │ │ │ └── app.js
│ │ │ └── templates/
│ │ │ └── index.ftlh

README.md

---

## 🚀 How to Run the App

> ⚠️ The app doesn't use any backend or build tools.

1. Make sure your project folder has the above structure.
2. Open `index.ftlh` (inside `templates/`) with **Live Server** in VS Code.
3. App loads in the browser with preloaded employee cards (from `data.js`).

---

## 🧠 Features Implemented

- ✅ Responsive layout using Flexbox (mobile-friendly)
- ✅ Add/Edit Employee with validation
- ✅ Delete employee from UI
- ✅ Search (live by name/email)
- ✅ Filter by First Name, Department, Role (popup)
- ✅ Sort by First Name or Department
- ✅ Pagination with dynamic page size (10/25/50/100)
- ✅ Dynamic rendering using vanilla JS
- ✅ Form validation (required fields, valid email)
- ✅ Clean structure & modular code with comments

---

<!-- ## 📸 Screenshots

> _(Add screenshots manually if possible — of Dashboard, Form, Filter Popup, and Mobile View)_

--- -->

## 💬 Reflection

**Challenges Faced:**

- Understanding Freemarker usage in a frontend-only setup.
- Maintaining state with just in-memory JavaScript arrays (no backend, no localStorage).
- Building pagination that dynamically reflects filters and search results.
- Ensuring clean structure with minimal libraries (no frameworks used).

**What I’d improve:**

- Improve UI styling with CSS animations and transitions.
- Add localStorage to preserve data on refresh (not required here).
- Modularize JavaScript even more using ES modules if environment allowed.

---

## 👨‍💻 Tech Stack

- HTML5
- CSS3 (Flexbox)
- JavaScript (ES6+)
- Freemarker file structure (simulated injection)

---

## 📧 Contact

**Rahul Gudipati**  
Frontend Developer  
[GitHub Profile](https://github.com/Rajgudipati9999)
