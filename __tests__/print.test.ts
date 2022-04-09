import { createHtmlPage } from "../src/print/index";

describe("test print", () => {
  test("createHtmlPage", () => {
    let a = createHtmlPage({
      html: "<div>1</div>",
      style: "",
      sheetName: "1",
      type: "html",
    });
    expect(a).toMatchSnapshot();
  });
});
