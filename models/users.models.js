const queries = require('../queries/users.queries')
const pool = require('../utils/config/db_pgsql');

// CREATE
const createUser = async (name, email, password) => {
    // const { name, email, password, role} = user;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.createUser, [name, email, password]);
        result = data.rowCount;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}
// Testing PostgreSQL
// let newUser = {
//     name: "Prueba",
//     email: "prueba2@gmail.com",
//     password: "123456"
// }
// createUser(newUser)
//     .then(data => console.log(data))
//     .catch(error => console.log(error))

// READ ALL
const readUsers = async () => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.readUsers);
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}
// Testing PostgreSQL
// readUsers()
//     .then(data=>console.log(data))
//     .catch(error => console.log(error))

// READ ONE
const readUsersByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.readUsersByEmail, [email])
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}
// Testing PostgreSQL
// readUsersByEmail('prueba@gmail.com')
//     .then(data=>console.log(data))
//     .catch(error => console.log(error))

// UPDATE
const updateUser = async (user) => {
    const { name, email, password, role, logged, last_logged_date, old_email } = user;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        result = 0; // Initialize the result counter

        // Array to store promises for each update query
        const updatePromises = [];

        if (name) {
            updatePromises.push(client.query(queries.updateUserName, [name, old_email]));
        }
        if (password) {
            updatePromises.push(client.query(queries.updateUserPassword, [password, old_email]));
        }
        if (role) {
            updatePromises.push(client.query(queries.updateUserRole, [role, old_email]));
        }
        if (typeof logged !== 'undefined') { // Checking for undefined to allow false values
            updatePromises.push(client.query(queries.updateUserLogged, [logged, old_email]));
        }
        if (last_logged_date) {
            updatePromises.push(client.query(queries.updateUserLastLoggedDate, [last_logged_date, old_email]));
        }
        if (email) {
            updatePromises.push(client.query(queries.updateUserEmail, [email, old_email]));
        }

        // Wait for all promises to complete
        const updateResults = await Promise.all(updatePromises);

        // Count the number of rows affected by each update
        updateResults.forEach(updateResult => {
            result += updateResult.rowCount;
        });

    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
}

// Testing PostgreSQL
// const updatedUser = {
//     name: "Prueba2",
//     email: "prueba2@gmail.com",
//     password: "123456123456",
//     role: "user",
//     old_email: "prueba@gmail.com",
//     logged: false,
//     last_logged_date: "2024-07-01 20:57:30.212678+00"
// }
// updateUser(updatedUser)
//     .then(data => console.log(data))
//     .catch(error => console.log(error))

// DELETE
const deleteUser = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.deleteUser, [email])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}
// Testing PostgreSQL
// deleteUser('prueba2@gmail.com')
//     .then(data => console.log(data))
//     .catch(error => console.log(error))

const users = {
    createUser,
    readUsers,
    readUsersByEmail,
    updateUser,
    deleteUser
}

module.exports = users;