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
        createClient(client)
        
        closeModal()

    }
}

const createRow = (client) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
    <td>${client.nome}</td>
    <td>${client.email}</td>
    <td>${client.celular}</td>
    <td>${client.cidade}</td>
    <td>
        <button type="button" class="button green">editar</button>
        <button type="button" class="button red">excluir</button>
    </td>
    `
    document.querySelector('#tbClient>tbody').appendChild(newRow)
}

const updateTable = () =>{
    const dbClient = readClient()
    dbClient.forEach(createRow)
}

updateTable()



//EVENTS

document.getElementById('cadastrarCliente').addEventListener('click', openModal)

document.getElementById('modalClose').addEventListener('click', closeModal)

document.getElementById('salvar').addEventListener('click', saveClient)

document.getElementById('cancelar').addEventListener('click', closeModal)