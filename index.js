const db = require('./db/index');
const { prompt } = require("inquirer");
const logo = require('asciiart-logo');
require("console.table");

init();

function init() {
  // console.log("Hello! And Welcome to the Employee Tracker App!");
  const logoText = logo({ name: "Employee Tracker" }).render();
  console.log(logoText);
  loadMainPrompts();
}

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

function viewAllEmployees() {
  db.findAllEmployees()
    .then((results) => {
      // console.log('Results: ', results);
      const [rows] = results;
      let employees = rows;
      console.log('\n');
      console.table(employees);
    })
    .then(() => loadMainPrompts());
};



function viewAllRoles() {
  db.findAllRoles()
    .then((results) => {
      // console.log('Results: ', results);
      const [rows] = results;
      let roles = rows;
      console.log('\n');
      console.table(roles);
    })
    .then(() => loadMainPrompts());
};



function viewAllDepartments() {
  db.findAllDepartments()
    .then((results) => {
      // console.log('Results: ', results);
      const [rows] = results;
      let departments = rows;
      console.log('\n');
      console.table(departments);
    })
    .then(() => loadMainPrompts());
};



function addDepartment() {
  prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the department?'
    }
  ]).then(res => {
    let departmentName = res;
    db.createDepartment(departmentName)
      .then(() => console.log(`Added ${departmentName.name} to the database`))
      .then(() => loadMainPrompts());
  })
};



function addRole() {
  db.findAllDepartments()
    .then((results) => {;
      const [rows] = results;
      let departments = rows;
      return departments;
    }
    ).then((departments) => {
      prompt([
        {
          type: 'input',
          name: 'title',
          message: 'What is the title of the role?'
        },
        {
          type: 'input',
          name: 'salary',
          message: 'What is the salary of the role?'
        },
        {
          type: 'list',
          name: 'department_id',
          message: 'What department does the role belong to?',
          choices: departments.map(department => ({
            name: department.name,
            value: department.id
          }))
        }
      ]).then(res => {
        let role = res;
        db.createRole(role)
          .then(() => console.log(`Added ${role.title} to the database`))
          .then(() => loadMainPrompts());
      })
    })
};



function addEmployee() {
  prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'What is the first name of the employee?'
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'What is the last name of the employee?'
    }
  ]).then(res => {
    let firstName = res.first_name;
    let lastName = res.last_name;
    db.findAllRoles()
      .then((results) => {
        const [rows] = results;
        let roles = rows;
        return roles;
      }).then((roles) => {
        prompt([
          {
            type: 'list',
            name: 'role_id',
            message: 'What is the role of the employee?',
            choices: roles.map(role => ({
              name: role.title,
              value: role.id
            }))
          }
        ]).then(res => {
          let roleId = res.role_id;
          db.findAllEmployees()
            .then((results) => {
              const [rows] = results;
              let employees = rows;
              return employees;
            }).then((employees) => {
              prompt([
                {
                  type: 'list',
                  name: 'manager_id',
                  message: 'Who is the manager of the employee?',
                  choices: employees.map(employee => ({
                    name: `${employee.first_name} ${employee.last_name}`,
                    value: employee.id
                  }))
                }
              ]).then(res => {
                let managerId = res.manager_id;
                let employee = {
                  first_name: firstName,
                  last_name: lastName,
                  role_id: roleId,
                  manager_id: managerId
                }
                db.createEmployee(employee)
                  .then(() => console.log(`Added ${firstName} ${lastName} to the database`))
                  .then(() => loadMainPrompts());
              })
            })
        })
      })
  })
};

function updateEmployeeRole() {
  db.findAllEmployees()
    .then((results) => {
      const [rows] = results;
      let employees = rows;
      return employees;
    }).then((employees) => {
      prompt([
        {
          type: 'list',
          name: 'employee_id',
          message: 'Which employee would you like to update?',
          choices: employees.map(employee => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
          }))
        }
      ]).then(res => {
        let employeeId = res.employee_id;
        db.findAllRoles()
          .then((results) => {
            const [rows] = results;
            let roles = rows;
            return roles;
          }).then((roles) => {
            prompt([
              {
                type: 'list',
                name: 'role_id',
                message: 'What is the new role of the employee?',
                choices: roles.map(role => ({
                  name: role.title,
                  value: role.id
                }))
              }
            ]).then(res => {
              let roleId = res.role_id;
              db.updateEmployeeRole(employeeId, roleId)
                .then(() => console.log(`Updated employee's role`))
                .then(() => loadMainPrompts());
            })
          })
      })
    })
};

function quit() {
  console.log('Quitting application');
  process.exit();
};