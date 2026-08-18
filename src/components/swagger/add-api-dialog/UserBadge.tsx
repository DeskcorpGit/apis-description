import { LogOut } from 'lucide-react';
import type { GitHubUser } from '@/types/github';

interface UserBadgeProps {
  readonly user: GitHubUser;
  readonly onLogout: () => void;
}

export function UserBadge({ user, onLogout }: UserBadgeProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-muted/40 px-3 py-2">
      <div className="flex items-center gap-2">
        <img
          src={user.avatar_url}
          alt={user.login}
          className="size-5 rounded-full"
        />
        <span className="text-xs font-medium">{user.name ?? user.login}</span>
        <span className="text-xs text-muted-foreground">@{user.login}</span>
      </div>
      <button
        type="button"
        onClick={onLogout}
        className="flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
      >
        <LogOut className="size-3" />
        Sair
      </button>
    </div>
  );
}
