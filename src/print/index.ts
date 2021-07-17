const defaultHtmlStyle =
  'body{margin:0;color:#333333;font-size:14px;font-family:"Microsoft YaHei",微软雅黑,"MicrosoftJhengHei",华文细黑,STHeiti,MingLiu}body *{-webkit-box-sizing:border-box;box-sizing:border-box}';

interface opts {
  html: string;
  style: string;
  type: "html";
  sheetName: string;
}

let printFrame: HTMLIFrameElement | null;

/**
 * 打印html
 * @param opts.html html字符串
 * @param opts.style 样式字符串
 * @param opts.type 类型默认html
 * @param opts.sheetName html标题
 */
export default function print(opts: opts) {
  let content = createHtmlPage(opts);
  const blob = getExportBlobByContent(content, opts);
  if (!printFrame) {
    printFrame = createFrame();
    printFrame.onload = (evnt: any) => {
      if (evnt.target.src) {
        evnt.target.contentWindow.onafterprint = afterPrintEvent;
        evnt.target.contentWindow.print();
      }
    };
  }
  appendPrintFrame();
  printFrame.src = URL.createObjectURL(blob);
}

function createFrame() {
  const frame = document.createElement("iframe");
  frame.className = "print-frame";
  return frame;
}

function getExportBlobByContent(content: string, opts: opts): Blob | null {
  if (window.Blob) {
    return new Blob([content], { type: `text/${opts.type || "html"}` });
  }
  return null;
}

export function createHtmlPage(opts: opts) {
  const { style } = opts;
  return [
    "<!DOCTYPE html><html>",
    "<head>",
    '<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,minimal-ui">',
    `<title>${opts.sheetName}</title>`,
    `<style>${defaultHtmlStyle}</style>`,
    style ? `<style>${style}</style>` : "",
    "</head>",
    `<body>${opts.html}</body>`,
    "</html>",
  ].join("");
}

function removePrintFrame() {
  if (printFrame) {
    if (printFrame.parentNode) {
      try {
        printFrame.contentDocument && printFrame.contentDocument.write("");
        printFrame.contentDocument && printFrame.contentDocument.clear();
      } catch (e) {}
      printFrame.parentNode.removeChild(printFrame);
    }
    printFrame = null;
  }
}

function afterPrintEvent() {
  removePrintFrame();
}

function appendPrintFrame() {
  if (printFrame && !printFrame.parentNode) {
    document.body.appendChild(printFrame);
  }
}
