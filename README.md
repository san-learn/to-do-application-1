# To Do Application 1

## Acknowledgements

I would like to thank:

- [JavaScript Unleashed](https://www.youtube.com/@JavaScriptUnleashed) for the inspiring YouTube tutorial.
- The open-source community for the amazing tools and libraries.

## Inspiration & Implementation

While inspired by a YouTube tutorial, I implemented the project with my own coding style and structure, ensuring a unique learning experience.

## Installation

1. Clone the repository:

```sh
git clone https://github.com/san-learn/to-do-application-1.git
```

### Server

1. Open the `server` directory and install dependencies using:

   ```sh
   cd server
   npm install
   ```

2. Create a `.env` file in the root directory with the following keys:

   ```env
   NODE_ENV=development # Set to 'development' or 'production'

   PORT=3000

   MONGO_URI="mongodb://localhost:27017/your-database-name"

   JWT_SECRET="your-secret-key"
   ```

3. (Optional) Seed the database by running:

   ```sh
   npm run db:seed
   ```

4. Start the server:
   ```sh
   npm run dev
   ```

### Client

1. Open the `client` directory and install dependencies using:

   ```sh
   cd client
   npm install
   ```

2. Create a `.env` file in the root directory with the following keys:

   ```env
   VITE_SERVER_BASE_API_URL="http://localhost:3000"
   ```

3. Start the client:

   ```sh
   npm run dev
   ```

## Dependencies

### Server

The server is built using Express with MongoDB as the database. Below are the dependencies used:

#### Dependencies

| Dependency      | Description                                               |
| --------------- | --------------------------------------------------------- |
| `bcryptjs`      | Password hashing utility                                  |
| `cookie-parser` | Middleware to parse cookies                               |
| `cors`          | Middleware for handling CORS policies                     |
| `dotenv`        | Loads environment variables from `.env` file              |
| `express`       | Web framework for Node.js                                 |
| `jsonwebtoken`  | Library for creating and verifying JWT tokens             |
| `mongoose`      | ODM (Object Data Modeling) for MongoDB                    |
| `nodemon`       | Utility that automatically restarts the server on changes |

### Client

The client-side application is built using React with TailwindCSS and SWR for data fetching. Below are the dependencies and devDependencies used:

#### Dependencies

| Dependency                      | Description                                  |
| ------------------------------- | -------------------------------------------- |
| `@radix-ui/react-dialog`        | Radix UI Dialog component                    |
| `@radix-ui/react-dropdown-menu` | Radix UI Dropdown Menu component             |
| `@radix-ui/react-label`         | Radix UI Label component                     |
| `@radix-ui/react-slot`          | Radix UI Slot component                      |
| `class-variance-authority`      | Utility for managing Tailwind class variance |
| `clsx`                          | Utility for conditional classNames           |
| `lucide-react`                  | Icon library for React                       |
| `react`                         | React library (v19)                          |
| `react-dom`                     | ReactDOM library (v19)                       |
| `react-hot-toast`               | Notification library for React               |
| `react-router-dom`              | React Router for client-side navigation      |
| `swr`                           | React Hooks for data fetching and caching    |
| `tailwind-merge`                | Utility to merge TailwindCSS class names     |
| `tailwindcss-animate`           | TailwindCSS animation utilities              |

#### DevDependencies

| DevDependency                 | Description                                         |
| ----------------------------- | --------------------------------------------------- |
| `@eslint/js`                  | ESLint JavaScript configuration                     |
| `@types/node`                 | TypeScript definitions for Node.js                  |
| `@types/react`                | TypeScript definitions for React                    |
| `@types/react-dom`            | TypeScript definitions for ReactDOM                 |
| `@vitejs/plugin-react`        | Vite plugin for React                               |
| `autoprefixer`                | PostCSS plugin to parse CSS and add vendor prefixes |
| `eslint`                      | Linter for JavaScript and TypeScript                |
| `eslint-plugin-react-hooks`   | ESLint rules for React Hooks                        |
| `eslint-plugin-react-refresh` | ESLint plugin for React Fast Refresh                |
| `globals`                     | Global variable definitions                         |
| `postcss`                     | Tool for transforming CSS                           |
| `tailwindcss`                 | Utility-first CSS framework                         |
| `typescript`                  | JavaScript superset with static typing              |
| `typescript-eslint`           | ESLint integration with TypeScript                  |
| `vite`                        | Frontend build tool                                 |

## Screenshots

Here are some screenshots of the project:

### Sign Up Page

![Sign Up Page](https://github.com/user-attachments/assets/f08e0dcb-9d56-4b14-87d0-ecf824e0778f)

### Sign In Page

![Sign In Page](https://github.com/user-attachments/assets/075ef5f6-6d0a-487e-8436-c8311c934b3d)

### Home Page

![Home Page](https://github.com/user-attachments/assets/b9f88798-ea65-4548-bdf6-e88500f710f5)

## Contact

If you have any questions or feedback, feel free to reach out:

- **Email**: [sanlearn3@gmail.com](mailto:sanlearn3@gmail.com)
- **LinkedIn**: [Ikhsan Farizki](https://www.linkedin.com/in/ikhsan-farizki/)
- **GitHub**: [san-learn](https://github.com/san-learn)
- **Instagram**: [ikhsan.farizki](https://www.instagram.com/ikhsan.farizki/)
