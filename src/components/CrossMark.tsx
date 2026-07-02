export default function CrossMark({ size = 32, color = "#c9913d" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="14" y="4" width="4" height="24" rx="2" fill={color} />
      <rect x="6" y="11" width="20" height="4" rx="2" fill={color} />
    </svg>
  );
}
