import mongoose from 'mongoose';

const dbConnection = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    return handler(req, res);
  }
  await mongoose.connect(process.env.mongodburl, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
  });
  return handler(req, res);
};

export default dbConnection;

// import mongoose from 'mongoose';

// const dbConnection = (handler) => async (req, res) => {
//   console.log('db connection');
//   if (mongoose.connections[0].readyState) {
//     return handler(req, res);
//   }
//   mongoose
//     .connect(process.env.mongodburl, {
//       useUnifiedTopology: true,
//       useFindAndModify: false,
//       useCreateIndex: true,
//       useNewUrlParser: true,
//     })
//     .then((connection) => {
//       console.log('connected');
//       return handler(req, res);
//     })
//     .catch((err) => {
//       console.log('catch err: ', err);
//     });
// };

// export default dbConnection;
