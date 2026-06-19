import type { UIKey } from '../i18n/ui';

export type StackDomain = {
  labelKey: UIKey;
  items: string[];
};

export const stackDomains: StackDomain[] = [
  {
    labelKey: 'stack.l1',
    items: ['TypeScript', 'Python', 'Rust', 'Java', 'C#', 'Solidity'],
  },
  {
    labelKey: 'stack.l2',
    items: ['React', 'Vue', 'Angular', 'Astro', 'Flutter'],
  },
  {
    labelKey: 'stack.l3',
    items: ['Node', 'Django', 'Flask', 'Spring', '.NET', 'Tauri'],
  },
  {
    labelKey: 'stack.l4',
    items: ['Solidity', 'Solana', 'Smart Contracts'],
  },
  {
    labelKey: 'stack.l5',
    items: ['Git', 'GitHub', 'CI/CD', 'Testing', 'Deploys'],
  },
  {
    labelKey: 'stack.l6',
    items: ['stack.cAi', 'stack.cData', 'stack.cQa'],
  },
];
