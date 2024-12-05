import pkg from "pg";
const { Pool } = pkg;

async function CreateDb() {
    const conn = new Pool({
        host: process.env.DEFAULT_DB_HOST,
        user: process.env.DEFAULT_DB_USER,
        password: process.env.DEFAULT_DB_PASSWORD,
        database: process.env.DEFAULT_DB_NAME,
        allowExitOnIdle: true,
    });

    const query = "SELECT datname FROM pg_catalog.pg_database WHERE datname = $1";
    const databaseExist = await conn.query(query, [process.env.DEFAULT_PROJECT_DB_NAME]);

    if (databaseExist.rowCount !== 0) {
        console.log("Database already exists");
        return;
    }
    await conn.query(`create database ${process.env.DEFAULT_PROJECT_DB_NAME}`);
    await conn.end();
}

async function CreateTable(tableName, query) {
    const conn = new Pool({
        host: process.env.DEFAULT_DB_HOST,
        user: process.env.DEFAULT_DB_USER,
        password: process.env.DEFAULT_DB_PASSWORD,
        database: process.env.DEFAULT_PROJECT_DB_NAME,
        allowExitOnIdle: true,
    });

    const getTableQuery = "select * from information_schema.tables WHERE table_name = $1";

    const databaseExist = await conn.query(getTableQuery, [tableName]);

    if (databaseExist.rowCount !== 0) {
        console.log("Table already exists");
        return;
    }

    await conn.query(query);
    await conn.end();
}

await CreateDb();
console.log("Database created!!");

await CreateTable("employee_type", "create table user_type( id serial primary key, user_type_name text not null );");
await CreateTable(
    "user_info",
    "create table user_info ( id serial primary key, username text not null unique, password text not null, full_name text not null, user_type_id int not null, last_login date, constraint fk_user_type_id foreign key(user_type_id) references user_type(id) );"
);
await CreateTable(
    "available_schedule",
    "create table available_schedule ( id serial primary key, schedule_time time not null, user_id int not null, constraint fk_user_id foreign key(user_id) references user_info(id) );"
);
await CreateTable(
    "booking",
    "create table booking ( id serial primary key, booking_date date not null, booking_time time not null, client_id int not null, employee_id int not null, constraint fk_client_id foreign key(client_id) references user_info(id), constraint fk_employee_id foreign key(employee_id) references user_info(id) );"
);

console.log("Tables created!!");
