import { ExternalLink } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ApiCardProps {
  title: string;
  company: string;
  function: string;
  url: string;
}

export function ApiCard({
  title,
  company,
  function: fn,
  url,
}: Readonly<ApiCardProps>) {
  return (
    <Card className="group/api-card transition-all duration-200 hover:border-brand-green/40 hover:shadow-md min-w-0">
      <CardHeader>
        <div className="flex items-start justify-between gap-2 min-w-0">
          <CardTitle className="text-sm font-semibold leading-snug wrap-break-word min-w-0 flex-1">
            {title}
          </CardTitle>
          <Badge
            variant="outline"
            className="shrink-0 text-[10px] border-brand-green/30 text-brand-green bg-brand-green/5 max-w-27.5 truncate"
            title={fn}
          >
            {fn}
          </Badge>
        </div>
        <CardDescription className="text-xs wrap-break-word">
          {company}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1" />

      <CardFooter>
        <Button
          asChild
          size="sm"
          className="w-full gap-2 text-xs bg-brand-green hover:bg-brand-green/80 text-white cursor-pointer"
        >
          <a href={url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="size-3.5" />
            Abrir documentação
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
