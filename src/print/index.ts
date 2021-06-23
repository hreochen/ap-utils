const defaultHtmlStyle =
  'body{margin:0;color:#333333;font-size:14px;font-family:"Microsoft YaHei",微软雅黑,"MicrosoftJhengHei",华文细黑,STHeiti,MingLiu}body *{-webkit-box-sizing:border-box;box-sizing:border-box}';

interface opts {
  html: string;
  style: string;
  type: string;
  sheetName: string;
}

let printFrame: any;

export default function print(opts: opts) {
  let content = createHtmlPage(opts);
  const blob = getExportBlobByContent(content, opts);
  if (!printFrame) {
    printFrame = createFrame();
    printFrame.onload = (evnt: any) => {
      if (evnt.target.src) {
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
    return new Blob([content], { type: `text/${opts.type}` });
  }
  return null;
}

function createHtmlPage(opts: opts) {
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
        printFrame.contentDocument.write("");
        printFrame.contentDocument.clear();
      } catch (e) {}
      printFrame.parentNode.removeChild(printFrame);
    }
    printFrame = null;
  }
}

function appendPrintFrame() {
  if (!printFrame.parentNode) {
    document.body.appendChild(printFrame);
  }
}