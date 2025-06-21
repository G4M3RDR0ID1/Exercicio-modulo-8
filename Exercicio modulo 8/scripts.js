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
                document.getElementById("logradouro").value = data.logradouro
                document.getElementById("bairro").value = data.bairro
                document.getElementById("cidade").value = data.localidade
                document.getElementById("estado").value = data.uf
            }
            else{
                alert("CEP não encontrado")
            }
        })
        .catch(error => console.log("Erro ao buscar o CEP: ", error))

})

