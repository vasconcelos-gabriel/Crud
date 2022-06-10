'use strict'

const openModal = () => document.getElementById('modal').classList.add('active')

const closeModal = () =>{
  document.getElementById('modal').classList.remove('active')
  clearFields()
}

const getLocalStorage = () =>
  JSON.parse(localStorage.getItem('db_client')) ?? []
const setLocalStorage = dbClient =>
  localStorage.setItem('db_client', JSON.stringify(dbClient))

//CRUD

// DELETE
const deleteClient = index => {
  const dbClient = readClient()
  dbClient.splice(index, 1)
  setLocalStorage(dbClient)
}

// UPDATE
const updateClient = (index, client) => {
  const dbClient = readClient()
  dbClient[index] = client
  setLocalStorage(dbClient)
}

// READ
const readClient = () => getLocalStorage()

// CREATE
const createClient = client => {
  const dbClient = getLocalStorage()
  dbClient.push(client)
  setLocalStorage(dbClient)
}



// INTERAÇÃO COM LAYOUT


// VALIDAR CAMPOS REQUIRIDOS
const fieldsValid = () => {
    return document.getElementById('form').reportValidity()
}


// LIMPAR OS CAMPOS
const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = '')
}

// SALVAR CLIENTES
const saveClient = () => {
    if (fieldsValid()){
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value,
        }
        const index = document.getElementById('nome').dataset.index
        if (index == 'new'){

            createClient(client)
            updateTable()
            closeModal()
        } else {
            updateClient(index, client)
            updateTable()
            closeModal()
        }

    }
}

// CRIAR LINHA COM INFORMAÇÃO DO CADASTRO DO CLIENTE
const createRow = (client, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
    <td>${client.nome}</td>
    <td>${client.email}</td>
    <td>${client.celular}</td>
    <td>${client.cidade}</td>
    <td>
        <button type="button" class="button green" id="edit-${index}" >Editar</button>
        <button type="button" class="button red" 
        id="delete-${index}">Excluir</button>
    </td>
    `
    document.querySelector('#tbClient>tbody').appendChild(newRow)
}

// LIMPAR A TABELA PARA NÃO LISTAR OS CADASTROS DUPLICADAMENTE
const clearTable = () => {
    const rows = document.querySelectorAll('#tbClient>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

// ATUALIZAR A TABELA APÓS O CADASTRO DE NOVOS CLIENTES
const updateTable = () =>{
    const dbClient = readClient()
    clearTable()
    dbClient.forEach(createRow)
}

updateTable()

//PREENCHER OS CAMPOS DO CLIENTE
const fillFields = (client) =>{
    document.getElementById('nome').value = client.nome
    document.getElementById('email').value = client.email
    document.getElementById('celular').value = client.celular
    document.getElementById('cidade').value = client.cidade
    document.getElementById('nome').dataset.index = client.index
}

//EDITAR O CLIENTE JA CADASTRADO
const editClient = (index) => {
    const client = readClient()[index]
    client.index = index
    fillFields(client)
    openModal()
    }


// VERIFICAR SE CLICOU NO BOTAO EDIT OU DELETE
const editDelete = (event) => {
    if(event.target.type == 'button'){
        const [action, index] = event.target.id.split('-')
       

        if (action == 'edit'){
            editClient(index)
        }else{
            const client = readClient()[index]
            const response = confirm (`Deseja realmente excluir o cliente ${client.nome}?`)
            if (response) {
                deleteClient(index)
                updateTable()

            }
        }
        
    }
}

//EVENTS

document.getElementById('cadastrarCliente').addEventListener('click', openModal)

document.getElementById('modalClose').addEventListener('click', closeModal)

document.getElementById('salvar').addEventListener('click', saveClient)

document.getElementById('cancelar').addEventListener('click', closeModal)

document.querySelector('#tbClient>tbody').addEventListener('click', editDelete)