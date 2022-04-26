import mariadb from "mariadb"
import { parse } from 'json2csv'

const TABLE_NAME = 'time_entries'

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'admin',
  password: 'password',
  database: 'time_entries',
  connectionLimit: 5
});


const fetchEntries = async () => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * from time_entries");
    return rows
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
  }
}

const json2array = (entries) => {
  const array = entries.map(function (value, idx, array) {
    return [value.COD_CL, value.COGNOME, value.NOME, value.RAGIONE_SOCIALE, value.ADEMPIMENTO, value.SCADENZA_ADEMPIMENTO, value.ANNO_CIVILE, value.PREDISPOSTO, value.NOTE_CLIENTE]
  })

  return array
}

const insertEntries = async (entries) => {
  const valuesToInsert = json2array(entries)

  const sql = `INSERT into ${TABLE_NAME}(COD_CL, COGNOME, NOME, RAGIONE_SOCIALE, ADEMPIMENTO, SCADENZA_ADEMPIMENTO, ANNO_CIVILE, PREDISPOSTO, NOTE_CLIENTE) VALUES (?,?,?, ?, ?, ?, ?, ?, ?)`
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
      await conn.query(`DELETE from ${TABLE_NAME}`)
      await conn.batch(sql, valuesToInsert);
      await conn.commit();

    } catch (err) {
      console.error("Error inserting data, reverting changes: ", err);
      await conn.rollback();
    }
  } catch (err) {
    console.error("Error inserting data: ", err)
    throw err;
  } finally {
    if (conn) conn.end();
  }

  return Promise.resolve(1);
}

export { fetchEntries, insertEntries };