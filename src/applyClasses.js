import { assign } from "./utils/object.js";

export default function applyClasses(node, classes) {
  if (node.properties.class) {
    classes = assign({}, classes);

    node.properties.class
      .split(" ")
      .filter(Boolean)
      .forEach((className) => (classes[className] = true));
  }

  const classList = Object.keys(classes).join(" ");

  if (classList) {
    node.properties.class = classList;
  }
}
