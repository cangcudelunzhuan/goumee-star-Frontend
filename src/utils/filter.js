let valueToText = (value, typeList) => {
  if (value !== undefined && typeList.length) {
    let result = typeList.filter(val => {
      return val.value === value
    })[0]
    // eslint-disable-next-line no-mixed-operators
    return result && result.text || ''
  } else {
    return value
  }
}
export { valueToText }
