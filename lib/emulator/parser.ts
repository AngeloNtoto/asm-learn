import { Instruction } from './types';

export function parseAsm(code: string): { program: Instruction[], labels: Record<string, number>, error: string | null } {
  const lines = code.split('\n');
  const program: Instruction[] = [];
  const labels: Record<string, number> = {};
  
  let instructionIndex = 0;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    // Remove comments
    const commentIdx = line.indexOf(';');
    if (commentIdx !== -1) {
      line = line.substring(0, commentIdx);
    }
    
    line = line.trim();
    if (!line) continue;

    // Check for label
    if (line.endsWith(':')) {
      const labelName = line.slice(0, -1).trim();
      labels[labelName] = instructionIndex;
      continue;
    }

    // It's an instruction
    // e.g. "mov eax, 5" or "inc rcx" or "ret"
    // Split by first space
    const firstSpaceIdx = line.search(/\s/);
    
    let mnemonic = line;
    let operandsStr = '';

    if (firstSpaceIdx !== -1) {
      mnemonic = line.substring(0, firstSpaceIdx).toLowerCase();
      operandsStr = line.substring(firstSpaceIdx).trim();
    } else {
      mnemonic = line.toLowerCase();
    }

    let op1: string | null = null;
    let op2: string | null = null;

    if (operandsStr) {
      // Split by comma for op1 and op2
      // This is basic and doesn't handle commas inside brackets perfectly if there were complex addressing,
      // but for [rax + rbx*4] it's fine as long as there is no comma.
      const commaIdx = operandsStr.indexOf(',');
      if (commaIdx !== -1) {
        op1 = operandsStr.substring(0, commaIdx).trim();
        op2 = operandsStr.substring(commaIdx + 1).trim();
      } else {
        op1 = operandsStr.trim();
      }
    }

    program.push({
      mnemonic,
      op1,
      op2,
      originalLine: lines[i],
      lineNumber: i + 1
    });

    instructionIndex++;
  }

  return { program, labels, error: null };
}
