import { assign } from "./utils/object.js";

export default function applyProperties(node, properties) {
  node.properties = assign(properties, node.properties);
}
