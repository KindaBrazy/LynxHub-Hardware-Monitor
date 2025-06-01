import React from 'react';

export default function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-x-3">
      <div className="flex items-center gap-x-2 px-2 py-1 rounded-md bg-slate-700/50 border border-slate-600/30">
        <Icon className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-xs font-semibold text-slate-300 uppercase tracking-wide">{title}</span>
      </div>
      <div className="flex items-center gap-x-2">{children}</div>
    </div>
  );
}
