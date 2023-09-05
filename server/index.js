/**
 * Importing the expres setup
 */

const app = require("./app");

/**
 * DB connection
 * dbConnect() - database connection
 *              - connecting application to database
 */
const { dbConnect } = require("./config/dbConnect");
dbConnect();



/**
 * Destucturing PORT from .env file
 * If PORT is not available it uses 4001 as PORT
 */
const { PORT } = process.env || 4001;

/**
 * Setting up server to listen at PORT.
 * If PORT is not available it uses 4001 as PORT
 */
app.listen(PORT, () => {
  console.log(`Server is up and running at , http://localhost:${PORT}/"`);
});
