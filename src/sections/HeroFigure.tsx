import { site } from '@/data'

/*
 * Two concentric pointy-top hexagons around (160, 150), outer radius 110 and
 * inner 85. The viewBox has to clear the outer bottom vertex at y=260 and the
 * labels, which sit outside the outer ring so no text crosses a line.
 */
/*
 * Labels share their node's baseline. The lower two anchor to their inner
 * edge: only 13 units clear between node and ring, so they sit outside it.
 */
const NODES = [
  { cx: 160, cy: 65, labelX: 160, labelY: 34, anchor: 'middle' },
  { cx: 234, cy: 192, labelX: 263, labelY: 196, anchor: 'start' },
  { cx: 86, cy: 192, labelX: 57, labelY: 196, anchor: 'end' },
] as const

const OUTER_RING = 'M160 40L255 95L255 205L160 260L65 205L65 95Z'
const INNER_RING = 'M160 65L234 108L234 192L160 235L86 192L86 108Z'
const SPOKES = 'M160 65V235M86 108L234 192M234 108L86 192'

export function HeroFigure() {
  const { label, title, footer, scale, description, nodes, center } = site.sections.hero.figure

  return (
    <div className="t-plate flex flex-col justify-between">
      <div className="flex justify-between gap-3 px-4 py-3">
        <span className="t-label">{label}</span>
        <span className="t-label">{title}</span>
      </div>

      <svg
        viewBox="0 0 320 280"
        role="img"
        aria-label={description}
        className="w-[92%] self-center text-emphasis"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1.3">
          <path d={OUTER_RING} strokeDasharray="4 7" />
          <path d={INNER_RING} />
          <path d={SPOKES} strokeOpacity="0.4" />
        </g>

        {/* Filled after the lines so the discs mask the spokes behind them. */}
        <g className="fill-bg" stroke="currentColor" strokeWidth="1.8">
          {NODES.map((node) => (
            <circle key={`${node.cx}-${node.cy}`} cx={node.cx} cy={node.cy} r="8" />
          ))}
          <circle cx="160" cy="150" r="36" />
        </g>

        <g className="fill-emphasis font-mono" fontSize="9">
          {nodes.map((name, index) => {
            const node = NODES[index]
            if (!node) return null

            return (
              <text key={name} x={node.labelX} y={node.labelY} textAnchor={node.anchor}>
                {name}
              </text>
            )
          })}
        </g>

        <g className="fill-emphasis font-mono" fontSize="10" fontWeight="500" textAnchor="middle">
          {center.map((line, index) => (
            <text key={line} x="160" y={147 + index * 13}>
              {line}
            </text>
          ))}
        </g>

        <circle
          cx="160"
          cy="150"
          r="50"
          fill="none"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          className="t-orbit stroke-accent"
        />
      </svg>

      <div className="flex justify-between gap-3 px-4 py-3">
        <span className="t-label">{footer}</span>
        <span className="t-label">{scale}</span>
      </div>
    </div>
  )
}
