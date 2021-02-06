---
id: permissions-setting
title: Permissions Setting
sidebar_label: Permissions Setting
---

## Demo

[Click here for the demo frontend app](https://safe-dynamic-api-demo-frontend.vercel.app)

[Click here to access the source code of demo frontend app](https://github.com/marcoslimacom/safe-dynamic-api-demo-frontend)

[Sample Mysql database](https://github.com/marcoslimacom/safe-dynamic-api-demo-frontend/blob/master/safe-dynamic-api-demo-mysql-db.sql)

## Introduction

All APIs created dynamically from the database are **denied access by default**.

To allow the use of these APIs, it is necessary to add the permissions for each API/Table that you want to consume through the **SafeDynamicAPI administrative panel**. Permissions must be created and can be assigned by user or role.

To allow anyone to use a particular API without being authenticated, simply assign the permission to role **Guest**.

You can download an example Mysql database shown above with several configurations as an example and install it locally.

## Manage permissions

1. After logged in as admin, access the Permission Management screen in the administrative panel.

2. Click the link to create or edit a specific permission.

3. Choose an option for the Type field.

   - "Guest" for visitors.
   - "User" for users or user roles.
   - "Admin" for users or admin roles.

4. Enter the permission in the Name field.

   - Ex1: get.categories
     - Permission for the verb GET in the Categories table
   - Ex2: post.categories
     - Permission for the POST verb in the Categories table
   - Ex3: delete.categories
     - Permission for the verb DELETE in the Categories table
   - Ex4: put.categories
     - Permission for the verb PUT in the Categories table

5. Enter the description in the description field.

6. Save

## Manage a user's permission

1. After logged in as admin, access the User Management screen in the administrative panel.

2. Click the Edit link for the user you want to manage.

3. You have two options for assigning a permission directly to a user:

   1. Select the roles (Type user) that contain the desired permission.
   2. Select the permissions (Type user) you want to assign.

4. Save

## Manage role permissions

**Note 1**: When assigning permissions to the role Guest, the permissions will be the general public already in effect.

**Note 2**: If the role is of the Admin or User type, the role must also be assigned to the user on the "User Management" screen for the permissions to take effect.

1. After logged in as admin, access the Role Management screen in the administrative panel.

2. Click the Edit link for the Role you want to manage.

3. Select the permissions (Type Role) you want to assign.

4. Save
