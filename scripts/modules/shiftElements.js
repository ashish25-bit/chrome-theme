export default function shiftElements(data, startIndex, endIndex) {
  if (startIndex < endIndex) {
    const startElem = data[startIndex];
    for (let i = startIndex + 1; i <= endIndex; i++)
      data[i-1] = data[i];
    data[endIndex] = startElem;
  }

  else if (startIndex > endIndex) {
    const startElem = data[startIndex];
    for (let i = startIndex - 1; i >= endIndex; i--)
      data[i+1] = data[i];
    data[endIndex] = startElem;
  }

  return data;
}
