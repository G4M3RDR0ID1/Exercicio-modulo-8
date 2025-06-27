//Salvando variaveis que vamos utilizar
let cep = document.getElementById("cep")
let logradouro = document.getElementById("logradouro");
let bairro = document.getElementById("bairro");
let cidade = document.getElementById("cidade");
let estado = document.getElementById("estado");
let numero = document.getElementById("numero");

//1. Ouvir o envento de quando o usuario sair do campo de CEP
document.getElementById("cep").addEventListener("blur", (evento)=> {
    const elemento = evento.target;
    const cepinformado = elemento.value;

    //2. Validar o CEP
    if(!(cepinformado.length === 8)){
        return;
    }

    //3. Fazer a busca no via CEP
    fetch(`https://viacep.com.br/ws/${cepinformado}/json/`)
        .then(response => response.json())
        .then(data => {
            //3.2 Processamento da pagina
            if(!data.erro){
                logradouro.value = data.logradouro
                bairro.value = data.bairro
                cidade.value = data.localidade
                estado.value = data.uf

                //salvando no WEB Storage
                localStorage.setItem("cep", cepinformado)
                localStorage.setItem("logradouro", data.logradouro)
                localStorage.setItem("bairro", data.bairro)
                localStorage.setItem("cidade", data.localidade)
                localStorage.setItem("estado", data.uf)
            }
            else{
                alert("CEP não encontrado")
            }
        })
        .catch(error => console.log("Erro ao buscar o CEP: ", error))
    
})

//Salvando o numero 
numero.addEventListener("blur", (evento)=>{
    const elemento = evento.target
    const numeroInformado = elemento.value

    localStorage.setItem("numero", numeroInformado)
})

document.addEventListener('DOMContentLoaded', () =>{
    //1.Pegar os dados salvos
    const cepSalvo = localStorage.getItem("cep");
    const logradouroSalvo = localStorage.getItem("logradouro");
    const bairroSalvo = localStorage.getItem("bairro");
    const cidadeSalva = localStorage.getItem("cidade");
    const estadoSalvo = localStorage.getItem("estado");
    const numeroSalvo = localStorage.getItem("numero");

    //Preenchendo os campos.
    cep.value = cepSalvo
    logradouro.value = logradouroSalvo
    bairro.value = bairroSalvo
    cidade.value = cidadeSalva
    estado.value = estadoSalvo
    numero.value = numeroSalvo

})

