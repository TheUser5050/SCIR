import { Pool } from "pg";

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 20,
  connectionTimeoutMillis: 2000,
})

pool.on('connect', () => {
  console.log("PostgreSQL is connected")
})

pool.on('error', () => {
  console.log("Unexpected error")
})
