function stringifyProperties(properties) {
  return Object.keys(properties)
    .map((key) => ` ${key}="${properties[key]}"`)
    .join("");
}

export default function stringify(node, indent) {
  if (typeof node === "string") return node;
  // if (node.tagName === undefined) return "";

  const properties = stringifyProperties(node.properties);
  let str = `${indent}<${node.tagName}${properties}`;

  if (node.children && node.children.length) {
    str += ">";
    let prefix = "\n";

    for (let child of node.children) {
      if (typeof child === "string") {
        str += child;
        prefix = "";
      } else if (child.type === "text") {
        str += child.value;
        prefix = "";
      } else {
        str += prefix + stringify(child, indent + "\t");
        prefix = "\n";
      }
    }

    if (prefix) prefix += indent;

    str += `${prefix}</${node.tagName}>`;
  } else if (node.value) {
    str += `>${node.value}</${node.tagName}>`;
  } else {
    str += "/>";
  }

  return str;
}
