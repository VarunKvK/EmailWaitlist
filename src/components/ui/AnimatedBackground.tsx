import React from 'react'

export const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-black">
      <div className="absolute h-full w-full bg-[linear-gradient(to_right,#cf0_1px,transparent_1px),linear-gradient(to_bottom,#cf0_1px,transparent_1px)] bg-[size:14px_24px] opacity-20" />
    </div>
  )
}