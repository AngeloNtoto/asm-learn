import { Registers, Flags } from '@/lib/emulator/types';

interface RegisterViewProps {
  registers: Registers;
  flags: Flags;
  previousRegisters: Registers | null;
}

export default function RegisterView({ registers, flags, previousRegisters }: RegisterViewProps) {
  const mainRegs: (keyof Registers)[] = ['rax', 'rbx', 'rcx', 'rdx', 'rsp', 'rip'];

  const hasChanged = (reg: keyof Registers) => {
    if (!previousRegisters) return false;
    return registers[reg] !== previousRegisters[reg];
  };

  return (
    <div className="bg-surface border border-default rounded-xl p-4">
      <h3 className="font-bold text-accent-cyan mb-4 uppercase text-xs tracking-wider border-b border-default pb-2">
        Registres
      </h3>
      <div className="grid grid-cols-2 gap-y-3 gap-x-4">
        {mainRegs.map(reg => (
          <div key={reg} className="flex justify-between items-center text-sm font-mono">
            <span className="text-text-muted">{reg.toUpperCase()}</span>
            <span className={`transition-colors duration-300 ${hasChanged(reg) ? 'text-accent-amber font-bold animate-pulse' : 'text-text-primary'}`}>
              0x{registers[reg].toString(16).toUpperCase().padStart(16, '0')}
              <span className="ml-2 text-[10px] text-text-muted">({registers[reg]})</span>
            </span>
          </div>
        ))}
      </div>

      <h3 className="font-bold text-accent-cyan mt-6 mb-4 uppercase text-xs tracking-wider border-b border-default pb-2">
        Flags (EFLAGS)
      </h3>
      <div className="flex justify-between text-sm font-mono">
        <div className="flex flex-col items-center">
          <span className="text-text-muted mb-1">ZF</span>
          <span className={flags.zf ? 'text-accent-green font-bold' : 'text-text-secondary'}>
            {flags.zf ? '1' : '0'}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-text-muted mb-1">SF</span>
          <span className={flags.sf ? 'text-accent-green font-bold' : 'text-text-secondary'}>
            {flags.sf ? '1' : '0'}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-text-muted mb-1">OF</span>
          <span className={flags.of ? 'text-accent-green font-bold' : 'text-text-secondary'}>
            {flags.of ? '1' : '0'}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-text-muted mb-1">CF</span>
          <span className={flags.cf ? 'text-accent-green font-bold' : 'text-text-secondary'}>
            {flags.cf ? '1' : '0'}
          </span>
        </div>
      </div>
    </div>
  );
}
