import Tag from '@components/ui/Tag'

/**
 * ProjectTagList
 * Renders an array of tag strings using the shared Tag component.
 * Optionally limits displayed count and shows an overflow badge.
 *
 * Props:
 *   tags      — string[]
 *   limit     — max tags to show before "+N more" (default: unlimited)
 *   variant   — Tag variant to use (default: 'default')
 *   gap       — CSS gap between tags (default: '0.35rem')
 */
export default function ProjectTagList({
  tags     = [],
  limit,
  variant  = 'default',
  gap      = '0.35rem',
}) {
  if (!tags.length) return null

  const visible  = limit ? tags.slice(0, limit)  : tags
  const overflow = limit ? tags.length - limit    : 0

  return (
    <div
      style={{
        display:    'inline-flex',
        flexWrap:   'wrap',
        gap,
        alignItems: 'center',
      }}
    >
      {visible.map(tag => (
        <Tag key={tag} variant={variant}>
          {tag}
        </Tag>
      ))}

      {overflow > 0 && (
        <span
          title={tags.slice(limit).join(', ')}
          style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.58rem',
            color:         'var(--ghost)',
            letterSpacing: '0.06em',
            cursor:        'default',
            userSelect:    'none',
          }}
        >
          +{overflow} more
        </span>
      )}
    </div>
  )
}