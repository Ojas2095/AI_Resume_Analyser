import React from 'react';
import { Link } from 'react-router-dom';

const Features = () => {
  const features = [
    {
      title: 'Advanced AI Analysis',
      description: 'Our cutting-edge AI engine analyzes your resume content, structure, and formatting to provide comprehensive feedback.',
      icon: '🧠',
      details: ['Natural language processing', 'Content quality assessment', 'Formatting evaluation'],
      color: 'from-blue-600 to-cyan-600'
    },
    {
      title: 'Skill Gap Identification',
      description: 'Automatically detect missing skills for your target role and get specific recommendations to bridge the gaps.',
      icon: '🎯',
      details: ['Role-specific analysis', 'Skill matching algorithms', 'Personalized learning paths'],
      color: 'from-purple-600 to-pink-600'
    },
    {
      title: 'Comprehensive Scoring',
      description: 'Receive a detailed score breakdown with explanations for each component of your resume evaluation.',
      icon: '📊',
      details: ['Overall score calculation', 'Component-wise breakdown', 'Improvement priorities'],
      color: 'from-green-600 to-teal-600'
    },
    {
      title: 'AI-Powered Suggestions',
      description: 'Get intelligent, actionable suggestions to improve your resume based on industry best practices.',
      icon: '💡',
      details: ['Context-aware recommendations', 'Industry-specific advice', 'Impact-focused improvements'],
      color: 'from-orange-600 to-red-600'
    },
    {
      title: 'Multi-Format Support',
      description: 'Upload your resume in PDF or DOCX format. Our system handles various layouts and structures.',
      icon: '📄',
      details: ['PDF parsing', 'DOCX processing', 'Layout preservation'],
      color: 'from-indigo-600 to-purple-600'
    },
    {
      title: 'Instant Results',
      description: 'Get your resume analysis in seconds, not hours. Fast feedback for quick iterations.',
      icon: '⚡',
      details: ['Real-time processing', 'Quick turnaround', 'Immediate insights'],
      color: 'from-yellow-600 to-orange-600'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Software Engineer',
      content: 'ResumePro helped me identify key skills I was missing for my dream job. I landed the position within a month!',
      rating: 5,
      avatar: '👩‍💻'
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager',
      content: 'The AI suggestions were spot-on. My resume went from good to outstanding with their recommendations.',
      rating: 5,
      avatar: '👨‍💼'
    },
    {
      name: 'Emily Davis',
      role: 'Data Scientist',
      content: 'The detailed scoring breakdown helped me understand exactly what to improve. Highly recommend!',
      rating: 5,
      avatar: '👩‍🔬'
    }
  ];

  const steps = [
    { number: '01', title: 'Upload Your Resume', desc: 'Upload your resume in PDF or DOCX format', icon: '📤' },
    { number: '02', title: 'AI Analysis', desc: 'Our AI analyzes your resume against job requirements', icon: '🤖' },
    { number: '03', title: 'Get Results', desc: 'Receive detailed feedback and improvement suggestions', icon: '📊' }
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark text-foreground-light dark:text-foreground-dark">
      {/* Hero Section */}
      <section className="bg-primary-to-secondary text-foreground-light dark:text-foreground-dark py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-primary-to-secondary bg-clip-text text-transparent">
            Powerful Features for Success
          </h1>
          <p className="text-xl text-foreground-light/80 dark:text-foreground-dark/80 max-w-3xl mx-auto leading-relaxed">
            Discover how our AI-powered platform can transform your resume and boost your career prospects.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-surface-light dark:bg-surface-dark p-8 rounded-2xl shadow-2xl hover:shadow-primary/10 transition-all border border-glass-border-light dark:border-glass-border-dark hover:border-primary/30 group">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-3xl">{feature.icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground-light dark:text-foreground-dark">{feature.title}</h3>
                </div>
                <p className="text-foreground-light/80 dark:text-foreground-dark/80 mb-8 text-lg leading-relaxed">{feature.description}</p>
                <ul className="space-y-4">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center text-foreground-light/80 dark:text-foreground-dark/80 group-hover:text-foreground-light/90 dark:group-hover:text-foreground-dark/90 transition-colors">
                      <div className="w-3 h-3 bg-primary rounded-full mr-4 flex-shrink-0 relative">
                        <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-50"></div>
                      </div>
                      <span className="text-lg">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground-light dark:text-foreground-dark mb-6">
              How It <span className="text-primary">Works</span>
            </h2>
            <p className="text-xl text-foreground-light/60 dark:text-foreground-dark/60">Simple steps to transform your resume</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="bg-primary w-24 h-24 rounded-2xl flex items-center justify-center text-surface-light dark:text-surface-dark text-4xl font-bold mx-auto mb-6 shadow-lg transition-all">
                  {step.icon}
                </div>
                <div className="text-sm text-primary font-bold mb-2">{step.number}</div>
                <h3 className="text-2xl font-bold text-foreground-light dark:text-foreground-dark mb-4">{step.title}</h3>
                <p className="text-foreground-light/60 dark:text-foreground-dark/60 text-lg">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-surface-light dark:bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground-light dark:text-foreground-dark mb-6">
              What Our <span className="text-secondary">Users Say</span>
            </h2>
            <p className="text-xl text-foreground-light/60 dark:text-foreground-dark/60">Real success stories from job seekers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-glass-bg-light dark:bg-glass-bg-dark p-8 rounded-2xl shadow-2xl hover:shadow-secondary/10 transition-all border border-glass-border-light dark:border-glass-border-dark hover:border-secondary/30">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center text-3xl mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-foreground-light dark:text-foreground-dark text-lg">{testimonial.name}</div>
                    <div className="text-foreground-light/60 dark:text-foreground-dark/60">{testimonial.role}</div>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-secondary text-lg">⭐</span>
                  ))}
                </div>
                <p className="text-foreground-light/80 dark:text-foreground-dark/80 text-lg italic leading-relaxed">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary-to-secondary text-foreground-light dark:text-foreground-dark relative">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Ready to Experience These Features?
          </h2>
          <p className="text-xl mb-12 text-foreground-light/80 dark:text-foreground-dark/80 leading-relaxed">
            Join thousands of successful job seekers who have improved their resumes with ResumePro.
          </p>
          <Link
            to="/dashboard"
            className="bg-primary-to-secondary hover:opacity-80 text-surface-light dark:text-surface-dark font-bold py-5 px-12 rounded-xl text-xl transition-all transform hover:scale-105 shadow-2xl inline-block"
          >
            🚀 Try It Now - Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Features;