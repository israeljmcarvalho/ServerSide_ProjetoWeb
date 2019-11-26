var fs = require ('fs'); //biblioteca para gravar  e lê dados do sistema de arquivo
                         // nome da variável fs quer dizer file system

var triggersFilePath = 'db/triggers.json';  // variável triggersFilePath criada para mencionar o caminho 
                                                    // do arquivo para não precisar escrever o caminho do arquivo
                                                    // em vários lugares

var loadFileTriggers = function () { // Função para carregar do arquivo JSON
    var fileData = fs.readFileSync(triggersFilePath, 'utf8'); // função readFileSync é utilizada quando se vai ler um arquivo (array de bites)
                                                                  // de um diretório, neste caso o diretório triggersFilePath 
                                                                   // Com o comando acima o arquivo é lido mas ainda não se sabe se é 
                                                                  // texto, uma imagem, um json ou qualquer outro tipo
  
    var triggers = JSON.parse(fileData); // Este comando converte o arquivo lido acima em um objeto JavaScript
    return triggers; 
}

var saveFileTrigger = function (triggers) { // Salvará no arquivo JSON em duas etapas: primeiro convertendo o objeto em formato texto 
                                                    // e depois salvando no arquivo

    var data = JSON.stringify(triggers); // Transforma o objeto em memória do JavaScript em um String 
    fs.writeFileSync(triggersFilePath, data, 'utf8');   // Este comando salva em disco o arquivo contido na variável triggersFilePath
}


var getTriggers = function(){
//Anteriormente neste bloco estavam os triggers "hard code" descritos um a um neste espaço.
//Os triggers foram retirados daqui e colocados dentro do arquivo triggers.json 

    var triggers = loadFileTriggers();
    return triggers;  

}

var saveTrigger = function (newTrigger){ // Salva um novo projeto
    var triggers = loadFileTriggers();   // Neste passo carrega-se todos os projetos do arquivo
    triggers.push(newTrigger);           // Aqui adiciona-se o novo projeto na lista acima citada 
    saveFileTrigger(triggers);           // Salva a lista no arquivo
}

 
module.exports= {   // Tenho 4 funções mas só as duas abaixo serão visíveis externamente
    getTriggers: getTriggers,
    saveTrigger: saveTrigger
}
