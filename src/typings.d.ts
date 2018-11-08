/* SystemJS module definition */
/*
Interfaces are used to define the shape of an object.
Interfaces are purely for declaration they cannot include any implementation.
*/
declare var module: NodeModule;
interface NodeModule {
  id: string;
}
declare module "*.json" {
  const value: any;
  export default value;
}
