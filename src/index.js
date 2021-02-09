const { compileTemplate, compileScript, parse } = require("@vue/compiler-sfc");
const { SourceMapConsumer } = require("source-map");

module.exports = ({ content, filename }) => {
  const parsed = parse(content, { filename });
  const template = compileTemplate({
    source: content,
    id: filename,
    filename,
  });

  const script = compileScript(parsed.descriptor, { id: filename });
  const scriptMap = new SourceMapConsumer(script.map);
  const templateMap = new SourceMapConsumer(template.map);

  sourceMap.applySourceMap(scriptMap, filename); //does this work?
  sourceMap.applySourceMap(templateMap, filename); //does this work?

  const content = `${
    template.code
  } ${script.content.replace("export default", "const __sfc_main__ =")}\n__sfc_main__.render = render;\nexport default __sfc_main__;`;

  return { content };
};