interface StackViewProps {
  stack: number[];
}

export default function StackView({ stack }: StackViewProps) {
  return (
    <div className="bg-surface border border-default rounded-xl p-4 flex flex-col h-full">
      <h3 className="font-bold text-accent-cyan mb-4 uppercase text-xs tracking-wider border-b border-default pb-2">
        Mémoire / Pile (Stack)
      </h3>
      <div className="flex-1 overflow-y-auto custom-scrollbar font-mono text-sm space-y-2">
        {stack.length === 0 ? (
          <div className="text-text-muted italic text-center py-8">La pile est vide.</div>
        ) : (
          [...stack].reverse().map((val, index) => (
            <div key={index} className="flex justify-between items-center bg-primary border border-default p-2 rounded">
              <span className="text-text-muted text-xs">
                [RSP + {index * 8}]
              </span>
              <span className="text-accent-purple font-bold">
                {val}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
