
# Fake Node Server (IDS Dashboard)

A fake server displaying and serving static files of a would-be IDS database.

Displays routing, middleware, fetch promises, and DB operations.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

## Features

* **Double-Layer Security:** Implements a "Double Wall" strategy using API middleware (`authMiddleware.js`) for data protection and server-side page guards (`pageGuard.js`) to prevent unauthorized HTML access.
* **Audit Logging:** Automatically tracks sensitive user actions (Login, Registration, Data Deletion) and records them in a MySQL `system_logs` table for compliance.
* **Client-Side Performance:** Features a responsive vanilla JS frontend that handles data sorting and DOM manipulation in-memory to reduce server load.

## Prerequisites

List the software, libraries, and tools required to run the project.

* Node.js >= 14.0.0
* npm >= 6.0.0
* MySQL Server (local or remote instance)

## Installation

Step-by-step instructions to get a development environment running.

1. Clone the repository:

   ```bash
   git clone [https://github.com/NatiG7/fake_node_server.git](https://github.com/NatiG7/fake_node_server.git)
   ```
2. Navigate to the project directory:

   ```bash
   cd fake_node_server
   ```
3. Install dependencies:

   ```bash
   npm install
   ```
4. **Database Setup:**

   * Import the `dbFile.sql` located in the root directory into your MySQL Workbench.
   * Run the seed script to reset the database and create default users:

   ```bash
   npm run seed
   ```

## Usage

**Start the Server:**

```bash
npm start
```

The server will start on `http://localhost:3000`.

**Default Login Credentials:**

| Role              | Username  | Password     |
| :---------------- | :-------- | :----------- |
| **Admin**   | `admin` | `admin123` |
| **Analyst** | `david` | `123456`   |
| **Viewer**  | `sarah` | `pass789`  |

**API Example (Fetch Alerts):**

```javascript
// Example fetch request to the secured API
fetch('/api/data/alerts')
  .then(response => {
    if (response.status === 401) window.location.href = 'index.html'; // Auth check
    return response.json();
  })
  .then(data => console.log(data));
```

## Configuration

The project uses `dotenv` for configuration. Create a `.env` file in the root if you need to override defaults.

| Variable       | Description                    | Default                |
| :------------- | :----------------------------- | :--------------------- |
| `DB_HOST`    | Database Host URL              | `localhost`          |
| `DB_USER`    | Database Username              | `root`               |
| `DB_PASS`    | Database Password              | *(Empty)*            |
| `DB_NAME`    | Database Name                  | `final_project_node` |
| `SECRET_KEY` | Session Encryption Key         | `default_secret`     |
| `PORT`       | The port the server listens on | `3000`               |

## Roadmap

- [X] Initial release (v1.0.0)
- [X] Add session-based authentication (Bcrypt & Express-Session)
- [X] Implement Audit Logging to MySQL
- [X] Add Client-side Table Sorting
- [ ] Add unit tests
- [ ] Implement Dark Mode toggle

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
