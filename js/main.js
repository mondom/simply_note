let ADD_NOTE_BTN
let SEARCH_NOTE_BTN
let RETURN_NOTE_BTN
let DELETE_NOTE_BTN
let NOTE
let NOTE_AREA

let POPUP
let POPUP_TITLE_TEXTAREA
let POPUP_CONTENT_TEXTAREA
let POPUP_ERROR
let POPUP_DONE_BTN
let POPUP_CANCEL_BTN
let TRASH_AREA
let NUMBER_OF_NOTE
let REMOVE_ALL_TRASH_BTN
let SHOW_TRASH_AREA_BTN
let FOOTER
let HEADER
let ID = 1

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}

const prepareDOMElements = () => {
	ADD_NOTE_BTN = document.querySelector('.heading__add-btn')
	SEARCH_NOTE_BTN = document.querySelector('.heading__search-btn')
	RETURN_NOTE_BTN = document.querySelector('.note__return-btn')
	DELETE_NOTE_BTN = document.querySelector('.note__delete-btn')
	NOTE = document.querySelector('.note-temp')
	POPUP = document.querySelector('.popup')
	POPUP_TITLE_TEXTAREA = document.querySelector('.popup-title')
	POPUP_CONTENT_TEXTAREA = document.querySelector('.popup-text')
	POPUP_ERROR = document.querySelector('.popup__error')
	POPUP_DONE_BTN = document.querySelector('.popup__done-btn')
	POPUP_CANCEL_BTN = document.querySelector('.popup__cancel-btn')
	TRASH_AREA = document.querySelector('.trash-area')
	NUMBER_OF_NOTE = document.querySelector('.footer__count-note')
	REMOVE_ALL_TRASH_BTN = document.querySelector('.footer__remove-trash')
	SHOW_TRASH_AREA_BTN = document.querySelector('.footer__show-trash')
	NOTE_AREA = document.querySelector('.note-area')
	FOOTER = document.querySelector('.footer')
	HEADER = document.querySelector('.heading')
}

const prepareDOMEvents = () => {
	ADD_NOTE_BTN.addEventListener('click', openPopup)
	POPUP_DONE_BTN.addEventListener('click', addNewNote)
	POPUP_CANCEL_BTN.addEventListener('click', closePopup)
	NOTE_AREA.addEventListener('click', editNote)
}

const openPopup = () => {
	POPUP.style.display = 'flex'
	NOTE_AREA.style.display = 'none'
	FOOTER.style.display = 'none'
	HEADER.style.display = 'none'
}

const closePopup = () => {
	POPUP.style.display = 'none'
	NOTE_AREA.style.display = 'flex'
	FOOTER.style.display = 'flex'
	HEADER.style.display = 'flex'
}

const addNewNote = () => {
	if (POPUP_TITLE_TEXTAREA.value == '' || POPUP_CONTENT_TEXTAREA.value == '') {
		POPUP_ERROR.style.visibility = 'visible'
	} else {
		POPUP_ERROR.style.visibility = 'hidden'
		createNewNote()
	}
}

const createNewNote = () => {
	const newNoteTemp = NOTE.content.cloneNode(true)
	const newNote = newNoteTemp.querySelector('.note')
	const noteTitle = newNoteTemp.querySelector('.note__title')
	const noteContent = newNoteTemp.querySelector('.note__body-content')
	const dateOfNote = newNoteTemp.querySelector('.note__date')
	newNote.setAttribute('id', `${ID}`)

	noteTitle.textContent = POPUP_TITLE_TEXTAREA.value
	noteContent.textContent = POPUP_CONTENT_TEXTAREA.value

	const currentDate = new Date()

	const day = currentDate.getDate()
	let month = currentDate.getMonth() + 1
	const year = currentDate.getFullYear()

	month = month < 10 ? '0' + month : month

	dateOfNote.textContent = `${day}.${month}.${year}`

	NOTE_AREA.appendChild(newNote)
	POPUP_TITLE_TEXTAREA.value = ''
	POPUP_CONTENT_TEXTAREA.value = ''
	ID++
	countNote(ID)
	closePopup()
}

const countNote = ID => {
	NUMBER_OF_NOTE.style.visibility = 'visible'
	if (ID === 1) {
		NUMBER_OF_NOTE.textContent = `${ID} note`
	} else {
		NUMBER_OF_NOTE.textContent = `${ID} notes`
	}
}

const editNote = e => {
	if (e.target.classList.contains('note__body') || e.target.classList.contains('note__body-content')) {
		POPUP.style.display = 'flex'
		NOTE_AREA.style.display = 'none'
		FOOTER.style.display = 'none'
		HEADER.style.display = 'none'

		const noteToEdit = e.target.parentElement.parentElement.id

		const editedNote = document.getElementById(noteToEdit)

		POPUP_TITLE_TEXTAREA.value = editedNote.querySelector('.note__title').textContent
		POPUP_CONTENT_TEXTAREA.value = editedNote.querySelector('.note__body-content').textContent
	}
}

document.addEventListener('DOMContentLoaded', main)
