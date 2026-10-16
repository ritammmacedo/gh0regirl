// import express from 'express'

// const app = express()
// const port = 8080

// app.use('/admin', express.static('build'));

// app.listen(port, function(err){
//     if (err) console.log("Error in server setup")
    
//         console.log("Server listening on Port", port);
// })

const strapi = require('@strapi/strapi');
strapi.createStrapi(/* {...} */).start();