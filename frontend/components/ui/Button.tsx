import type { ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';

export function Button({ asChild, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={[
        'inline-flex items-center justify-center rounded-full px-5 py-2.5 font-semibold transition disabled:cursor-not-allowed disabled:opacity-60',
        className,
      ].join(' ')}
      {...props}
    />
  );
}
