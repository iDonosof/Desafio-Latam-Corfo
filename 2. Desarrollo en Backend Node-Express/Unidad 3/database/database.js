import pkg from "pg";
const { Pool } = pkg;

const conn = {
    query: (queryString, values = []) => {
        const connection = new Pool({
            host: process.env.DEFAULT_DB_HOST,
            user: process.env.DEFAULT_DB_USER,
            password: process.env.DEFAULT_DB_PASSWORD,
            database: process.env.DEFAULT_PROJECT_DB_NAME,
            allowExitOnIdle: true,
        });
        try {
            if (values) return connection.query(queryString, values);
            return connection.query(queryString);
        } catch (err) {
            throw Error(err);
        } finally {
            connection.end();
        }
    },
};

async function CreateUserInfo(username, password, fullName, userTypeId) {
    const query = "insert into user_info(username, password, full_name, user_type_id) values($1, $2, $3, $4) RETURNING id";
    const params = [username, password, fullName, userTypeId];
    try {
        const { rows } = await conn.query(query, params);
        return {
            id: rows[0]?.id,
            username,
            password,
            fullName,
            userTypeId,
            lastLogin: null,
        };
    } catch (err) {
        console.log(err);
        throw new Error("Failed to create a new user. " + err);
    }
}

async function GetUserByUsername(username) {
    const query = "select username, password, full_name, user_type_id from user_info where username = $1";
    const params = [username];
    try {
        const { rows } = await conn.query(query, params);
        return rows[0] ?? null;
    } catch (err) {
        console.log(err);
        return [];
    }
}

export { CreateUserInfo, GetUserByUsername };
