import {
  Placement,
  Strategy,
  UseFloatingReturn,
  UseInteractionsReturn,
  arrow,
  flip,
  offset,
  safePolygon,
  shift,
  useFloating,
  useHover,
  useInteractions,
  useRole,
  useTransitionStyles,
} from '@floating-ui/react';
import { useState } from 'react';

const arrowSize = 6;
const gap = 6;

export type UseTooltipProps = {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  placement?: Placement;
  strategy?: Strategy;
  arrow?: boolean;
  allowHover?: boolean;
  offset?: number;
};

type UseTooltip = {
  floating: UseFloatingReturn;
  transition: { isMounted: boolean; styles: React.CSSProperties };
  interactions: UseInteractionsReturn;
  arrow: false | { size: number };
  setArrow: (element: SVGSVGElement | null) => void;
};

export function useTooltip({
  open,
  setOpen,
  placement = 'bottom',
  strategy,
  arrow: showArrow = true,
  allowHover = false,
  offset: offsetValue,
}: UseTooltipProps): UseTooltip {
  const [arrowElement, setArrowElement] = useState<SVGSVGElement | null>(null);

  const floating = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    strategy,
    middleware: [
      flip(),
      shift(),
      offset((showArrow ? arrowSize : 0) + (offsetValue ?? gap)),
      showArrow && arrow({ element: arrowElement }),
    ],
  });

  const transition = useTransitionStyles(floating.context, {
    duration: 100,
  });

  const hover = useHover(floating.context, {
    move: false,
    handleClose: allowHover ? safePolygon() : undefined,
  });

  const role = useRole(floating.context, {
    role: 'tooltip',
  });

  const interactions = useInteractions([hover, role]);

  return {
    floating,
    transition,
    interactions,
    arrow: showArrow && { size: arrowSize },
    setArrow: setArrowElement,
  };
}
