import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { Pool } from "pg";
import { env } from "process";

export async function testConnection(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const envObject = {
        pw: env.PGPASSWORD
    }
    const name = request.query.get('name') || await request.text() || 'world';
    console.log(envObject)

    const pool = new Pool({
        connectionString: env["PG_CONN_STRING"]
    })

    const res = await pool.query('SELECT NOW()')
    await pool.end()
    console.log({res})
    return { body: `Hello, ${res.rows[0]}!` };
};

