let ADD_NOTE_BTN
let SEARCH_NOTE_BTN
let SEARCH_POPUP
let SEARCH_INPUT
let SEARCH_TRASH_INPUT
let CLOSE_SEARCH_POPUP_BTN
let BACK_TO_NOTE_BTN
let NOTE
let NOTE_AREA
let POPUP_EDIT_DONE_BTN
let POPUP
let POPUP_TITLE_TEXTAREA
let POPUP_CONTENT_TEXTAREA
let POPUP_ERROR
let POPUP_DONE_BTN
let POPUP_CANCEL_BTN
let EDITED_NOTE
let TRASH_AREA
let NUMBER_OF_NOTE
let REMOVE_ALL_TRASH_BTN
let SHOW_TRASH_AREA_BTN
let FOOTER
let COUNT_TRASH_CIRCLE
let HEADER
let ID = 1
let NOTE_ARR = []
let TRASH_ARR = []

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}

const prepareDOMElements = () => {
	ADD_NOTE_BTN = document.querySelector('.heading__add-btn')
	SEARCH_NOTE_BTN = document.querySelector('.heading__search-btn')
	NOTE = document.querySelector('.note-temp')
	POPUP = document.querySelector('.popup')
	POPUP_TITLE_TEXTAREA = document.querySelector('.popup-title')
	POPUP_CONTENT_TEXTAREA = document.querySelector('.popup-text')
	POPUP_ERROR = document.querySelector('.popup__error')
	POPUP_DONE_BTN = document.querySelector('.popup__done-btn')
	POPUP_EDIT_DONE_BTN = document.querySelector('.popup__edit-done-btn')
	POPUP_CANCEL_BTN = document.querySelector('.popup__cancel-btn')
	TRASH_AREA = document.querySelector('.trash-area')
	NUMBER_OF_NOTE = document.querySelector('.footer__count-note')
	REMOVE_ALL_TRASH_BTN = document.querySelector('.footer__remove-trash')
	SHOW_TRASH_AREA_BTN = document.querySelector('.footer__show-trash')
	NOTE_AREA = document.querySelector('.note-area')
	FOOTER = document.querySelector('.footer')
	HEADER = document.querySelector('.heading')
	BACK_TO_NOTE_BTN = document.querySelector('.heading__back-btn')
	COUNT_TRASH_CIRCLE = document.querySelector('.circle')
	SEARCH_POPUP = document.querySelector('.search-popup')
	SEARCH_INPUT = document.querySelector('.search-note')
	SEARCH_TRASH_INPUT = document.querySelector('.search-trash-note')
	CLOSE_SEARCH_POPUP_BTN = document.querySelector('.fa-xmark-popup')
}

const prepareDOMEvents = () => {
	ADD_NOTE_BTN.addEventListener('click', openPopup)
	POPUP_DONE_BTN.addEventListener('click', addNewNote)
	POPUP_EDIT_DONE_BTN.addEventListener('click', changeNote)
	POPUP_CANCEL_BTN.addEventListener('click', closePopup)
	NOTE_AREA.addEventListener('click', editNote)
	SHOW_TRASH_AREA_BTN.addEventListener('click', openTrash)
	BACK_TO_NOTE_BTN.addEventListener('click', backToNotes)
	SEARCH_NOTE_BTN.addEventListener('click', activeSearchPopup)
	CLOSE_SEARCH_POPUP_BTN.addEventListener('click', closeSearchPopup)
	SEARCH_INPUT.addEventListener('keyup', noteSearch)
	SEARCH_TRASH_INPUT.addEventListener('keyup', trashNoteSearch)
	REMOVE_ALL_TRASH_BTN.addEventListener('click', deleteAllNotes)
}
const activeSearchPopup = () => {
	SEARCH_POPUP.classList.add('active')

	if (SEARCH_POPUP.classList.contains('active')) {
		NOTE_AREA.style.paddingTop = '6em'
		TRASH_AREA.style.paddingTop = '6em'
	}
}
const closeSearchPopup = () => {
	SEARCH_INPUT.value = ''
	SEARCH_TRASH_INPUT.value = ''
	SEARCH_POPUP.classList.remove('active')
	if (!SEARCH_POPUP.classList.contains('active')) {
		NOTE_AREA.style.paddingTop = '0'
		TRASH_AREA.style.paddingTop = '0'
		NOTE_ARR.forEach(el => {
			el.style.display = 'inline-block'
		})
	}
}

