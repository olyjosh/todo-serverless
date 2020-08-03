const  admin = require('firebase-admin')

//var serviceAccount = require("/Users/mac/Downloads/todoapp-fb2ec-firebase-adminsdk-rakuv-b2b51d0ac7.json");
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://todoapp-fb2ec.firebaseio.com"
// })

admin.initializeApp();

const db = admin.firestore()

module.exports= {admin, db}