/************************************************
  REMOVE ALL COMMENTS BEFORE SUBMITTING YOUR HOMEWORK
*************************************************/

// As suggested in README.md guideline for this homework, you can choose to use constructor functions or class to develop the functions
//  for SQL statements. Since class gives you cleaner syntax, this pseudo code is assumed that you use class for the implementation of
//  SQL statements. Remember both constructor functions and classes are used to create objects.

// HINT: To use promise wrapper, for example:
//  const databaseConnection = mysql.createConnection({...});
//  databaseConnection.promise().query(...);
//
//  - the whole query statement needs to be returned in the same line for the caller to receive the data with promise .then or async/await
//        for example: return databaseConnection.promise().query(...);
//  - all queries that take in parameters need to be prepared statements

// STEPS
// 1. import database connection from the current db folder
// 2. Declare a database class for methods to encapsulate all SQL statements
//    a. constructor takes in database connection as input parameter
//    b. set the instance variable to the connection object passed in
// 3. Exports the database object instantiated from the database class, passing connection object to the class constructor

// =============
// MAIN PROCESS
// =============

// class - for database or database access object
//  1. constructor - takes in database connection as input parameter and assign it to the instant variable DONE
//  2. method - find all employees, join with roles and departments to display their roles, salaries, departments, and managers DONE
//  3. method - create a new employee - takes employee object as input parameter DONE
//  4. method - update employee's role - takes employee id and role id as input parameters DONE
//  5. method - find all roles - join with departments to diplay department names
//  6. method - create a new role - takes in role object as input parameter
//  7. method - find all departments
//  8. method - create a new department - takes in department object as input parameter

const connection = require('./connection');

// class for database access object
class employeeTracker {
  // constructor that takes database connection as input and assigns it to instanced variable
  constructor(connection) {
    this.connection = connection;
  };

  // method to find all employees
  findAllEmployees() {
    return this.connection.promise().query(
      `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager`
      + `FROM employee`
      + `LEFT JOIN role ON employee.role_id = role.id`
      + `LEFT JOIN department ON role.department_id = department.id`
      + `LEFT JOIN employee manager ON manager.id = employee.manager_id;`
    );
  };

  // method to create a new employee
  createEmployee(employee) {
    return this.connection.promise().query(
      `INSERT INTO employee SET ?`, employee
    );
  };

  // method to update employee's role
  updateEmployeeRole(employeeId, roleId) {
    return this.connection.promise().query(
      `UPDATE employee SET role_id = ? WHERE id = ?`, [roleId, employeeId]
    );
  };

  // method to find all roles
  findAllRoles() {
    return this.connection.promise().query(
      `SELECT role.id, role.title, department.name AS department, role.salary`
      + `FROM role`
      + `LEFT JOIN department ON role.department_id = department.id;`
    );
  };

  // method to create a new role
  createRole(role) {
    return this.connection.promise().query(
      `INSERT INTO role SET ?`, role
    );
  };

  // method to find all departments
  findAllDepartments() {
    return this.connection.promise().query(
      `SELECT department.id, department.name`
      + `FROM department;`
    );
  };

  // method to create a new department
  createDepartment(department) {
    return this.connection.promise().query(
      `INSERT INTO department SET ?`, department
    );
  };
};

module.exports = new employeeTracker(connection);