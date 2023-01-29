USE employees_db;

INSERT INTO department (name)
    VALUES
        ('Human Resources'),
        ('IT'),
        ('Operations'),
        ('Marketing');

INSERT INTO role (title, salary, department_id)
    VALUES
        ('HR Manager', 110000, 1),
        ('HR Coordinator', 65000, 1),
        ('IT Manager', 135000, 2),
        ('IT Support Specialist', 90000, 2),
        ('Operations Supervisor', 110000, 3),
        ('Logistics Coordinator', 80000, 3),
        ('Marketing Manager', 130000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES
        ('Sara', 'Smith', 1, NULL),
        ('David', 'Johnson', 2, 1),
        ('Nancy', 'Williams', 3, NULL),
        ('Michael', 'Jones', 4, 3),
        ('Emily', 'Garcia', 5, NULL),
        ('Joshua', 'Martinez', 6, NULL),
        ('Daniel', 'Rodriguez', 7, 6);