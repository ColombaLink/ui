import { readFile } from 'fs/promises'
import ts from 'typescript'

const options = {
  allowJs: true,
  jsx: 'preserve',
}

export default (path: string) => {
  // Create a TypeScript compilation environment.
  // @ts-ignore
  const host = ts.createCompilerHost(options)

  // Parse and analyse our file, along with dependencies.
  // @ts-ignore
  const program = ts.createProgram([path], options, host)
  const sourceFile = program.getSourceFile(path)
  const checker = program.getTypeChecker()

  const detectedComponents = []
  for (const statement of sourceFile.statements) {
    if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        // 🚀 This is where the magic happens.
        const type = checker.getTypeAtLocation(declaration.name)

        // A type that has call signatures is a function type.
        for (const callSignature of type.getCallSignatures()) {
          const returnType = callSignature.getReturnType()
          if (returnType.symbol?.getEscapedName().toString() === 'Element') {
            // @ts-ignore
            detectedComponents.push(declaration.name.text)
          }
        }
      }
    }
  }

  console.log(detectedComponents)
  // ["Foo", "Bar"]
}
