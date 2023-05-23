# flauro-be

# Steps

## Initiaize node

```
npm init
```

## Install dependencies

```
npm i express mongoose
npm i --save-dev dotenv nodemon
```

## Remove test script and create own script

```
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1"
}

```

to

```
"scripts": {
~"devStart": "nodemon server.js"~
"server:"index.js"
},
```

## Create files

- ~server.js~
- .env
- sh-3.2$ touch index.js
  sh-3.2$ touch db.js
  sh-3.2$ mkdir middlewares
  sh-3.2$ mkdir routes
  sh-3.2$ mkdir models

## Run dev

```
~sh-3.2$ npm run devStart~
npm run server

> flauro-be@1.0.0 devStart
> nodemon server.js

[nodemon] 2.0.21
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node server.js`
server started
```

## Further steps

- After running the first helloworld api, create user model and route

```js
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  dob: { type: String, required: true },
  role: { type: String, required: true },
  location: { type: String, required: true },
});

//user is the collection name
const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
```

```js
const express = require("express");
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send({
    message: "Users response",
  });
});

module.exports = { userRouter };
```

- Use a middleware in index js

```js
app.use(express.json());
app.use("/user", userRouter);
```

localhost:4000/user should give the response

- Post endpoint added to register a user
  > localhost:4000/user/register
  > Auth error resolved by manually copying password from mongdb access
  > Creates a db and collection based on the dbname in the connection uri and collection name specified in the userModel

* For token
  https://www.npmjs.com/package/jsonwebtoken

* Password hash : https://www.npmjs.com/package/bcrypt
  > npm install bcrypt

## Enable CORS

Allows AJAX requests to skip cross origin policy
https://medium.com/zero-equals-false/using-cors-in-express-cac7e29b005b

> npm install --save cors

- Use cors as middleware
  - As function without parameters
  - With an object origin: '<allowed url>'
  - With a fuction to return allowed urls

```js
//1
app.use(cors());
//2
app.use(
  cors({
    origin: "http://yourapp.com",
  })
);
//3
var allowedOrigins = ["http://localhost:3000", "http://yourapp.com"];
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);
```
