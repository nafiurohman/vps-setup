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
        className="w-full px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between hover:bg-muted/30 transition-colors btn-touch"
      >
        <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
          {stepNumber && (
            <span className="badge-step flex-shrink-0">{stepNumber}</span>
          )}
          <div className="text-left min-w-0 flex-1">
            <h3 className="font-mono font-semibold text-base sm:text-lg flex items-center gap-2 break-words">
              <span className="break-words">{title}</span>
              {isCompleted && (
                <CheckCircle2 size={16} className="text-primary flex-shrink-0 sm:size-4" />
              )}
            </h3>
            <div className="flex items-center gap-2 sm:gap-3 mt-1 flex-wrap">
              {estimatedTime && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock size={10} className="sm:size-3" />
                  <span className="text-xs">{estimatedTime}</span>
                </span>
              )}
              {difficulty && (
                <span className={cn(
                  "text-xs px-1.5 sm:px-2 py-0.5 rounded-full whitespace-nowrap",
                  difficultyClass[difficulty]
                )}>
                  {difficulty}
                </span>
              )}
            </div>
          </div>
        </div>
        <ChevronDown 
          size={18} 
          className={cn(
            "text-muted-foreground transition-transform duration-300 flex-shrink-0 sm:size-5",
            isOpen && "rotate-180"
          )}
        />
      </button>
      
      <div className={cn(
        "overflow-hidden transition-all duration-300",
        isOpen ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="px-3 sm:px-6 pb-4 sm:pb-6 pt-2 border-t border-border">
          {children}
          
          {onComplete && (
            <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-border">
              <label className="flex items-center gap-3 cursor-pointer group btn-touch">
                <div 
                  className={cn(
                    "checkbox-custom",
                    isCompleted && "checked"
                  )}
                  onClick={() => onComplete(!isCompleted)}
                >
                  {isCompleted && <CheckCircle2 size={12} className="text-background sm:size-3" />}
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
