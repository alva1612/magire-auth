import { app } from "@azure/functions";
import { test } from "./functions/test";

app.http('test', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: test
});
