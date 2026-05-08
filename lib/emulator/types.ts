export type RegisterName = 'rax' | 'rbx' | 'rcx' | 'rdx' | 'rsp' | 'rip' | 'r8' | 'r9' | 'r10' | 'r11' | 'r12' | 'r13' | 'r14' | 'r15';

export interface Registers {
  rax: number;
  rbx: number;
  rcx: number;
  rdx: number;
  rsp: number; // Stack pointer
  rip: number; // Instruction pointer
  r8: number;
  r9: number;
  r10: number;
  r11: number;
  r12: number;
  r13: number;
  r14: number;
  r15: number;
}

export interface Flags {
  zf: boolean; // Zero flag
  sf: boolean; // Sign flag
  of: boolean; // Overflow flag
  cf: boolean; // Carry flag
}

export interface Instruction {
  mnemonic: string;
  op1: string | null;
  op2: string | null;
  originalLine: string;
  lineNumber: number;
}

export interface CpuState {
  registers: Registers;
  flags: Flags;
  memory: Record<number, number>; // Using a dictionary for sparse memory map (key: address, value: byte/word/etc)
  stack: number[]; // Simplified stack array for push/pop
  program: Instruction[];
  labels: Record<string, number>; // Label name -> instruction index
  halted: boolean;
  error: string | null;
  stdout: string[];
}
