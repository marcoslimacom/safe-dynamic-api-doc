---
id: config-main-features
title: Configuration of the main features
sidebar_label: Configuration of the main features
---

All the main features can be set in the **.env** file as shown below.

## Main app configuration

    APP_NAME="SafeDynamicApi"  // "NameOfTheProduct"
    APP_ENV=local              // local,producation
    APP_KEY=                   // Key generated in quick installation
    APP_DEBUG=true
    APP_URL=                   // https://api.mysite.com

## Database

    # Drivers
    DB_CONNECTION=mysql        // mysql,srvsql,pgsql,sqlite


    # Database
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=safe-dynamic-api-install
    DB_USERNAME=root
    DB_PASSWORD=marcoslima

## JWT

    JWT_SECRET=                // Key generated in quick installation

## DYNAMIC API

    #DYNAMIC API
    COL_AUTO_USER_FILTER=user_id // Default column
    ROUTE_BASE=dynamicapi

- **COL_AUTO_USER_FILTER** - When there is a table/API that has a column with the same name as the value assigned to COL_AUTO_USER_FILTER, the data returned from the table/API will be filtered automatically and will show only the data of the logged user.

- **ROUTE_BASE** - you can configure a custom base route. The default value is dynamicapi. Ex: GET / dynamicapi / records / my_table

## CORS

See the available configuration options: [Click here](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

    CORS_ALLOWED_METHODS="OPTIONS, GET, PUT, POST, DELETE, PATCH, FETCH"
    CORS_ALLOWED_ORIGINS="*"
    CORS_ALLOWED_HEADERS="Content-Type, X-XSRF-TOKEN, Authorization"
    CORS_ALLOW_CREDENTIALS=false
    CORS_MAX_AGE=1728000
    CORS_EXPOSE_HEADERS=""
    CORS_CORS_ALLOWED_ORIGINS_PATTERNS=""

## Mail

    MAIL_MAILER=smtp
    MAIL_HOST=smtp.mailtrap.io
    MAIL_PORT=2525
    MAIL_USERNAME=null
    MAIL_PASSWORD=null
    MAIL_ENCRYPTION=null
    MAIL_FROM_ADDRESS=null
    MAIL_FROM_NAME="${APP_NAME}"

## Access

    ADMIN_REQUIRES_2FA=false
    CHANGE_EMAIL=true
    ENABLE_REGISTRATION=true
    PASSWORD_HISTORY=3
    SINGLE_LOGIN=false
    PASSWORD_EXPIRES_DAYS=180

## Captcha

Get your credentials at: [Google Recaptcha](https://www.google.com/recaptcha/admin)

    LOGIN_CAPTCHA_STATUS=false
    REGISTRATION_CAPTCHA_STATUS=false
    INVISIBLE_RECAPTCHA_SITEKEY=
    INVISIBLE_RECAPTCHA_SECRETKEY=

## Social

- **SOCIAL_USER_ROLE_ID_DEFAULT** - informs the role id that the user will be inserted in the creation of the user through the login by the social provider. By default, it is 2, referring to the user type role.

To activate social login you must create an application on the respective provider, **for example Google**, activate **GOOGLE_ACTIVE** = true, and add the secret keys on **GOOGLE_CLIENT_ID** and **GOOGLE_CLIENT_SECRET**.

    FACEBOOK_ACTIVE=false
    BITBUCKET_ACTIVE=false
    GITHUB_ACTIVE=false
    GOOGLE_ACTIVE=false
    LINKEDIN_ACTIVE=false
    TWITTER_ACTIVE=false
    SOCIAL_USER_ROLE_ID_DEFAULT=2

    #FACEBOOK_CLIENT_ID=
    #FACEBOOK_CLIENT_SECRET=
    #FACEBOOK_REDIRECT=${APP_URL}/login/facebook/callback

    #BITBUCKET_CLIENT_ID=
    #BITBUCKET_CLIENT_SECRET=
    #BITBUCKET_REDIRECT=${APP_URL}/login/bitbucket/callback

    #GITHUB_CLIENT_ID=
    #GITHUB_CLIENT_SECRET=
    #GITHUB_REDIRECT=${APP_URL}/login/github/callback

    #GOOGLE_CLIENT_ID=
    #GOOGLE_CLIENT_SECRET=
    #GOOGLE_REDIRECT=${APP_URL}/login/google/callback

    #LINKEDIN_CLIENT_ID=
    #LINKEDIN_CLIENT_SECRET=
    #LINKEDIN_REDIRECT=${APP_URL}/login/linkedin/callback

    #TWITTER_CLIENT_ID=
    #TWITTER_CLIENT_SECRET=
    #TWITTER_REDIRECT=${APP_URL}/login/twitter/callback
