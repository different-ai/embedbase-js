import ts from 'typescript';

function extractFunctions(filename: string): string[] {
  console.log(filename);
  const program = ts.createProgram([filename], {});
  const sourceFile = program.getSourceFile(filename);
  console.log(sourceFile);

  const collectedFunctions: string[] = [];

  function visit(node: ts.Node) {
    if (ts.isFunctionDeclaration(node)) {
      collectedFunctions.push(node.name.text);
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  return collectedFunctions;
}

export { extractFunctions as getChunksByJavascript };
