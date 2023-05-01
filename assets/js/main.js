/*
declarando as variáveis e anexando as classes no javascript 
com document.querySelector
*/
const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

/*
Criando evento para o botão e testando funcionamento com
addEventListener - 'click' e em seguida adicionando a função dentro 
de addEventListener.
inputTarefa.VALUE busca o valor a ser colocado no input que está 
inserindo a classe '.input-Tarefa', ademais a lógica utilizada foi para que ao 
clicar no input 'Adicionar tarefa' o document. não emita 'valores' com os cliques
sem haver nada escrito, entretanto, ao escrever e clicarno input esse 
já armazena oq fora escrito
*/
btnTarefa.addEventListener('click', function (e) {
  if (!inputTarefa.value) return;
  criaTarefa(inputTarefa.value);

});

/*Nesse caso'btnTarefa' com o evento 'click' capta o clique do botão com o texto que 
está no 'input-Tarefa' e tranfere para a função 'criaTarefa' que foi adicionada
dentro de 'btnTarefa' para exercer sua função, que no momento 
é somente exibir o texto no console
*/
function criaTarefa(textInput) {
  const li = criaLi()/*obs: variável 'li' em escopos diferentes, esse  
                    'const = li'não tem à ver com o 'const = li' da função criaLi 
                    'li' está sendo usado apenas como um nome
                     facilitados de list para ambas variáveis*/
  li.innerText = textInput;
  tarefas.appendChild(li);/* busca a variável 'tarefas' que seleciona a classe de msm
                           nome com appendChild para ficar 'dependente' da função 'criatarefa'
                           e adiciona variável 'li' q está vinculada com a função criaLi */
  limpaInput(); /*função adicionada aqui para ter o seu efeito, considerando que a função criaTarefa
  é a responsável pelas ações de texto no input*/
  criabotaoApagar(li)//função que criou o botão apagar inserida na função que cria as tarefas
  salvarTarefas() //função de salvar as tarefas da lista adicionada na função que cria as tarefas
}

/* Função criada para adicionar o elemento 'li' (de list referenciando a tag
children do ul), pois conforme for adicinando txto no input as list com as terefas
serão adicionadas automaticamente ao 'ul'. Esta será colocada dentro da classe 
tarefas, a qual ficará responsável por listar as tarefas adicionadas no input 
e mostrar no html.
*/
function criaLi() {
  const li = document.createElement('li');
  return li;
}

/* Evento de botão criado com 'keypress' para que ao apertar a tecla 'enter' a lista de tarefa
seja adicionada, pra isso foi inserido o código da tecla q representa o 'enter' no caso o 13,
após tambem inserido a função responsável pelo evento de 'click' para que o 'enter passe a 
executar essa mesma função
*/
inputTarefa.addEventListener('keypress', function (e) {
  if (e.keyCode === 13) {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
  }
});

function limpaInput() {
  inputTarefa.value = '';// Irá'limpar' o valor contino no Input devido ao '' em branco
  inputTarefa.focus(); // evento do html para efeito de focar o cursor
}

/* Função criada para adicionar um botão apagar na lista
mesma variável utilizada da função que criou a lista, 'li'
*/
function criabotaoApagar(li) {
  li.innerText += ' ';
  const botaoApagar = document.createElement('button');
  botaoApagar.innerText = 'Apagar'; //texto dentro do botão
  botaoApagar.setAttribute('class', 'apagar')// classe adicionada na tag 'button' dentro de list 'li'
  li.appendChild(botaoApagar); //cria botão na tela
}

/*cria evento para mostrar os cliques realizados na tela
O IF determina que o evento 'e.target' seja realizado somente com elementos com 
a classe'apagar' dentro das chaves é determinado a remoção do elemento mãe/pai 
com variável el.parentElement.remove, causando a remoção do elemento superior 
ao elemento em que a classe 'apagar' está inserida, nesse caso em questão
a remoção de list 'li' elemento /mae/pai de button onde está a classe 'apagar',
causando assim o efeito de remoção da lista que fora adicionada.
*/
document.addEventListener('click', function (e) {
  const el = e.target; 

  if (el.classList.contains('apagar')) {
    el.parentElement.remove();
    salvarTarefas()/*adicionando a função salvarTarefas no evento que remove as listas
                    permite que a remoção aconteça tbm no arquivo JSON q fica salvo na
                    'memória' do navegador em f12/Application/local Storage    
                    */
  }
})

  /* cria função para salvar a lista */
function salvarTarefas(){
  const liTarefas = tarefas.querySelectorAll('li');// cria variável que seleciona todos os elementos 'li' de 'tarefas' classe respoensável pela ul
  const listaDetarefas = [];

  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace('Apagar', '');
    listaDetarefas.push(tarefaTexto);
  }

  const tarefasJSON = JSON.stringify(listaDetarefas); //transformando em arquivo JSON tipo string, que permite 'recuperar a lista e tranformar em um array novamente e continuar de onde parou
  localStorage.setItem('tarefas', tarefasJSON) /*comando para salvar o arquivo em formato JSON do tipo string, 
                                                pq esse comando so permite salvar em forma de strings
                                                fica salvo na'memória' do navegador em f12/Application/local Storage
                                                */

}

/* Função criada para recuperar as informções da lista quando o site for 
carregado novamente
*/

function adicionaTarefasSalvas() {
  const tarefas = localStorage.getItem('tarefas');// buscando o 'tarefas' no localStorage
  const listaDetarefas = JSON.parse(tarefas); // transforma novamente o JSON do tipo strng em um arquivo javascript, nesse caso, volta a ser uma array

  for(let tarefa of listaDetarefas) { //chama a função criaTarefas anteriormente criada e manter o loop com as tarefas salvas no navegador
    criaTarefa (tarefa);              
  }

}
adicionaTarefasSalvas() //'chamando' a função para o document. todo