const mongoose = require("mongoose")

const dataBaseConnect = async () => {
    try {

        const connectDB = await mongoose.connect(process.env.DATABASEURL);
        console.log(`database connected ${connectDB.connection.host}`)

    } catch (error) {
        console.log(`error in database ${error}`)
    }
}

module.exports = dataBaseConnect;
