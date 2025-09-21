import { Link } from 'react-router-dom'

function Debates() {
  console.log('Debates component loaded'); // Debug log
  const categories = [
    { id: 1, title: '🏛 Government & Constitution' },
    { id: 2, title: '💵 Economy & Taxes' },
    { id: 3, title: '👨‍👩‍👧 Society & Culture' },
    { id: 4, title: '🏥 Healthcare' },
    { id: 5, title: '🚨 Law & Order' },
    { id: 6, title: '🌍 Immigration' },
    { id: 7, title: '🌱 Environment & Energy' },
    { id: 8, title: '🎓 Education' },
    { id: 9, title: '🌐 Foreign Policy' },
    { id: 10, title: '👨‍👩‍👧 Family & Morality' },
    { id: 11, title: '🏛 Religion in Public Life' },
    { id: 12, title: '📚 Education & Culture' },
    { id: 13, title: '🎭 Culture & Media' },
  ]

  return (
    <div className="p-6 text-white bg-gray-800 min-h-screen" style={{ backgroundImage: 'url(/republican-flag.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <h1 className="text-3xl font-bold mb-6">Republican Arguments</h1>
      <ul className="space-y-4">
        {categories.map(category => (
          <li key={category.id}>
            <Link
              to={`/debates/category/${category.id}`}
              className="text-red-400 hover:text-red-300 text-lg underline"
            >
              {category.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Debates