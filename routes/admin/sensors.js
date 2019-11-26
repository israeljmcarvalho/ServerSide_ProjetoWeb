// Aqui será a rota para a página de administração de sensores

var express = require('express');
var router = express.Router();
var sensorsService = require('../../services/sensorsService')
var upload = require('../../middlewares/uploaderMiddleware');

// Cada roteamento recebe 3 variáveis na function abaixo: req / res / next 

router.get('/', function(req, res ,next) { // get é uma função que tem 2 parâmetros, o primeiro é a string '/' e o segundo é uma função
    var sensors = sensorsService.getSensors();  
    var data = {camel: sensors};
    res.render('admin/sensors/index', data); // O comando res.render renderiza um template e refere-se a "response" ou seja resposta para o browser
});

router.get('/create', function(req, res ,next) { 
    var sensors = sensorsService.getSensors();  
    var data = {camel: sensors};
    res.render('admin/sensors/create', data);
});

router.post('/create', upload.single('sensor_Image'), function(req, res ,next) {  // o comando post nesta linha refere-se ao verbo POST do http (Get, Post, Put e Delete) e rerefe-se a "colocar" uma informação
                                                 // A título de informação, informações enviadas com GET aparece na URL do Browser e com POST não
                                                 // upload.single('image') é um middleware importade de uma biblioteca de terceiro
                                                 // sensor_Image é p NAME do arquivo create.ejs do imputbox da upload de imagem
    var sensors = sensorsService.getSensors();
    var newId = sensors.length + 1;
    var newSensor ={};
    newSensor.id = newId; 
    newSensor.name = req.body.sensor_Name; // o REQ refere-se ao que que o Browser enviou-nos no momento da solicitação. REQ vem de require/request
                                           // o variável "sensor_Name" refere-se ao nome dado para a propriedade NAME do primeiro imputbox do formulário do arquivo create.ejs
    newSensor.temperature = req.body.sensor_Temperature;
    newSensor.humidity = req.body.sensor_Humidity;
    newSensor.image = req.file.filename;
      console.log(newSensor); // Utilizamos o console.log para verificar se foi capturado as informações acima do browser pelo servidor
                                 // Neste caso o console.log acima funciona como uma espécie de Checkpoint. 
                                 // Os valores apresentador pelo console.log acima estarão disponíveis no terminal 

    sensorsService.saveSensor(newSensor);

    res.redirect('/admin/sensors');   // O comando res.redirect redireciona o usuario para outro caminho do site, neste caso redirecionará para 'admin/sensors'
});



module.exports = router;




