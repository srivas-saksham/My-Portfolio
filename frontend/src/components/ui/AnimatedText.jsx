import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Splits text into words, animates each word up on scroll
export default function AnimatedText({
  children,
  as        = 'h2',
  delay     = 0,
  stagger   = 0.06,
  style     = {},
  className = '',
  trigger   = 'scroll', // 'scroll' | 'immediate'
}) {
  const ref  = useRef(null)
  const Tag  = as

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const text  = el.innerText
    const words = text.split(' ')

    // Wrap each word in a clip container
    el.innerHTML = words
      .map(w => `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;margin-right:0.25em">
        <span class="word-inner" style="display:inline-block;transform:translateY(100%)">${w}</span>
      </span>`)
      .join('')

    const inners = el.querySelectorAll('.word-inner')

    const anim = () => gsap.to(inners, {
      y:        0,
      duration: 0.8,
      ease:     'expo.out',
      stagger,
      delay,
    })

    if (trigger === 'immediate') {
      anim()
    } else {
      ScrollTrigger.create({
        trigger: el,
        start:   'top 85%',
        onEnter: anim,
      })
    }

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <Tag
      ref={ref}
      style={style}
      className={className}
    >
      {children}
    </Tag>
  )
}