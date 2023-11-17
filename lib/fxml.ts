import { IXmlNode, INodeAttribute } from "./interface";

const tagRegExp = /(<\/?[^>]+>)/g;
const nodeNameExp = /<\/?([a-z][a-z0-9_]*)(?::([a-z][a-z0-9]*))?/i;
const startTagExp = /^<[a-z]/;
const selfCloseTagExp = /\/>$/;
const closeTagExp = /^<\//;
const attrRegExp = /\s[a-z0-9-_]+\b(\s*=\s*('|")[\s\S]*?\2)?/gi;
const splitAttrRegExp = /(\s[a-z0-9-_]+\b\s*)(?:=(\s*('|")[\s\S]*?\3))?/gi;
const attributeQuotesExp = /^('|")|('|")$/g;

function splitXml(text: string): Array<string> {
  return text
    .replace(tagRegExp, "\n$1")
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => line.replace(/\r/g, ""));
};


export function parseXml(text: string): Array<IXmlNode> {
  const lines = splitXml(text);
  let buffer: Array<IXmlNode> = [];
  let result: Array<IXmlNode> = [];

  lines.forEach((tag) => {
    const fullNodeName = tag.match(nodeNameExp)!;

    if (startTagExp.test(tag)) {
      const selfCloseTag = selfCloseTagExp.test(tag);
      let attributes: INodeAttribute = {};
      let attrStr = tag.match(attrRegExp) || [];

      if (attrStr.length > 0) {
        attrStr.forEach((attr) => {
          splitAttrRegExp.lastIndex = 0;
          let attrBuffer = splitAttrRegExp.exec(attr)!;
          attributes[attrBuffer[1].trim()] = (attrBuffer[2] || "")
            .trim()
            .replace(attributeQuotesExp, "");
        });
      }

      let node: IXmlNode = {
        nodeName: fullNodeName[1],
        attributes: attributes,
        startTag: tag,
        selfCloseTag: selfCloseTag,
        children: []
      };

      if (selfCloseTag === false) {
        buffer.push(node);
      } else {
        if (buffer.length > 0) {
          buffer[buffer.length - 1].children.push(node);
        } else {
          result.push(node);
        }
      }
    } else if (closeTagExp.test(tag)) {
      var lastItem = buffer.pop()!;
      if (buffer.length != 0) {
        // if buffer not empty, the popped node is a children of the
        // item in the buffer
        buffer[buffer.length - 1].children.push(lastItem);
      } else {
        result.push(lastItem);
      }
    }
  });

  return result.length != 0 ? result : [];
};


