String.prototype.format = function() {
  let str = this;
  let numberOfReplacements = str.match(/%s/g);

  if (!numberOfReplacements)
    return str;

  numberOfReplacements = numberOfReplacements.length;

  let index = 0;
  while (numberOfReplacements-- && index < arguments.length) {
    str = str.replace('%s', arguments[index]);
    index++;
  }
  return str;
}
