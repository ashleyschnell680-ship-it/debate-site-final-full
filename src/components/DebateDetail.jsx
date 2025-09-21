import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getCategories } from "../utils/dataService";
import { ChevronLeft, Scale, BookOpenText, PenLine, Shield, ChevronDown, Link as LinkIcon, CheckCircle2, Bookmark, BookmarkCheck, PenTool, ArrowRight, BookOpen } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

function FlagBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div 
        className="absolute inset-0" 
        style={{ 
          backgroundImage: 'url(/republican-flag.png)', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center' 
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#7f1d1d]/80 to-[#991b1b]/90" />
    </div>
  )
}

function SectionCard({ title, icon, children }) {
  return (
    <section className="rounded-2xl border border-red-200 bg-white shadow-[0_6px_24px_rgba(178,34,52,0.35)]">
      <header className="flex items-center gap-2 border-b border-red-100 px-5 py-3">
        <div className="flex items-center gap-2 text-sm font-semibold tracking-wide uppercase text-red-700">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white">
            {icon}
          </span>
          {title}
        </div>
      </header>
      <div className="px-5 py-4 text-[15px] leading-relaxed text-slate-800">
        {children}
      </div>
    </section>
  )
}

function SourceLink({ href, children }) {
  const [copied, setCopied] = useState(false)
  return (
    <div className="group inline-flex items-center gap-2 rounded-md bg-red-50 px-3 py-2 text-sm text-red-800 shadow-sm ring-1 ring-inset ring-red-200 transition hover:bg-red-100">
      <a className="underline-offset-2 hover:underline" href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(href || "")
            setCopied(true)
            setTimeout(() => setCopied(false), 1200)
          } catch {}
        }}
        className="ml-1 rounded p-1 transition hover:bg-red-200"
        title="Copy link"
      >
        {copied ? <CheckCircle2 size={16} aria-hidden className="text-green-600" /> : <LinkIcon size={16} aria-hidden />}
      </button>
    </div>
  )
}

