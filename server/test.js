require("dotenv").config();
const mongoose = require("mongoose");

async function testConnection() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB Atlas!");

        await mongoose.connection.db.collection("test").insertOne({
            message: "Hello MongoDB!",
            createdAt: new Date()
        });

        console.log("✅ Test document inserted successfully!");

        await mongoose.disconnect();
        console.log("✅ Disconnected.");
    } catch (err) {
        console.error("❌ Error:", err);
    }
}

testConnection();