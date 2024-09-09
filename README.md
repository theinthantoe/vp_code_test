1.If you haven’t already cloned the repository, use the following command:
git clone <repository-url>
cd <project-directory>

2.Firstly need to install use this command
 npm install

3.Create a .env file in the root of your project directory with the following content:
PORT = 8000
JWT_SECRET=mySuperSecret

4.To run this Project
npm run dev

5.Testing the end points
Use Postman or a similar tool to test your API endpoints. Here are some common endpoints you can test:

User Registration
Method: POST
URL: http://localhost:8000/user/register

User Login
Method: POST
URL: http://localhost:8000/user/login

Create Task
Method: POST
URL: http://localhost:8000/task/
Don't forget to put Header
Authorization: Bearer <your_jwt_token>

Update Task
Method: PUT
URL: http://localhost:8000/task/:id
Don't forget to put Header
Authorization: Bearer <your_jwt_token>

Delete Task
Method: DELETE
URL: http://localhost:8000/task/:id
Headers:
Authorization: Bearer <your_jwt_token>

Get a single task by ID
Method : GET
URL : http://localhost:8000/task/:id
Headers:
Authorization: Bearer <your_jwt_token>

Get All Tasks by Status
Method: GET
URL: http://localhost:8000/task/status
Headers:
Authorization: Bearer <your_jwt_token>

Get Tasks filtering by Status
Method: GET
URL: http://localhost:8000/task/status
Headers:
Authorization: Bearer <your_jwt_token>
Don't forget Query Params
key:completed and value true or false





