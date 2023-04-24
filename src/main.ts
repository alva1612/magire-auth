import { app } from "@azure/functions";
import { test } from "./functions/test";
import { testConnection } from "./functions/testConnection";
import { createUser } from "./functions/prismaTest";

app.http('test', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: test
});
app.http('testConnection', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: testConnection
});

app.http('prismaTest', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: createUser
})
