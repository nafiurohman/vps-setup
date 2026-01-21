import React, { useState, useMemo } from 'react';
import { Cpu, HardDrive, Wifi, Server } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StackOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  baseSpecs: {
    cpu: number;
    ram: number;
    storage: number;
    bandwidth: number;
  };
}

const stacks: StackOption[] = [
  {
    id: 'laravel',
    name: 'Laravel / PHP',
    icon: <Server size={20} />,
    baseSpecs: { cpu: 1, ram: 1, storage: 20, bandwidth: 1 },
  },
  {
    id: 'nodejs',
    name: 'Node.js / Express',
    icon: <Server size={20} />,
    baseSpecs: { cpu: 1, ram: 2, storage: 20, bandwidth: 1 },
  },
  {
    id: 'django',
    name: 'Django / Python',
    icon: <Server size={20} />,
    baseSpecs: { cpu: 1, ram: 1, storage: 20, bandwidth: 1 },
  },
  {
    id: 'docker',
    name: 'Docker Multi-app',
    icon: <Server size={20} />,
    baseSpecs: { cpu: 2, ram: 4, storage: 40, bandwidth: 2 },
  },
  {
    id: 'database',
    name: 'Database Only',
    icon: <HardDrive size={20} />,
    baseSpecs: { cpu: 2, ram: 4, storage: 40, bandwidth: 1 },
  },
];

const trafficMultipliers = {
  low: { cpu: 1, ram: 1, storage: 1, bandwidth: 1, label: 'Low (< 1k users/day)' },
  medium: { cpu: 1.5, ram: 2, storage: 1.5, bandwidth: 2, label: 'Medium (1k-10k users/day)' },
  high: { cpu: 2, ram: 3, storage: 2, bandwidth: 4, label: 'High (10k+ users/day)' },
};

