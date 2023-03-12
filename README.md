# dt-assign-prep

# 2.1 Setup Guide
```
The project is using local storage as database thru MongoDB so in order run 
the app and access the entries in the database we need to install and connect
 MongoDB to "mongodb://localhost:27017"
```
## You will also need to install the used dependencies using npm install as following:
```
 -"express",
 -"express-handlebars",
 -"mongoose"
 -"nodemon" 
```
## The project will be running on http://localhost:3000/ to start it - type "npm start" in the VS Code terminal while in the main folder (dt-assign-prep)

# 2.2 Folder Architecture
```
-The project code is stored in the src folder
 
-inside of it we will find the config folder which
 stores the database initialization code
 
-the controllers folder is holding the js files with
 the different controllers
 
-employeeController.js handling the logic for the employees 
 section of the app with the help of services files from the services folder
 
-the other 2 controllers are handling the home and tasks logic
 
-in models we have the mongoose Schema and models used to store
  the data in MongoDB 
 
-in public we have the static files - css code and images
 
-in utils there is Error utility used to get the error message
  from the error and display the error when it occurs
 
-in views we have the express-handlebars files with the html
  code for all the different views
 
-in the src folder we have index.js used as the main script to
  run the app and router.js with express Router for the different routes
```
# 2.3 Additional Functionalities
```
The app follows the description of the assignment and has
-a home page - displaying the Top 5 employees if there are any, that have completed 
 the most tasks with the availability of the "details" button for each employee leading
 to the details page of the employee, below the employees section there is a "See All" button
 leading to All employees page 

-All Employees page - displaying all employees if there are any,  "Add Employee" button 
 that leads to the create employee page- use it to create Employees

-Employees details page - shows the details of the employee with edit button that
 leads to the edit form and delete button.

-Tasks Page - displaying all tasks if there are any, "Add Task" button that
 leads to the create task page - use it to create task and assign it to employee,
 the table shows task name, task status, task assignee, due date and details button 
 that leads to the details page of the task - there you can edit, delete and complete
 task if incomplete and only delete if the task is completed. Completing the task
 will add the current employee +1 to completed tasks and mark it green in the tasks page.
```
