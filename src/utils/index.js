export const chunkArray = (myArray, chunkSize) => {
  const arrayLength = myArray.length
  const tempArray = []

  for (let index = 0; index < arrayLength; index += chunkSize) {
    tempArray.push(myArray.slice(index, index + chunkSize))
  }

  return tempArray
}
