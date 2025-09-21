import { Flag, Target, Users, BookOpen, Shield } from 'lucide-react'

function About() {
  return (
    <div className="relative min-h-screen">
      {/* Background Flag */}
      <div className="fixed inset-0 bg-cover bg-center opacity-50 -z-10" style={{ backgroundImage: 'url(/republican-flag.png)' }}></div>
      
      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-white/50 via-white/70 to-white/80 -z-10"></div>

      <div className="relative z-10 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Flag size={40} className="text-red-600" />
              <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">
                About This Site
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A comprehensive platform for understanding political debates through structured analysis 
              and evidence-based arguments.
            </p>
          </div>

          {/* Mission Section */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border-t-4 border-red-600">
              <div className="flex items-center gap-3 mb-6">
                <Target size={32} className="text-red-600" />
                <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                We believe informed citizens make better democratic decisions. This platform presents 
                Republican political positions alongside Democratic rebuttals in a structured, educational format.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our goal is to help users understand the reasoning, evidence, and values behind different 
                political perspectives, fostering more thoughtful political discourse.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border-t-4 border-blue-600">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen size={32} className="text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-800">How It Works</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Each topic follows our structured debate format: Republican stance with reasoning 
                and sources, Democratic rebuttal with counterarguments, key vocabulary differences, 
                and space for personal analysis.
              </p>
              <p className="text-gray-700 leading-relaxed">
                This format helps users see how each side frames issues differently and understand 
                the underlying values that drive political disagreements.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg">
              <Shield size={40} className="text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Evidence-Based</h3>
              <p className="text-gray-600">
                All arguments include credible sources, studies, and expert opinions to support claims.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg">
              <Users size={40} className="text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Balanced Approach</h3>
              <p className="text-gray-600">
                Both perspectives receive equal treatment with fair representation of each side's strongest arguments.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg">
              <BookOpen size={40} className="text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Educational Focus</h3>
              <p className="text-gray-600">
                Designed for learning and understanding rather than persuasion or advocacy.
              </p>
            </div>
          </div>

          {/* Disclaimer Section */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Important Notes</h2>
            
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong className="text-red-600">Educational Purpose:</strong> This site is designed for 
                educational and informational purposes only. The content presented does not necessarily 
                reflect the views of the site creators.
              </p>
              
              <p>
                <strong className="text-blue-600">Source Verification:</strong> While we strive for accuracy, 
                users are encouraged to verify information independently and consult multiple sources when 
                forming their own opinions.
              </p>
              
              <p>
                <strong className="text-red-600">Evolving Content:</strong> Political positions and evidence 
                evolve over time. We regularly update content to reflect current arguments and new research.
              </p>
              
              <p>
                <strong className="text-blue-600">Your Analysis:</strong> The "My Take" sections are designed 
                to encourage critical thinking and personal reflection on the presented arguments.
              </p>
            </div>
          </div>

          {/* Contact/Feedback Section */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-red-600 to-blue-600 rounded-2xl p-8 text-white shadow-xl">
              <h2 className="text-3xl font-bold mb-4">Have Feedback?</h2>
              <p className="text-lg opacity-90 mb-6">
                We're committed to improving this platform and welcome your thoughts on how to make 
                political education more accessible and effective.
              </p>
              <p className="text-sm opacity-80">
                This platform is continuously evolving to better serve civic education needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About