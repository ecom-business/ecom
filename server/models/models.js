const { Pool } = require('pg');
const PG_URI =
	"postgres://goxwzgmh:6L2i6N1CjdiGWyqYpuufOM1RNF5bAhtw@lallah.db.elephantsql.com/goxwzgmh";

const pool = new Pool({connectionString: PG_URI});

module.exports = {
	query: (text, params, cb) => {
    return pool.query(text, params, cb)
  }
};