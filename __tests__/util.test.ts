/**
 * @jest-environment jsdom
 */

import { debounce, once } from "../src/utils/index";

jest.useFakeTimers();

describe("test utils", () => {
  test("debounce", () => {
    let fn1 = jest.fn();
    const debounced = debounce(fn1, 10);
    debounced();
    debounced();
    jest.runAllTimers();
    expect(fn1).toHaveBeenCalledTimes(1);
  });
  test("once", () => {
    let fn2 = jest.fn();
    const onced = once(fn2);
    onced(10);
    onced(20);
    expect(fn2.mock.calls.length).toBe(1);
  });
});
