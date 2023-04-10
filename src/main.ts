import { app } from "@azure/functions";
import { test } from "./functions/test";
import { testConnection } from "./functions/testConnection";

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
