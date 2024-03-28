const path = require('path');

// Get the location of database.sqlite file
const dbPath = path.resolve(__dirname, './database.sqlite');

// Create connection to SQLite database
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true
});

// Create a table in the database called "tasks"
knex.schema
  // Make sure no "tasks" table exists
  // before trying to create new
  .hasTable('tasks')
  .then((exists) => {
    if (!exists) {
      // If no "tasks" table exists
      // create new, with "id", "content", and "completed" columns
      // and use "id" as a primary identification
      // and increment "id" with every new record (task)
      return knex.schema.createTable('tasks', (table) => {
        table.increments('id').primary();
        table.string('content');
        table.boolean('completed').defaultTo(false); // Add new "completed" column
      })
      .then(() => {
        console.log('Table \'Tasks\' created');
      })
      .catch((error) => {
        console.error(`There was an error creating table: ${error}`);
      });
    }
  })
  .then(() => {
    console.log('done');
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`);
  });

module.exports = knex;
