import { Link } from 'react-router-dom'
import { Flag, ArrowRight, Scale, BookOpen } from 'lucide-react'

function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Background Flag */}
      <div className="fixed inset-0 bg-cover bg-center opacity-50 -z-10" style={{ backgroundImage: 'url(/republican-flag.png)' }}></div>
      
      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-white/50 via-white/70 to-white/80 -z-10"></div>

      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center p-6">
        <div className="text-center max-w-4xl">
          {/* Hero Section */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Flag size={48} className="text-red-600" />
              <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-blue-700 to-red-600">
                Debate Site
              </h1>
            </div>
            
            <p className="text-2xl md:text-3xl text-gray-700 mb-4 leading-relaxed font-medium">
              Explore Republican Arguments & Democratic Rebuttals
            </p>
            
            <p className="text-lg text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
              Understand both sides of key political issues through structured debate breakdowns, 
              evidence-based arguments, and thoughtful analysis.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-t-4 border-red-600">
              <Scale size={32} className="text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Balanced Perspectives</h3>
              <p className="text-gray-600">See both Republican and Democratic viewpoints side by side</p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-t-4 border-blue-600">
              <BookOpen size={32} className="text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Evidence-Based</h3>
              <p className="text-gray-600">All arguments backed by credible sources and research</p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-t-4 border-red-600">
              <Flag size={32} className="text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Educational Focus</h3>
              <p className="text-gray-600">Learn key vocabulary and framing used by each side</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-red-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Explore?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Dive into structured political debates covering government, economy, society, and more.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/debates" 
                className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Start Exploring <ArrowRight size={20} />
              </Link>
              
              <Link 
                to="/about" 
                className="inline-flex items-center justify-center gap-2 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">13</div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">50+</div>
              <div className="text-sm text-gray-600">Topics</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">2</div>
              <div className="text-sm text-gray-600">Perspectives</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">100%</div>
              <div className="text-sm text-gray-600">Educational</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home