//25:31
// Aqui será a rota para a página de administração de triggeres

var express = require('express');
var router = express.Router();
var triggersService = require('../../services/triggersService')
var upload = require('../../middlewares/uploaderMiddleware');

// Cada roteamento recebe 3 variáveis na function abaixo: req / res / next 

router.get('/', function(req, res ,next) { // get é uma função que tem 2 parâmetros, o primeiro é a string '/' e o segundo é uma função
    var triggers = triggersService.getTriggers();  
    var data = {monkey: triggers};
    res.render('admin/triggers/index', data); // O comando res.render renderiza um template e refere-se a "response" ou seja resposta para o browser
});

router.get('/create', function(req, res ,next) { 
    var triggers = triggersService.getTriggers();  
    var data = {monkey: triggers};
    res.render('admin/triggers/create', data);
});

router.post('/create', upload.single('trigger_Image'), function(req, res ,next) {  // o comando post nesta linha refere-se ao verbo POST do http (Get, Post, Put e Delete) e rerefe-se a "colocar" uma informação
                                                 // A título de informação, informações enviadas com GET aparece na URL do Browser e com POST não
                                                 // upload.single('image') é um middleware importade de uma biblioteca de terceiro
                                                 // trigger_Image é p NAME do arquivo create.ejs do imputbox da upload de imagem
    var triggers = triggersService.getTriggers();
    var newId = triggers.length + 1;
    var newTrigger ={};
    newTrigger.id = newId; 
    newTrigger.name = req.body.trigger_Name; // o REQ refere-se ao que que o Browser enviou-nos no momento da solicitação. REQ vem de require/request
                                           // o variável "trigger_Name" refere-se ao nome dado para a propriedade NAME do primeiro imputbox do formulário do arquivo create.ejs
    newTrigger.status = req.body.trigger_Status;
      console.log(newTrigger); // Utilizamos o console.log para verificar se foi capturado as informações acima do browser pelo servidor
                                 // Neste caso o console.log acima funciona como uma espécie de Checkpoint. 
                                 // Os valores apresentador pelo console.log acima estarão disponíveis no terminal 

    triggersService.saveTrigger(newTrigger);

    res.redirect('/admin/triggers');   // O comando res.redirect redireciona o usuario para outro caminho do site, neste caso redirecionará para 'admin/triggers'
});



module.exports = router;




