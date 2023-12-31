# ProShopCourse - Django with React E-Commerce Website

This project is an e-commerce website built with Django and React. It is based on the Udemy course [Django with React - An E-Commerce Website](https://www.udemy.com/course/django-with-react-an-ecommerce-website/).

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Description

ProShopCourse implements a full-stack e-commerce website using Django as the backend framework and React for the frontend. It includes user authentication, product listings, shopping cart functionality, and more.

## Features

- User authentication with JWT tokens
- Product listings and details
- Shopping cart functionality
- ...

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Python 3.x installed
- Node.js and npm installed
- ...

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/ProShopCourse.git
   cd ProShopCourse

2. Create and activate a virtual environment:
    #### Create a virtual environment
    python -m venv venv

    #### Activate the virtual environment (on Windows)
    venv\Scripts\activate

    #### Activate the virtual environment (on macOS/Linux)
    source venv/bin/activate

3. Install backend dependencies:

    ```bash
    pip install -r backend/requirements.txt

4. Install frontend dependencies:

    ```bash
    cd frontend
    npm install
5. Set up the Django database:

    ```bash
    
    cd backend
    python manage.py migrate
    ...

6. Start the Django development server:

    ```bash
    cd backend
    python manage.py runserver

### The backend server will be running at http://127.0.0.1:8000/.

7. Start the React development server:

    ```bash
    cd frontend
    npm start

### The frontend server will be running at http://localhost:3000/.

### Open your web browser and navigate to http://localhost:3000/ to view the application.

### Contributing
Contributions are welcome! Please follow the CONTRIBUTING.md guidelines.

### License
This project is licensed under the MIT License.

Replace "your-username" with your actual GitHub username when you use this template. Feel free to customize other sections as needed.