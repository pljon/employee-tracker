
/*
  REMOVE COMMENTS BEFORE SUBMITTING YOUR HOMEWORK
*/

// Import inquirer
// Optional: import asciiart-logo
// import your database module
const db = require('./db/index.js');
const { prompt } = require('inquirer');
const logo = require('asciiart-logo');
const { findAllEmployees, findAllRoles, findAllDepartments, createDepartment } = require('./db/index.js');

// Import console table for logging information on screen in table format
require("console.table");

// Call startup function
init();

// function: start up
  // optional: display logo text using asciiart-logo
  // call function to load main prompt for questions
function init() {
  console.log("Hello! And Welcome to the Employee Tracker App!");
  loadMainPrompts();
}

// function - main prompt for questions
// - Prompt with the list of choices
// - In .then callback, check user's response with the switch-case statement.
//    call the appropriate function depending on what the user chose
//      - in case of view employees, call the view employees function
//      - in case of add employee, call the add employee function
//      - in case of update employee's role, call the update employee role function
//      - in case of view departments, call the view departments function
//      - in case of add department, call the add department function
//      - in case of view roles, call the view roles function
//      - in case of add role, call the add role function
//      - in default, call function to quit

function loadMainPrompts() {
  prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: [
        {
          name: 'View all employees',
          value: 'allEmployees'
        },
        {
          name: 'View all roles',
          value: 'allRoles'
        },
        {
          name: 'View all departments',
          value: 'allDepartments'
        },
        {
          name: 'Add a department',
          value: 'addDepartment'
        },
        {
          name: 'Add a role',
          value: 'addRole'
        },
        {
          name: 'Add an employee',
          value: 'addEmployee'
        },
        {
          name: "Update an employee's role",
          value: 'updateEmployeeRole'
        },
        {
          name: 'Quit',
          value: 'quit'
        }
      ]
    }
  ]).then(res => {
    let choice = res.choice;
    switch (choice) {
      case 'allEmployees':
        viewAllEmployees();
        break;
      case 'allRoles':
        viewAllRoles();
        break;
      case 'allDepartments':
        viewAllDepartments();
        break;
      case 'addDepartment':
        addDepartment();
        break;
      case 'addRole':
        addRole();
        break;
      case 'addEmployee':
        addEmployee();
        break;
      case 'updateEmployeeRole':
        updateEmployeeRole();
        break;
      default:
        quit();
    }
  })
};

// function - View all employees
  // 1. call find all employees method on database object
  //    in .then callback, display returned data with console table method
  // 2. call function to load main prompt for questions

function viewAllEmployees() {
  db.findAllEmployees()
    .then((results) => {
      console.log('Results: ', results);
      const [rows] = results;
      let employees = rows;
      console.log('\n');
      console.table(employees);
    })
    .then(() => loadMainPrompts());
};

// function - View all roles
// 1. call find all roles method on database object
//    in .then callback, dispalay returned data with console table
// 2. call function to load main prompt for questons

function viewAllRoles() {
  db.findAllRoles()
    .then((results) => {
      console.log('Results: ', results);
      const [rows] = results;
      let roles = rows;
      console.log('\n');
      console.table(roles);
    })
    .then(() => loadMainPrompts());
};

// function - View all deparments
//  1. call find all departments method on database object
//      in .then call back, display returned data with console table
//  2. call function to load main prompt for questions
//

// Add a department
//  1. prompt user for the name of the department
//      in .then callback, call create department method on database object, passing the returned data as input argument
//  2. call function to load main prompt for questions
//

// functon - Add a role
//  **prompt for user to enter the role, the salary, and what department the role belongs to
//  1. call find all departments method on database connection to get array of existing department records
//      in .then call back, create array of objects with names and ids from returned data with .map() method
//  2. prompt user for title, salary, and department choosing from the list of departmernts created above
//      in .then callback, call funcon to create role on database connection, passing returned data from prompt as input argument
//  3. call function to load main prompt for questions
//

// function - Add a new employee
//  1. prompt for first_name and last_name
//      in .then callback, store the first namd and the last name to variables,
//  2. call function to find all roles on database connection to get all existing roles
//      in .then callback, create array of role objects with id and title from returned array of role data with .map()
//  3. prompt user for the role for the employee choosing from a list (array) of role objecs
//      in .then callback, store the role id to a variable,
//  4. call function to find all employees on database connection
//      in .then callback, create array of managers with id, first name, last name from the returned data with .map()
//  5. prompt user for the manager from a list from the array of managers
//      in .then callback, create an employee object with variables for first name, last name, role id, manager id
//  6. call function to create employee on database connection, passing the employee object as input argument
//      in .then callback, call function to load main prompt for questions

// function - Update an employee's role
//  1. call function to find all employees on database connection
//      - in .then callback, take first name, last name, and id from the returned database data and create an array
//        of new employee objects with .map().
//      - new objects have two properties, name and value
//        name consists of first name and last name from the returned database data
//        value has id from the returned database data
//  2. prompt the list of choices from the new array of employee objects
//      - in .then callback, store employee id to a variable from the returned user choice
//  3. call function to find all roles on database connection
//      - in .then callback, create a new array of new role objects using .map on the returned database role data
//      - for the new role objects, assign title from returned database data to the name property and assign id to the value property
//  4. prompt user with the list of choices from the new array of new role objects
//      - in .then callback, assign returned user choice to a role id variable
//  5. call function to update employee role, passing employee id variable and role id variable as input arguments
//  6. call fucntion to load main prompt of questions


// function - Exit the application

// ========================
//  OPTIONAL
// ========================

// fuction - View all employees that belong to a department

// function - View all employees that report to a specific manager

// function - Update an employee's manager

// function - View all departments and show their total utilized department budget

// function - Delete an employee

// function - Delete a department

// function - Delete a role

