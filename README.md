# <p align = "center">RepoProvas</p>

<p align="center">
   <img src="./paper_pencil.svg" alt="paper and pencil" height="200"/>
</p>

## :clipboard: Description

Wouldn't it be nice to have a place to keep all your old tests to study them? With RepoProvas it is possible! You can save your links to the tests pdf and relate them with teachers and disciplines. For now the API only have routes to create the tests, but you can change the `seed` file to register whatever teacher and discipline you want, and create your own application, specialized on your school!

---

## :computer: Technologies and Concepts

- REST APIs
- JWTs
- Node.js
- TypeScript
- PostgreSQL with Prisma
- Integration tests with jest
- Env variables
- Layared Architecture

---

## :rocket: Routes

```yml
POST /signup
  - Create a new account
  - headers: {}
  - body: {
    "email": "repoprovas@gmail.com",
    "password": "its_secret_ssshh",
    "confirmPassword": "its_secret_ssshh"
  }
  - The return is
  - body: {
    "id": 1,
    "email": "repoprovas@gmail.com"
  }
```

```yml
POST /login
  - Sign in to your account
  - Retrieve an access token
  - headers: {}
  - body: {
    "email": "repoprovas@gmail.com",
    "password": "its_secret_ssshh"
  }
  - The return is
  - body: {
    "token": $token
  }
```

```yml
POST /tests
  - Save a test
  - headers: { "Authorization": "Bearer $token" }
  - body: {
    "name": "Planning test",
    "pdfUrl": "https://www.orimi.com/pdf-test.pdf",
    "categoryId": 3,
    "teacherId": 2,
    "disciplineId": 5,
  }
  - The return is
  - body: {
    "name": "Planning test",
    "pdfUrl": "https://www.orimi.com/pdf-test.pdf",
    "categoryId": 3,
    "teacherDiscipline": 5
  }
```

---

## 🏁 Running the Application

This project was created using `node` on version `v16.15.1` and `npm` on version `8.11.0`, so it is recommended to use this versions. It also uses `postgres` on version `14.5` on your machine so you'll need to install that too.

First, clone this repository in your machine:

```
git clone https://github.com/GabrielCmrg/projeto20-repoprovas
```

After, inside the folder, run this command to install the dependencies:

```
npm install
```

On this repo there is a `.env.example` file wich you can use to create your own `.env` file and fill it as you need. With the `.env` file created run:

```
npx prisma migrate dev
```

With all this ready, you can run the application on development mode with:

```
npm run dev
```

Or, if you wish, you can build and run the production version with:

```
npm run build && npm start
```

---

## :test_tube: Running tests

For you to run the tests you will need to create a `.env.test` file with the same variables as your `.env` file, but with a `DATABASE_URL` pointing to your test database. Then, run the command:

```
npm run test
```

There is also a collection with the important requests, and you can run then all at once to see exactly what is needed on each route, and exactly what it responds. In order for them to work you will need to configure a environment on your thunder client. The variables needed are on `.env.example`, the `token` can be left blank.

:stop_sign: The tests that comes with the collection only works one. If you want to re-do the tests of the collection you will need to run:

```
npx prisma migrate reset
```
