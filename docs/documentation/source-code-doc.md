---
id: source-code
title: Source code
sidebar_label: Source code
---

## Domains

This project makes lite use of DDD. It is not a requirement, and you can easily refactor back to the default Laravel file structure using tools in an application like PHPStorm. For more information on domain driven design, take a look at [this article](https://stitcher.io/blog/organise-by-domain), which inspired me to try it out. It is simply a way to try to organize sections of the code into folders and it may or may not be the best approach for you.

### Domain Structure

The structure of each domain is up to you, but is good practice to just follow the default Laravel app folder structure.

For example, the Auth domain has code relevant to the authentication/authorization portion of the application, and is broken down into all the relevant folders: Events/Http/Listeners/Models/etc. These are just namespaced files placed here instead of normally like **App/Http/Auth** it's **App/Domains/Auth/Http**.

## Events

**Note**: All current events in this project are processed with a like-named listener class that is registered in EventServiceProvider and stored in that domains Listeners directory.

Most events are used to log information using [spaties activity-log package](https://github.com/spatie/laravel-activitylog).

Some events have extra functionality:

- **UserLoggedIn**: - Sets the users last_login_at and last_login_ip columns.
- **PasswordReset**: - This one is dispatched from the Laravel core, but is caught to set the password_changed_at column of the current user to now().

## Middleware

There are many included middleware that are not Laravel default:

- **App\Domains\Auth\Http\Middleware\AdminCheck** - Passes if the current user is an administrator.
- **App\Domains\Auth\Http\Middleware\PasswordExpires** - If the users password is expired based on the configs, it sends them to the change password page.
- **App\Domains\Auth\Http\Middleware\SuperAdminCheck** - Checks to see if the current user is an administrator and has all roles and permissions.
- **App\Domains\Auth\Http\Middleware\ToBeLoggedOut** - Checks to see if the current users to_be_logged_out boolean is set to true and logs them out if so.
- **App\Domains\Auth\Http\Middleware\TwoFactorAuthenticationStatus** - Checks to see if 2FA is needed for the current route.
- **App\Domains\Auth\Http\Middleware\UserCheck** - Passes if the current user is of type user.
- **App\Domains\Auth\Http\Middleware\UserTypeCheck** - Checks to see if the current user is of the type passed in.
- **App\Http\Middleware\LocaleMiddleware** - Switches the current locale.

## Requests

This method is opinionated, so refactor how you see fit.

Form requests are used where validation or authorization is needed for a request (and a policy isn't the best choice for the given request) and is injected into the controllers action signature.

Form requests are not used in Laravel's default auth scaffolding controllers where a validate() method is supplied such as login and register.

**Note**: Any exceptions thrown by form requests are instances of Laravel's AuthorizationException and are caught in the Exception handler which formats the response.

## Models

Models are organized by domain, and furthermore I use traits to organize each model:

- **Attribute/MODELAttribute** - Holds all the attribute modifiers for the given model.
- **Method/MODELMethod** - Holds all the methods for the given model. (There are some methods in the User model that must be in the root, please don't make PRs to move them)
- **Relationship/MODELRelationship** - Holds all the relationships for the given model.
- **Scope/MODELScope** - Holds all the scopes for the given model.
  Model properties such as $dates, $casts, $appends, and $with are used where necessary.

## Observers

There is one observer included with the project, that is registered in the ObserverServiceProvider:

- **UserObserver**: - This observer hooks the users created and updated events and logs new password histories if the config allows for it.

## Services

Services are classes to attempt to extract database logic out of the controllers.

There is a BaseService class you can extend, who's constructor accepts a model and inherits some useful functionality such as get(), count(), find(), etc.

Example:

Instead of duplicating this line everywhere:

    $user = User::findOrFail($id);

You can use:

    $user = resolve(UserService::class)->findOrFail($id);

It's longer, but it's extracted out to one place in the codebase instead of duplicating logic everywhere. This is just an example, and a one liner usually isn't a big deal, but extracting out multi-line logic that doesn't belong in a model or elsewhere is good to have in a service dedicated to one model.

## Exceptions

Admittedly, the exception classes could be more descriptive, and that is a goal for the next version.

But for now, there are two non-laravel exceptions that can be used:

- **GeneralException**: - I use this when I want to throw an exception and stop the execution of code, usually in a catch block or if an save/update fails. This exception does not report to the log files, instead it redirects back with the message (and old input) in an alert-danger bootstrap alert which is rendered from the messages blade partial using the flash_danger key.

- **ReportableException**: - Same functionality as GeneralException except the exceptions get caught by the logger.
  The Exception Handler class also catches a few Laravel/Package exceptions to perform other functionality.

## Helpers

Though some people say it's not a good design pattern to have helper classes, I found this method easier to organize than just including a helpers.php file in composers file section.

The App\Helpers directory comes with one folder:

- **Global**: - The Global folder is a special helpers directory, any file in this folder is autoloaded and the functions become available globally just like a regular helpers file loaded with composer. The HelperServiceProvider does the loading.

Any helper class placed outside of the Global folder is just a normal namespaced class that you can resolve normally.

## Livewire

This project includes [Laravel Livewire](https://laravel-livewire.com/) as a dependency because it makes use of my [Laravel Livewire Tables](https://github.com/rappasoft/laravel-livewire-tables) plugin for the datatables functionality.

You can find all Livewire components in the **App\Http\Livewire** directory.

**Note**: I used Livewire for the 2FA code box because if the page refreshed, the QR code would change thus invalidating the whole process. I also thought it would be cleaner than Vue since it's such small functionality.

## Alpine

This project includes [alpine.js](https://github.com/alpinejs/alpine/) because it is such a nice alternative to lite javascript functionality instead of doing it in Vue or jQuery.

## Service Providers

This project comes with a few service providers that are not from a default Laravel installation:

- **ComposerServiceProvider** - Registers the view composers for the application.
- **EventServiceProvider** - Registers the event listeners for the application.
- **HelperServiceProvider** - Registers the global helpers for the application.
- **LocaleServiceProvider** - Registers the locale and related blade extension for the application.
- **ObserverServiceProvider** - Registers the model observers for the application.

It also changes a few default service providers:

- **AuthServiceProvider** - Added the before Gate so the super administrators don't need all roles and permissions to have access.
- **RouteServiceProvider** - Added the deletedUser route binding when working with deleted users so it knows to look in the trashed items.

## Configuration

All of the configurable items of the boilerplate can be found in the **config/boilerplate.php** file. Each item should have a relevant doc block.

There may be other configuration files published by default from some packages such as activitylog, permission, geoip, etc.

## Resources

This project follows standard Laravel resource folder structure. [Larevel Documentation](https://laravel.com/docs/8.x)

### Javascript

The javascript files are as follows:

- **backend/app.js** - Compiles the backend javascript
- **frontend/app.js** - Compiles the frontend javascript
- **bootstrap.js** - Bootstrap functionality for the frontend
- **plugins.js** - Random javascript/jQuery functionality used globally

### Language

All language files for this version of the boilerplate are in [JSON format](https://laravel.com/docs/8.x/localization#using-translation-strings-as-keys) except default Laravel files and package languages if published.

### SCSS

The SCSS files are as follows:

- **backend/app.scss** - Compiles the backend CSS
- **frontend/\_global.scss** - Frontend global SCSS
- **frontend/\_variables.scss** - Frontend Bootstrap overrides
- **frontend/app.scss** - Compiles the frontend CSS
- **\_global.scss** - Global styles included in frontend and backend

### Views

The views are structured much like the rest of the application, frontend/backend/etc. They usually follow the namespace structure.

There's only one folder to note, and that is **components** which are [blade components](https://laravel.com/docs/8.x/blade#components) used throughout the blade files. At the time of this writing they are all anonymous components, or they don't have an associated class and just work off of the props passed into them.

## Routing

The routing is also broken into frontend and backend.

A few things to note:

- The backend routes are protected by the admin middleware group which is defined in the HTTP Kernel.
- Authorization is done via the route middleware, not in the controllers or form requests.
- Breadcrumbs are done via the routes using [this package](https://github.com/tabuna/breadcrumbs).

## Factories

Factories are supplied for all models with scopes where applicable.

## Seeders

Seeders are supplied for authentication and user/roles.

Some seed data only gets seeded if the application is in local/testing mode so you don't have extra data to deal with or delete in production.

## Testing

Tests cover as much functionality as I could on both the frontend and backend.

The standard phpunit.xml file sets all the necessary environment variables, and runs on a sqlite database in memory that is defined in the database config file.

## Misc

### Base Service

The BaseService is meant to be extended and a model defined in the constructor.

You may add to the BaseService class to get more functionality not included available to all of your model services.

You have no obligation to use this class if you don't want to.

### Breadcrumbs

The breadcrumbs are defined in the route files using the [tabuna/breadcrumbs](https://github.com/tabuna/breadcrumbs) package and the views are defined in **frontend/includes/partials/breadcrumbs** and **backend/includes/partials/breadcrumbs**.

### Captcha

Google Invisible CAPTCHA is built in to both the login and register screens using the [albertcht/invisible-recaptcha](https://github.com/albertcht/invisible-recaptcha) package.

You can toggle them on/off using the **LOGIN_CAPTCHA_STATUS** and **REGISTRATION_CAPTCHA_STATUS** .env items.

Don't forget to add your API keys to the .env file's **INVISIBLE_RECAPTCHA_SITEKEY** and **INVISIBLE_RECAPTCHA_SITEKEY** keys.

### Flash Messages

Flash messages are defined in the **includes/partials/messages** blade file.

The following are available to flash to the session:

- flash_success
- flash_warning
- flash_info
- flash_danger
- flash_message

It also catches any messages from the error bag and displays in an error bootstrap alert.

You can use Laravel's view helpers to set the messages as seen in many controllers:

    return view('my-view')->withFlashDanger('Something went wrong');

or

    return view('my-view')->with('flash_danger', 'Something went wrong');

or

    session()->flash('flash_danger', 'Something went wrong');

### Gravatar

The user images in this project are powered by gravatar based on the users e-mail address.

You can swap this functionality out for a user uploaded image if you prefer. Just change the **getAvatar** method in the UserMethod class.

### Other Model Traits

There is a trait included in the project that is not used on any model, but might be useful in your project:

**UUID**: - Add a uuid() column to your model and this trait. That UUID column will be automatically filled when the model is created. It also provides a uuid($uuid) scope to query the model by. You can change the column name by overriding the **uuidName** property of the model.

### Password Rules

The password rules are managed by the [langleyfoxall/laravel-nist-password-rules](https://github.com/langleyfoxall/laravel-nist-password-rules) package and the implementation can be found in the validation rules anywhere a password is created or updated.

Example:

    'password' => array_merge(['max:100'], PasswordRules::register()),

You can see the full set of rules in the **LangleyFoxall\LaravelNISTPasswordRules\PasswordRules** class.

### Permissions

Permissions are managed by the [spatie/laravel-permission](https://github.com/spatie/laravel-permission) package.

The permissions are seeded in the PermissionRoleSeeder and uses the [wildcard setting](https://docs.spatie.be/laravel-permission/v3/basic-usage/wildcard-permissions/).

Extra functionality has been added to the permission tables to enable permission/roles via a specific user type, parent/child permissions, as well as sorting.

When choosing roles/permissions for a new/existing user in the backend, alpine.js will decide which options are allowed for the selected user type.

### Webpack

The webpack file in the root works like a normal Laravel webpack file, except frontend/backend are extracted separately, and the vendor files are extracted to vendor.js.
