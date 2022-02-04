const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
app.use(fileUpload());

var cors = require('cors')

app.use(cors())
app.post('/upload/:token', (req, res) => {
    var token = req.params.token
    if (req.files) {
        const file = req.files.file

        const fileName = token +'.mp4'
        file.mv(`D:/MySL_Model/Model/user_action/user_clip/${fileName}`, err => {
            if (err) {
                console.log(err)
                res.send(false)
            } else {
                res.send(true)
            }
        })
    } else {
        res.send(false)
    }
})
app.listen(8000, () => {
    console.log('server started')
})