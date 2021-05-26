const express = require('express')
const medicamentsRoutes = require('./src/routes/medicaments')
const {userAuth:authRoutes} = require('./src/controllers/auth')
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.use('/authenticate', authRoutes);
app.use('/medicaments/', medicamentsRoutes);

app.use(express.static(require('path').join(__dirname, 'src/public')));

app.get ( '/' , ( req, res ) => { 
  res.sendFile (__dirname + '/src/public/index.html' ); 
});

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

const io = require('socket.io')(server)

app.set('io', io);
