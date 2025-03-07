# Express Blog API with Winston Logger

## Overview
This project is a simple **Express.js Blog API** that utilizes **Winston** for logging with different log levels and colorized console output.

## Features
- **Winston Logging** with multiple log levels (`info`, `warn`, `error`, `debug`, etc.)
- **Console & File Logging**
- **Express.js API** with a basic route
- **ES6 Module Support**

## Installation

### Clone the Repository
```sh
git clone https://github.com/yourusername/express-winston-api.git
cd express-winston-api
```

### Install Dependencies  
```sh
npm install
```

Run the Server
```sh
npm start
```

By default, the server runs on http://localhost:5000.

### File Structure
```sh
.
├── logs/                  # Log files
│   ├── error.log          # Stores error logs
│   ├── combined.log       # Stores all logs
├── logger.js              # Winston logger setup
├── server.js              # Main Express API
├── package.json           # Project dependencies
├── README.md              # Project documentation
```

### **Log Levels & Colors**  

| Level   | Color      | Description         |
|---------|-----------|---------------------|
| 🔴 **Error**   | Red       | Critical errors|
| 🟡 **Warning** | Yellow    | Warnings       |
| 🟢 **Info**    | Green     | General info   |
| 🔵 **HTTP**    | Cyan      | HTTP requests  |
| 🔵 **Verbose** | Blue      | Detailed info  |
| 🟣 **Debug**   | Magenta   | Debugging logs |
