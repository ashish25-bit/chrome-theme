import getElement from "../modules/getElement.js";
import {
  dragDrop,
  dragEnter,
  dragLeave,
  dragOver,
  dragStart,
} from "../modules/drag.js";

export default async function addDraggableElement(data, container, type) {
  data.forEach((value, index) => {
    const li = getElement({
      type: "li",
      attrs: [
        { key: "data-index", value: index },
        { key: "data-type", value: type },
      ],
    });
    const div = getElement({
      classes: ["draggable"],
      attrs: [{ key: "draggable", value: true }],
    });

    div.innerText = value;

    // adding event listeners
    // li
    addListener(li, "dragover", dragOver);
    addListener(li, "drop", dragDrop);
    addListener(li, "dragenter", dragEnter);
    addListener(li, "dragleave", dragLeave);
    // div
    addListener(div, "dragstart", dragStart);

    li.appendChild(div);
    container.appendChild(li);
  });
}

function addListener(element, type, callback) {
  element.addEventListener(type, callback);
}
