import React from 'react';

const About = () => {
  const team = [
    {
      name: 'Dr. Alex Thompson',
      role: 'AI Research Lead',
      bio: 'PhD in Machine Learning with 10+ years experience in NLP and computer vision.',
      image: '👨‍🔬',
      color: 'from-blue-600 to-cyan-600'
    },
    {
      name: 'Sarah Chen',
      role: 'Product Manager',
      bio: 'Former HR executive with expertise in talent acquisition and career development.',
      image: '👩‍💼',
      color: 'from-purple-600 to-pink-600'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Lead Developer',
      bio: 'Full-stack developer specializing in AI-powered applications and scalable systems.',
      image: '👨‍💻',
      color: 'from-green-600 to-teal-600'
    }
  ];

  const values = [
    {
      title: 'Innovation',
      description: 'We leverage cutting-edge AI technology to revolutionize resume analysis.',
      icon: '🚀',
      color: 'from-orange-600 to-red-600'
    },
    {
      title: 'Accuracy',
      description: 'Our AI models are trained on millions of resumes and job postings for precise analysis.',
      icon: '🎯',
      color: 'from-blue-600 to-indigo-600'
    },
    {
      title: 'Accessibility',
      description: 'Making professional resume feedback available to everyone, regardless of background.',
      icon: '🌍',
      color: 'from-green-600 to-blue-600'
    },
    {
      title: 'Privacy',
      description: 'Your resume data is encrypted and never shared with third parties.',
      icon: '🔒',
      color: 'from-purple-600 to-blue-600'
    }
  ];

  const impact = [
    { icon: '📈', text: 'Helped 10,000+ job seekers improve their resumes', color: 'from-blue-600 to-purple-600' },
    { icon: '⭐', text: 'Achieved 95% user satisfaction rate', color: 'from-yellow-600 to-orange-600' },
    { icon: '💼', text: 'Supported 50+ different job roles', color: 'from-green-600 to-teal-600' },
    { icon: '⚡', text: 'Available 24/7 for instant feedback', color: 'from-purple-600 to-pink-600' }
  ];

  const techFeatures = [
    {
      title: 'Natural Language Processing',
      desc: 'Our advanced NLP models understand context, extract skills, and analyze resume quality with human-like comprehension.',
      features: ['Named Entity Recognition for skill extraction', 'Sentiment analysis for content quality', 'Contextual understanding of job requirements'],
      icon: '🧠'
    },
    {
      title: 'Machine Learning Models',
      desc: 'Trained on millions of successful resumes and job postings to provide accurate, industry-specific recommendations.',
      features: ['Classification models for role matching', 'Regression models for scoring algorithms', 'Transformer-based language models for suggestions'],
      icon: '🤖'
    }
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark text-foreground-light dark:text-foreground-dark">
      {/* Hero Section */}
      <section className="bg-primary-to-secondary text-foreground-light dark:text-foreground-dark py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-primary-to-secondary bg-clip-text text-transparent">
              About <span className="text-surface-light dark:text-surface-dark">ResumePro</span>
            </h1>
            <p className="text-xl text-foreground-light/80 dark:text-foreground-dark/80 leading-relaxed">
              We're on a mission to democratize career advancement by providing AI-powered resume analysis
              that helps job seekers present their best selves to potential employers.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-surface-light dark:bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md-text-5xl font-bold text-foreground-light dark:text-foreground-dark mb-6">
                Our <span className="text-primary">Mission</span>
              </h2>
              <p className="text-lg text-foreground-light/80 dark:text-foreground-dark/80 mb-6 leading-relaxed">
                In today's competitive job market, a well-crafted resume can make the difference between
                getting an interview and being overlooked. We believe that everyone deserves access to
                professional-level resume feedback, regardless of their budget or connections.
              </p>
              <p className="text-lg text-foreground-light/80 dark:text-foreground-dark/80 leading-relaxed">
                By combining advanced artificial intelligence with deep industry knowledge, we provide
                instant, actionable feedback that helps job seekers optimize their resumes and land
                their dream jobs.
              </p>
            </div>
            <div className="bg-glass-bg-light dark:bg-glass-bg-dark p-8 rounded-2xl shadow-2xl border border-glass-border-light dark:border-glass-border-dark">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-foreground-light dark:text-foreground-dark mb-6">Our Impact</h3>
              <ul className="space-y-4">
                {impact.map((item, idx) => (
                  <li key={idx} className="flex items-center text-foreground-light/80 dark:text-foreground-dark/80">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mr-4 shadow-lg">
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <span className="text-lg">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md-text-5xl font-bold text-foreground-light dark:text-foreground-dark mb-6">
              Our <span className="text-secondary">Values</span>
            </h2>
            <p className="text-xl text-foreground-light/60 dark:text-foreground-dark/60">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-surface-light dark:bg-surface-dark p-8 rounded-2xl shadow-2xl hover:shadow-primary/10 transition-all border border-glass-border-light dark:border-glass-border-dark hover:border-primary/30 group">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-3xl">{value.icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground-light dark:text-foreground-dark">{value.title}</h3>
                </div>
                <p className="text-foreground-light/80 dark:text-foreground-dark/80 text-lg leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-surface-light dark:bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md-text-5xl font-bold text-foreground-light dark:text-foreground-dark mb-6">
              Meet Our <span className="text-primary">Team</span>
            </h2>
            <p className="text-xl text-foreground-light/60 dark:text-foreground-dark/60">The experts behind ResumePro</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-glass-bg-light dark:bg-glass-bg-dark p-8 rounded-2xl shadow-2xl hover:shadow-primary/10 transition-all border border-glass-border-light dark:border-glass-border-dark hover:border-primary/30 text-center group">
                <div className="w-24 h-24 bg-secondary rounded-2xl flex items-center justify-center text-5xl mx-auto mb-6 shadow-lg">
                  {member.image}
                </div>
                <h3 className="text-2xl font-bold text-foreground-light dark:text-foreground-dark mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-4">{member.role}</p>
                <p className="text-foreground-light/80 dark:text-foreground-dark/80 text-lg leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-24 bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md-text-5xl font-bold text-foreground-light dark:text-foreground-dark mb-6">
              Our <span className="text-primary">Technology</span>
            </h2>
            <p className="text-xl text-foreground-light/60 dark:text-foreground-dark/60">Powered by cutting-edge AI and machine learning</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {techFeatures.map((tech, index) => (
              <div key={index} className="bg-surface-light dark:bg-surface-dark p-8 rounded-2xl shadow-2xl border border-glass-border-light dark:border-glass-border-dark">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-3xl">{tech.icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground-light dark:text-foreground-dark">{tech.title}</h3>
                </div>
                <p className="text-foreground-light/80 dark:text-foreground-dark/80 mb-8 text-lg leading-relaxed">{tech.desc}</p>
                <ul className="space-y-4">
                  {tech.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-foreground-light/80 dark:text-foreground-dark/80">
                      <div className="w-3 h-3 bg-primary rounded-full mr-4 flex-shrink-0 relative">
                        <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-50"></div>
                      </div>
                      <span className="text-lg">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 bg-primary-to-secondary text-foreground-light dark:text-foreground-dark relative">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md-text-5xl font-bold mb-8">
            Have Questions?
          </h2>
          <p className="text-xl mb-12 text-foreground-light/80 dark:text-foreground-dark/80 leading-relaxed">
            We'd love to hear from you. Reach out to learn more about how ResumePro can help your career.
          </p>
          <button className="bg-primary-to-secondary hover:opacity-80 text-surface-light dark:text-surface-dark font-bold py-5 px-12 rounded-xl text-xl transition-all transform hover:scale-105 shadow-2xl">
            📧 Contact Us
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;