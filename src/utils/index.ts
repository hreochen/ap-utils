/**
 *
 *执行一次的函数
 * @export
 * @param {(Function | null)} fn
 * @returns
 */
export function once(fn: Function | null) {
  return function fn1(...args: any[]) {
    if (fn) {
      let ret = fn.apply(fn1, args);
      fn = null;
      return ret;
    }
  };
}

/**
 *
 *
 * @export
 * @param {Function} fn
 * @param {{ beforeCall?: Function; afterCall?: Function }} { beforeCall, afterCall }
 * @returns
 */
export function intercept(
  fn: Function,
  { beforeCall, afterCall }: { beforeCall?: Function; afterCall?: Function }
) {
  return function fn1(...args: any[]) {
    if (!beforeCall || beforeCall.call(fn1, args) != false) {
      let ret = fn.apply(fn1, args);
      if (afterCall) return afterCall.call(fn1, ret);
      return ret;
    }
  };
}

/**
 *
 *
 * @export
 * @param {Function} fn
 * @param {number} wait
 * @returns
 */
export function debounce(fn: Function, wait: number) {
  let debounceTimer: number;
  return function fn1(...args: any[]) {
    if (debounceTimer) window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(() => {
      fn.apply(fn1, args);
    }, wait);
  };
}

/**
 *
 *
 * @export
 * @param {Function} fn
 * @param {number} wait
 * @returns
 */
export function throttle(fn: Function, wait: number) {
  let throttleTimer: number;
  return function fn1(...args: any[]) {
    if (!throttleTimer) {
      fn.apply(fn1, args);
      throttleTimer = window.setTimeout(() => {
        window.clearTimeout(throttleTimer);
      }, wait);
    }
  };
}
