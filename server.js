require(`dotenv`).config();
const express = require(`express`);
const mongoose = require(`mongoose`);
const app = express();

const bookRoutes = require(`./Routes/book`);
const userRoutes = require(`./Routes/user`);
const transactionRoutes = require(`./Routes/transaction`);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

(async()=>{
    try{
        mongoose.set("strictQuery", false)
        const UnB = await mongoose.createConnection(process.env.MONGO_URL + 'UnB');
        console.log(`Connected to userandbooks DB`);
        const UnBTransaction = await mongoose.createConnection(process.env.MONGO_URL + 'UnBtransc');
        console.log(`Connected to userandbooks transaction DB`);
    }catch(err){
        console.log("mongoose error", err)
    }
})()

app.use("/", bookRoutes);
app.use("/user", userRoutes);
app.use("/transaction", transactionRoutes);

app.listen(process.env.PORT, ()=>{
    console.log("server running")
})