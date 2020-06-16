const express = require('express');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(express.static('TemplateData'));
app.use(express.static('Build'));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
})

app.listen(PORT , () => {
    console.log(`Listening on localhost:${PORT}`);
})