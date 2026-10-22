/**
 * Inline SVG icon set — no icon dependency.
 * All icons inherit `currentColor` and are aria-hidden by default.
 */

type IconProps = React.SVGProps<SVGSVGElement>;

function baseProps(props: IconProps): IconProps {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    focusable: false,
    ...props,
  };
}

export function ArrowRight(props: IconProps) {
  return (
    <svg {...baseProps(props)} className={props.className ?? "icon"}>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <svg {...baseProps(props)} className={props.className ?? "icon"}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function Check(props: IconProps) {
  return (
    <svg {...baseProps(props)} strokeWidth={2.2} className={props.className ?? "icon"}>
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}

export function Menu(props: IconProps) {
  return (
    <svg {...baseProps(props)} className={props.className ?? "icon"}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

export function Close(props: IconProps) {
  return (
    <svg {...baseProps(props)} className={props.className ?? "icon"}>
      <path d="m6 6 12 12" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

export function Lock(props: IconProps) {
  return (
    <svg {...baseProps(props)} className={props.className ?? "icon"}>
      <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </svg>
  );
}

export function Dot(props: IconProps) {
  return (
    <svg {...baseProps(props)} className={props.className ?? "icon"} fill="currentColor" stroke="none">
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

export function Layers(props: IconProps) {
  return (
    <svg {...baseProps(props)} className={props.className ?? "icon"}>
      <path d="m12 3 8.5 4.5L12 12 3.5 7.5 12 3Z" />
      <path d="m4 12.5 8 4.2 8-4.2" />
      <path d="m4 16.8 8 4.2 8-4.2" />
    </svg>
  );
}

export function Type(props: IconProps) {
  return (
    <svg {...baseProps(props)} className={props.className ?? "icon"}>
      <path d="M5 6.5V5h14v1.5" />
      <path d="M12 5v14" />
      <path d="M9 19h6" />
    </svg>
  );
}

export function Palette(props: IconProps) {
  return (
    <svg {...baseProps(props)} className={props.className ?? "icon"}>
      <path d="M12 3.5a8.5 8.5 0 1 0 0 17c1.2 0 1.8-.9 1.8-1.8 0-1.4-1-1.7-1-2.7 0-.8.7-1.5 1.5-1.5h1.6A4.6 4.6 0 0 0 20.5 10c0-3.7-3.7-6.5-8.5-6.5Z" />
      <circle cx="8" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="7.6" r="1" fill="currentColor" stroke="none" />
      <circle cx="16" cy="9.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Monitor(props: IconProps) {
  return (
    <svg {...baseProps(props)} className={props.className ?? "icon"}>
      <rect x="3" y="4.5" width="18" height="12.5" rx="2" />
      <path d="M9 20.5h6" />
      <path d="M12 17v3.5" />
    </svg>
  );
}

export function Tablet(props: IconProps) {
  return (
    <svg {...baseProps(props)} className={props.className ?? "icon"}>
      <rect x="5.5" y="3" width="13" height="18" rx="2" />
      <path d="M11 17.8h2" />
    </svg>
  );
}

export function Smartphone(props: IconProps) {
  return (
    <svg {...baseProps(props)} className={props.className ?? "icon"}>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M11 18.6h2" />
    </svg>
  );
}

export function Grip(props: IconProps) {
  return (
    <svg {...baseProps(props)} className={props.className ?? "icon"} fill="currentColor" stroke="none">
      <circle cx="9" cy="6" r="1.35" />
      <circle cx="15" cy="6" r="1.35" />
      <circle cx="9" cy="12" r="1.35" />
      <circle cx="15" cy="12" r="1.35" />
      <circle cx="9" cy="18" r="1.35" />
      <circle cx="15" cy="18" r="1.35" />
    </svg>
  );
}

export function Plus(props: IconProps) {
  return (
    <svg {...baseProps(props)} className={props.className ?? "icon"}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

export function SparkWand(props: IconProps) {
  return (
    <svg {...baseProps(props)} className={props.className ?? "icon"}>
      <path d="M4.5 19.5 15 9" />
      <path d="m16.5 4.5.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9.9-2.6Z" />
      <path d="M6.5 4.5l.6 1.7 1.7.6-1.7.6-.6 1.7-.6-1.7-1.7-.6 1.7-.6.6-1.7Z" />
    </svg>
  );
}
