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

### Usage

```typescript
import { xmlToObj, xmlToObj } from "decodr";
```

### Example

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
```typescript    
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
</br></br>

```

```
