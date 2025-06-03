/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
module.exports = {
dialect: 'postgres',
host: process.env.SUPABASE_DB_HOST || 'localhost',
port: process.env.SUPABASE_DB_PORT || 3000,
}