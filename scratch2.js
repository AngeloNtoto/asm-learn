const fs = require('fs');

const content = fs.readFileSync('lib/content/exercises.ts', 'utf8');

const arrayStartIndex = content.indexOf('export const EXERCISES: Exercise[] = [');

if (arrayStartIndex === -1) {
  console.log("Could not find array start");
  process.exit(1);
}

function splitExercises() {
  const ts = require('typescript');
  const sourceFile = ts.createSourceFile(
    'exercises.ts',
    content,
    ts.ScriptTarget.Latest,
    true
  );

  let arrayNode = null;

  function visit(node) {
    if (ts.isVariableDeclaration(node) && node.name.text === 'EXERCISES') {
      arrayNode = node.initializer;
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  if (!arrayNode || !ts.isArrayLiteralExpression(arrayNode)) {
    console.log("Could not find EXERCISES array");
    return;
  }

  const elements = arrayNode.elements;
  console.log("Found " + elements.length + " exercises.");

  const groups = [
    { name: 'basics', start: 1, end: 5 },
    { name: 'intermediate', start: 6, end: 11 },
    { name: 'advanced', start: 12, end: 17 },
    { name: 'linux', start: 18, end: 22 },
    { name: 'demystification', start: 23, end: 27 },
  ];

  const groupElements = {
    basics: [],
    intermediate: [],
    advanced: [],
    linux: [],
    demystification: []
  };

  for (const el of elements) {
    let modNum = -1;
    // Look for 'id' or 'moduleId'
    for (const prop of el.properties) {
      if (ts.isPropertyAssignment(prop) && prop.name.text === 'moduleId') {
        const val = prop.initializer.text; // 'mod4'
        if (val) modNum = parseInt(val.replace('mod', ''));
        break;
      }
    }
    
    if (modNum === -1) {
        for (const prop of el.properties) {
          if (ts.isPropertyAssignment(prop) && prop.name.text === 'id') {
            const val = prop.initializer.text; // 'ex-mod4-1-2'
            if (val) {
                const match = val.match(/mod(\d+)/);
                if (match) modNum = parseInt(match[1]);
            }
            break;
          }
        }
    }
    
    let targetGroup = null;
    for (const group of groups) {
      if (modNum >= group.start && modNum <= group.end) {
        targetGroup = group.name;
        break;
      }
    }

    const elText = content.substring(el.pos, el.end);
    
    if (targetGroup) {
      groupElements[targetGroup].push(elText.trim());
    } else {
        console.log("Could not find group for modNum " + modNum);
        // default to basics
        groupElements['basics'].push(elText.trim());
    }
  }

  for (const group of groups) {
    if (groupElements[group.name].length > 0) {
      const fileContent = `import { Exercise, QuizData, FillBlankData, DragDropData, InteractiveLabData } from '../../types';\n\nexport const ${group.name}Exercises: Exercise[] = [\n  ${groupElements[group.name].join(',\n  ')}\n];\n`;
      fs.writeFileSync(`lib/content/exercises/${group.name}.ts`, fileContent);
      console.log(`Wrote lib/content/exercises/${group.name}.ts with ${groupElements[group.name].length} exercises.`);
    }
  }

  const newMainContent = `import { Exercise } from '../types';
import { basicsExercises } from './exercises/basics';
import { intermediateExercises } from './exercises/intermediate';
import { advancedExercises } from './exercises/advanced';
import { linuxExercises } from './exercises/linux';
import { demystificationExercises } from './exercises/demystification';

export const EXERCISES: Exercise[] = [
  ...basicsExercises,
  ...intermediateExercises,
  ...advancedExercises,
  ...linuxExercises,
  ...demystificationExercises
];
`;
  fs.writeFileSync('lib/content/exercises.ts', newMainContent);
  console.log("Rewrote lib/content/exercises.ts");
}

splitExercises();
