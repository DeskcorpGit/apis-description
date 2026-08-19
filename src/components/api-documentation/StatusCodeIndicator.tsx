import { cn } from '@/lib/utils';

function getStatusColorClass(numericCode: number): string {
  const statusGroup = Math.floor(numericCode / 100);

  switch (statusGroup) {
    case 2:
      return 'bg-brand-green';
    case 3:
      return 'bg-amber-500';
    case 4:
      return 'bg-orange-500';
    case 5:
      return 'bg-red-500';
    default:
      return 'bg-muted-foreground';
  }
}

export function StatusCodeIndicator({ code }: Readonly<{ code: string }>) {
  const numericCode = Number.parseInt(code, 10);
  const colorClass = getStatusColorClass(numericCode);

  return <span className={cn('size-2 rounded-full shrink-0', colorClass)} />;
}
