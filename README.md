## Simple Todo App using React, Node js, Mysql and Redis
## Introduction

Many applications rely on data, sourced either from databases or APIs. When fetching data from an databases, a network request is sent to the database server, which responds with the requested data. However, these back-and-forth trips consume time and can result in delayed application responses for users. Additionally, databases often impose restrictions on the number of requests an application can make within a specific timeframe, known as rate limiting.

To overcome these challenges, data caching can be employed. By caching data, an application can make a single databases request, and subsequently retrieve data from the cache for all subsequent requests. Redis, an in-memory database that stores data in server memory, is a widely-used tool for data caching. In Node.js, the node-redis module enables connectivity to Redis, providing methods for data retrieval and storage.

In this tutorial, you will develop an Express application that fetches data from a mysql databases using the express js fetch module. Subsequently, you will enhance the application by storing the fetched data in Redis using the node-redis module. Finally, you will utilize Express middleware to facilitate data caching.
## Prerequisites for this tutorial include:

1. Setting up a Node.js environment on your server.
2. Installing Redis on your server.
3. Familiarity with asynchronous programming concepts.
4. Basic knowledge of working with the Express web framework.

Ensure that you have completed these prerequisites before proceeding with the tutorial.
## FrontEnd Part:

We will use react js for frontend.

1. Make a folder name ReactApp.
2. open this folder using vscode editor.
3. now open the terminal and run this command three command

```ruby
npx create-react-app todoapp
then
npm install bootstrap @mui/material @emotion/react @emotion/styled @mui/icons-material
```

you will see a react boiler plate with required node modules.

Now create a component folder and also create two file Home.js and Register.js in the component folder.
## Backend Part:

Now for backend first create a server folder and create a app.js file and run the below command in the terminal

```ruby
npm init -y
then
node install cors dotenv express mysql2 nodemon redis
```

this will create a package.json file and necessary node files for backend.

create a conn.js file in db folder and an .env file for neccessary configuration for database.
## Conn.js file

conn file is for database connectio
