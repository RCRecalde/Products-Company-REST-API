import mongoose from "mongoose";

//127.0.0.1:27017 == localhost
mongoose.connect("mongodb://127.0.0.1:27017/companydb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(db => console.log('DB is connected'))
.catch(error => console.log(error))