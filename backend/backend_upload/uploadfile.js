const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
app.use(fileUpload());

app.post('/upload/:token', (req, res) => {
    var token = req.params.token
    if (req.files) {
        const file = req.files.file

        const fileName = token +'.mp4'
        file.mv(`${__dirname}/store/${fileName}`, err => {
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
app.listen(5000, () => {
    console.log('server started')
})