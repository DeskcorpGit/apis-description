import { LogOut } from 'lucide-react';
import type { GitHubUser } from '@/types/github';

interface UserBadgeProps {
  readonly user: GitHubUser;
  readonly onLogout: () => void;
}

export function UserBadge({ user, onLogout }: Readonly<UserBadgeProps>) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2 min-w-0">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <img
          src={user.avatar_url}
          alt={user.login}
          className="size-5 rounded-full shrink-0"
        />
        <span className="text-xs font-medium truncate min-w-0">
          {user.name ?? user.login}
        </span>
        <span className="text-xs text-muted-foreground truncate hidden xs:inline sm:inline">
          @{user.login}
        </span>
      </div>
      <button
        type="button"
        onClick={onLogout}
        className="flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] text-muted-foreground hover:bg-muted hover:text-foreground transition-colors shrink-0 cursor-pointer"
      >
        <LogOut className="size-3" />
        Sair
      </button>
    </div>
  );
}
