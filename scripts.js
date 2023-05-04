/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/pacientes';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.pacientes.forEach(item => insertList(item.nome, item.telefone, item.data_consulta, item.hora, item.tipo))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()


/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputPatient, inputTelefone, inputData_Consulta, inputHora, inputTipo) => {
  const formData = new FormData();
  formData.append('nome', inputPatient);
  formData.append('telefone', inputTelefone);
  formData.append('data_consulta', inputData_Consulta);
  formData.append('hora', inputHora);
  formData.append('tipo', inputTipo);

  let url = 'http://127.0.0.1:5000/paciente';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  (\u00D7 = X)
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um paciente da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza que quer desmarcar a consulta?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Consulta Desmarcada!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um paciente da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/paciente?nome=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo paciente com nome, telefone, data da consulta e etc.. 
  --------------------------------------------------------------------------------------
*/
const newItem = () => {
  console.log("newItem");
  let inputPatient = document.getElementById("newInput").value;
  let inputTelefone = document.getElementById("newTelefone").value;
  let inputData_Consulta = document.getElementById("newData_Consulta").value;
  let inputHora = document.getElementById("newHora").value;
  let inputTipo = document.getElementById("newTipo").value;

  if (inputPatient === '') {
    alert("Escreva o nome de um Paciente!");
    } else {
    insertList(inputPatient, inputTelefone, inputData_Consulta, inputHora, inputTipo)
    postItem(inputPatient, inputTelefone, inputData_Consulta, inputHora, inputTipo)
    alert("Consulta Marcada!")
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (namePatient, telefone, data_consulta, hora, tipo) => {
  var item = [namePatient, telefone, data_consulta, hora, tipo]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("newInput").value = "";
  document.getElementById("newTelefone").value = "";
  document.getElementById("newData_Consulta").value = "";
  document.getElementById("newHora").value = "";
  document.getElementById("newTipo").value = "";

  removeElement()
}