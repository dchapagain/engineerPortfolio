type PlateHeaderProps = {
  plate: string
  title: string
  titleId?: string
}

export function PlateHeader({ plate, title, titleId }: PlateHeaderProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
      <span className="t-label">{plate}</span>
      <h2 id={titleId} className="t-section">
        {title}
      </h2>
    </div>
  )
}
