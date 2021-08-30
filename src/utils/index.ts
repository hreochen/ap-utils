/**
 *
 *执行一次的函数
 * @export
 * @param {(Function | null)} fn
 * @returns
 */
export function once(fn: Function | null) {
  return function (this:any,...args: any[]) {
    if (fn) {
      let ret = fn.apply(this, args);
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
  return function (this:any,...args: any[]) {
    if (!beforeCall || beforeCall.call(this, args) != false) {
      let ret = fn.apply(this, args);
      if (afterCall) return afterCall.call(this, ret);
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
  return function (this:any,...args: any[]) {
    if (debounceTimer) window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(() => {
      fn.apply(this, args);
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
  return function (this:any,...args: any[]) {
    if (!throttleTimer) {
      fn.apply(this, args);
      throttleTimer = window.setTimeout(() => {
        window.clearTimeout(throttleTimer);
      }, wait);
    }
  };
}
