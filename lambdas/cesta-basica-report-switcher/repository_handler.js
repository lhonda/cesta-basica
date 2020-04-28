const mongoose = require('mongoose')

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  bufferCommands: false
}

module.exports.getConnection = (conn, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  return new Promise((resolve, reject) => {

    if(conn && conn.db && conn.db.serverConfig && conn.db.serverConfig.isConnected()) {
      return resolve(conn)
    }

    mongoose.set('debug', process.env.MONGOOSE_DEBUG === 'true');
    mongoose.set('bufferCommands', false);

    mongoose.connection.on('connected', () => {
      console.log("[DB] => Connected to DB")
    })

    mongoose.connection.on('error', connectionError => {
      console.error(`[DB] => Error while connecting \n => ${connectionError}`);
      return reject(connectionError);
    });

    mongoose.connect(process.env.DB_URL, options).then(() => resolve(mongoose.connection));
  })
}
