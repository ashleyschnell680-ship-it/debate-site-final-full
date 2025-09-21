import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { BookOpen, Plus, Search, Filter, Edit3, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function MyLibrary() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [savedDebates, setSavedDebates] = useState([])
  const [notes, setNotes] = useState([])
  const [folders, setFolders] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('debates')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFolder, setSelectedFolder] = useState('all')
  const [showNoteModal, setShowNoteModal] = useState(false)
  const [editingNote, setEditingNote] = useState(null)

  useEffect(() => {
    if (!user) {
      navigate('/')
      return
    }
    fetchUserData()
  }, [user, navigate])

  const fetchUserData = async () => {
    try {
      // Fetch folders
      const { data: foldersData } = await supabase
        .from('folders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true })

      // Fetch saved debates
      const { data: debatesData } = await supabase
        .from('saved_debates')
        .select('*')
        .eq('user_id', user.id)
        .order('saved_at', { ascending: false })

      // Fetch notes
      const { data: notesData } = await supabase
        .from('private_notes')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })

      setFolders(foldersData || [])
      setSavedDebates(debatesData || [])
      setNotes(notesData || [])
    } catch (error) {
      console.error('Error fetching user data:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredDebates = savedDebates.filter(debate => {
    const matchesSearch = debate.debate_sub_item_name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFolder = selectedFolder === 'all' || debate.folder_id === selectedFolder
    return matchesSearch && matchesFolder
  })

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFolder = selectedFolder === 'all' || note.folder_id === selectedFolder
    return matchesSearch && matchesFolder
  })

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return

    try {
      await supabase
        .from('private_notes')
        .delete()
        .eq('id', noteId)
        .eq('user_id', user.id)

      setNotes(notes.filter(note => note.id !== noteId))
    } catch (error) {
      console.error('Error deleting note:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading your library...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <BookOpen size={32} className="text-red-600" />
                <h1 className="text-3xl font-bold text-gray-800">My Library</h1>
              </div>
              <p className="text-gray-600">Your saved debates, notes, and research</p>
            </div>
            
            {activeTab === 'notes' && (
              <button
                onClick={() => {
                  setEditingNote(null)
                  setShowNoteModal(true)
                }}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                <Plus size={20} />
                New Note
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('debates')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'debates'
                ? 'bg-red-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            Saved Debates ({savedDebates.length})
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'notes'
                ? 'bg-red-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            My Notes ({notes.length})
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search your library..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-400" />
              <select
                value={selectedFolder}
                onChange={(e) => setSelectedFolder(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="all">All Folders</option>
                {folders.map(folder => (
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'debates' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDebates.map(debate => (
              <DebateCard key={debate.id} debate={debate} />
            ))}
            {filteredDebates.length === 0 && (
              <div className="col-span-full text-center py-12 bg-white rounded-lg">
                <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">No saved debates yet</h3>
                <p className="text-gray-500">Start exploring debates and save the ones that interest you</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map(note => (
              <NoteCard 
                key={note.id} 
                note={note} 
                onEdit={(note) => {
                  setEditingNote(note)
                  setShowNoteModal(true)
                }}
                onDelete={handleDeleteNote}
              />
            ))}
            {filteredNotes.length === 0 && (
              <div className="col-span-full text-center py-12 bg-white rounded-lg">
                <Plus size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">No notes yet</h3>
                <p className="text-gray-500">Start taking notes on debates to build your research</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Note Modal */}
      {showNoteModal && (
        <NoteModal
          note={editingNote}
          folders={folders}
          user={user}
          onClose={() => {
            setShowNoteModal(false)
            setEditingNote(null)
          }}
          onSave={() => {
            fetchUserData()
            setShowNoteModal(false)
            setEditingNote(null)
          }}
        />
      )}
    </div>
  )
}

// Component for displaying saved debates
function DebateCard({ debate }) {
  const navigate = useNavigate()

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <h3 className="font-semibold text-gray-800 mb-2">{debate.debate_sub_item_name}</h3>
      <p className="text-sm text-gray-600 mb-3">Category: {debate.debate_category_id}</p>
      
      {debate.tags && debate.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {debate.tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">
          Saved {new Date(debate.saved_at).toLocaleDateString()}
        </span>
        <button
          onClick={() => navigate(`/debate/${debate.debate_category_id}/${debate.debate_sub_item_name.replace(/ /g, '-')}`)}
          className="text-red-600 hover:text-red-700 text-sm font-medium"
        >
          View Debate
        </button>
      </div>
    </div>
  )
}

// Component for displaying notes
function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-gray-800">{note.title}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(note)}
            className="text-blue-600 hover:text-blue-700"
          >
            <Edit3 size={16} />
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      {note.debate_sub_item_name && (
        <p className="text-sm text-gray-600 mb-3">
          Related to: {note.debate_sub_item_name}
        </p>
      )}

      <div className="text-sm text-gray-700 mb-3 line-clamp-3">
        {typeof note.content === 'string' ? note.content : note.content?.text || 'No content'}
      </div>

      {note.tags && note.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {note.tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
              {tag}
            </span>
          ))}
        </div>
      )}

      <span className="text-xs text-gray-500">
        Updated {new Date(note.updated_at).toLocaleDateString()}
      </span>
    </div>
  )
}

// Simple Note Modal (without rich text editor for now)
function NoteModal({ note, folders, user, onClose, onSave }) {
  const [title, setTitle] = useState(note?.title || '')
  const [content, setContent] = useState(
    typeof note?.content === 'string' ? note.content : note?.content?.text || ''
  )
  const [tags, setTags] = useState(note?.tags?.join(', ') || '')
  const [folderId, setFolderId] = useState(note?.folder_id || '')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const noteData = {
        title,
        content: { text: content }, // Store as object for future rich text support
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        folder_id: folderId || null,
        user_id: user.id,
        updated_at: new Date().toISOString()
      }

      if (note) {
        // Update existing note
        await supabase
          .from('private_notes')
          .update(noteData)
          .eq('id', note.id)
          .eq('user_id', user.id)
      } else {
        // Create new note
        await supabase
          .from('private_notes')
          .insert({
            ...noteData,
            created_at: new Date().toISOString()
          })
      }

      onSave()
    } catch (error) {
      console.error('Error saving note:', error)
      alert('Error saving note. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {note ? 'Edit Note' : 'Create New Note'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Write your notes here..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="important, research, questions"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Folder
              </label>
              <select
                value={folderId}
                onChange={(e) => setFolderId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">No folder</option>
                {folders.map(folder => (
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MyLibrary