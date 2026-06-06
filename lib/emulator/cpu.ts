import { CpuState, RegisterName, Registers } from './types';
import { parseAsm } from './parser';

const INITIAL_RSP = 0x7FFFFFFFF000; // Simulated high memory address for stack

export function createInitialState(): CpuState {
  return {
    registers: {
      rax: 0, rbx: 0, rcx: 0, rdx: 0,
      rsp: INITIAL_RSP, rip: 0,
      r8: 0, r9: 0, r10: 0, r11: 0, r12: 0, r13: 0, r14: 0, r15: 0
    },
    flags: {
      zf: false, sf: false, of: false, cf: false
    },
    memory: {},
    stack: [],
    program: [],
    labels: {},
    halted: false,
    error: null,
    stdout: []
  };
}

export function loadProgram(code: string): CpuState {
  const state = createInitialState();
  const { program, labels, error } = parseAsm(code);
  state.program = program;
  state.labels = labels;
  state.error = error;
  return state;
}

// Helpers
function isRegister(op: string): boolean {
  const regNames = ['rax', 'eax', 'ax', 'al', 'rbx', 'ebx', 'bx', 'bl', 'rcx', 'ecx', 'cx', 'cl', 'rdx', 'edx', 'dx', 'dl', 'rsp', 'rip'];
  // Simplified: treat 32/16/8 bit variants as mapping to the 64 bit reg for our educational scope
  return regNames.includes(op.toLowerCase());
}

function getBaseRegister(op: string): keyof Registers {
  const opLower = op.toLowerCase();
  if (['rax', 'eax', 'ax', 'al'].includes(opLower)) return 'rax';
  if (['rbx', 'ebx', 'bx', 'bl'].includes(opLower)) return 'rbx';
  if (['rcx', 'ecx', 'cx', 'cl'].includes(opLower)) return 'rcx';
  if (['rdx', 'edx', 'dx', 'dl'].includes(opLower)) return 'rdx';
  if (opLower === 'rsp') return 'rsp';
  if (opLower === 'rip') return 'rip';
  return opLower as keyof Registers;
}

function getValue(state: CpuState, op: string): number {
  if (isRegister(op)) {
    return state.registers[getBaseRegister(op)];
  }
  
  // Is it a memory dereference? e.g. [rax]
  if (op.startsWith('[') && op.endsWith(']')) {
    const inner = op.slice(1, -1).trim();
    // Super simplified addressing: just a register name or an exact numeric address
    const addr = getValue(state, inner);
    return state.memory[addr] || 0;
  }

  // Otherwise treat as immediate number
  const parsed = parseInt(op, 10); // Could handle hex with 0x
  if (isNaN(parsed)) {
    throw new Error(`Invalid operand: ${op}`);
  }
  return parsed;
}

function setValue(state: CpuState, dest: string, value: number) {
  if (isRegister(dest)) {
    state.registers[getBaseRegister(dest)] = value;
  } else if (dest.startsWith('[') && dest.endsWith(']')) {
    const inner = dest.slice(1, -1).trim();
    const addr = getValue(state, inner);
    state.memory[addr] = value;
  } else {
    throw new Error(`Invalid destination: ${dest}`);
  }
}

function updateFlags(state: CpuState, result: number) {
  state.flags.zf = result === 0;
  state.flags.sf = result < 0;
}

