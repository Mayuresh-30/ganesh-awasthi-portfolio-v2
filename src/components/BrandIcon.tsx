import {
  siGit,
  siGithub,
  siJavascript,
  siMysql,
  siReact,
  siSpring,
  siSpringboot,
} from 'simple-icons';
import { Cloud, Code2, Database, Layers3, Workflow } from 'lucide-react';

type BrandShape = { title: string; hex: string; path: string };
const registry: Record<string, BrandShape | undefined> = {
  siGit,
  siGithub,
  siJavascript,
  siMysql,
  siReact,
  siSpring,
  siSpringboot,
};

interface BrandIconProps {
  iconKey?: string | null;
  label: string;
  className?: string;
}

export function BrandIcon({ iconKey, label, className = '' }: BrandIconProps) {
  const shared = { className: `brand-icon ${className}`, 'aria-hidden': true as const };
  if (iconKey === 'siJava') return <span {...shared} />;
  const icon = iconKey ? registry[iconKey] : undefined;

  if (icon) {
    return (
      <svg {...shared} viewBox="0 0 24 24" role="img" focusable="false">
        <path d={icon.path} fill="currentColor" />
      </svg>
    );
  }

  const lower = `${iconKey ?? ''} ${label}`.toLowerCase();
  if (lower.includes('database') || lower.includes('mysql') || lower.includes('sql')) return <Database {...shared} />;
  if (lower.includes('cloud') || lower.includes('aws') || lower.includes('jenkins')) return <Cloud {...shared} />;
  if (lower.includes('workflow') || lower.includes('cicd') || lower.includes('microservices')) return <Workflow {...shared} />;
  if (lower.includes('layer') || lower.includes('design')) return <Layers3 {...shared} />;
  return <Code2 {...shared} />;
}
