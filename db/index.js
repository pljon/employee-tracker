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
      `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;`
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
      `SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id;`
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
      `SELECT department.id, department.name FROM department;`
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