---
id: quick-start-developer
title: Quick start developer
sidebar_label: Quick start developer
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

### 3. Composer

Laravel project dependencies are managed through the [PHP Composer tool](http://getcomposer.org/). The first step is to install the depencencies by navigating into your project in terminal and typing this command:

    composer install

### 4. NPM/Yarn

In order to install the Javascript packages for frontend development, you will need the [Node Package Manager](https://www.npmjs.com), and optionally the [Yarn Package Manager](https://yarnpkg.com) by Facebook (Recommended)

If you only have NPM installed you have to run this command from the root of the project:

    npm install

If you have Yarn installed, run this instead from the root of the project:

    yarn

### 5. Create Database

You must create your database(MySQL/MariaDB, PostgreSQL, SQL Server or SQLite) on your server and on your **.env** file update the following lines:

    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=your-database
    DB_USERNAME=your-user
    DB_PASSWORD=your-password

### 6. Artisan Commands

The first thing we are going to do is set the key that Laravel will use when doing encryption.

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

### 7. NPM Run '\*'

Now that you have the database tables and default rows, you need to build the styles and scripts.

These files are generated using [Laravel Mix](https://laravel.com/docs/8.x/mix), which is a wrapper around many tools, and works off the webpack.mix.js in the root of the project.

You can build with:

    npm run <command>

The available commands are listed at the top of the package.json file under the 'scripts' key.

You will see a lot of information flash on the screen and then be provided with a table at the end explaining what was compiled and where the files live.

At this point you are done, you should be able to hit the project in your local browser and see the project, as well as be able to log in with the administrator and view the backend.

### 8. PHPUnit

After your project is installed, make sure you run the test suite to make sure all of the parts are working correctly. From the root of your project run:

    phpunit

You will see a dot(.) appear for each of the hundreds of tests, and then be provided with the amount of passing tests at the end. There should be no failures with a fresh install.

### 9. Storage:link

After your project is installed you must run this command to link your public storage folder for user avatar uploads (backend):

    php artisan storage:link

### 10. Login

After your project is installed and you can access it in a browser, click the login button on the right of the navigation bar.

The administrator credentials are:

Username: admin@admin.com

Password: 1234rewq

You will be automatically redirected to the backend. If you changed these values in the seeder prior, then obviously use the ones you updated to.

### 7. What's Next?

At this point you have all that you need, you can browse the code base and build the rest of your application the way you normally would. Or you can visit other parts of the documentation to get a good grasp on what'ss going on behind the scenes.
