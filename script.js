init = function(){
    buscarDados();
}

buscarDados = function(){
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:8080/lembretes/";
    xhr.onload = preparaDados;
    xhr.open('GET',url, true);
    xhr.send();
}

const preparaDados = function(data){
    let listaLembretes = JSON.parse(data.target.response);
    localStorage.setItem('lembretes', data.target.response);
    carregaLista(listaLembretes);
}   

carregaLista = function(listaLembretes){
    let dadosHTML ='';
    let dataCorrente; 
    for(let i=0; i<listaLembretes.length ; i++){
        let lembrete = listaLembretes[i];
        if(dataCorrente != lembrete.data){
            if(dataCorrente != undefined){
                dadosHTML+=`
                </li>     
                `
           }
            dadosHTML+=` 
            <li class="lembrete"> 
                <p class="dataCard">${formataData(lembrete.data)}</p>`;
        } 
        dadosHTML+=` 
            <p>${lembrete.nome} 
                <button onclick="excluir(${lembrete.id})" class="bntExcluir">X</button>
            </p>`;      
        dataCorrente = lembrete.data;
    }
    document.getElementById('listaLembretes').innerHTML = dadosHTML;
}

criaData = function(dataString){
    var dateParts = dataString.split("/");
    return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
}

formataData = function(data){
   return new Date(data).toLocaleDateString('pt-BR');
}

salvar = function(){
    let nome = document.getElementById('nome').value;
    let data = document.getElementById('data').value;
    let parametro = { 'nome': nome, 'data': criaData(data)};
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:8080/lembretes/";

    xhr.onload = buscarDados;
    xhr.onerror = tratarErro;
    xhr.open('POST',url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(parametro));
}

excluir = function(idLembrete){
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:8080/lembretes/" + idLembrete;
    xhr.onload = buscarDados;
    xhr.open('DELETE',url, true);
    xhr.send();
}

tratarErro = function(erro){
    alert(erro);
}