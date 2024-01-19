<hr>
<hr>

# Infinity - [🔗](https://pms-server-js8d.onrender.com/)

<hr>

## Description:

This is a project management system backend which I build in typescript language using NodeJS and ExpressJs. Here I follow modular pattern because modular pattern easy to debug and use MySQL for database, JWT for secutiry purpose, cloudinary for media management, zod for data validation and winston for log and many more.

## Main Features:

- Only super admin can registration using email and password and all user can just login.
- User account active by email verification.
- Role based api access.
- Super admin can add, update and delete new user.
- Admin can create, update and delete project and task.
- Project and task are drag and dropable.
- User can see user's task.

---

## Table of Contents

1. [Installation](#installation)
1. [Dependencies](#dependencies)
1. [Usage](#usage)
1. [Endpoints & Request Example](#endpoints--request-example)
1. [License](#license)
1. [Authors](#authors)
1. [Links](#links)

---

> Note: All underscore sentence will be replace of your credentials

## Installation

Pre-requirements

> Must be install node js, npm, yarn (optional) and typescript in your operation system.

```bash
# Clone the repository
git clone https://github.com/abushamacd/PMS_Backend.git

# Navigate to the project directory
cd PMS_Backend

# Install dependencies
npm install

or

yarn install
```

## Dependencies

Create .env named file in your project root folder and copy the below code

```bash
JWT_REFRESH_SECRET='your_jwt_refresh_token_secret'
JWT_SECRET='your_jwt_token_secret'
STRIPE_SECRET_KEY=your_stripe_key

NODE_ENV=development
PORT=5000
DATABASE_URL="your_local_mysql_db_url"
BCRYPT_SOLT_ROUND=12
CLIENT_URL=your_front_end_site_link || http://localhost:3000
MAIL_ID="your_gmail_address"
MAIL_PASS="same_gmail_app_password"
CLOUD_NAME="your_cloudinary_cloud_name"
API_KEY="your_cloudinary_api_key"
API_SECRET="your_cloudinary_api_secret"

JWT_SECRET='your_jwt_token_secret'
JWT_REFRESH_SECRET='your_jwt_refresh_token_secret'
JWT_ACTIVITION_SECRET='your_jwt_activition_token_secret'
JWT_RESET_PASSWORD_SECRET='your_jwt_reset_password_secret'
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=365d
JWT_ACTIVITION_SECRET_EXPIRES_IN=1h
JWT_RESET_PASSWORD_SECRET_EXPIRES_IN=1h
```

## Usage

To run this project, run the following command.

```bash
# Start the server
npm dev

or

yarn dev
```

## Endpoints & Request Example

### User's & Authentication's

<hr><hr>

### _Sign up_

- /api/v1/auth/signup (POST) - Access permission (Super Admin)

N.B. First you need to off checking requested user from the route and make the super admin from the database directly

Request body

```bash
{
    "name": "user_name",
    "email": "user_email",
    "phone": "user_phone",
    "password": "user_password"
}
```

<hr>

### _Account Activetion_

- /api/v1/auth/activation/:token (PATCH) - Access permission (all)

Request Params: :token is replace by email token which is send to activation email

<hr>

### _Sign in_

- /api/v1/auth/signin (POST) - Access permission (all)

Request body

```bash
{
    "email": "user_email",
    "password": "user_password"
}
```

<hr>

### _Get new access token_

- /api/v1/auth/refresh-token (POST) - Access permission (all)

Send refresh token by cookies

<hr>

### _Change password_

- /api/v1/auth/change-password (PATCH) - Access permission (all)

Send access token in headers by the authorization field

Request body

```bash
{
    "oldPassword": "old_password",
    "newPassword": "new_password"
}
```

<hr>

### _Get the reset password link_

- /api/v1/auth/forget-password (PATCH) - Access permission (all)

Send access token in headers by the authorization field.

Request body

```bash
{
    "email": "user_email",
}
```

<hr>

### _Set the new password_

- /api/v1/auth/reset-password/:token (PATCH) - Access permission (all)

Request Params: :token is replace by email token which is send from forget-password endpoints

Request body

```bash
{
    "password": "new_password"
}
```

<hr>

### _Get all users_

- /api/v1/user (GET) - Access permission (all)

Request body:

<hr>

### _Get user profile_

- /api/v1/user/profile (GET) - Access permission (all)

Send access token in headers by the authorization field.

<hr>

### _Update user profile_

- /api/v1/user/profile (PATCH) - Access permission (all)

Send access token in headers by the authorization field.

Request body

```bash
{
    "name": "udpated_user_name",
    "phone": "udpated_user_phone",
    "address": "udpated_user_address"
}
```

<hr>

### _Update user role_

- /api/v1/user/changeRole (PATCH) - Access permission (Super Admin)

Send access token in headers by the authorization field.

Request body

```bash
{
    "id": "user_id",
}
```

<hr>

### _Update user photo_

- /api/v1/user/photo (POST) - Access permission (all)

Send access token in headers by the authorization field.

Send photo assign "image" named filed using formdata

<hr>

### _Delete single user_

- /api/v1/user/:id (DELETE) - Access permission (Super Admin)

Request Params: :id is replace by user_id

<hr>

### Porjects's

<hr><hr>

### _Create project_

- /api/v1/project/ (POST) - Access permission (Super Admin & Admin)

Send access token in headers by the authorization field.

Request body:

```bash
{
    "title": "project_title",
    "desc": "project_desc"
}
```

<hr>

### _Get all projects_

- /api/v1/project/ (GET) - Access permission (all)

Send access token in headers by the authorization field.

<hr>

### _Update projects position_

- /api/v1/project/ (PATCH) - Access permission (all)

Send access token in headers by the authorization field.

Request body:

```bash
{
    [
        {
            "id": "e00d32aa-b5b7-4a25-b0de-7bb411c2b102",
            "title": "Test",
            "icon": "👍",
            "desc": "Test",
            "position": 0,
            "onGoing": true,
            "onGoingPosition": 0,
            "createdAt": "2024-01-18T10:41:24.051Z",
            "managerId": "c61efe0e-f967-4a11-8e0a-c2085ef4f683"
        },
        {
            "id": "6ee4b68c-f9f4-475d-a767-576037d73715",
            "title": "PMS Project",
            "icon": "👍",
            "desc": "Just for check",
            "position": 1,
            "onGoing": false,
            "onGoingPosition": 0,
            "createdAt": "2024-01-18T15:05:59.764Z",
            "managerId": "b68ebdd6-fd4e-4875-96e5-128703f97c4d"
        }
    ]
}
```

<hr>

### _Get single project_

- /api/v1/project/:id (GET) - Access permission (all)

Send access token in headers by the authorization field.

Request Params: :id is replace by project id

<hr>

### _Update single project_

- /api/v1/project/:id (PATCH)

Send access token in headers by the authorization field.

Request Params: :id is replace by project id

Request body:

```bash
{
    "title": "udpated_project_title",
    "desc": "udpated_project_desc",
    "onGoing": "your_boolean_value"
}
```

<hr>

### _Delete single project_

- /api/v1/project/:id (DELETE)

Send access token in headers by the authorization field.

Request Params: :id is replace by project id

<hr>

### Section's

<hr><hr>

### _Create section_

- /api/v1/section/ (POST) - Access permission (Super Admin & Admin)

Send access token in headers by the authorization field.

Request body:

```bash
{
    "title": "section_title",
}
```

<hr>

### _Get all sections_

- /api/v1/section/ (GET) - Access permission (all)

Send access token in headers by the authorization field.

<hr>

### _Get single section_

- /api/v1/section/:id (GET) - Access permission (all)

Send access token in headers by the authorization field.

Request Params: :id is replace by section id

<hr>

### _Update single section_

- /api/v1/section/:id (PATCH)

Send access token in headers by the authorization field.

Request Params: :id is replace by section id

Request body:

```bash
{
    "title": "updated_section_title",
}
```

<hr>

### _Delete single section_

- /api/v1/section/:id (DELETE)

Send access token in headers by the authorization field.

Request Params: :id is replace by section id

<hr>

### Task's

<hr><hr>

### _Create task_

- /api/v1/task/ (POST) - Access permission (Super Admin & Admin)

Send access token in headers by the authorization field.

Request body:

```bash
{
    "sectionId": "section_id",
}
```

<hr>

### _Get all tasks_

- /api/v1/task/ (GET) - Access permission (all)

Send access token in headers by the authorization field.

<hr>

### _Update tasks position_

- /api/v1/task/ (PATCH) - Access permission (all)

Send access token in headers by the authorization field.

Request body:

```bash
{
    {
      resourceList: [
        {
            "id": "9a4a1e25-53a3-4a77-b436-aae79c1a983b",
            "title": "A",
            "desc": "",
            "position": 1,
            "createdAt": "2024-01-18T15:10:20.002Z",
            "sectionId": "ad4673fb-e450-4400-9414-0bc7e1eaa58e",
            "assignId": "1611b230-e56d-46e3-a431-25d34b9d2868"
        },
        {
            "id": "307996b3-c283-4cf8-b4d1-e47b3a1da68f",
            "title": "Initial Project",
            "desc": "Setup project environment",
            "position": 2,
            "createdAt": "2024-01-18T15:08:31.479Z",
            "sectionId": "ad4673fb-e450-4400-9414-0bc7e1eaa58e",
            "assignId": "d7086783-2658-4668-8fba-7101398a394e"
        }
    ],
      destinationList: [
        {
            "id": "37ea3d36-4455-4c85-9b00-e154bb048fc2",
            "title": "B",
            "desc": "",
            "position": 0,
            "createdAt": "2024-01-18T15:10:23.301Z",
            "sectionId": "ad4673fb-e450-4400-9414-0bc7e1eaa58e",
            "assignId": "d7086783-2658-4668-8fba-7101398a394e"
        },
        {
            "id": "9a4a1e25-53a3-4a77-b436-aae79c1a983b",
            "title": "A",
            "desc": "",
            "position": 1,
            "createdAt": "2024-01-18T15:10:20.002Z",
            "sectionId": "ad4673fb-e450-4400-9414-0bc7e1eaa58e",
            "assignId": "1611b230-e56d-46e3-a431-25d34b9d2868"
        },
        {
            "id": "307996b3-c283-4cf8-b4d1-e47b3a1da68f",
            "title": "Initial Project",
            "desc": "Setup project environment",
            "position": 2,
            "createdAt": "2024-01-18T15:08:31.479Z",
            "sectionId": "ad4673fb-e450-4400-9414-0bc7e1eaa58e",
            "assignId": "d7086783-2658-4668-8fba-7101398a394e"
        }
    ],
      resourceSectionId: "source_section_id(task current section id )",
      destinationSectionId: "destination_section_id(where task move section id )",
    };
}
```

<hr>

### _Get single task_

- /api/v1/task/:id (GET) - Access permission (all)

Send access token in headers by the authorization field.

Request Params: :id is replace by task id

<hr>

### _Update single task_

- /api/v1/task/:id (PATCH)

Send access token in headers by the authorization field.

Request Params: :id is replace by task id

Request body:

```bash
{
    "title": "udpated_task_title",
    "desc": "udpated_task_desc",
    "assignId": "user_id"
}
```

<hr>

### _Delete single task_

- /api/v1/task/:id (DELETE)

Send access token in headers by the authorization field.

Request Params: :id is replace by task id

<hr>

## License

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## Authors

- [Abu Shama](https://www.github.com/abushamacd)

## Links

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://imshama.com)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/abushamacd)
