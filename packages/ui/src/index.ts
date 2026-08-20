// Placeholder - UI components will be added later
// For now, this package provides shared utilities
export const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};
