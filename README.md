# Advanced Lecture - GraphQL with Prisma ORM and Apollo Server

## Agenda

- [ ] Introduction to Prisma
- [ ] Introduction to Apollo Server
- [ ] Introduction to GraphQL + GraphQL Playground
- [ ] Bonus: Integration with React using Apollo Client

### Why GraphQL over REST

GraphQL is a query language for your API that allows clients to request exactly the data they need and nothing more. Here are some reasons why GraphQL is preferred over traditional RESTful APIs:

1. **Flexible Queries**: Clients can request only the specific fields they need, reducing over-fetching or under-fetching of data.

2. **Reduced Round Trips**: GraphQL allows clients to fetch all the data they need in a single request, reducing the number of API calls.

3. **Strongly Typed**: GraphQL schemas provide a clear contract between the client and server, allowing for better type validation and autocompletion.

4. **Versionless APIs**: GraphQL avoids versioning issues because clients can evolve their queries over time without breaking changes.

5. **Graphical Query Tool**: GraphQL comes with tools like GraphQL Playground that make it easy for developers to explore and test the API.

### What is Prisma

Prisma is an open-source database toolkit that simplifies database access in your application. It provides an easy-to-use and type-safe API for interacting with databases. Key features of Prisma include:

1. **Database Agnostic**: Prisma supports various databases, including MySQL, PostgreSQL, SQLite, and SQL Server.

2. **Type-safe Query Builder**: Prisma generates a type-safe query builder based on your database schema, preventing runtime errors.

3. **Real-time Data**: Prisma supports real-time data with subscriptions, making it suitable for building applications with live updates.

4. **Database Migrations**: Prisma supports database schema migrations, making it easy to evolve your database schema over time.

### What is GraphQL

GraphQL is a query language for APIs that allows clients to request exactly the data they need. It was developed by Facebook and is designed to be a more efficient, powerful, and flexible alternative to RESTful APIs. Key concepts of GraphQL include:

1. **Schema**: GraphQL APIs are defined by a schema that specifies the types of data that can be queried and the relationships between them.

2. **Queries**: Clients can send queries to request specific data from the server. Queries resemble the shape of the response, allowing clients to avoid over-fetching or under-fetching data.

3. **Mutations**: Mutations are used to modify data on the server, such as creating, updating, or deleting records.

4. **Subscriptions**: GraphQL supports real-time data with subscriptions, allowing clients to receive updates when data changes.

### Benefits of Using Apollo

[Apollo](https://www.apollographql.com/) is a popular set of tools for building GraphQL applications. Here are some benefits of using Apollo in your GraphQL server:

1. **Apollo Server**: Apollo provides a powerful and flexible server framework for building GraphQL APIs with features like data batching, caching, and real-time subscriptions.

2. **Apollo Client**: For client-side applications, Apollo Client simplifies data fetching and management, offering features like caching, automatic updates, and seamless integration with UI libraries.

3. **Devtools**: Apollo offers developer tools that make it easier to debug and optimize GraphQL queries and mutations.

4. **Ecosystem**: Apollo has a thriving ecosystem of extensions, integrations, and community support, making it a reliable choice for building GraphQL applications.

By using GraphQL with Prisma and Apollo, you can create efficient, type-safe, and flexible APIs that enable you to build modern, data-driven applications with ease.

## Prerequisites

- Node.js installed (v12 or later recommended).
- npm or yarn package manager.

### 1. Initialize a New Node.js Project

First, create a new directory for your project and initialize a Node.js project inside it if you haven't already:

```bash
mkdir your-project-name
cd your-project-name
npm init -y
```

### 2. Install Prisma

Install Prisma as a development dependency in your project:

```bash
npm install prisma@^5.2.0 --save-dev
```

### 3. Initialize Prisma in Your Project

Run the following command to initialize Prisma in your project:

```bash
npx prisma init
```

This command will guide you through setting up Prisma. It will ask you for your database connection information, and it will create some initial files and directories.

### 4. Define Your Data Model

In the Prisma `schema.prisma` file created during initialization, define your data model. This includes specifying your database tables, fields, and their relationships. Here's an example of a simple schema:

```prisma
model User {
  id      Int      @id @default(autoincrement())
  email   String   @unique
  name    String
  password String
  posts   Post[]
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String
  createdAt DateTime @default(now())
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}
```

### 5. Generate Prisma Client

To generate the Prisma Client based on your schema, run the following command:

```bash
npx prisma generate
```

This command will create a Prisma Client that provides a type-safe API for accessing your database.

### 6. Use Prisma Client in Your Application

Now, you can use the Prisma Client in your Node.js application to interact with your database. Here's a basic example of how to use it to query for all users:

```javascript
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  console.log(users);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

### 7. Run Your Application

You can run your Node.js application to test your Prisma setup:

```bash
node your-app.js
```

That's it! You've set up Prisma in your Node.js project and defined a basic data model. You can now use Prisma Client to perform database operations in a type-safe manner. As your project progresses, you can use Prisma to create, read, update, and delete data in your database.

### 1. Install Apollo Server and Dependencies

In your project directory, install Apollo Server, as well as any other dependencies you may need:

```bash
npm install apollo-server@^3.12.1 graphql@^16.8.0
```

### 2. Create a Mock Data Source

For the purpose of this example, let's create a simple mock data source. You can replace this later with data from your Prisma database. Create a file named `data.js` in your project directory with some mock data:

```javascript
// data.js
const users = [
  { id: "1", name: "John Doe", email: "john@example.com" },
  { id: "2", name: "Jane Smith", email: "jane@example.com" },
];

const posts = [
  {
    id: "1",
    title: "First Post",
    content: "This is the content of the first post",
    authorId: "1",
  },
  {
    id: "2",
    title: "Second Post",
    content: "This is the content of the second post",
    authorId: "2",
  },
];

module.exports = { users, posts };
```

### 3. Create Your GraphQL Schema

Now, create a GraphQL schema in a file named `schema.js`:

```javascript
// schema.js
const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    authorId: ID!
  }

  type Query {
    users: [User!]!
    posts: [Post!]!
  }
