const app = require('./app');
require('dotenv').config();
const cors = require("cors");
const cookieSession = require("cookie-session");

app.use(
    cookieSession({
        name: "session",
        keys: ["AjithKumar"],
        maxAge: 24 * 60 * 60 * 100,
    })
);

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);


const port = 2000;
app.get('/', (req, res) => {
    res.send('Hello World!!!')
});

// app.use(express.json());


app.listen(port, () => {
    console.log(`Server Listining on port http://localhost:${port}`);
});


