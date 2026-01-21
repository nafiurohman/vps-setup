import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Download, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChecklistItem {
  id: string;
  label: string;
  description?: string;
}

interface InteractiveChecklistProps {
  title: string;
  items: ChecklistItem[];
  storageKey: string;
}

export const InteractiveChecklist: React.FC<InteractiveChecklistProps> = ({
  title,
  items,
  storageKey,
}) => {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setCheckedItems(new Set(JSON.parse(saved)));
    }
  }, [storageKey]);

  const toggleItem = (id: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
    localStorage.setItem(storageKey, JSON.stringify([...newChecked]));
  };

  const progress = (checkedItems.size / items.length) * 100;

  const exportChecklist = () => {
    const data = {
      storageKey,
      checkedItems: [...checkedItems],
      exportDate: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vps-checklist-${storageKey}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importChecklist = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          if (data.checkedItems) {
            setCheckedItems(new Set(data.checkedItems));
            localStorage.setItem(storageKey, JSON.stringify(data.checkedItems));
          }
        } catch (err) {
          console.error('Failed to import checklist');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="glass rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-mono font-semibold text-lg">{title}</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={exportChecklist}
            className="flex items-center gap-1 px-3 py-1.5 text-xs bg-muted hover:bg-muted/80 rounded transition-colors"
          >
            <Download size={12} />
            Export
          </button>
          <label className="flex items-center gap-1 px-3 py-1.5 text-xs bg-muted hover:bg-muted/80 rounded transition-colors cursor-pointer">
            <Upload size={12} />
            Import
            <input
              type="file"
              accept=".json"
              className="hidden"
              onChange={importChecklist}
            />
          </label>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-mono text-primary">
            {checkedItems.size}/{items.length}
          </span>
        </div>
        <div className="progress-bar h-2">
          <div 
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <label
            key={item.id}
            className={cn(
              "flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all",
              "hover:bg-muted/50",
              checkedItems.has(item.id) && "bg-primary/10 border border-primary/30"
            )}
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="mt-0.5 flex-shrink-0"
            >
              {checkedItems.has(item.id) ? (
                <CheckCircle2 size={20} className="text-primary" />
              ) : (
                <Circle size={20} className="text-muted-foreground" />
              )}
            </button>
            <div className="flex-1">
              <span className={cn(
                "text-sm font-medium transition-colors",
                checkedItems.has(item.id) && "text-primary"
              )}>
                {item.label}
              </span>
              {item.description && (
                <p className="text-xs text-muted-foreground mt-1">
                  {item.description}
                </p>
              )}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default InteractiveChecklist;
