// Replace the category overview section in DebateDetail.jsx (lines ~180-210) with this:

// Show category overview if no specific subcategory selected
if (!subItem) {
  return (
    <div className="relative min-h-screen">
      {/* Consistent Background Flag */}
      <div className="fixed inset-0 bg-cover bg-center opacity-50 -z-10" 
           style={{ backgroundImage: 'url(/republican-flag.png)' }}></div>
      <div className="fixed inset-0 bg-gradient-to-b from-white/50 via-white/70 to-white/80 -z-10"></div>

      <div className="relative z-10 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Header Section */}
          <div className="mb-8">
            <Link to="/debates" className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 mb-4 font-medium transition-colors">
              <ChevronLeft size={20} /> Back to All Categories
            </Link>
            
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-red-200">
              <div className="flex items-center gap-3 mb-4">
                <Scale size={32} className="text-red-600" />
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">
                  {category.title}
                </h1>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                Explore {category.subItems.length} debate topics with structured Republican arguments and Democratic rebuttals.
                Click any topic below to see the full debate breakdown.
              </p>
            </div>
          </div>

          {/* Topics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.subItems.map((item, index) => (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() => setIsHovered(index)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <Link
                  to={`/debate/${category.id}/${item.name.replace(/ /g, '-')}`}
                  className="block"
                >
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-red-200 hover:shadow-2xl hover:border-red-300 transition-all duration-300 group-hover:-translate-y-1">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-red-700 transition-colors">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-1 text-red-600">
                        <Scale size={16} />
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {item.topic}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Shield size={12} className="text-red-500" />
                        <span>Rep vs Dem</span>
                      </div>
                      <ArrowRight size={16} className="text-red-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>

                {/* Enhanced Hover Preview */}
                {isHovered === index && (
                  <div className="absolute z-20 w-96 p-6 bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl border border-red-200 mt-2 left-0 pointer-events-none animate-in fade-in-0 zoom-in-95 duration-200">
                    <h4 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <Scale size={18} className="text-red-600" />
                      {item.name}
                    </h4>
                    
                    <div className="space-y-3">
                      <div className="bg-red-50 rounded-lg p-3 border-l-4 border-red-600">
                        <p className="text-sm font-medium text-red-800 mb-1">Topic:</p>
                        <p className="text-sm text-gray-700">{item.topic}</p>
                      </div>
                      
                      <div className="bg-red-50 rounded-lg p-3">
                        <p className="text-sm font-medium text-red-700 mb-1">Republican View:</p>
                        <p className="text-sm text-gray-700 line-clamp-2">{item.republican?.summary}</p>
                      </div>
                      
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-sm font-medium text-blue-700 mb-1">Democratic Response:</p>
                        <p className="text-sm text-gray-700 line-clamp-2">{item.democratic?.summary}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                      <BookOpen size={12} />
                      <span>Click to read full debate analysis</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-12 bg-gradient-to-r from-red-600 to-blue-600 rounded-2xl p-8 text-white shadow-xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Explore Every Perspective</h2>
              <p className="text-lg opacity-90 mb-6">
                Each debate topic presents structured arguments from both Republican and Democratic viewpoints, 
                complete with reasoning, evidence, and key vocabulary differences.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold">{category.subItems.length}</div>
                  <div className="text-sm opacity-80">Debate Topics</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">2</div>
                  <div className="text-sm opacity-80">Perspectives Each</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">100%</div>
                  <div className="text-sm opacity-80">Evidence-Based</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">0</div>
                  <div className="text-sm opacity-80">Bias Intended</div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Footer */}
          <div className="mt-8 flex justify-center">
            <Link
              to="/debates"
              className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm text-red-700 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:bg-white transition-all border border-red-200"
            >
              <ChevronLeft size={18} />
              Back to All Categories
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}