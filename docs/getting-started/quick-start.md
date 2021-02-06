---
id: quick-start
title: Quick start
sidebar_label: Quick start
---

## Demo

[Click here for the demo](https://safe-dynamic-api-demo.dreamhosters.com/)

[Sample Mysql database](https://github.com/marcoslimacom/safe-dynamic-api-demo-frontend/blob/master/safe-dynamic-api-demo-mysql-db.sql)

### Credentials

#### Admin:

    User: admin@admin.com
    Password: 1234rewq

#### User:

    User: user@user.com
    Password: 1234rewq

You must change the password after installation.

## Installation

### 1. Download

Download the zip file where you purchased SafeDynamicAPI and place it on your server.

### 2. Environment Files

This package ships with a **.env.example** file in the root of the project.

You must rename this file to just **.env**

Note: Make sure you have hidden files shown on your system.

### 3. Create Database

You must create your database(MySQL/MariaDB, PostgreSQL, SQL Server or SQLite) on your server and on your **.env** file update the following lines:

    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=your-database
    DB_USERNAME=your-user
    DB_PASSWORD=your-password

### 4. Artisan Commands

The first thing we are going to do is set the keys that Laravel will use when doing encryption.

    php artisan key:generate

    php artisan jwt:secret

You should see a green message stating your key was successfully generated. As well as you should see the **APP_KEY** and **JWT_SECRET** variables in your **.env** file reflected.

It's time to see if your database credentials are correct.

We are going to run the built in migrations to create the database tables:

    php artisan migrate

You should see a message for each table migrated, if you don't and see errors, than your credentials are most likely not correct.

We are now going to set the administrator account information.

Now seed the database with:

    php artisan db:seed

You should get a message for each file seeded, you should see the information in your database tables.

### 5. Storage:link

After your project is installed you must run this command to link your public storage folder for user avatar uploads (backend):

    php artisan storage:link

### 6. Login

After your project is installed and you can access it in a browser, click the login button on the right of the navigation bar.

The administrator credentials are:

Username: admin@admin.com

Password: 1234rewq

You will be automatically redirected to the backend. If you changed these values in the seeder prior, then obviously use the ones you updated to.

### 7. What's Next?

At this point you have all that you need, you can browse the code base and build the rest of your application the way you normally would. Or you can visit other parts of the documentation to get a good grasp on what'ss going on behind the scenes.
