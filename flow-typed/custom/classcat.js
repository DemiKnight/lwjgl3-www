declare module 'classcat' {
  declare type ClassSet = {
    [key: string]: boolean | { [key: string]: boolean },
  };

  declare export default (classes: Array<string | void | ClassSet> | ClassSet) => string
}
