// 任意对象
interface AnyObj {
  [key: string]: any;
  [key: number]: any;
}

// 任意函数
interface AnyFunction {
  (...args: any[]): any;
}
