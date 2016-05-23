
function getLocalStorage() {
  var ulElement = document.getElementById('ourlocations');
  var updatedLocations = (localStorage['locations']).split(',');

  if (updatedLocations.length > 5) {
    for (var i = 5; i < updatedLocations.length; i++) {
      var liElement = document.createElement('li');
      liElement.textContent = updatedLocations[i];
      ulElement.appendChild(liElement);
    }
  }
}

window.addEventListener('load', getLocalStorage, false);
