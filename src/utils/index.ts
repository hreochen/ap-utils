/**
 *
 *执行一次的函数
 * @export
 * @param {(Function | null)} fn
 * @returns
 */
export function once(fn: Function | null) {
  return function (...args: any[]) {
    if (fn) {
      let ret = fn.apply(null, args);
      fn = null;
      return ret;
    }
  };
}
