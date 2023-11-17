import { IXmlNode } from "./interface";

export function objToXml(node: IXmlNode): string {
  const attributes = Object.keys(node.attributes)
    .map((key) => `${key}="${node.attributes[key]}"`)
    .join(" ");

  if (node.selfCloseTag) {
    return `<${node.startTag}${attributes ? " " + attributes : ""}/>`;
  }

  const childrenXml = node.children.map((child) => objToXml(child)).join("");
  return `<${node.startTag}${
    attributes ? " " + attributes : ""
  }>${childrenXml}</${node.nodeName}>`;
}
