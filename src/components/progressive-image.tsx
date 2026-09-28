import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface ProgressiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  containerClassName?: string
  priority?: boolean
}

export function ProgressiveImage({
  src,
  alt,
  className,
  containerClassName,
  priority = false,
  ...props
}: ProgressiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setIsLoaded(true)
    }
  }, [src])

  return (
    <div
      className={cn(
        "relative aspect-[4/3] w-full overflow-hidden bg-muted/20",
        containerClassName
      )}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        className={cn(
          "relative block h-full w-full object-cover transition-opacity duration-300 ease-out",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        {...props}
      />
    </div>
  )
}
