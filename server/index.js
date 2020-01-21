
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const fse = require('fs-extra');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

// temp* server post-func
app.get('/backend', (req, res) => res.send('ho!'))

// temp* server post-func
app.post('/backend', function (req, res) {

    const src = './fakeData.json';

    fse.readJson(src, (err, data) => {
        data.users.push(req.body);

        console.log('daaaata', data);


        fse.writeJson(src, data, (writeErr) => {
            if (writeErr) return console.log(writeErr);
            console.log(JSON.stringify(data));
            console.log('writing to ' + src);

            res.send(data);
        });
    });

});

app.listen(3001, () =>
    console.log('Express server is running on localhost:3001')
);


