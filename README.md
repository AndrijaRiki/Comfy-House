<div align="center">

# ComfyHouse – E-Commerce Software Suite

### Full-Stack Simulation using OOP and MockAPI Integration

![Language](https://img.shields.io/badge/language-JavaScript-yellow)
![Style](https://img.shields.io/badge/style-CSS3-blue)
![Architecture](https://img.shields.io/badge/architecture-OOP-orange)
![Backend](https://img.shields.io/badge/backend-MockAPI-red)
![Status](https://img.shields.io/badge/status-completed-success)

A comprehensive implementation of an **E-Commerce Furniture Store** featuring asynchronous data handling and persistent session management.

</div>

---

# Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technical Architecture](#technical-architecture)
- [Database & API](#database--api)
- [Logic Implementation](#logic-implementation)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Developer Notes](#developer-notes)

---

# Overview

**ComfyHouse** is a front-end heavy web application designed to simulate a real-world furniture shopping experience. 

The project focuses on:
* **User Lifecycle**: Registration, persistent login via cookies, and account deletion.
* **Transactional Logic**: Real-time cart updates, quantity management, and order submission.
* **Asynchronous Flow**: seamless interaction with a remote REST API without page reloads.

---

# Key Features

* **Persistent Sessions**: Implementation of a custom `Session` class to manage user state using browser cookies.
* **Dynamic Shopping Cart**: A slide-out interface that allows users to adjust item amounts or remove products, with real-time total price calculation.
* **User Management**: Secure-style forms for login and account creation with validation for email formats.
* **Automated UI Feedback**: Buttons and product cards react visually (opacity/disabling) once an item is added to the cart.

---

# Technical Architecture

The project follows a modular **Object-Oriented Programming (OOP)** approach to ensure code maintainability.

### Core Classes
* **`User.js`**: Manages user-specific actions including `create()`, `login()`, `get()`, and `delete()` via the API.
* **`Order.js`**: Handles the construction and submission of purchase data, linking user IDs to their selected products.
* **`Session.js`**: Encapsulates cookie logic, providing methods to start, retrieve, and destroy sessions.

---

# Database & API

The application interfaces with a **MockAPI** backend to simulate a persistent database.

* **Users Endpoint**: Stores first names, last names, emails, and passwords.
* **Orders Endpoint**: Records transaction history, including the list of items ordered, the total price, and the associated User ID.

---

# Logic Implementation

### Session Lifecycle
1.  **Start**: Upon login/signup, a `user_id` cookie is created with a 48-hour expiration.
2.  **Retrieve**: The app checks for this cookie on load to populate the user profile and name.
3.  **Destroy**: Logout or account deletion clears all browser cookies.

### Cart Synchronization
The cart uses event delegation to manage items. It calculates totals using the following logic:
* **Increase**: $Total = Total + Price$.
* **Decrease**: $Total = Total - Price$. If amount reaches 0, the item is purged from the DOM.
* **Remove**: Re-enables the "Add to Cart" button on the main product display.

---

# Project Structure

```txt
├── JS/
│   ├── app.js            # Main controller and event listeners
│   ├── User.js           # User data model and API calls
│   ├── Session.js        # Cookie and state management
│   ├── Order.js          # Order processing logic
│   └── page-functions.js # UI/UX interactions and cart math
├── style.css             # Root variables and Irish Grover typography
└── index.html            # Core layout and modal templates
