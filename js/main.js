let ADD_NOTE_BTN
let SEARCH_NOTE_BTN
let RETURN_NOTE_BTN
let DELETE_NOTE_BTN
let NOTE_AREA
let NOTE_TITLE
let NOTE_CONTENT
let DATE_OF_NOTE
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
	NOTE_TITLE = document.querySelector('.note__title')
	NOTE_CONTENT = document.querySelector('.note__body-content')
	DATE_OF_NOTE = document.querySelector('.note__date')
	POPUP = document.querySelector('.popup')
	POPUP_TITLE_TEXTAREA = document.querySelector('.popup-title')
	POPUP_CONTENT_TEXTAREA = document.querySelector('.popup-text')
	POPUP_ERROR = document.querySelector('.popup__error')
	POPUP_DONE_BTN = document.querySelector('.popup__done-btn')
	POPUP_CANCEL_BTN = document.querySelector('.popup__cancel-btn')
	TRASH_AREA = document.querySelector('.trash-area')
	NUMBER_OF_NOTE = document.querySelector('.number-of-note')
	REMOVE_ALL_TRASH_BTN = document.querySelector('.footer__remove-trash')
	SHOW_TRASH_AREA_BTN = document.querySelector('.footer__show-trash')
	NOTE_AREA = document.querySelector('.note-area')
	FOOTER = document.querySelector('.footer')
	HEADER = document.querySelector('.heading')
}

const prepareDOMEvents = () => {
	ADD_NOTE_BTN.addEventListener('click', addNewNote)
}

const addNewNote = () => {
	POPUP.style.display = 'flex'
	NOTE_AREA.style.display = 'none'
	FOOTER.style.display = 'none'
	HEADER.style.display = 'none'
}

document.addEventListener('DOMContentLoaded', main)
