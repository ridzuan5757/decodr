# Decodr

### Simple XML - Typescript/Javascript Object parser
Convert any XML string to Object type in form of:

```typescript
interface IXmlNode {
  nodeName: string;
  attributes: INodeAttribute;
  startTag: string;
  selfCloseTag: boolean;
  children: Array<IXmlNode>;
}

interface INodeAttribute {
  [key: string]: number | string;
}
```

### Installation

```bash
npm install decodr
```

### Usage

```typescript
import { xmlToObj, xmlToObj } from "decodr";
```

#### XML to Object


```
xmlToObj("<root>content</root>");

// Output:
[{
    nodeName: "root",
    attributes: {},
    startTag: "<root>content",
    selfCloseTag: false,
    children: []
}];
```
<br/><br/>
```    
xmlToObj("<test />");

// Output:
[{
    nodeName: "test",
    attributes: {},
    startTag: "<test />",
    selfCloseTag: true,
    children: []
}];
```
</br></br>

```
xmlToObj('<person name="John" age="25" />');

// Output
[{
    nodeName: "person",
    attributes: { name: "John", age: "25" },
    startTag: '<person name="John" age="25" />',
    selfCloseTag: true,
    children: []
}]

```
</br></br>

```
xmlToObj("
    <root>
        <child1>value1</child1>
        <child2>value2</child2>
    </root>
");

// Output
[{
    nodeName: "root",
    attributes: {},
    startTag: "<root>",
    selfCloseTag: false,
    children: [{
        nodeName: "child1",
        attributes: {},
        startTag: "<child1>value1",
        selfCloseTag: false,
        children: []
    },{
        nodeName: "child2",
        attributes: {},
        startTag: "<child2>value2",
        selfCloseTag: false,
        children: []
    }]
}]
```
</br></br>

#### Object to XML
```
objToXml([{
    nodeName: "root",
    attributes: {},
    startTag: "root",
    selfCloseTag: false,
    children: [{
        nodeName: "person",
        attributes: {},
        startTag: "person",
        selfCloseTag: false,
        children: [{
            nodeName: "name",
            attributes: {},
            startTag: "name",
            selfCloseTag: false,
            children: []
          },{
            nodeName: "age",
            attributes: { unit: "years" },
            startTag: "age",
            selfCloseTag: false,
            children: []
          }
        ]
    }]
}]);

// Output
<root>
    <person>
        <name>
        </name>
        <age unit='years'>
        </age>
    </person>
</root>

```
</br></br>
```
objToXml([{
    nodeName: "selfClosing",
    attributes: { key: "value" },
    startTag: "selfClosing",
    selfCloseTag: true,
    children: []
}]);

// Output
<selfClosing key='value'/>
```
</br></br>
```
objToXml([{
    nodeName: "nestedSelfClosing",
    attributes: {},
    startTag: "nestedSelfClosing",
    selfCloseTag: false,
    children: [{
        nodeName: "selfClosing",
        attributes: { key: "value" },
        startTag: "selfClosing",
        selfCloseTag: true,
        children: []
    }]
}])

// Output
<nestedSelfClosing>
    <selfClosing key='value'/>
</nestedSelfClosing>
```

