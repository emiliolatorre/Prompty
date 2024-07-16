const queries = require('../queries/favorites.queries')
const pool = require('../utils/config/db_pgsql');

// CREATE
const createFavorite = async (favorite) => {
    const { email, chat_id } = favorite;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.createFavorite, [email, chat_id]);
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
// let newFavorite = {
//     email: 'diego@gmail.com',
//     chat_id: "2"
// }
// createFavorite(newFavorite)
//     .then(data => console.log(data))
//     .catch(error => console.log(error))

// READ
const readFavorites = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.readFavorites, [email]);
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
// readFavorites('diego@gmail.com')
//     .then(data=>console.log(data))
//     .catch(error => console.log(error))

// DELETE
const deleteFavorite = async (email, chat_id) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.deleteFavorite, [email, chat_id])
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
// deleteFavorite('diego@gmail.com', '2')
//     .then(data => console.log(data))
//     .catch(error => console.log(error))

const favorites = {
    createFavorite,
    readFavorites,
    deleteFavorite
}

module.exports = favorites;