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
let ID = 0

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
	const newNote = NOTE.content.cloneNode(true)
	const noteTitle = newNote.querySelector('.note__title')
	const noteContent = newNote.querySelector('.note__body-content')
	const dateOfNote = newNote.querySelector('.note__date')

	noteTitle.textContent = POPUP_TITLE_TEXTAREA.value
	noteContent.textContent = POPUP_CONTENT_TEXTAREA.value

	const currentDate = new Date()

	const day = currentDate.getDate()
	let month = currentDate.getMonth() + 1
	const year = currentDate.getFullYear()

	month = month < 10 ? '0' + month : month

	dateOfNote.textContent = `${day}.${month}.${year}`

	NOTE_AREA.appendChild(newNote)
	ID++
	countNote(ID)
	closePopup()
}

const countNote = ID => {
	if (ID === 1) {
		NUMBER_OF_NOTE.textContent = `${ID} note`
	} else {
		NUMBER_OF_NOTE.textContent = `${ID} notes`
	}
}

document.addEventListener('DOMContentLoaded', main)
