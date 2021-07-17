/**
 * @jest-environment jsdom
 */

import { debounce } from "../src/utils/index";

jest.useFakeTimers();

describe("demo", () => {
  test("debounce", () => {
    let fn1 = jest.fn();
    const debounced = debounce(fn1, 10);
    debounced();
    debounced();
    jest.runAllTimers();
    expect(fn1).toHaveBeenCalledTimes(1);
  });
});
