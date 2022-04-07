const showField = (change) => {
  document.getElementById(`${change.target.id.split('_')[2]}-fields`).classList.toggle('hidden');
}

const addEventListeners = () => {
  let weekdays = document.getElementsByClassName('weekday')
  for(let i = 0; i < weekdays.length; i++) {
    weekdays[i].addEventListener('change', showField)
  }
}

$(document).ready(() => {
  addEventListeners()
})