function Collapsible({ label, children }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="rounded-xl border border-red-200 bg-red-50">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-red-800"
      >
        <span>{label}</span>
        <ChevronDown className={`transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="px-4 pb-4 text-[15px] text-slate-700">{children}</div>}
    </div>
  )
}

// Quick Note Modal Component
function QuickNoteModal({ isOpen, onClose, user, categoryId, subItemName, onSave }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await supabase
        .from('private_notes')
        .insert({
          user_id: user.id,
          debate_category_id: categoryId,
          debate_sub_item_name: subItemName,
          title: title || `Notes on ${subItemName}`,
          content: { text: content },
          tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })

      alert('Note saved successfully!')
      setTitle('')
      setContent('')
      setTags('')
      onClose()
      if (onSave) onSave()
    } catch (error) {
      console.error('Error saving note:', error)
      alert('Error saving note. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Note</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Note Title (optional)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder={`Notes on ${subItemName}`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Thoughts
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="What are your thoughts on this debate? Any questions or insights?"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="important, questions, research"
            />
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

function DebateDetail() {
  const { id, categoryId, subItemName } = useParams()
  const [isHovered, setIsHovered] = useState(null)
  const [categories, setCategories] = useState([])
  const { user } = useAuth()
  const [isSaved, setIsSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const [showNoteModal, setShowNoteModal] = useState(false)

  useEffect(() => {
    setCategories(getCategories())
  }, [])

  // Handle both route patterns: /debates/:id and /debate/:categoryId/:subItemName
  const categoryIdToUse = id || categoryId
  const category = categories.find(c => c.id === parseInt(categoryIdToUse))
  const subItem = subItemName ? category?.subItems.find(s => s.name.replace(/ /g, '-') === subItemName) : null

  // Check if debate is already saved
  useEffect(() => {
    if (user && subItem) {
      checkIfSaved()
    }
  }, [user, subItem])

  const checkIfSaved = async () => {
    if (!user || !subItem) return

    const { data } = await supabase
      .from('saved_debates')
      .select('id')
      .eq('user_id', user.id)
      .eq('debate_category_id', category.id)
      .eq('debate_sub_item_name', subItem.name)
      .single()

    setIsSaved(!!data)
  }

  const handleSaveDebate = async () => {
    if (!user) {
      alert('Please sign in to save debates')
      return
    }

    setSaving(true)

    try {
      if (isSaved) {
        // Remove from saved
        await supabase
          .from('saved_debates')
          .delete()
          .eq('user_id', user.id)
          .eq('debate_category_id', category.id)
          .eq('debate_sub_item_name', subItem.name)
        
        setIsSaved(false)
      } else {
        // Add to saved
        await supabase
          .from('saved_debates')
          .insert({
            user_id: user.id,
            debate_category_id: category.id,
            debate_sub_item_name: subItem.name,
            tags: []
          })
        
        setIsSaved(true)
      }
    } catch (error) {
      console.error('Error saving debate:', error)
      alert('Error saving debate. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (!category) return <div className="p-6 text-white bg-gray-800 min-h-screen">Category not found</div>
  if (subItemName && !subItem) return <div className="p-6 text-white bg-gray-800 min-h-screen">Item not found</div>

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
                    <div className="absolute z-20 w-96 p-6 bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl border border-red-200 mt-2 left-0 pointer-events-none">
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

  // Show detailed debate format for specific subcategory
  return (
    <main className="min-h-screen w-full text-slate-900 relative">
      <FlagBackdrop />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12 relative z-10">
        <div className="mb-6 flex items-center justify-between">
          <Link 
            to={`/debates/${category.id}`} 
            className="group inline-flex items-center gap-2 text-sm text-red-700 transition hover:text-red-900"
          >
            <ChevronLeft size={18} /> Back to {category.title}
          </Link>
        </div>

        <div className="mb-6 rounded-3xl border border-red-200 bg-white p-6 shadow-[0_10px_40px_rgba(178,34,52,0.35)]">
          <div className="mb-2 flex items-center gap-2 text-red-800">
            <Shield className="h-5 w-5" />
            <h1 className="text-xl font-semibold tracking-wide sm:text-2xl">Political Debate Breakdown</h1>
          </div>
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm sm:text-base">
            <div className="text-red-600">Topic</div>
            <p className="text-slate-900">{subItem.topic}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5">
          {/* Republican/Conservative Stance */}
          <SectionCard title="Republican / Conservative Stance" icon={<Shield size={14} />}> 
            <div className="space-y-4">
              <p><span className="font-semibold">Simple Summary: </span>{subItem.republican?.summary}</p>
              <p><span className="font-semibold">Why this view: </span>{subItem.republican?.reasoning}</p>
              <Collapsible label="Evidence & Sources">
                <div className="mt-3 flex flex-wrap gap-2">
                  {subItem.republican?.sources?.map((source, i) => (
                    typeof source === 'string' && source.includes('http') ? (
                      <SourceLink key={i} href={source}>{source}</SourceLink>
                    ) : (
                      <div key={i} className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-800 shadow-sm ring-1 ring-inset ring-red-200">
                        {source}
                      </div>
                    )
                  ))}
                </div>
              </Collapsible>
            </div>
          </SectionCard>

          {/* Democratic/Liberal Rebuttal */}
          <SectionCard title="Democratic / Liberal Rebuttal" icon={<Scale size={14} />}> 
            <div className="space-y-4">
              <p><span className="font-semibold">Simple Summary: </span>{subItem.democratic?.summary}</p>
              <p><span className="font-semibold">Why they disagree: </span>{subItem.democratic?.reasoning}</p>
              <Collapsible label="Evidence & Sources">
                <div className="mt-3 flex flex-wrap gap-2">
                  {subItem.democratic?.sources?.map((source, i) => (
                    typeof source === 'string' && source.includes('http') ? (
                      <SourceLink key={i} href={source}>{source}</SourceLink>
                    ) : (
                      <div key={i} className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-800 shadow-sm ring-1 ring-inset ring-red-200">
                        {source}
                      </div>
                    )
                  ))}
                </div>
              </Collapsible>
            </div>
          </SectionCard>

          {/* Key Vocabulary/Framing */}
          <SectionCard title="Key Vocabulary / Framing" icon={<BookOpenText size={14} />}> 
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {subItem.vocabulary?.map((term, i) => (
                <li key={i} className="rounded-lg bg-red-50 px-3 py-2 text-slate-800 ring-1 ring-red-200">{term}</li>
              ))}
            </ul>
          </SectionCard>

          {/* My Take */}
          <SectionCard title="My Take" icon={<PenLine size={14} />}> 
            <label className="mb-2 block text-sm text-slate-700">Write your own opinion after reading both sides:</label>
            <textarea
              rows={4}
              placeholder="What makes sense to you? What questions do you still have?"
              defaultValue={subItem.myTake}
              className="w-full resize-y rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </SectionCard>
        </div>

        {/* Navigation */}
        <div className="mt-6 flex flex-wrap gap-3 justify-between items-center">
          <div className="flex flex-wrap gap-3">
            <Link
              to={`/debates/${category.id}`}
              className="inline-flex items-center justify-center rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700 shadow transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Back to {category.title}
            </Link>
            <Link
              to="/debates"
              className="inline-flex items-center justify-center rounded-xl bg-[#B22234] px-4 py-2 text-sm font-semibold text-white shadow transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              All Categories
            </Link>
          </div>

          {user && (
            <div className="flex gap-3">
              <button
                onClick={() => setShowNoteModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 text-sm font-semibold transition"
              >
                <PenTool size={16} />
                Add Note
              </button>
              
              <button
                onClick={handleSaveDebate}
                disabled={saving}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition ${
                  isSaved
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } disabled:opacity-50`}
              >
                {saving ? (
                  'Saving...'
                ) : isSaved ? (
                  <>
                    <BookmarkCheck size={16} />
                    Saved
                  </>
                ) : (
                  <>
                    <Bookmark size={16} />
                    Save Debate
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Quick Note Modal */}
        {user && (
          <QuickNoteModal
            isOpen={showNoteModal}
            onClose={() => setShowNoteModal(false)}
            user={user}
            categoryId={category.id}
            subItemName={subItem.name}
          />
        )}
      </div>
    </main>
  )
}

export default DebateDetail