# User Stories

## User roles

(One account may have multiple roles)

-   admin
-   property_owner
-   worker

## User management

As an admin, I want to see a list of all users

-   GET all users

As an admin, I want to create a property_owner user

-   POST create user
    -   name
    -   email
    -   password
    -   role: property_owner

As an admin, I want to remove a user

-   DELETE user by email

As an admin, I want to edit user information

-   POST edit user
    -   name
    -   email
    -   password
    -   role
-   PATCH edit user name
-   PATCH edit user email
-   PATCH edit user password
-   PATCH edit user role

As a property_owner, I want to create a new property

-   POST create property
    -   title
    -   description

As a property_owner, I want to see a list of all my properties

-   GET all properties of user

As a property_owner, I want to remove a property

-   DELETE property by id

As a property_owner, I want to edit property information

-   POST edit property
    -   title
    -   description

As a property_owner, I want to add worker to property

-   POST add worker to property
    -   email

As a property_owner, I want to create a task

-   POST create task for property
    -   title
    -   Priority: low / high
    -   deadline date
    -   assign to workers
-   When created a task assign to worker notify worker by mail

As a worker, I want to take on a task

-   POST assign me to task
    -   estimated duration
    -   preliminary cost
    -   extra comment
-   When assigned the property_owner will be notified by mail
    -   Information about the assigned task

As a worker, I want to resign from task assigned to me

-   POST resign me from task
