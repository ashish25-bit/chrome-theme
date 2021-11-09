import { $ } from '../modules/constants.js';
import addDraggableElement from '../dom/addDraggableElement.js';
import Storage from "../chrome/Storage.js";
import shiftElements from '../modules/shiftElements.js';

let dragStartInfo = {
  index: null,
  type: null
};

export function dragStart() {
  const parentLI = this.parentElement;
  parentLI.classList.add('drag-start')
  dragStartInfo.index = +this.closest('li').getAttribute('data-index');
  dragStartInfo.type = this.closest('li').getAttribute('data-type');
}

export function dragEnter() {
  this.classList.add('over');
}

export function dragLeave() {
  this.classList.remove('over');
}

export function dragOver(e) {
  e.preventDefault();
}

export async function dragDrop() {
  const dragEndInfo = {
    index: +this.getAttribute('data-index'),
    type: this.getAttribute('data-type')
  };
  this.classList.remove('over');
  reorder(dragStartInfo, dragEndInfo);
}

export function dragEnd() {
  const element = document.querySelector(`.d-${dragStartInfo.type} li[data-index="${dragStartInfo.index}"]`);
  element.removeAttribute('class');

  dragStartInfo.index = null;
  dragStartInfo.type = null;
}

async function reorder(startInfo, endInfo) {
  if (startInfo.type !== endInfo.type)
    return;

  if (startInfo.index === endInfo.index)
    return;

  const type = startInfo.type;
  const startIndex = startInfo.index;
  const endIndex = endInfo.index;

  let data = await Storage.get(type);

  if (!data)
    return;

  data = data[type];

  if (data[startIndex] === undefined || data[endIndex] === undefined)
    return;

  data = shiftElements(data, startIndex, endIndex);

  Storage.set(type, data);
  const parent = $(`.draggable-list.d-${type}`);
  parent.innerHTML = '';

  if (type === 'shortcuts')
    data = data.map((s) => s.name);

  addDraggableElement(data, parent, type);
}
