import { cloneExcept } from "./utils/object.js";

function line(points) {
  let path = "";
  let prefix = "M";

  for (let i = 0; i < points.length; i += 2) {
    path += `${prefix}${points[i]},${points[i + 1]}`;
    prefix = " ";
  }

  return path;
}

const converters = {
  ellipse: (properties) => {
    const cx = properties.cx || 0;
    const cy = properties.cy || 0;
    const rx = properties.rx || 0;
    const ry = properties.ry || 0;

    const path = cloneExcept(properties, ["cx", "cy", "rx", "ry"]);
    path.d = `M${cx - rx},${cy}a${rx},${ry} 0 1,0 ${
      rx * 2
    },0a${rx},${ry} 0 1,0 ${rx * -2},0`;

    return path;
  },

  circle: (properties) => {
    const cx = properties.cx || 0;
    const cy = properties.cy || 0;
    const r = properties.r || 0;

    const path = cloneExcept(properties, ["cx", "cy", "r"]);
    path.d = `M${cx - r},${cy}a${r},${r} 0 1,0 ${r * 2},0a${r},${r} 0 1,0 ${
      r * -2
    },0`;

    return path;
  },

  polygon: (properties) => {
    const path = converters.polyline(properties);
    path.d += "Z";

    return path;
  },

  polyline: (properties) => {
    const path = cloneExcept(properties, "points");
    path.d = line(properties.points.trim().split(/[\s,]+/));

    return path;
  },

  rect: (properties) => {
    const x = +properties.x || 0;
    const y = +properties.y || 0;
    const width = +properties.width || 0;
    const height = +properties.height || 0;
    // const rx = +properties.rx || 0; // TODO handle...
    // const ry = +properties.ry || 0; // TODO handle...

    const path = cloneExcept(properties, [
      "x",
      "y",
      "width",
      "height",
      "rx",
      "ry",
    ]);

    // TODO handle rx and ry
    path.d = `m${x},${y} ${width},0 0,${height} ${-width},0Z`;

    return path;
  },

  line: (properties) => {
    const path = cloneExcept(properties, ["x1", "y1", "x2", "y2"]);
    path.d = line([
      properties.x1 || 0,
      properties.y1 || 0,
      properties.x2 || 0,
      properties.y2 || 0,
    ]);

    return path;
  },

  // TODO others...
};

export default function convert(node) {
  const converter = converters[node.tagName];
  if (converter) {
    const properties = converter(node.properties);

    return {
      tagName: "path",
      properties,
    };
  }

  throw new Error(`TODO <${node.tagName}>`);
}
