const express = require("express");
const cors = require("cors");
const graphqlHTTP = require("express-graphql");
const path = require("path");

const tagsRouter = require("./routes/tags");
const categoriesRouter = require("./routes/categories");
const postsRouter = require("./routes/posts");
const schema = require("./schema");

const app = express();
const port = process.env.PORT || 5000;

//Allow Cross-Origin
app.use(cors());
app.use("/api/tags", tagsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/posts", postsRouter);

app.use("/graphql", graphqlHTTP({ schema: schema, graphiql: true }));

// console log that the server is running
app.listen(port, () => console.log(`Express Server Started On Port ${port}`));
