import { IXmlNode } from "./interface";

export function xmlToObj(node: IXmlNode): string {
  const attributes = Object.keys(node.attributes)
    .map(key => `${key}="${node.attributes[key]}"`)
    .join(' ');

  if (node.selfCloseTag) {
    return `<${node.startTag}${attributes ? ' ' + attributes : ''}/>`;
  }

  const childrenXml = node.children.map(child => xmlToObj(child)).join('');
  return `<${node.startTag}${attributes ? ' ' + attributes : ''}>${childrenXml}</${node.nodeName}>`;
}
