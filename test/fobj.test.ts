import { describe, it, expect } from "@jest/globals";
import { IXmlNode, objToXml } from "../lib";

describe("objToXml function", () => {
  const exampleNode: IXmlNode = {
    nodeName: "root",
    attributes: {},
    startTag: "<root>",
    selfCloseTag: false,
    children: [
      {
        nodeName: "person",
        attributes: {},
        startTag: "<person>",
        selfCloseTag: false,
        children: [
          {
            nodeName: "name",
            attributes: {},
            startTag: "<name>",
            selfCloseTag: false,
            children: []
          },
          {
            nodeName: "age",
            attributes: { unit: "years" },
            startTag: "<age unit=\"years\">",
            selfCloseTag: false,
            children: []
          }
        ]
      }
    ]
  };

  it("should convert an IXmlNode to XML string", () => {
    const xmlString = objToXml(exampleNode);
    const expectedXmlString =
      '<root><person><name></name><age unit="years"></age></person></root>';
    expect(xmlString).toBe(expectedXmlString);
  });

  it("should handle self-closing tags", () => {
    const selfClosingNode: IXmlNode = {
      nodeName: "selfClosing",
      attributes: { key: "value" },
      startTag: "<selfClosing key=\"value\"/>",
      selfCloseTag: true,
      children: []
    };

    const xmlString = objToXml(selfClosingNode);
    const expectedXmlString = '<selfClosing key="value"/>';
    expect(xmlString).toBe(expectedXmlString);
  });

  it("should handle nested self-closing tags", () => {
    const nestedSelfClosingNode: IXmlNode = {
      nodeName: "nestedSelfClosing",
      attributes: {},
      startTag: "<nestedSelfClosing>",
      selfCloseTag: false,
      children: [
        {
          nodeName: "selfClosing",
          attributes: { key: "value" },
          startTag: "<selfClosing key=\"value\"/>",
          selfCloseTag: true,
          children: []
        }
      ]
    };

    const xmlString = objToXml(nestedSelfClosingNode);
    const expectedXmlString =
      '<nestedSelfClosing><selfClosing key="value"/></nestedSelfClosing>';
    expect(xmlString).toBe(expectedXmlString);
  });
});
