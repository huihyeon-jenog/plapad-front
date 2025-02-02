"use client"
import useEmblaCarousel from 'embla-carousel-react'

export default function Slider() {
  const [emblaRef] = useEmblaCarousel()
  const slides = [1, 2, 3, 4, 5];

  return (
    <section className="embla">
      123
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">{index + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}