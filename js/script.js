//selecionando todos os elementos necessários
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const figure_list = document.querySelector("#imageQuestion"); // ---> arrumada a declaração

// se clicar no botão startQuiz
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //mostrar box de infos
}

// se clicar no botão exitQuiz 
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //mostrar box de infos
}

// se clicar no botão continueQuiz 
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //mostra box de infos
    quiz_box.classList.add("activeQuiz"); //mostra o box do quiz
    showQuetions(0); //chamando a função showQestions
    queCounter(1); //passando 1 parâmetro para queCounter
}

let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// se clicar no botão restartQuiz
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //mostra o box do quiz
    result_box.classList.remove("activeResult"); //ocultar box de resultados
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); //chamando a função showQestions
    queCounter(que_numb); //passando o valor que_numb para queCounter
    clearInterval(counter); //limpando o counter
    clearInterval(counterLine); //limpando o counterLine
    next_btn.classList.remove("show"); //ocultandi o próximo button
}

// se clicar no botão quitQuiz
quit_quiz.onclick = ()=>{
    window.location.reload(); //recarregar a janela atual
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// se clicar no botão próxima pergunta
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ //se a contagem de perguntas for menor que o comprimento total da pergunta
        que_count++; //incremente o valor que_count
        que_numb++; //incremente o valor que_numb 
        showQuetions(que_count); //chamando a função showQestions
        queCounter(que_numb); //passando o valor que_numb para queCounter
        clearInterval(counter); //limpando o counter
        clearInterval(counterLine); //limpando o counterLine
        next_btn.classList.remove("show"); //ocultando o botão próximo
    }else{
        clearInterval(counter); //limpando o counter
        clearInterval(counterLine); //limpando o counterLine
        showResult(); //chamando a função showResult
    }
}

// ---> criando a tag
// const img_tag = document.createElement("img");

// obtendo perguntas e opções da array
function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    //criando uma nova tag span e div para pergunta e opção e passando o valor usando array index

    //adicionar parametro img ---> acessando src da imagem
    //img_tag.src = questions[index].image; 
    let img_tag = '<img src=' + questions[index].image + '>';

    let img = '<img src="'+ questions[index].image +'">';

    //figure_list.style.backgroundImage = "url(" +question[index].image[0] + ");"

    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = 
      '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';

    //figure_list.appendChild(img_tag); //adicionando imagem dentro da div imageQuestion ---> trocando a call da div
    figure_list.innerHTML = img_tag;    
    que_text.innerHTML = que_tag; //adicionando nova tag span dentro da ide que_tag
    option_list.innerHTML = option_tag; //adicionando nova div tag dentro da option_tag
    
    const option = option_list.querySelectorAll(".option");

    // definindo o atributo onclick para todas as opções disponíveis, não pode ser img
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// criando as novas tags div que para ícones
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//se o usuário clicar nessa opção
function optionSelected(answer){
    clearInterval(counter); //limpar o counter
    clearInterval(counterLine); //limpar o counterLine
    let userAns = answer.textContent; //pegando tendo a opção selecionada pelo usuário
    let correcAns = questions[que_count].answer; //pegando a resposta certa da array
    const allOptions = option_list.children.length; //pegando todos os itens da opção
    
    if(userAns == correcAns){ //se a opção selecionada pelo usuário for igual à resposta correta da array
        userScore += 1; //atualizando o valor da pontuação com 1
        answer.classList.add("correct"); //adicionando cor verde para sinalizar que a opção selecionada é a correta
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adicionando icone tick para sinalizar que a opção selecionada é a correta
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); //adicionando cor vermelha para sinalizar que a opção selecionada é a incorreta
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adicionando icone x para sinalizar que a opção selecionada é a incorreta
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ //se houver uma opção que corresponda a uma resposta da array
                option_list.children[i].setAttribute("class", "option correct"); //adicionando cor verde à opção correspondente
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adicionando o ícone tick à opção correspondente
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //uma vez que o usuário selecione uma opção, desative todas as opções
    }
    next_btn.classList.add("show"); //mostrar o próximo botão se o usuário selecionar qualquer opção
}

function showResult(){
    info_box.classList.remove("activeInfo"); //ocultar o box de info
    quiz_box.classList.remove("activeQuiz"); //ocultar o box de quiz
    result_box.classList.add("activeResult"); //mostrar o box de resultados
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 9){ // se o usuário marcou mais de 9
        //criando uma nova tag span e passando o número da pontuação do usuário e o número total da pergunta
        let scoreTag = '<span>Parabéns jovem! 🎉, Você acertou <p>'+ userScore +'</p> do total de <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;  //adicionando nova tag span dentro de score_Text
    }
    else if(userScore > 7){ // se o usuário marcou mais de 7
        let scoreTag = '<span>Top 😎, Você acertou <p>'+ userScore +'</p> do total de <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // se o usuário marcou menos de 7
        let scoreTag = '<span>Puts... 😐, Você acertou só <p>'+ userScore +'</p> do total de <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function queCounter(index){
    //criando uma nova tag span e passando o número da pergunta e a pergunta total
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adicionando nova tag span dentro de bottom_ques_counter
}