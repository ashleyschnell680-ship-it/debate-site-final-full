import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getCategories } from "../utils/dataService";
import { Home, FileText, Users, Flag, Star } from 'lucide-react'

function DebateList() {
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    setCategories(getCategories())
  }, [])

  const allSubItems = categories.flatMap((category) =>
    category.subItems.map((subItem) => ({
      ...subItem,
      categoryId: category.id,
      categoryTitle: category.title
    }))
  ).sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div className="relative min-h-screen flex">
      {/* Background Flag */}
      <div className="fixed inset-0 opacity-50 -z-10" style={{ backgroundImage: 'url(/republican-flag.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
      
      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-white/50 via-white/70 to-white/80 -z-10"></div>
      
      {/* Sidebar */}
      <aside className="w-64 bg-white/90 border-r-4 border-red-600 shadow-xl p-6 rounded-r-2xl backdrop-blur-sm flex flex-col gap-6">
        <h2 className="text-3xl font-extrabold text-red-700 tracking-wide flex items-center gap-2">
          <Flag size={26} className="text-blue-600" /> 
          Republican Arguments
        </h2>
        
        <nav className="flex flex-col gap-4 text-gray-700">
          <Link 
            to="/" 
            className="flex items-center justify-start gap-2 text-blue-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Home size={18} /> Home
          </Link>
          <Link 
            to="/debates" 
            className="flex items-center justify-start gap-2 text-red-700 font-semibold px-4 py-2 rounded-lg bg-red-50 border-l-4 border-red-600"
          >
            <FileText size={18} /> Categories
          </Link>
          <Link 
            to="/about" 
            className="flex items-center justify-start gap-2 text-blue-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Users size={18} /> About
          </Link>
        </nav>

        {/* Quick Subcategory Access */}
        <div className="mt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3">Quick Access</h3>
          <div className="max-h-96 overflow-y-auto space-y-2">
            {allSubItems.slice(0, 10).map((subItem, index) => (
              <button
                key={index}
                onClick={() => navigate(`/debate/${subItem.categoryId}/${subItem.name.replace(/ /g, '-')}`)}
                className="w-full text-left p-2 text-sm bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors text-gray-700 hover:text-blue-700"
              >
                {subItem.name}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-red-700 mb-2">Political Debate Categories</h1>
          <p className="text-gray-600">Explore Republican positions on key political issues</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="rounded-2xl shadow-lg bg-white/95 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 border-t-4 border-red-600 cursor-pointer group"
              onClick={() => navigate(`/debates/${category.id}`)}
            >
              <div className="p-6 flex flex-col gap-4">
                <h3 className="font-extrabold text-lg text-blue-700 tracking-wide flex items-center gap-2 group-hover:text-blue-800">
                  <Star size={18} className="text-red-600" /> 
                  {category.title}
                </h3>
                
                <div className="space-y-2">
                  <p className="text-gray-800 leading-relaxed">
                    {category.subItems.length} debate topics covering Republican positions and Democratic rebuttals.
                  </p>
                  
                  {category.subItems.length > 0 && (
                    <div className="text-sm text-gray-600">
                      <p className="font-medium">Topics include:</p>
                      <ul className="list-disc list-inside ml-2 space-y-1">
                        {category.subItems.slice(0, 2).map((item, index) => (
                          <li key={index} className="truncate">{item.name}</li>
                        ))}
                        {category.subItems.length > 2 && (
                          <li className="text-blue-600">+{category.subItems.length - 2} more...</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>

                <button 
                  className="self-start bg-red-600 hover:bg-red-700 text-white rounded-xl px-4 py-2 text-sm font-semibold transition-colors shadow-md hover:shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate(`/debates/${category.id}`)
                  }}
                >
                  View {category.subItems.length} Topics
                </button>
              </div>
            </div>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white/90 rounded-2xl p-8 shadow-lg backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-gray-700 mb-4">No Categories Found</h3>
              <p className="text-gray-600 mb-6">It looks like no debate categories have been created yet.</p>
              <Link 
                to="/admin/login"
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Go to Admin Panel
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default DebateList