const express = require('express');
const { postgraphile } = require('postgraphile');
const cors = require('cors');
const connectionFilterPlugin = require('postgraphile-plugin-connection-filter');

const app = express();

app.use(cors());

app.use(
    postgraphile(
        "postgres://postgres:c6h12o67c2h5oh@localhost:5432/vehicle_db",
        "public",
        {
            watchPg: true,
            graphiql: true,
            appendPlugins: [connectionFilterPlugin],
            enableCors: true,
            enhanceGraphiql: true
        }
    )
);

app.listen(5000, () => {
    console.log("\n \n");
    console.log("Postgraphile runs on port 5000")
    console.log("GraphQL API:           http://localhost:5000/graphql");
    console.log("GraphiQL GUI/IDE:      http://localhost:5000/graphiql");
    console.log("\n \n");
});
