'use strict'

const openModal = () => document.getElementById('modal').classList.add('active')

const closeModal = () =>
  document.getElementById('modal').classList.remove('active')

const tempClient = {
  nome: 'Romário',
  email: 'romario@gmail.com',
  celular: '219578665823',
  cidade: 'Rio de Janeiro'
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

const fieldsValid = () => {
    return document.getElementById('form').reportValidity()
}


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




//EVENTS

document.getElementById('cadastrarCliente').addEventListener('click', openModal)

document.getElementById('modalClose').addEventListener('click', closeModal)

document.getElementById('salvar').addEventListener('click', saveClient)

document.getElementById('cancelar').addEventListener('click', closeModal)