const noteSearch = e => {
	const userText = e.target.value.toLowerCase()

	NOTE_ARR.forEach(el => {
		const noteId = el.getAttribute('id')
		const firstGrandchild = el.children[0].children[0].textContent.toLowerCase()
		const secondGrandchild = el.children[1].children[0].textContent.toLowerCase()

		if (firstGrandchild.includes(userText) || secondGrandchild.includes(userText)) {
			const noteToDisplay = document.getElementById(noteId)
			noteToDisplay.style.display = 'inline-block'
		} else {
			el.style.display = 'none'
		}
	})
}
const trashNoteSearch = e => {
	const userText = e.target.value.toLowerCase()

	TRASH_ARR.forEach(el => {
		const noteId = el.getAttribute('id')
		console.log(noteId)
		const firstGrandchild = el.children[0].children[0].textContent.toLowerCase()
		const secondGrandchild = el.children[1].children[0].textContent.toLowerCase()

		if (firstGrandchild.includes(userText) || secondGrandchild.includes(userText)) {
			const noteToDisplay = document.getElementById(noteId)
			noteToDisplay.style.display = 'inline-block'
		} else {
			el.style.display = 'none'
		}
	})
}

const activePopup = () => {
	POPUP.style.display = 'flex'
	NOTE_AREA.style.display = 'none'
	FOOTER.style.display = 'none'
	HEADER.style.display = 'none'
}

const openPopup = () => {
	activePopup()
	POPUP_EDIT_DONE_BTN.style.display = 'none'
	POPUP_DONE_BTN.style.display = 'flex'
	POPUP_TITLE_TEXTAREA.value = ''
	POPUP_CONTENT_TEXTAREA.value = ''
	closeSearchPopup()
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

	const returnNoteBtn = newNoteTemp.querySelector('.note__return-btn')
	returnNoteBtn.style.display = 'none'
	returnNoteBtn.setAttribute('onclick', `restoreNote(${ID})`)

	const deleteNoteBtn = newNoteTemp.querySelector('.note__delete-btn')
	deleteNoteBtn.setAttribute('onclick', `moveToTrash(${ID}); countNote();`)

	const permDeleteNoteBtn = newNoteTemp.querySelector('.note__delete-btn-perm')
	permDeleteNoteBtn.style.display = 'none'
	permDeleteNoteBtn.setAttribute('onclick', `deleteNote(${ID})`)

	noteTitle.textContent = POPUP_TITLE_TEXTAREA.value
	noteContent.textContent = POPUP_CONTENT_TEXTAREA.value

	const currentDate = new Date()

	const day = currentDate.getDate()
	let month = currentDate.getMonth() + 1
	const year = currentDate.getFullYear()

	month = month < 10 ? '0' + month : month

	dateOfNote.textContent = `${day}.${month}.${year}`

	NOTE_AREA.appendChild(newNote)
	NOTE_ARR.push(newNote)

	countNote()
	ID++
	closePopup()
}

const countNote = () => {
	NUMBER_OF_NOTE.style.visibility = 'visible'
	let amountNotes = NOTE_ARR.length

	if (NOTE_ARR.length === 1) {
		NUMBER_OF_NOTE.textContent = `${amountNotes} note`
	} else if (NOTE_ARR.length === 0) {
		NUMBER_OF_NOTE.style.visibility = 'hidden'
	} else {
		NUMBER_OF_NOTE.textContent = `${amountNotes} notes`
	}
}
const countTrash = () => {
	COUNT_TRASH_CIRCLE.style.visibility = 'visible'
	let amountTrash = TRASH_ARR.length
	const countTrash = document.querySelector('.count-trash')
	if (amountTrash > 0) {
		countTrash.textContent = amountTrash
	} else {
		COUNT_TRASH_CIRCLE.style.visibility = 'hidden'
	}
}

