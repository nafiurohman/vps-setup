import React, { useState } from 'react';
import { ChevronDown, Clock, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CollapsibleSectionProps {
  title: string;
  stepNumber?: number;
  estimatedTime?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  children: React.ReactNode;
  defaultOpen?: boolean;
  onComplete?: (completed: boolean) => void;
  isCompleted?: boolean;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  stepNumber,
  estimatedTime,
  difficulty,
  children,
  defaultOpen = false,
  onComplete,
  isCompleted = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const difficultyClass = {
    Beginner: 'difficulty-beginner',
    Intermediate: 'difficulty-intermediate',
    Advanced: 'difficulty-advanced',
  };

  return (
    <div className={cn(
      "glass rounded-lg overflow-hidden transition-all duration-300",
      isCompleted && "border-primary/50"
    )}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-4">
          {stepNumber && (
            <span className="badge-step">{stepNumber}</span>
          )}
          <div className="text-left">
            <h3 className="font-mono font-semibold text-lg flex items-center gap-2">
              {title}
              {isCompleted && (
                <CheckCircle2 size={18} className="text-primary" />
              )}
            </h3>
            <div className="flex items-center gap-3 mt-1">
              {estimatedTime && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock size={12} />
                  {estimatedTime}
                </span>
              )}
              {difficulty && (
                <span className={cn(
                  "text-xs px-2 py-0.5 rounded-full",
                  difficultyClass[difficulty]
                )}>
                  {difficulty}
                </span>
              )}
            </div>
          </div>
        </div>
        <ChevronDown 
          size={20} 
          className={cn(
            "text-muted-foreground transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        />
      </button>
      
      <div className={cn(
        "overflow-hidden transition-all duration-300",
        isOpen ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="px-6 pb-6 pt-2 border-t border-border">
          {children}
          
          {onComplete && (
            <div className="mt-6 pt-4 border-t border-border">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div 
                  className={cn(
                    "checkbox-custom",
                    isCompleted && "checked"
                  )}
                  onClick={() => onComplete(!isCompleted)}
                >
                  {isCompleted && <CheckCircle2 size={14} className="text-background" />}
                </div>
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  Mark as completed
                </span>
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollapsibleSection;
