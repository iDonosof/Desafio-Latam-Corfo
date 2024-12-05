import pkg from 'pg';
const { Pool } = pkg;

const conn = new Pool({
    host: process.env.DEFAULT_DB_HOST,
    user: process.env.DEFAULT_DB_USER,
    password: process.env.DEFAULT_DB_PASSWORD,
    database: process.env.DEFAULT_PROJECT_DB_NAME,
    allowExitOnIdle: true,
});

await conn.query("insert into user_type(user_type_name) values ('Vetarinario/a'), ('Peluquero/a'), ('Cliente')");
console.log("User type created!!");

await conn.query("insert into user_info(username, password, full_name, user_type_id) values ('Peliquer 1', '$2b$10$p2AzYwvy1oFBImVfdp023..nzAwWmKtQtEyQe.zPVT4sSDO6TO146', 'Peluquero 1', 2)");
console.log("User info created!!");

await conn.query("insert into available_schedule(schedule_time, user_id) values ('10:00:00', 1), ('12:00:00', 1), ('14:00:00', 1)");
console.log("Schedules created!!");
