const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
const FILE_LOC = './resources.json';
let resources = [];

if (fs.existsSync(FILE_LOC)) {
    resources = JSON.parse(fs.readFileSync(FILE_LOC));
}

app.get('/api/resources', (request, response) => {
    response.json(resources);
});

app.post('/api/resources', (request, response) => {
    resources.unshift(request.body);
    fs.writeFileSync(FILE_LOC, JSON.stringify(resources));

    response.json({message: "Resource saved!"});
});

app.listen(PORT, () => {
    console.log("Server is running");
})