export function step(state: CpuState): CpuState {
  if (state.halted || state.error) return state;
  if (state.registers.rip >= state.program.length) {
    state.halted = true;
    return state;
  }

  // Clone state for immutability
  const newState = {
    ...state,
    registers: { ...state.registers },
    flags: { ...state.flags },
    stack: [...state.stack],
    memory: { ...state.memory },
    stdout: [...state.stdout]
  };

  const inst = newState.program[newState.registers.rip];
  let jumped = false;

  try {
    switch (inst.mnemonic) {
      case 'mov':
        setValue(newState, inst.op1!, getValue(newState, inst.op2!));
        break;
      
      case 'add': {
        const val1 = getValue(newState, inst.op1!);
        const val2 = getValue(newState, inst.op2!);
        const res = val1 + val2;
        setValue(newState, inst.op1!, res);
        updateFlags(newState, res);
        break;
      }

      case 'sub': {
        const val1 = getValue(newState, inst.op1!);
        const val2 = getValue(newState, inst.op2!);
        const res = val1 - val2;
        setValue(newState, inst.op1!, res);
        updateFlags(newState, res);
        break;
      }

      case 'inc': {
        const val = getValue(newState, inst.op1!);
        const res = val + 1;
        setValue(newState, inst.op1!, res);
        updateFlags(newState, res);
        break;
      }

      case 'dec': {
        const val = getValue(newState, inst.op1!);
        const res = val - 1;
        setValue(newState, inst.op1!, res);
        updateFlags(newState, res);
        break;
      }

      case 'cmp': {
        const val1 = getValue(newState, inst.op1!);
        const val2 = getValue(newState, inst.op2!);
        const res = val1 - val2;
        updateFlags(newState, res);
        break;
      }

      case 'jmp': {
        const target = inst.op1!;
        if (newState.labels[target] !== undefined) {
          newState.registers.rip = newState.labels[target];
          jumped = true;
        } else {
          throw new Error(`Label not found: ${target}`);
        }
        break;
      }

      case 'je':
      case 'jz': {
        if (newState.flags.zf) {
          const target = inst.op1!;
          if (newState.labels[target] !== undefined) {
            newState.registers.rip = newState.labels[target];
            jumped = true;
          } else {
            throw new Error(`Label not found: ${target}`);
          }
        }
        break;
      }

      case 'jne':
      case 'jnz': {
        if (!newState.flags.zf) {
          const target = inst.op1!;
          if (newState.labels[target] !== undefined) {
            newState.registers.rip = newState.labels[target];
            jumped = true;
          } else {
            throw new Error(`Label not found: ${target}`);
          }
        }
        break;
      }

      case 'push': {
        const val = getValue(newState, inst.op1!);
        newState.stack.push(val);
        newState.registers.rsp -= 8;
        break;
      }

      case 'pop': {
        if (newState.stack.length === 0) {
          throw new Error("Stack underflow");
        }
        const val = newState.stack.pop()!;
        setValue(newState, inst.op1!, val);
        newState.registers.rsp += 8;
        break;
      }

      case 'xor': {
        const val1 = getValue(newState, inst.op1!);
        const val2 = getValue(newState, inst.op2!);
        const res = val1 ^ val2;
        setValue(newState, inst.op1!, res);
        updateFlags(newState, res);
        break;
      }

      case 'and': {
        const val1 = getValue(newState, inst.op1!);
        const val2 = getValue(newState, inst.op2!);
        const res = val1 & val2;
        setValue(newState, inst.op1!, res);
        updateFlags(newState, res);
        break;
      }

      case 'or': {
        const val1 = getValue(newState, inst.op1!);
        const val2 = getValue(newState, inst.op2!);
        const res = val1 | val2;
        setValue(newState, inst.op1!, res);
        updateFlags(newState, res);
        break;
      }

      case 'not': {
        const val = getValue(newState, inst.op1!);
        const res = ~val;
        setValue(newState, inst.op1!, res);
        updateFlags(newState, res);
        break;
      }

      case 'shl': {
        const val = getValue(newState, inst.op1!);
        const shift = getValue(newState, inst.op2!);
        const res = val << shift;
        setValue(newState, inst.op1!, res);
        updateFlags(newState, res);
        break;
      }

      case 'shr': {
        const val = getValue(newState, inst.op1!);
        const shift = getValue(newState, inst.op2!);
        const res = val >> shift;
        setValue(newState, inst.op1!, res);
        updateFlags(newState, res);
        break;
      }

      case 'mul':
      case 'imul': {
        const val1 = getValue(newState, inst.op1!);
        const val2 = inst.op2 ? getValue(newState, inst.op2) : newState.registers.rax; // Simplified: usually mul multiplies rax by op1
        const res = val1 * val2;
        // In reality mul puts result in rdx:rax. For simplicity, we just put it in the target (or rax if no op2)
        if (inst.op2) {
          setValue(newState, inst.op1!, res);
        } else {
          newState.registers.rax = res;
        }
        updateFlags(newState, res);
        break;
      }

      case 'test': {
        const val1 = getValue(newState, inst.op1!);
        const val2 = getValue(newState, inst.op2!);
        const res = val1 & val2;
        updateFlags(newState, res); // Discards result, just updates flags like cmp
        break;
      }

      case 'lea': {
        // LEA doesn't dereference memory, it just computes the address
        // Since our getValue for memory [rbx] actually dereferences, we need to handle lea manually here
        // For simplicity, we'll just evaluate the string expression if it's simple
        // E.g. lea rax, [rbx+10]. Our current parse handles immediate and registers, but not complex expressions.
        // As a minimal fallback for the emulator context:
        if (inst.op2?.startsWith('[')) {
           // Hacky way to get the base address without deref
           const inner = inst.op2.slice(1, -1);
           const addr = isNaN(Number(inner)) ? newState.registers[inner as keyof typeof newState.registers] : Number(inner);
           setValue(newState, inst.op1!, addr);
        } else {
           setValue(newState, inst.op1!, getValue(newState, inst.op2!));
        }
        break;
      }

      case 'jg': {
        if (!newState.flags.zf && newState.flags.sf === false) { // Simplification of SF == OF
          const target = inst.op1!;
          if (newState.labels[target] !== undefined) {
            newState.registers.rip = newState.labels[target];
            jumped = true;
          } else {
            throw new Error(`Label not found: ${target}`);
          }
        }
        break;
      }

      case 'jl': {
        if (newState.flags.sf !== false) { // Simplification of SF != OF
          const target = inst.op1!;
          if (newState.labels[target] !== undefined) {
            newState.registers.rip = newState.labels[target];
            jumped = true;
          } else {
            throw new Error(`Label not found: ${target}`);
          }
        }
        break;
      }

      case 'nop':
        break;

      case 'call': {
        const target = inst.op1!;
        if (newState.labels[target] !== undefined) {
          newState.stack.push(newState.registers.rip + 1);
          newState.registers.rsp -= 8;
          newState.registers.rip = newState.labels[target];
          jumped = true;
        } else {
          throw new Error(`Label not found: ${target}`);
        }
        break;
      }

      case 'ret': {
        if (newState.stack.length === 0) {
          newState.halted = true;
        } else {
          const retAddr = newState.stack.pop()!;
          newState.registers.rsp += 8;
          newState.registers.rip = retAddr;
          jumped = true;
        }
        break;
      }

      // Custom instruction for educational output
      case 'print': {
        const val = getValue(newState, inst.op1!);
        newState.stdout.push(`> ${val}`);
        break;
      }

      default:
        throw new Error(`Unknown instruction: ${inst.mnemonic}`);
    }

    if (!jumped) {
      newState.registers.rip++;
    }

    if (newState.registers.rip >= newState.program.length) {
      newState.halted = true;
    }

  } catch (err: any) {
    newState.error = `Ligne ${inst.lineNumber}: ${err.message}`;
    newState.halted = true;
  }

  return newState;
}

export function runAll(state: CpuState, maxSteps = 1000): CpuState {
  let currState = state;
  let steps = 0;
  while (!currState.halted && !currState.error && steps < maxSteps) {
    currState = step(currState);
    steps++;
  }
  if (steps >= maxSteps && !currState.halted) {
    currState = { ...currState, error: "Infinite loop detected (max steps reached)" };
  }
  return currState;
}
