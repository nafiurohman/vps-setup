import React, { useState } from 'react';
import { Check, X, Info, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TableColumn {
  id: string;
  title: string;
  icon?: React.ReactNode;
  highlight?: boolean;
}

interface TableRow {
  feature: string;
  values: Record<string, string | boolean | React.ReactNode>;
  tooltip?: string;
}

interface ComparisonTableProps {
  columns: TableColumn[];
  rows: TableRow[];
  title?: string;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  columns,
  rows,
  title,
}) => {
  const [hoveredColumn, setHoveredColumn] = useState<string | null>(null);

  return (
    <div className="glass rounded-lg overflow-hidden">
      {title && (
        <div className="px-6 py-4 border-b border-border">
          <h3 className="font-mono font-semibold text-lg">{title}</h3>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                Feature
              </th>
              {columns.map((col) => (
                <th
                  key={col.id}
                  className={cn(
                    "px-6 py-4 text-center text-sm font-medium transition-colors",
                    hoveredColumn === col.id && "bg-primary/10",
                    col.highlight && "bg-primary/5 text-primary"
                  )}
                  onMouseEnter={() => setHoveredColumn(col.id)}
                  onMouseLeave={() => setHoveredColumn(null)}
                >
                  <div className="flex flex-col items-center gap-1">
                    {col.icon}
                    <span>{col.title}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr 
                key={index}
                className="border-b border-border/50 hover:bg-muted/30 transition-colors"
              >
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-2">
                    {row.feature}
                    {row.tooltip && (
                      <div className="group relative">
                        <Info size={14} className="text-muted-foreground cursor-help" />
                        <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block z-10">
                          <div className="bg-popover text-popover-foreground text-xs p-2 rounded shadow-lg max-w-xs">
                            {row.tooltip}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
                {columns.map((col) => (
                  <td
                    key={col.id}
                    className={cn(
                      "px-6 py-4 text-center text-sm transition-colors",
                      hoveredColumn === col.id && "bg-primary/10",
                      col.highlight && "bg-primary/5"
                    )}
                    onMouseEnter={() => setHoveredColumn(col.id)}
                    onMouseLeave={() => setHoveredColumn(null)}
                  >
                    {typeof row.values[col.id] === 'boolean' ? (
                      row.values[col.id] ? (
                        <Check size={18} className="mx-auto text-primary" />
                      ) : (
                        <X size={18} className="mx-auto text-destructive/60" />
                      )
                    ) : (
                      row.values[col.id]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonTable;
