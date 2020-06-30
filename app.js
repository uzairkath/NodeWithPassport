const express = require('express');
const app = express();
const elayouts = require('express-ejs-layouts');
app.use(elayouts);
app.set('view engine', 'ejs')

app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running at ${PORT}` ));