const fs = require('fs');

const content = fs.readFileSync('lib/content/modules.ts', 'utf8');

// Find the start of the array
const arrayStartIndex = content.indexOf('export const MODULES: Module[] = [');

if (arrayStartIndex === -1) {
  console.log("Could not find array start");
  process.exit(1);
}

// We will just use the typescript compiler API to parse it, but we can also just do brace matching.
function splitModules() {
  const ts = require('typescript');
  const sourceFile = ts.createSourceFile(
    'modules.ts',
    content,
    ts.ScriptTarget.Latest,
    true
  );

  let modulesArrayNode = null;

  function visit(node) {
    if (ts.isVariableDeclaration(node) && node.name.text === 'MODULES') {
      modulesArrayNode = node.initializer;
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  if (!modulesArrayNode || !ts.isArrayLiteralExpression(modulesArrayNode)) {
    console.log("Could not find MODULES array");
    return;
  }

  const elements = modulesArrayNode.elements;
  const numElements = elements.length;
  console.log("Found " + numElements + " modules.");

  // Group modules
  // 1-5: basics
  // 6-11: intermediate
  // 12-17: advanced
  // 18-22: linux
  // 23-27: demystification

  const groups = [
    { name: 'basics', start: 1, end: 5 },
    { name: 'intermediate', start: 6, end: 11 },
    { name: 'advanced', start: 12, end: 17 },
    { name: 'linux', start: 18, end: 22 },
    { name: 'demystification', start: 23, end: 27 },
  ];

  for (const group of groups) {
    const groupElements = [];
    for (const el of elements) {
      // get 'id' property
      let id = '';
      for (const prop of el.properties) {
        if (ts.isPropertyAssignment(prop) && prop.name.text === 'id') {
          id = prop.initializer.text;
          break;
        }
      }
      
      const modNum = parseInt(id.replace('mod', ''));
      if (modNum >= group.start && modNum <= group.end) {
        // extract string from source
        const elText = content.substring(el.pos, el.end);
        groupElements.push(elText.trim());
      }
    }

    if (groupElements.length > 0) {
      const fileContent = `import { Module } from '../../types';\n\nexport const ${group.name}Modules: Module[] = [\n  ${groupElements.join(',\n  ')}\n];\n`;
      fs.writeFileSync(`lib/content/modules/${group.name}.ts`, fileContent);
      console.log(`Wrote lib/content/modules/${group.name}.ts with ${groupElements.length} modules.`);
    }
  }

  // Rewrite main file
  const newMainContent = `import { Module } from '../types';
import { basicsModules } from './modules/basics';
import { intermediateModules } from './modules/intermediate';
import { advancedModules } from './modules/advanced';
import { linuxModules } from './modules/linux';
import { demystificationModules } from './modules/demystification';

export const MODULES: Module[] = [
  ...basicsModules,
  ...intermediateModules,
  ...advancedModules,
  ...linuxModules,
  ...demystificationModules
];
`;
  fs.writeFileSync('lib/content/modules.ts', newMainContent);
  console.log("Rewrote lib/content/modules.ts");
}

try {
  splitModules();
} catch (e) {
  if (e.code === 'MODULE_NOT_FOUND') {
    console.log("Installing typescript locally to run script...");
  } else {
    console.error(e);
  }
}
