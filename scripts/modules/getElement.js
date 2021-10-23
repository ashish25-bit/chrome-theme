export default function getElement({ type = 'div', attrs = [], classes = [] }) {
  const element = document.createElement(type);

  for (const { key, value } of attrs) {
    element.setAttribute(key, value);
  }

  for (const cls of classes)
    element.classList.add(cls);

  return element;
}
