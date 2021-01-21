import { parse as parseSvg } from "svg-parser";
import walk from "./walk.js";
import stringify from "./stringify.js";

class Pathologist {
  constructor(source) {
    this.source = parseSvg(source).children[0];

    this.target = {
      tagName: this.source.tagName,
      properties: Object.assign({}, this.source.properties),
      children: [],
    };

    walk(this.source, this.target.children, [], {}, {});
  }

  toString() {
    return stringify(this.target, "");
  }
}

export function transform(source) {
  return new Pathologist(source).toString();
}

export function parse(source) {
  const pathologist = new Pathologist(source);

  return {
    paths: pathologist.target.children
      .filter((node) => node.tagName === "path")
      .map((node) => node.properties),
    toString() {
      return pathologist.toString();
    },
  };
}
