import React, { useState } from 'react';
import { Folder, FolderOpen, File, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TreeNode {
  name: string;
  type: 'file' | 'folder';
  children?: TreeNode[];
}

interface FileTreeProps {
  data: TreeNode[];
  title?: string;
}

const TreeItem: React.FC<{ node: TreeNode; depth: number }> = ({ node, depth }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    if (node.type === 'folder') {
      setIsOpen(!isOpen);
    }
  };

  const getFileIcon = (name: string) => {
    if (name.endsWith('.env')) return '🔐';
    if (name.endsWith('.sh')) return '📜';
    if (name.endsWith('.yml') || name.endsWith('.yaml')) return '📄';
    if (name.endsWith('.conf')) return '⚙️';
    if (name.endsWith('.log')) return '📝';
    return null;
  };

  return (
    <div>
      <button
        onClick={handleToggle}
        className={cn(
          "flex items-center gap-2 py-1 px-2 w-full text-left rounded hover:bg-muted/50 transition-colors group",
          "text-sm font-mono"
        )}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        {node.type === 'folder' ? (
          <>
            <ChevronRight 
              size={14} 
              className={cn(
                "text-muted-foreground transition-transform",
                isOpen && "rotate-90"
              )}
            />
            {isOpen ? (
              <FolderOpen size={16} className="text-secondary" />
            ) : (
              <Folder size={16} className="text-secondary" />
            )}
          </>
        ) : (
          <>
            <span className="w-3.5" />
            {getFileIcon(node.name) || <File size={16} className="text-muted-foreground" />}
          </>
        )}
        <span className={cn(
          node.type === 'folder' ? "text-secondary" : "text-foreground",
          "group-hover:text-primary transition-colors"
        )}>
          {node.name}
        </span>
      </button>
      
      {node.type === 'folder' && isOpen && node.children && (
        <div>
          {node.children.map((child, index) => (
            <TreeItem key={index} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export const FileTree: React.FC<FileTreeProps> = ({ data, title }) => {
  return (
    <div className="terminal my-4">
      <div className="terminal-header">
        <span className="terminal-dot terminal-dot-red" />
        <span className="terminal-dot terminal-dot-yellow" />
        <span className="terminal-dot terminal-dot-green" />
        <span className="ml-2 text-xs text-muted-foreground font-mono">
          {title || 'Directory Structure'}
        </span>
      </div>
      <div className="p-4">
        {data.map((node, index) => (
          <TreeItem key={index} node={node} depth={0} />
        ))}
      </div>
    </div>
  );
};

export default FileTree;
