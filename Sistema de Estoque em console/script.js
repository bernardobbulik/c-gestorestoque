let produtos = []; // Declara array de objetos para produtos
    //{'id':'1','nome':'Teste','qtd':'10','preco':'40,25'},

//#region JSON Manipulation
function salvaJson(name, arr){ // Salva JSON passando nome e array
    window.localStorage.setItem(name, JSON.stringify(arr)); // Guarda no localStorage
}

function recebeJson(json){ // Recebe JSON por nome 
    let arr = JSON.parse(localStorage.getItem(json)); // pega do localStorage

    return arr;
}

function listaProdutos(produtos){
    limpar();
    console.log('|ID          |NOME          |QTD.          |PRECO')
    produtos.forEach(p => {
        console.log(`|${p.id}           |${p.nome}         |${p.qtd}            |${p.preco}`);
    });
}

function alteraQuantidade(id, qtd){
    produtos[id].qtd = qtd;
    salvaJson('produtos', produtos);
    return;
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
        {'id':'2','desc':'Mostrar estoque'},
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
            console.log('=====CADASTRE UM PRODUTO=====')
            // Carregar JSON pra pegar o último ID e acrescentar 1, se não houver, o ID desse prod. é 1:
            let id, nome, qtd, preco;
            lastCod = produtos.length; //Pega a última array
            if (lastCod != undefined){                 
                id = lastCod+=1; //Incrementa 1 no código
            }
            else{
                id = 1;
            }
            nome = prompt('Digite o nome do produto: ');
                if(nome != null){
                    qtd = parseInt(prompt('Digite a quantidade inicial desse produto: '));
                    if(qtd != null){
                        preco = parseFloat(prompt('Digite o preço desse produto: '));
                        if(preco != null){
                            alert(`Confirme: \nID: ${id}\nNome: ${nome}\nQuantidade inicial: ${qtd}\nPreço: ${preco}`);
                            produtos.push({id: id, nome:nome, qtd: qtd,preco: preco});
                            salvaJson('produtos', produtos);
                            alert('Produto cadastrado com sucesso!');
                            navegar('2');
                        }
                    }
                }
                break;
                restart();
            alert(`ID: ${lastCod}`);
        break;


        case '2':
            console.log('=====VISUALIZE SEU ESTOQUE=====')
            if (produtos != undefined){
                listaProdutos(produtos);
                retornaMenu();
            }
            else{
                limpar();
                console.log('NENHUMA ENTRADA ENCONTRADA NO ESTOQUE :/')
                retornaMenu();
            }
        break;
            
        case '3':
            console.log('=====ALTERE QUANTIDADE=====');
            if (produtos != undefined){
                listaProdutos(produtos);
                let id = prompt('Digite o ID do produto que deseja alterar a quantidade: ');
                if(id != null && id != '0'){
                    
                    let idSelecionado = produtos.findIndex(item => item.id === parseInt(id));
                    console.log(idSelecionado);
                    let nomeSelecionado;
                    let nQtd;
                    if (idSelecionado != -1){
                        nomeSelecionado = produtos[idSelecionado].nome;
                        nQtd = prompt(`Digite a nova quantidade do produto ${nomeSelecionado}`);
                        if(nQtd != null){
                            alert(`Confirme: \nProduto: ${nomeSelecionado}\nNova quantidade: ${nQtd}`);
                            alteraQuantidade(idSelecionado, nQtd);
                            navegar('2');
                        }
                    }
                    alert('Nenhum produto encontrado com esse ID. Tente novamente!');
                    navegar('3')
                }
            }
        break;

    }
    
}
//#endregion

console.log('Digite restart() para comecar...')
produtos = recebeJson('produtos');
