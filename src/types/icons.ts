type SizeUnit = 'px' | 'rem' | 'em' | '%';
type ValidSize = `${number}${SizeUnit}` | `var(--${string})`;

type HexColor = `#${string}` | `var(--${string})`;

export type IconProps = {
  size?: ValidSize;
  color?: HexColor;
};
