let jsonProd = []; // Declara array de objetos para produtos
    //{'id':'1','nome':'Teste','qtd':'10','preco':'40,25'},

//#region JSON Manipulation
function salvaJson(name, arr){ // Salva JSON passando nome e array
    window.localStorage.setItem(name, JSON.stringify(arr)); // Guarda no localStorage
}

function recebeJson(json){ // Recebe JSON por nome 
    let arr = JSON.parse(localStorage.getItem(json)); // pega do localStorage

    return arr;
}
//#endregion


//#region UI/UX
function limpar(){
    console.clear()
    console.log('\n\n\n\n\n');
}

function restart(){
    limpar()
    console.log('=====SISTEMA DE ESTOQUE=====');
    let nav = [ // Mais moderno de salvar menu
        {'id':'1','desc':'Cadastrar produto'},
        {'id':'2','desc':'Mostar estoque'},
        {'id':'3','desc':'Atualizar quantidade'},
        {'id':'4','desc':'Sair'},
    ]
    nav.forEach(opcao => {
        console.log(`\n[${opcao.id}] - ${opcao.desc}`);
    });
    e = prompt('Navegue pelo menu: ');
    if(e == null || e == '0'){
        alert('ERRO OPCAO VAZIA!');
        close();
    }
    navegar(e);
}

function retornaMenu(){
    r = prompt('Deseja voltar ao menu principal? [S/N]');
    if(r.toUpperCase() == 'S'){
        restart();
    }else{
        return
    }
}
//#endregion

//#region Nav-bar
function navegar(d){
    limpar()
    switch(d){
        case '1':
            console.log('=====VISUALIZE SEU ESTOQUE=====')
            if (recebeJson('produtos') != null){
                limpar();
                console.log('|ID          |NOME          |QTD.          |PRECO')
                recebeJson('produtos').forEach(p => {
                    console.log(`|${p.id}           |${p.nome}         |${p.qtd}            |${p.preco}`);
                });
            }
            else{
                limpar();
                console.log('NENHUMA ENTRADA ENCONTRADA NO ESTOQUE :/')
                retornaMenu();
            }
        break;
    }
}
//#endregion

console.log('Digite restart() para comecar...')
jsonProd.push({id:'1',nome:'Teste',qtd:'10',preco:'40,25'});
salvaJson('produtos', jsonProd);