import { describe, it, test, expect } from "@jest/globals";
import { IXmlNode, xmlToObj } from "../lib";

describe("parseXml function", () => {
  it("should parse a simple XML string with one node", () => {
    const xmlString = "<root>content</root>";
    const expectedOutput: Array<IXmlNode> = [
      {
        nodeName: "root",
        attributes: {},
        startTag: "<root>content",
        selfCloseTag: false,
        children: []
      }
    ];
    const result = xmlToObj(xmlString);
    expect(result).toEqual(expectedOutput);
  });

  it("should handle self-closing tags", () => {
    const xmlString = "<selfclosing />";
    const expectedOutput: Array<IXmlNode> = [
      {
        nodeName: "selfclosing",
        attributes: {},
        startTag: "<selfclosing />",
        selfCloseTag: true,
        children: []
      }
    ];
    const result = xmlToObj(xmlString);
    expect(result).toEqual(expectedOutput);
  });

  it("should parse XML with attributes", () => {
    const xmlString = '<person name="John" age="25" />';
    const expectedOutput: Array<IXmlNode> = [
      {
        nodeName: "person",
        attributes: { name: "John", age: "25" },
        startTag: '<person name="John" age="25" />',
        selfCloseTag: true,
        children: []
      }
    ];
    const result = xmlToObj(xmlString);
    expect(result).toEqual(expectedOutput);
  });

  it("should parse XML with nested elements", () => {
    const xmlString =
      "<root><child1>value1</child1><child2>value2</child2></root>";
    const expectedOutput: Array<IXmlNode> = [
      {
        nodeName: "root",
        attributes: {},
        startTag: "<root>",
        selfCloseTag: false,
        children: [
          {
            nodeName: "child1",
            attributes: {},
            startTag: "<child1>value1",
            selfCloseTag: false,
            children: []
          },
          {
            nodeName: "child2",
            attributes: {},
            startTag: "<child2>value2",
            selfCloseTag: false,
            children: []
          }
        ]
      }
    ];
    const result = xmlToObj(xmlString);
    expect(result).toEqual(expectedOutput);
  });
});
