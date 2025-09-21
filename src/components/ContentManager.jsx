import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function ContentManager() {
  const [categories, setCategories] = useState([])
  const [editingCategory, setEditingCategory] = useState(null)
  const [editingSubcategory, setEditingSubcategory] = useState(null)
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [showAddSubcategory, setShowAddSubcategory] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const savedCategories = localStorage.getItem('debateCategories')
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories))
    }

    const isAuth = sessionStorage.getItem('adminAuthenticated')
    if (!isAuth) {
      navigate('/admin/login')
    }
  }, [navigate])

  const saveCategories = (newCategories) => {
    setCategories(newCategories)
    localStorage.setItem('debateCategories', JSON.stringify(newCategories))
  }

  const addCategory = (categoryData) => {
    const newCategory = {
      id: Math.max(...categories.map(c => c.id), 0) + 1,
      title: categoryData.title,
      subItems: []
    }
    saveCategories([...categories, newCategory])
    setShowAddCategory(false)
  }

  const updateCategory = (categoryId, updatedData) => {
    const newCategories = categories.map(cat => 
      cat.id === categoryId ? { ...cat, ...updatedData } : cat
    )
    saveCategories(newCategories)
    setEditingCategory(null)
  }

  const deleteCategory = (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category? This will also delete all its subcategories.')) {
      const newCategories = categories.filter(cat => cat.id !== categoryId)
      saveCategories(newCategories)
    }
  }

  const addSubcategory = (categoryId, subcategoryData) => {
    const newCategories = categories.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          subItems: [...cat.subItems, subcategoryData]
        }
      }
      return cat
    })
    saveCategories(newCategories)
    setShowAddSubcategory(null)
  }

  const updateSubcategory = (categoryId, subcategoryIndex, updatedData) => {
    const newCategories = categories.map(cat => {
      if (cat.id === categoryId) {
        const newSubItems = cat.subItems.map((item, index) => 
          index === subcategoryIndex ? { ...item, ...updatedData } : item
        )
        return { ...cat, subItems: newSubItems }
      }
      return cat
    })
    saveCategories(newCategories)
    setEditingSubcategory(null)
  }

  const deleteSubcategory = (categoryId, subcategoryIndex) => {
    if (window.confirm('Are you sure you want to delete this subcategory?')) {
      const newCategories = categories.map(cat => {
        if (cat.id === categoryId) {
          const newSubItems = cat.subItems.filter((_, index) => index !== subcategoryIndex)
          return { ...cat, subItems: newSubItems }
        }
        return cat
      })
      saveCategories(newCategories)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4 border-b border-gray-700">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Content Manager</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/admin')}
              className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded transition-colors"
            >
              Back to Admin
            </button>
            <button
              onClick={() => setShowAddCategory(true)}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition-colors"
            >
              Add Category
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6">
        {categories.map((category) => (
          <div key={category.id} className="mb-8 bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{category.title}</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowAddSubcategory(category.id)}
                  className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm transition-colors"
                >
                  Add Subcategory
                </button>
                <button
                  onClick={() => setEditingCategory(category.id)}
                  className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded text-sm transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteCategory(category.id)}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {category.subItems.map((subItem, index) => (
                <div key={index} className="bg-gray-700 p-4 rounded">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{subItem.name}</h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingSubcategory({ categoryId: category.id, index })}
                        className="bg-yellow-600 hover:bg-yellow-700 px-2 py-1 rounded text-xs transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteSubcategory(category.id, index)}
                        className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-2"><strong>Topic:</strong> {subItem.topic}</p>
                  <p className="text-gray-400 text-xs"><strong>Republican:</strong> {subItem.republican?.summary?.substring(0, 100)}...</p>
                  <p className="text-gray-400 text-xs"><strong>Democratic:</strong> {subItem.democratic?.summary?.substring(0, 100)}...</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>

      {/* Modals */}
      {showAddCategory && (
        <CategoryModal
          onSave={addCategory}
          onCancel={() => setShowAddCategory(false)}
        />
      )}

      {editingCategory && (
        <CategoryModal
          category={categories.find(c => c.id === editingCategory)}
          onSave={(data) => updateCategory(editingCategory, data)}
          onCancel={() => setEditingCategory(null)}
        />
      )}

      {showAddSubcategory && (
        <SubcategoryModal
          onSave={(data) => addSubcategory(showAddSubcategory, data)}
          onCancel={() => setShowAddSubcategory(null)}
        />
      )}

      {editingSubcategory && (
        <SubcategoryModal
          subcategory={categories.find(c => c.id === editingSubcategory.categoryId)?.subItems[editingSubcategory.index]}
          onSave={(data) => updateSubcategory(editingSubcategory.categoryId, editingSubcategory.index, data)}
          onCancel={() => setEditingSubcategory(null)}
        />
      )}
    </div>
  )
}

// Category Modal
function CategoryModal({ category, onSave, onCancel }) {
  const [title, setTitle] = useState(category?.title || '')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({ title })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{category ? 'Edit Category' : 'Add Category'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Subcategory Modal for new debate format
function SubcategoryModal({ subcategory, onSave, onCancel }) {
  const [name, setName] = useState(subcategory?.name || '')
  const [topic, setTopic] = useState(subcategory?.topic || '')
  const [repSummary, setRepSummary] = useState(subcategory?.republican?.summary || '')
  const [repReasoning, setRepReasoning] = useState(subcategory?.republican?.reasoning || '')
  const [repSources, setRepSources] = useState(subcategory?.republican?.sources?.join('\n') || '')
  const [demSummary, setDemSummary] = useState(subcategory?.democratic?.summary || '')
  const [demReasoning, setDemReasoning] = useState(subcategory?.democratic?.reasoning || '')
  const [demSources, setDemSources] = useState(subcategory?.democratic?.sources?.join('\n') || '')
  const [vocabulary, setVocabulary] = useState(subcategory?.vocabulary?.join('\n') || '')
  const [myTake, setMyTake] = useState(subcategory?.myTake || 'This section allows users to write their own analysis after reviewing both perspectives.')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      name,
      topic,
      republican: {
        summary: repSummary,
        reasoning: repReasoning,
        sources: repSources.split('\n').map(s => s.trim()).filter(s => s)
      },
      democratic: {
        summary: demSummary,
        reasoning: demReasoning,
        sources: demSources.split('\n').map(s => s.trim()).filter(s => s)
      },
      vocabulary: vocabulary.split('\n').map(s => s.trim()).filter(s => s),
      myTake
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-6xl max-h-screen overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">{subcategory ? 'Edit Debate Topic' : 'Add Debate Topic'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 bg-gray-700 text-white rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Topic Question</label>
                <textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full p-3 bg-gray-700 text-white rounded h-20"
                  placeholder="What's the main issue being debated?"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Republican Section */}
              <div className="bg-red-900 bg-opacity-20 p-4 rounded">
                <h3 className="text-red-300 font-bold mb-3">Republican / Conservative</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-gray-300 mb-1 text-sm">Summary (1-2 sentences)</label>
                    <textarea
                      value={repSummary}
                      onChange={(e) => setRepSummary(e.target.value)}
                      className="w-full p-2 bg-gray-700 text-white rounded text-sm h-20"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-1 text-sm">Why They Believe This</label>
                    <textarea
                      value={repReasoning}
                      onChange={(e) => setRepReasoning(e.target.value)}
                      className="w-full p-2 bg-gray-700 text-white rounded text-sm h-24"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-1 text-sm">Sources (one per line)</label>
                    <textarea
                      value={repSources}
                      onChange={(e) => setRepSources(e.target.value)}
                      className="w-full p-2 bg-gray-700 text-white rounded text-sm h-24"
                      placeholder="Study or source 1&#10;https://example.com&#10;Another source"
                    />
                  </div>
                </div>
              </div>

              {/* Democratic Section */}
              <div className="bg-blue-900 bg-opacity-20 p-4 rounded">
                <h3 className="text-blue-300 font-bold mb-3">Democratic / Liberal</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-gray-300 mb-1 text-sm">Summary (1-2 sentences)</label>
                    <textarea
                      value={demSummary}
                      onChange={(e) => setDemSummary(e.target.value)}
                      className="w-full p-2 bg-gray-700 text-white rounded text-sm h-20"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-1 text-sm">Why They Disagree</label>
                    <textarea
                      value={demReasoning}
                      onChange={(e) => setDemReasoning(e.target.value)}
                      className="w-full p-2 bg-gray-700 text-white rounded text-sm h-24"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-1 text-sm">Sources (one per line)</label>
                    <textarea
                      value={demSources}
                      onChange={(e) => setDemSources(e.target.value)}
                      className="w-full p-2 bg-gray-700 text-white rounded text-sm h-24"
                      placeholder="Study or source 1&#10;https://example.com&#10;Another source"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Key Vocabulary/Framing (one per line)</label>
                <textarea
                  value={vocabulary}
                  onChange={(e) => setVocabulary(e.target.value)}
                  className="w-full p-3 bg-gray-700 text-white rounded h-24"
                  placeholder="Term vs Counter-term&#10;Another framing difference"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">My Take (Default Text)</label>
                <textarea
                  value={myTake}
                  onChange={(e) => setMyTake(e.target.value)}
                  className="w-full p-3 bg-gray-700 text-white rounded h-24"
                />
              </div>
            </div>
          </div>

          <div className="flex space-x-4 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
            >
              Save Debate Topic
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ContentManager