const editNote = e => {
	if (e.target.classList.contains('note__body') || e.target.classList.contains('note__body-content')) {
		POPUP_EDIT_DONE_BTN.style.display = 'flex'
		POPUP_DONE_BTN.style.display = 'none'
		activePopup()

		const noteToEdit = e.target.parentElement.parentElement.id

		EDITED_NOTE = document.getElementById(noteToEdit)

		POPUP_TITLE_TEXTAREA.value = EDITED_NOTE.querySelector('.note__title').textContent
		POPUP_CONTENT_TEXTAREA.value = EDITED_NOTE.querySelector('.note__body-content').textContent
	}
}

const changeNote = () => {
	if (POPUP_TITLE_TEXTAREA.value == '' || POPUP_CONTENT_TEXTAREA.value == '') {
		POPUP_ERROR.style.visibility = 'visible'
	} else {
		EDITED_NOTE.querySelector('.note__title').textContent = POPUP_TITLE_TEXTAREA.value
		EDITED_NOTE.querySelector('.note__body-content').textContent = POPUP_CONTENT_TEXTAREA.value
		POPUP_ERROR.style.visibility = 'hidden'
		closePopup()
	}
}

const openTrash = () => {
	SEARCH_TRASH_INPUT.style.display = 'block'
	SEARCH_INPUT.style.display = 'none'
	NOTE_AREA.style.display = 'none'
	TRASH_AREA.style.display = 'flex'
	BACK_TO_NOTE_BTN.style.display = 'inline-block'
	ADD_NOTE_BTN.style.display = 'none'
	NUMBER_OF_NOTE.style.visibility = 'hidden'
	REMOVE_ALL_TRASH_BTN.style.display = 'block'
	SHOW_TRASH_AREA_BTN.style.display = 'none'
	closeSearchPopup()
}

const backToNotes = () => {
	SEARCH_TRASH_INPUT.style.display = 'none'
	SEARCH_INPUT.style.display = 'block'
	NOTE_AREA.style.display = 'flex'
	TRASH_AREA.style.display = 'none'
	BACK_TO_NOTE_BTN.style.display = 'none'
	ADD_NOTE_BTN.style.display = 'inline-block'
	SEARCH_NOTE_BTN.style.display = 'inline-block'
	REMOVE_ALL_TRASH_BTN.style.display = 'none'
	SHOW_TRASH_AREA_BTN.style.display = 'block'
	NUMBER_OF_NOTE.style.visibility = 'visible'
	closeSearchPopup()
	countNote()
}

const moveToTrash = id => {
	const noteToMove = document.getElementById(id)
	NOTE_AREA.removeChild(noteToMove)
	countNote(ID)
	NOTE_ARR.splice(noteToMove, 1)
	TRASH_ARR.push(noteToMove)
	TRASH_AREA.appendChild(noteToMove)
	const returnNoteBtn = noteToMove.querySelector('.note__return-btn')
	returnNoteBtn.style.display = 'inline-block'
	countTrash()
	const permDeleteBtn = noteToMove.querySelector('.note__delete-btn-perm')
	permDeleteBtn.style.display = 'inline-block'
	const deleteNoteBtn = noteToMove.querySelector('.note__delete-btn')
	deleteNoteBtn.style.display = 'none'
}

const restoreNote = id => {
	const noteToRestore = document.getElementById(id)
	console.log(noteToRestore)
	TRASH_AREA.removeChild(noteToRestore)
	NOTE_AREA.appendChild(noteToRestore)
	NOTE_ARR.push(noteToRestore)
	TRASH_ARR.splice(noteToRestore, 1)
	const returnNoteBtn = noteToRestore.querySelector('.note__return-btn')
	returnNoteBtn.style.display = 'none'
	countTrash()
	countNote(ID)
	NUMBER_OF_NOTE.style.visibility = 'hidden'
	const permDeleteBtn = noteToRestore.querySelector('.note__delete-btn-perm')
	permDeleteBtn.style.display = 'none'
	const deleteNoteBtn = noteToRestore.querySelector('.note__delete-btn')
	deleteNoteBtn.style.display = 'inline-block'
}

const deleteNote = id => {
	const noteToDelete = document.getElementById(id)
	TRASH_AREA.removeChild(noteToDelete)
	TRASH_ARR.splice(noteToDelete, 1)
	countTrash()
}

const deleteAllNotes = () => {
	TRASH_AREA.textContent = ''
	TRASH_ARR = []
	countTrash()
}

document.addEventListener('DOMContentLoaded', main)