`;

module.exports = typeDefs;
```

### 4. Implement Resolvers

Create a file named `resolvers.js` to implement the resolvers for your GraphQL schema. In this step, we'll use the mock data from `data.js`:

```javascript
// resolvers.js
const { users, posts } = require("./data");

const resolvers = {
  Query: {
    users: () => users,
    posts: () => posts,
  },
};

module.exports = resolvers;
```

### 5. Create the Apollo Server

Now, create your Apollo Server in a file named `server.js`:

```javascript
// server.js
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
```

### 6. Start the Apollo Server

Run your Apollo Server:

```bash
node server.js
```

Your GraphQL server with mock data should now be running at the URL specified in the console.

### 7. Test Your GraphQL API

You can use a tool like GraphQL Playground or Apollo Studio to test your GraphQL API by navigating to the server's URL in a web browser.

With this setup, you have an Apollo Server running with mock data. When you're ready to replace the mock data with data from your Prisma database, you can update the resolvers in `resolvers.js` to fetch data from Prisma using the Prisma Client.

## Seeding with Prisma

Prisma supports seed data that allows you to populate your database with initial data. Here are the basic steps to create Prisma seeds for the data model we defined earlier:

### 1. Create a Prisma Seed File

Start by creating a Prisma seed file where you can define the initial data you want to insert into your database. Create a file named `seed.js` in your project directory:

```javascript
// seed.js
const { PrismaClient } = require("@prisma/client");

async function seed() {
  const prisma = new PrismaClient();

  // Insert users
  const user1 = await prisma.user.create({
    data: {
      name: "Helpful Hannah",
      email: "hannah@example.com",
      password: "supportive1",
      posts: {
        create: [
          {
            title: "Offering tech help for coding questions 🖥️",
            description:
              "If you're stuck on a coding problem, I'm here to help! #CodingHelp",
          },
          {
            title: "Looking for gardening advice 🌱",
            description:
              "I'm a newbie gardener and could use some tips. #Gardening",
          },
        ],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Resourceful Rob",
      email: "rob@example.com",
      password: "problemSolver2",
      posts: {
        create: [
          {
            title: "Offering car repair expertise 🚗",
            description: "Experienced mechanic ready to assist! #CarRepair",
          },
        ],
      },
    },
  });

  console.log("Seed data created:", { user1, user2 });
}

seed()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

### 2. Run the Prisma Seed

You can run the Prisma seed script to populate your database with initial data:

```bash
node seed.js
```

This script uses the Prisma Client to insert users and posts into your database based on the data provided.

### 3. Verify Seed Data

After running the seed script, you can use the Prisma Studio to verify that the seed data has been successfully inserted into your database.

```bash
npx prisma studio
```

In Prisma Studio, you can verify that the seed data has been successfully inserted into your database. Here are some things you can do:

- **Browse Data**: You can browse through your database tables (e.g., `User` and `Post`) and see the records that have been inserted during the seed process.

- **View Relationships**: Prisma Studio visually represents the relationships between tables, so you can see how your data is related.

- **Edit Data**: You can edit existing records directly within Prisma Studio. This can be useful for making quick updates to your data during development.

- **Add New Data**: You can also add new records directly within Prisma Studio. This can be helpful for manually adding data for testing purposes.

- **Delete Data**: Prisma Studio allows you to delete records as well, which can be useful for testing and data management.

### 4. Explore Your Data Model

Besides verifying the seed data, Prisma Studio also provides a way to explore your data model. You can:

- **See Field Details**: Click on a field to see its details, including data type, constraints, and relationships.

- **View Schema**: Prisma Studio displays your entire data model schema, making it easy to understand your database structure.

- **Search and Filter**: You can search for specific records and filter data to find what you're looking for quickly.

### 5. Make Schema Changes

If you need to make changes to your data model schema (e.g., add new tables or fields), you can do so by editing your `schema.prisma` file and then running Prisma's migration commands to apply the changes to your database.

### 6. Save and Exit

Any changes you make within Prisma Studio can be saved back to your database. When you're done, you can simply close the Studio tab in your browser.

Prisma Studio is a valuable tool for database management and data exploration during the development and testing phases of your project. It offers a user-friendly interface for working with your database without needing to write SQL queries manually.
This script uses the Prisma Client to query and display the users and posts in the database.

With these steps, you can create and verify Prisma seed data for your data model. This seed data will serve as the initial data in your Prisma database, which you can later access and manipulate using your GraphQL API and Apollo Server.
