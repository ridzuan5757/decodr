"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const lib_1 = require("../lib");
(0, globals_1.describe)('parseXml function', () => {
    (0, globals_1.it)('should parse a simple XML string with one node', () => {
        const xmlString = '<root>content</root>';
        const expectedOutput = [{
                nodeName: 'root',
                attributes: {},
                startTag: '<root>content',
                selfCloseTag: false,
                children: []
            }];
        const result = (0, lib_1.xmlToObj)(xmlString);
        (0, globals_1.expect)(result).toEqual(expectedOutput);
    });
    (0, globals_1.it)('should handle self-closing tags', () => {
        const xmlString = '<selfclosing />';
        const expectedOutput = [{
                nodeName: 'selfclosing',
                attributes: {},
                startTag: '<selfclosing />',
                selfCloseTag: true,
                children: []
            }];
        const result = (0, lib_1.xmlToObj)(xmlString);
        (0, globals_1.expect)(result).toEqual(expectedOutput);
    });
    (0, globals_1.it)('should parse XML with attributes', () => {
        const xmlString = '<person name="John" age="25" />';
        const expectedOutput = [{
                nodeName: 'person',
                attributes: { name: 'John', age: '25' },
                startTag: '<person name="John" age="25" />',
                selfCloseTag: true,
                children: []
            }];
        const result = (0, lib_1.xmlToObj)(xmlString);
        (0, globals_1.expect)(result).toEqual(expectedOutput);
    });
    (0, globals_1.it)('should parse XML with nested elements', () => {
        const xmlString = '<root><child1>value1</child1><child2>value2</child2></root>';
        const expectedOutput = [{
                nodeName: 'root',
                attributes: {},
                startTag: '<root>',
                selfCloseTag: false,
                children: [
                    {
                        nodeName: 'child1',
                        attributes: {},
                        startTag: '<child1>value1',
                        selfCloseTag: false,
                        children: []
                    }, {
                        nodeName: 'child2',
                        attributes: {},
                        startTag: '<child2>value2',
                        selfCloseTag: false,
                        children: []
                    }
                ]
            }];
        const result = (0, lib_1.xmlToObj)(xmlString);
        (0, globals_1.expect)(result).toEqual(expectedOutput);
    });
});
