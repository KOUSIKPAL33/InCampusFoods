const mongoose = require('mongoose');
const mongourl = 'mongodb+srv://kousikpal652:kousik2319@cluster0.p1cre.mongodb.net/incampusfoods?retryWrites=true&w=majority&appName=Cluster0';

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongourl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB successfully");

        // ======================== yummpy Data ====================
        const fetchedData_yummpy = await mongoose.connection.db.collection("yummpy").find({}).toArray();
        const foodCategory_yummpy = await mongoose.connection.db.collection("category_yummpy").find({}).toArray();
        
        global.food_items_yummpy = fetchedData_yummpy;
        global.foodCategory_yummpy = foodCategory_yummpy;

        // ======================== kathi Data ====================

        const fetchedData_kathi= await mongoose.connection.db.collection("kathijunction").find({}).toArray();
        const foodCategory_kathi = await mongoose.connection.db.collection("category_kathijunction").find({}).toArray();
        
        global.food_items_kathi = fetchedData_kathi;
        global.foodCategory_kathi = foodCategory_kathi;

        // ======================== ifcc Data ====================

        const fetchedData_ifcc = await mongoose.connection.db.collection("ifcc").find({}).toArray();
        const foodCategory_ifcc = await mongoose.connection.db.collection("category_ifcc").find({}).toArray();
        
  
        global.food_items_ifcc = fetchedData_ifcc;
        global.foodCategory_ifcc = foodCategory_ifcc;

        //==================================================
        //global.userInformation=await mongoose.connection.db.collection("users").find({}).toArray();

    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
}

module.exports = connectToMongo;
