import React, { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ 
  code, 
  language = 'bash', 
  title,
  showLineNumbers = false 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightSyntax = (line: string) => {
    // Simple syntax highlighting
    return line
      .replace(/(#.*$)/gm, '<span class="token-comment">$1</span>')
      .replace(/\b(sudo|apt|install|systemctl|nano|chmod|chown|mkdir|cd|cp|mv|rm|cat|echo|grep|find|curl|wget|ssh|git|docker|npm|node|php|mysql|nginx|ufw)\b/g, '<span class="token-keyword">$1</span>')
      .replace(/(".*?"|'.*?')/g, '<span class="token-string">$1</span>')
      .replace(/\b(\d+)\b/g, '<span class="token-number">$1</span>')
      .replace(/(\$\w+|\$\{.*?\})/g, '<span class="token-variable">$1</span>');
  };

  const lines = code.trim().split('\n');

  return (
    <div className="code-block my-4 group">
      <div className="code-block-header">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-primary" />
          <span className="text-xs font-mono text-muted-foreground">
            {title || language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 text-xs rounded bg-muted hover:bg-muted/80 transition-colors"
        >
          {copied ? (
            <>
              <Check size={12} className="text-primary" />
              <span className="text-primary">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="code-block-content">
        <pre className="text-sm leading-relaxed overflow-x-auto">
          {lines.map((line, index) => (
            <div key={index} className="flex">
              {showLineNumbers && (
                <span className="select-none text-muted-foreground mr-4 text-right w-8">
                  {index + 1}
                </span>
              )}
              <code 
                dangerouslySetInnerHTML={{ __html: highlightSyntax(line) || '&nbsp;' }}
                className="flex-1"
              />
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
