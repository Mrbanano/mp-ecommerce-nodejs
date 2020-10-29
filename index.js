const express = require('express')
var exphbs  = require('express-handlebars');
var port = process.env.PORT || 3000

const app = express()

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));



app.get('/', (req, res )=> {
    res.render('home');
})

app.listen(port,()=>{
    console.log(`server in port ${port}`)
})