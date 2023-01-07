# Inventory Management System

This is a software engineering course project. By the time of development of this project, I lead a team of 5 members to follow the Agile development methodology. It includes requirement engineering, use case diagram, activity diagram, risk analysis, RMM plans, DFD, and ERD.

<!-- ### [Demo](https://basic-express-authentication.herokuapp.com/) -->

## Getting Started

This instruction will get you a copy of this project up and running on your local machine

### Prerequisites

You need [Node JS](https://nodejs.org) installed on your local machine.

### Installing ⚙️

Run the followning command to install all the packages:

```
npm run setup
```

#### Setup environment variable

Set the following environment variable to `strapi_backend` directory. Also, an example file is given with the name of `.env.example`:

```
HOST=0.0.0.0
PORT=1337
APP_KEYS="toBeModified1,toBeModified2"
API_TOKEN_SALT=tobemodified
ADMIN_JWT_SECRET=tobemodified
JWT_SECRET=tobemodified
```

You can set the avobe environment variable as it is.

Set the following environment variable to `frontend_remix` directory. Also, an example file is given with the name of `.env.example`:

```
SESSION_SECRET = "ANYTHING_YOU_WANT"
SERVER_URL = "STRAPI_SERVER_URL_LIKE_http://localhost:1337"
```

#### Run 🏃🏻‍♂️

To run the strapi backend server:

```
npm run strapi:dev
```

An server will be run at http://localhost:1337
Server admin will be run at http://localhost:1337/admin

To run the frontend server:

```
npm run app
```

Frontend server will be run at http://localhost:3000

## Built With 🏗️👷🏻

-   [Strapi](https://strapi.io/) - Strapi is the leading open-source headless CMS.
-   [Remix](https://remix.run/) - Remix is a full stack web framework
-   [Npm](https://www.npmjs.com/) - Dependency Management

## Credit

-   [Windmill Dashboard](https://github.com/estevanmaito/windmill-dashboard) - A multi theme, completely accessible, with components and pages examples, ready for production dashboard.

## Authors

-   **Md Maruf Ahmed** - _Software Engineer_