export const ResourceCalculator: React.FC = () => {
  const [selectedStack, setSelectedStack] = useState<string>('laravel');
  const [trafficLevel, setTrafficLevel] = useState<keyof typeof trafficMultipliers>('low');

  const recommendations = useMemo(() => {
    const stack = stacks.find(s => s.id === selectedStack);
    if (!stack) return null;

    const multiplier = trafficMultipliers[trafficLevel];
    
    return {
      minimal: {
        cpu: stack.baseSpecs.cpu,
        ram: stack.baseSpecs.ram,
        storage: stack.baseSpecs.storage,
        bandwidth: stack.baseSpecs.bandwidth,
      },
      ideal: {
        cpu: Math.ceil(stack.baseSpecs.cpu * multiplier.cpu),
        ram: Math.ceil(stack.baseSpecs.ram * multiplier.ram),
        storage: Math.ceil(stack.baseSpecs.storage * multiplier.storage),
        bandwidth: Math.ceil(stack.baseSpecs.bandwidth * multiplier.bandwidth),
      },
      production: {
        cpu: Math.ceil(stack.baseSpecs.cpu * multiplier.cpu * 2),
        ram: Math.ceil(stack.baseSpecs.ram * multiplier.ram * 2),
        storage: Math.ceil(stack.baseSpecs.storage * multiplier.storage * 2),
        bandwidth: Math.ceil(stack.baseSpecs.bandwidth * multiplier.bandwidth * 2),
      },
    };
  }, [selectedStack, trafficLevel]);

  const copySpecs = () => {
    if (!recommendations) return;
    const text = `VPS Recommendation for ${stacks.find(s => s.id === selectedStack)?.name}:
Traffic: ${trafficMultipliers[trafficLevel].label}

Minimal: ${recommendations.minimal.cpu} CPU, ${recommendations.minimal.ram}GB RAM, ${recommendations.minimal.storage}GB SSD, ${recommendations.minimal.bandwidth}TB BW
Ideal: ${recommendations.ideal.cpu} CPU, ${recommendations.ideal.ram}GB RAM, ${recommendations.ideal.storage}GB SSD, ${recommendations.ideal.bandwidth}TB BW
Production: ${recommendations.production.cpu} CPU, ${recommendations.production.ram}GB RAM, ${recommendations.production.storage}GB SSD, ${recommendations.production.bandwidth}TB BW`;
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="glass rounded-lg p-6 space-y-6">
      <h3 className="font-mono font-semibold text-lg flex items-center gap-2">
        <Cpu className="text-primary" size={20} />
        Resource Calculator
      </h3>

      {/* Stack Selection */}
      <div>
        <label className="text-sm text-muted-foreground mb-2 block">
          Select Framework / Stack
        </label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {stacks.map((stack) => (
            <button
              key={stack.id}
              onClick={() => setSelectedStack(stack.id)}
              className={cn(
                "flex flex-col items-center gap-2 p-3 rounded-lg border transition-all",
                selectedStack === stack.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              )}
            >
              {stack.icon}
              <span className="text-xs font-medium text-center">{stack.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Traffic Level */}
      <div>
        <label className="text-sm text-muted-foreground mb-2 block">
          Expected Traffic Level
        </label>
        <div className="flex gap-2">
          {(Object.entries(trafficMultipliers) as [keyof typeof trafficMultipliers, typeof trafficMultipliers.low][]).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setTrafficLevel(key)}
              className={cn(
                "flex-1 py-2 px-4 rounded-lg border text-sm transition-all",
                trafficLevel === key
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border hover:border-primary/50"
              )}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {trafficMultipliers[trafficLevel].label}
        </p>
      </div>

      {/* Results */}
      {recommendations && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-mono text-sm font-medium">Recommendations</h4>
            <button
              onClick={copySpecs}
              className="text-xs px-3 py-1 bg-muted hover:bg-muted/80 rounded transition-colors"
            >
              Copy Specs
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(['minimal', 'ideal', 'production'] as const).map((tier) => (
              <div
                key={tier}
                className={cn(
                  "p-4 rounded-lg border",
                  tier === 'ideal' 
                    ? "border-primary bg-primary/5"
                    : "border-border"
                )}
              >
                <h5 className={cn(
                  "font-mono text-sm font-medium mb-3 capitalize",
                  tier === 'ideal' && "text-primary"
                )}>
                  {tier}
                  {tier === 'ideal' && (
                    <span className="ml-2 text-xs bg-primary/20 px-2 py-0.5 rounded">
                      Recommended
                    </span>
                  )}
                </h5>
                <div className="space-y-2">
                  <ResourceBar 
                    icon={<Cpu size={14} />}
                    label="CPU"
                    value={recommendations[tier].cpu}
                    unit="Core"
                    max={8}
                    tier={tier}
                  />
                  <ResourceBar 
                    icon={<Server size={14} />}
                    label="RAM"
                    value={recommendations[tier].ram}
                    unit="GB"
                    max={32}
                    tier={tier}
                  />
                  <ResourceBar 
                    icon={<HardDrive size={14} />}
                    label="Storage"
                    value={recommendations[tier].storage}
                    unit="GB SSD"
                    max={160}
                    tier={tier}
                  />
                  <ResourceBar 
                    icon={<Wifi size={14} />}
                    label="Bandwidth"
                    value={recommendations[tier].bandwidth}
                    unit="TB/mo"
                    max={10}
                    tier={tier}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface ResourceBarProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  unit: string;
  max: number;
  tier: 'minimal' | 'ideal' | 'production';
}

const ResourceBar: React.FC<ResourceBarProps> = ({ icon, label, value, unit, max, tier }) => {
  const percentage = Math.min((value / max) * 100, 100);
  const barColor = tier === 'minimal' 
    ? 'bg-destructive/60' 
    : tier === 'ideal' 
      ? 'bg-gradient-to-r from-primary to-secondary' 
      : 'bg-primary';

  return (
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground">{icon}</span>
      <div className="flex-1">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-muted-foreground">{label}</span>
          <span className="font-mono">{value} {unit}</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div 
            className={cn("h-full rounded-full transition-all", barColor)}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ResourceCalculator;
