import { IXmlNode } from "./interface";

/**
  * Convert {@link IXmlNode} object to XML string.
  *
  * @param node {@link IXmlNode} object.
  * @returns {string} XML string.
  */
export function objToXml(node: IXmlNode): string {

  if (node.selfCloseTag) {
    return node.startTag;
  }

  const childrenXml = node.children.map((child) => objToXml(child)).join("");
  return `${node.startTag}${childrenXml}</${node.nodeName}>`;
}
