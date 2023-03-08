//Connections_____________
const mongoose = require('mongoose');
const uri= 'mongodb://127.0.0.1:27017/test';
const { Schema, model } = require('mongoose');
const db=mongoose.connection;
mongoose.connect(uri, {
  useNewUrlParser: true, 
  useUnifiedTopology:true
}).catch(err=> console.log(err));

db.once('open', () => {
  console.log('Database is connected to', mongoose.connection.uri);
})
db.on('error', err => {
  console.log(err);
})
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//_________________________________
//Developing the schemas for the two collections
const userSchema= new Schema({
    name: {type: String },
    surname: {type: String }, 
    email: {type: String, required: true},
    password: {type: String, required: true},
    age: {type: Number}
})
const User=model('User', userSchema);
const user = new User({
    name: 'Paula',
    surname: 'Sopena',
    email: 'paulasopenacoello@gmail.com',
    password: '123456',
    age:21
})
console.log(user);
user.save();
const bookSchema= new Schema({
    author: {type: String},
    title: {type: String}
})
const Book=model('Book', bookSchema);
const book = new Book({
    author: 'Paulo Coelho',
    title: 'El alquimista'
})
//C -> Save function. 
book.save();
const books = client.db('test').collection('books');
const users=client.db('test').collection('users');
//D -> Delete fuction
books.deleteMany({ author: 'Paulo Coelho' });
//Update function
const filter={age: 21};
const update = { $set: { age: 35 } };
users.updateOne(filter,update);
//List all the documents of a collection
const usersToList = users.find();
usersToList.forEach((document) => console.log(document));
