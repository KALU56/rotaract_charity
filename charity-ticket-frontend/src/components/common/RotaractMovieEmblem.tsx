import { BRAND_ASSETS } from '@/config/event.config';
import { PALETTE } from '@/config/theme.config';
import { cn } from '@/lib/utils';

interface RotaractMovieEmblemProps {
  className?: string;
}

export function RotaractMovieEmblem({
  className = 'w-10 h-10',
}: RotaractMovieEmblemProps) {
  return (
    <img
      src={BRAND_ASSETS.logoUrl}
      alt="Rotaract Club of Debre Berhan logo"
      className={cn('rounded-xl object-cover border shadow-sm', className)}
      style={{ borderColor: PALETTE.camel }}
    />
  );
}
