function removeFromArray(array, index) {
  array.splice(index, 1);
}

function removeItemFromArray(array, item, fail = true) {
  const index = array.indexOf(item);
  if (index === -1 && fail) {
    throw `${item} not found`
  }
  else if (index >= 0) {
    removeFromArray(array, index);
  }

  return index;
}

function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
}

function clearLog() {
  logSheet.clear();
  logRow = 1;
}

function log(message) {
  // logSheet.getRange('A' + logRow++).setValue(message);
  console.info(message);
}

module.exports = {
  removeFromArray,
  removeItemFromArray,
  shuffle,
  clearLog,
  log
}