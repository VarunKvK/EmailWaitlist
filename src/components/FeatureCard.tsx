import React from 'react'

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  className?: string
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description, 
  className = "" 
}) => {
  return (
    <div className={`bg-black p-6 rounded-lg transition-transform hover:scale-105 border border-gray-800 hover:border-[#cf0] ${className}`}>
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-xl font-semibold ml-4 text-white">{title}</h3>
      </div>
      <p className="text-gray-300">{description}</p>
    </div>
  )
}