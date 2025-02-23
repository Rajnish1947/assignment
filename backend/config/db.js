// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log('MongoDB connected');
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   }
// };

// export default connectDB;





 import mongoose from "mongoose";
 const DBconnect = async () => {
    mongoose.connection.on('connected', () => {
        console.log("Database connected successfully");
    });

    mongoose.connection.on('error', (err) => {
        console.error("Error connecting to the database:", err);
    });

    try {
        await mongoose.connect(process.env.MONGO_URL);
    } catch (error) {
        console.error("Error while connecting to MongoDB:", error);
    }
};

export default DBconnect;



// const DBconnect=async()=>{
//     mongoose.connection.on('connected',()=>{
//         console.log("database connected succesfully")

//     })
//      await mongoose.connect(`${process.env.MONGO_URL}/mer-auth`);
// }
// export default DBconnect;
