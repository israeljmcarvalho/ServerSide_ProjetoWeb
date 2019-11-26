var fs = require ('fs'); //biblioteca para gravar  e lê dados do sistema de arquivo
                         // nome da variável fs quer dizer file system

var sensorsFilePath = 'db/sensors.json';  // variável sensorsFilePath criada para mencionar o caminho 
                                                    // do arquivo para não precisar escrever o caminho do arquivo
                                                    // em vários lugares

var loadFileSensors = function () { // Função para carregar do arquivo JSON
    var fileData = fs.readFileSync(sensorsFilePath, 'utf8'); // função readFileSync é utilizada quando se vai ler um arquivo (array de bites)
                                                                  // de um diretório, neste caso o diretório sensorsFilePath 
                                                                   // Com o comando acima o arquivo é lido mas ainda não se sabe se é 
                                                                  // texto, uma imagem, um json ou qualquer outro tipo
  
    var sensors = JSON.parse(fileData); // Este comando converte o arquivo lido acima em um objeto JavaScript
    return sensors; 
}

var saveFileSensor = function (sensors) { // Salvará no arquivo JSON em duas etapas: primeiro convertendo o objeto em formato texto 
                                                    // e depois salvando no arquivo

    var data = JSON.stringify(sensors); // Transforma o objeto em memória do JavaScript em um String 
    fs.writeFileSync(sensorsFilePath, data, 'utf8');   // Este comando salva em disco o arquivo contido na variável sensorsFilePath
}


var getSensors = function(){
//Anteriormente neste bloco estavam os sensors "hard code" descritos um a um neste espaço.
//Os sensors foram retirados daqui e colocados dentro do arquivo sensors.json 

    var sensors = loadFileSensors();
    return sensors;  

}

var saveSensor = function (newSensor){ // Salva um novo projeto
    var sensors = loadFileSensors();   // Neste passo carrega-se todos os projetos do arquivo
    sensors.push(newSensor);           // Aqui adiciona-se o novo projeto na lista acima citada 
    saveFileSensor(sensors);           // Salva a lista no arquivo
}

 
module.exports= {   // Tenho 4 funções mas só as duas abaixo serão visíveis externamente
    getSensors: getSensors,
    saveSensor: saveSensor
}
