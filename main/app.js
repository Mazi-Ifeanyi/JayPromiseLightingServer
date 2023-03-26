const helmet = require('helmet');
const cors = require('cors');
const express = require('express');
const app = express();
const fileupload = require('express-fileupload');

const { addReview } = require('./databases/methods/client/ReviewDB');
const categoryRouter = require('./routes/admin/CategoryRoute');

const PORT = 3050;


const ALLOWED_ORIGINS = ['http://192.168.179.218:3001','http://localhost:3001'];
app.use(cors({
  origin: ALLOWED_ORIGINS,
//   allowedHeaders: ['content-type', 'authorization'],
//   optionsSuccessStatus: 200,
//   credentials: true
}));
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(helmet());
app.use(fileupload());

// const rand = Math.floor((Math.random() * 10));
// console.log(rand );

// addReview('08976487352', 'Ifeanyi', ['image1','image2','image3'], 'yh5FRUr6g', "Good product to buy guys").then(result=>{
//     console.log(result);
// });

app.use('/category', categoryRouter);

app.listen(PORT, ()=>{
    console.log('Server running on port: ',PORT);
});