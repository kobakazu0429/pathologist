import svgpath from "svgpath";

export default function applyTransforms(node, transforms) {
  if (node.properties.transform) {
    transforms = transforms.concat(node.properties.transform);
    delete node.properties.transform;
  }

  const transformString = transforms.join(" ");

  if (node.tagName === "path") {
    node.properties.d = svgpath(node.properties.d)
      .transform(transformString)
      .round(10)
      .toString();
  } else if (transformString) {
    node.properties.transform = transformString;
  }
}
