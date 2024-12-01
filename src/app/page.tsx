'use client'

import { useState } from 'react'
import { ChevronRight, FileText, Zap, Lightbulb, HelpCircle, NotebookPen } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FeatureCard } from '@/components/FeatureCard'
import { AnimatedBackground } from '@/components/ui/AnimatedBackground'

export default function Home() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setStatus('success')
      setMessage('Thanks for joining our waitlist!')
      setEmail('')
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Something went wrong')
    } finally {
      // Reset status after 3 seconds
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 3000)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between relative overflow-hidden">
      <AnimatedBackground />
      <main className="container mx-auto px-4 py-16 flex-grow relative z-10">
        <section className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#cf0]">
            Transform Your PDFs with AI
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-gray-300">
            Summarize, Generate Notes, and Create Questions Instantly
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 mb-12">
            <div className="flex flex-col md:flex-row gap-4 w-full max-w-md">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow bg-gray-800 text-white border-gray-700 placeholder-gray-500"
                disabled={status === 'loading'}
                required
              />
              <Button 
                type="submit" 
                className="bg-[#cf0] text-black hover:bg-[#cf0]/80 transition-all duration-200"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            {message && (
              <p 
                className={`text-sm mt-2 ${
                  status === 'success' ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </section>

        <section className="mt-24 max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center text-[#cf0]">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-6 gap-4 md:gap-6 h-auto md:h-[500px]">
            {/* Large featured card */}
            <div className="md:col-span-4 md:row-span-3">
              <FeatureCard
                icon={<FileText className="h-8 w-8 text-[#cf0]" />}
                title="AI-Powered PDF Analysis"
                description="Advanced algorithms to extract insights from your documents. Our powerful AI engine processes your PDFs in seconds, identifying key concepts, themes, and important information automatically."
                className="h-full"
              />
            </div>

            {/* Medium card */}
            <div className="md:col-span-2 md:row-span-3">
              <FeatureCard
                icon={<Zap className="h-8 w-8 text-[#cf0]" />}
                title="Instant Summaries"
                description="Get concise overviews of lengthy documents in seconds"
                className="h-full"
              />
            </div>

            {/* Medium card */}
            <div className="md:col-span-2 md:row-span-3">
              <FeatureCard
                icon={<Lightbulb className="h-8 w-8 text-[#cf0]" />}
                title="Smart Note Generation"
                description="Automatically create structured notes from your PDFs"
                className="h-full"
              />
            </div>

            {/* Medium card */}
            <div className="md:col-span-2 md:row-span-3">
              <FeatureCard
                icon={<HelpCircle className="h-8 w-8 text-[#cf0]" />}
                title="Question Creation"
                description="Generate relevant questions for better comprehension"
                className="h-full"
              />
            </div>

            {/* Large card */}
            <div className="md:col-span-2 md:row-span-3">
              <FeatureCard
                icon={<NotebookPen className="h-8 w-8 text-[#cf0]" />}
                title="Notion Integration"
                description="Seamlessly save and organize your generated content in Notion workspaces. Sync your analysis, summaries, and questions directly to your preferred Notion pages."
                className="h-full"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-4 py-8 text-center text-gray-400 relative z-10">
        <p>&copy; 2023 PDF Analysis Tool. All rights reserved.</p>
        <a href="#" className="text-[#cf0] hover:underline mt-2 inline-block">Privacy Policy</a>
      </footer>
    </div>
  )
}
