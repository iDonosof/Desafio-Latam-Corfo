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
    const query = "select id, username, password, full_name, user_type_id from user_info where username = $1";
    const params = [username];
    try {
        const { rows } = await conn.query(query, params);
        return rows[0] ?? null;
    } catch (err) {
        console.error(err);
        return [];
    }
}

async function GetAvailableHours(date) {
    const query = `select a.user_id as employee_id, full_name, schedule_time
                    from user_info u 
                    join available_schedule a on u.id = a.user_id
                    where a.schedule_time not in (select booking_time from booking where booking_date = $1)`;
    const params = [date];

    try {
        const { rows } = await conn.query(query, params);

        return (
            Object.values(
                rows.reduce((acc, { employee_id, full_name, schedule_time }) => {
                    if (!acc[employee_id]) {
                        acc[employee_id] = { employee_id, full_name, availableTime: [] };
                    }
                    acc[employee_id].availableTime.push(schedule_time);
                    return acc;
                }, {})
            ) ?? []
        );
    } catch (err) {
        console.error(err);
        return [];
    }
}

async function AddBooking(bookingDate, bookingTime, clientId, employeeId) {
    const query = "insert into booking(booking_date, booking_time, client_id, employee_id) values($1, $2, $3, $4) RETURNING id";
    const params = [bookingDate, bookingTime, clientId, employeeId];
    try {
        const { rows } = await conn.query(query, params);
        return {
            id: rows[0].id,
            bookingDate,
            bookingTime,
            clientId,
            employeeId,
        };
    } catch (err) {
        console.error(err);
        throw new Error("Failed to book. " + err);
    }
}

async function UpdateBooking(bookingId, bookingDate, bookingTime, employeeId) {
    const query = "update booking set booking_date = $1, booking_time = $2, employee_id = $3 where id = $4";
    const params = [bookingDate, bookingTime, employeeId, bookingId];
    try {
        await conn.query(query, params);
        return true;
    } catch (err) {
        console.error("Failed to update the booking. " + err);
        return false;
    }
}

async function DeleteBooking(bookingId) {
    const query = "delete from booking where id = $1";
    const params = [bookingId];
    try {
        await conn.query(query, params);
        return true;
    } catch (err) {
        console.error(err);
        throw new Error("Failed to book. " + err);
    }
}

export { CreateUserInfo, GetUserByUsername, GetAvailableHours, AddBooking, UpdateBooking, DeleteBooking };
