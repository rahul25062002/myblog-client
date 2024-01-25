# myblog_client

Live Link : https://insight-rahulkr.netlify.app/

MyBlog is a feature-rich blogging platform built with ReactJS and Tailwind CSS. It leverages PostgreSQL for backend data storage, and the frontend and backend are deployed separately for efficient scaling. The main attraction of MyBlog is its advanced code editor, allowing users to write and showcase code seamlessly. Users can enhance their writing with tags, and the platform encourages interaction through feedback and likes.

## Features

- **ReactJS Frontend**: A modern and responsive user interface created with ReactJS for an enhanced user experience.

- **Tailwind CSS Styling**: Utilizes Tailwind CSS for efficient and customizable styling, providing a visually appealing design.

- **PostgreSQL Database**: Backend data storage powered by PostgreSQL, ensuring robust and scalable data management.

- **Code Editor**: A specialized code editor feature that supports syntax highlighting and allows users to write and showcase code snippets effectively.

- **Tagging System**: Users can categorize their blog posts with tags, making it easier for readers to find content based on topics.

- **Feedback and Likes**: Encourages user interaction through feedback and likes, fostering a sense of community around the content.

## Deployment

1. **Frontend Deployment:**

   - Clone the frontend repository to your local machine.

     ```bash
     git clone https://github.com/your-username/myblog-frontend.git
     ```

   - Install dependencies and build the ReactJS project.

     ```bash
     cd myblog-frontend
     npm install
     npm run build
     ```

   - Deploy the built files to your preferred hosting service.

2. **Backend Deployment:**

   - Clone the backend repository to your local machine.

     ```bash
     git clone https://github.com/your-username/myblog-backend.git
     ```

   - Install backend dependencies and configure the PostgreSQL database.

     ```bash
     cd myblog-backend
     npm install
     ```

   - Start the backend server.

     ```bash
     npm start
     ```

   - Deploy the backend to a server with PostgreSQL support.

3. **Database Configuration:**

   - Set up a PostgreSQL database and configure the connection details in the backend.

   ```javascript
   // config.js in myblog-backend
   module.exports = {
     database: {
       host: 'your-postgresql-host',
       port: 'your-postgresql-port',
       user: 'your-postgresql-username',
       password: 'your-postgresql-password',
       database: 'your-postgresql-database',
     },
     // other configurations...
   };
