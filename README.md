
---

### **Project Name:** QuestSearch

### **Working Functionality:**

1. **Search Functionality:**
   - Users can search for questions based on a query, which returns a list of relevant questions from the database.
   - **Search Types**: The search allows filtering by different types of questions, such as MCQ, Anagram, and Content-Only.
   - The results are paginated to ensure users receive a manageable number of items at a time.

2. **Question Details:**
   - When a user selects a question, they can view detailed information such as options (for MCQs), blocks (for Anagrams), and the solution.
   - For Anagram questions, users are presented with shuffled blocks of text and tasked with arranging them to form the correct answer.

3. **Anagram Game:**
   - Anagrams (Word/Sentence types) are displayed as blocks that users can select and rearrange.
   - After arranging the blocks, users can check if their arrangement matches the correct solution.
   - Feedback is provided on whether the user's arrangement is correct or incorrect.

4. **Pagination and Filtering:**
   - The system supports pagination for large question sets.
   - Filters for question types, difficulty levels, and other attributes can be applied to refine search results.

5. **Suggestions:**
   - As users type in the search bar, real-time suggestions are fetched from the database based on partial input.
   - Suggestions help users quickly find questions that match their interests or keywords.

6. **User Interactivity:**
   - Users can click on blocks to rearrange letters in an anagram.
   - They can submit their answer to check if it’s correct or incorrect.

7. **Error Handling:**
   - The application displays appropriate error messages if any issues occur during data fetching or when the user interacts with the system (e.g., incorrect answers, no questions found, etc.).

8. **Responsive Design:**
   - The UI adjusts to different screen sizes, ensuring a smooth experience on both desktop and mobile devices.
   - Tailwind CSS is used to create responsive layouts using utility classes.

9. **Caching with Redis:**
   - **Redis** is used to cache frequently accessed question data, such as search results and question details, to reduce database load and improve performance.
   - When users search for questions or request details, Redis serves cached results if available, reducing the need to query the database multiple times for the same data.
   - If the requested data is not found in the cache, it is fetched from the database and stored in Redis for future requests.

---

### **Technologies Used:**

1. **Frontend:**
   - **React**: A JavaScript library for building dynamic user interfaces. React is used to manage the app's interactive behavior (e.g., rendering the question list, showing question details, and handling state changes).
   - **Tailwind CSS**: A utility-first CSS framework used to design responsive, clean interfaces quickly. It uses utility classes to avoid writing custom CSS.
   - **React Context API**: A state management tool to manage global states, such as the current set of questions, the selected question, and loading states.
   - **React Hooks**: Used for managing component-level state and lifecycle events (e.g., `useState`, `useEffect`).

2. **Backend:**
   - **Node.js**: A JavaScript runtime environment used to build the backend API and handle HTTP requests.
   - **Express.js**: A web framework for Node.js used for defining routes, handling API requests, and managing middleware.
   - **MongoDB**: A NoSQL database used to store questions, including their title, type (MCQ, Anagram, etc.), options, solutions, and associated metadata.
   - **Mongoose**: An Object Document Mapper (ODM) library for MongoDB in Node.js, providing an easy-to-use interface for interacting with the database by defining schemas and models.
   - **gRPC (optional)**: A high-performance RPC framework, used if you scale the backend to microservices.

3. **API & Data Management:**
   - **RESTful APIs**: APIs are built with Express.js to handle search, fetching question details, suggestions, and pagination.
   - **Pagination**: The backend supports pagination to manage large datasets and prevent overwhelming the user with excessive data at once.
   - **CORS**: Cross-Origin Resource Sharing is configured to allow secure access to the backend from the frontend, especially when the frontend and backend are hosted on different domains.

4. **Real-time Suggestions:**
   - **Debouncing**: When the user types in the search bar, a delay is added before sending the request to fetch suggestions. This reduces the number of API calls, improving performance.
   - **Backend Filtering**: The backend applies filters, such as search query matching, to return only relevant suggestions, ensuring users get accurate and relevant results.

5. **Caching with Redis:**
   - **Redis**: A fast, in-memory key-value data store used for caching frequently accessed data. Redis reduces the load on the MongoDB database and improves the performance of search and question retrieval.
   - **Caching Mechanism**: When a search query is made or question details are requested, Redis is checked first. If the data is found, it is returned directly from Redis. If not, the data is fetched from MongoDB, then cached in Redis for future use.
   - **Cache Expiry**: Cached data is given an expiry time to ensure freshness, so the system doesn’t serve outdated results.

---

### **Summary:**

QuestSearch is a web application that allows users to search and interact with a variety of questions, including MCQs, Anagrams, and content-only questions. The frontend is built using **React** and styled with **Tailwind CSS** for responsive design. The backend is powered by **Node.js** and **Express.js**, with **MongoDB** used for storing question data. The addition of **Redis** for caching enhances performance by reducing the load on the database and speeding up data retrieval. The system supports pagination, real-time search suggestions, and filtering to enhance the user experience. Interactive features like the anagram game and detailed question views keep users engaged.

This system is scalable and can be extended to include features like user authentication, advanced filtering, and other interactive question types.