const express = require('express');

const app = express();
const port = 5000;
const router = express.Router();
const multer = require('multer');
const jsonfile = require('jsonfile');

const upload = multer({ dest: 'uploads/' });
app.use(router);
router.get('/', (req, res) => {
    res.send('Hello World!');
});
router.post('/file', upload.single('file'), (req, res) => {
    const data = {
        name: req.body.name,
        phone: req.body.phone,
        file: req.file.originalname,
    };
    jsonfile.readFile('data.json', (err, obj) => {
        if (err) console.error(err);
        else {
            const updatedData = { ...obj, ...data };
            jsonfile.writeFileSync('data.json', updatedData);
            res.send('Data saved to file');
        }
    });
    console.log(req.body);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
