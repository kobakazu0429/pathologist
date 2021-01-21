import convertToPath from "./convertToPath.js";
import applyProperties from "./applyProperties.js";
import applyClasses from "./applyClasses.js";
import applyTransforms from "./applyTransforms.js";
import { assign, cloneExcept } from "./utils/object.js";

const ignore = ["defs", "title"];
const noninheritable = ["id", "class", "style", "transform"];

export default function walk(node, paths, transforms, classes, properties) {
  if (node.tagName === "svg") {
    const _transforms = transforms.slice();
    node.children.forEach((child) => {
      walk(
        child,
        paths,
        _transforms,
        assign({}, classes),
        assign({}, properties)
      );
    });
  } else if (node.tagName === "g") {
    transforms = node.properties.transform
      ? transforms.concat(node.properties.transform)
      : transforms;

    if (node.properties.class) {
      node.properties.class
        .split(" ")
        .filter(Boolean)
        .forEach((className) => (classes[className] = true));
    }

    node.children.forEach((child) => {
      const _classes = assign({}, classes);

      const _properties = assign(
        cloneExcept(properties, noninheritable),
        cloneExcept(node.properties, noninheritable)
      );

      walk(child, paths, transforms, _classes, _properties);
    });
  } else if (~ignore.indexOf(node.tagName)) {
    applyProperties(node, properties);
    applyClasses(node, classes);
    applyTransforms(node, transforms);
    paths.push(node);
  } else {
    applyProperties(node, properties);
    applyClasses(node, classes);

    if (node.tagName !== "path") {
      node = convertToPath(node);
    }

    applyTransforms(node, transforms);
    paths.push(node);
  }
}
