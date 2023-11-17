export interface IXmlNode {
    nodeName: string;
    attributes: INodeAttribute;
    startTag: string;
    selfCloseTag: boolean;
    children: Array<IXmlNode>;
}
export interface INodeAttribute {
    [key: string]: number | string;
}
