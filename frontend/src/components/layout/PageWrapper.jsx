import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function PageWrapper({ children, style = {} }) {
  const wrapRef = useRef(null)

  useEffect(() => {
    let ctx

    const id = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        gsap.utils.toArray('[data-gsap="fade-up"]').forEach(el => {
          gsap.fromTo(el,
            { opacity: 0, y: 40 },
            {
              opacity:  1,
              y:        0,
              duration: 0.8,
              ease:     'expo.out',
              scrollTrigger: {
                trigger: el,
                start:   'top 88%',
                toggleActions: 'play none none none',
              },
            }
          )
        })

        gsap.utils.toArray('[data-gsap="fade-in"]').forEach(el => {
          gsap.fromTo(el,
            { opacity: 0 },
            {
              opacity:  1,
              duration: 0.6,
              ease:     'expo.out',
              scrollTrigger: {
                trigger: el,
                start:   'top 90%',
                toggleActions: 'play none none none',
              },
            }
          )
        })

        gsap.utils.toArray('[data-gsap="clip-reveal"]').forEach(el => {
          gsap.fromTo(el,
            { clipPath: 'inset(0 100% 0 0)' },
            {
              clipPath: 'inset(0 0% 0 0)',
              duration: 1,
              ease:     'expo.out',
              scrollTrigger: {
                trigger: el,
                start:   'top 85%',
                toggleActions: 'play none none none',
              },
            }
          )
        })
      }, wrapRef)
    })

    return () => {
      cancelAnimationFrame(id)
      ctx?.revert()
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      style={{
        paddingTop: '80px', // navbar height offset
        minHeight:  '100vh',
        ...style,
      }}
    >
      {children}
    </div>
  )
}