// Lightweight wrapper — just applies the data-gsap attribute
// PageWrapper's GSAP context picks it up automatically

export default function FadeIn({
  children,
  type  = 'fade-up',   // 'fade-up' | 'fade-in' | 'clip-reveal' | 'scale-in'
  style = {},
  className = '',
  as    = 'div',
}) {
  const Tag = as

  return (
    <Tag
      data-gsap={type}
      style={style}
      className={className}
    >
      {children}
    </Tag>
  )
}