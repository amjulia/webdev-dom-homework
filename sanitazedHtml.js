export function sanitazedHtml(htmlString)  {
    return htmlString.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  }