import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const features = [
    {
      title: 'AI-Powered Analysis',
      description: 'Get intelligent feedback on your resume with advanced AI technology.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      bullets: ['Deep learning algorithms', 'Natural language processing', 'Pattern recognition']
    },
    {
      title: 'Skill Gap Detection',
      description: 'Identify missing skills and get personalized recommendations.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      bullets: ['Job role matching', 'Industry standards', 'Career progression']
    },
    {
      title: 'Performance Scoring',
      description: 'Receive a comprehensive score with detailed breakdown.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      bullets: ['Multi-dimensional scoring', 'Benchmarking', 'Improvement tracking']
    },
    {
      title: 'Enterprise Security',
      description: 'Your data is encrypted and processed securely.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      bullets: ['End-to-end encryption', 'Data privacy compliance', 'Secure cloud processing']
    }
  ];

  const stats = [
    { number: '10K+', label: 'Analysis Runs' },
    { number: '95%', label: 'Success Rate' },
    { number: '50+', label: 'Industries' },
    { number: '24/7', label: 'Availability' }
  ];

  return (
    <div className="flex flex-col min-h-screen animate-page-in">
      {/* Hero Section */}
      <section className="relative pt-32 pb-32 overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/10 blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass border border-primary/20 mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm font-medium text-primary">New: GPT-4o Powered Analysis</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            Elevate Your Career with <br />
            <span className="bg-primary-to-secondary bg-clip-text text-transparent">AI Precision</span>
          </h1>

          <p className="max-w-2xl mx-auto text-xl text-foreground-light/70 dark:text-foreground-dark/70 mb-12 leading-relaxed">
            Get professional, actionable insights in seconds. Our advanced AI evaluates your resume against industry standards to help you stand out.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-10 py-4 bg-primary hover:bg-primary/95 text-white font-bold rounded-2xl shadow-xl shadow-primary/20 transition-all-custom transform hover:scale-105"
            >
              Analyze My Resume
            </Link>
            <Link
              to="/features"
              className="w-full sm:w-auto px-10 py-4 glass hover:bg-primary/5 text-foreground-light dark:text-foreground-dark font-bold rounded-2xl border border-glass-border-light dark:border-glass-border-dark transition-all-custom"
            >
              Learn More
            </Link>
          </div>

          {/* Hero Image / Mockup Placeholder */}
          <div className="mt-20 relative px-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="max-w-5xl mx-auto glass rounded-3xl border border-glass-border-light dark:border-glass-border-dark shadow-2xl overflow-hidden aspect-video flex items-center justify-center bg-surface-light/30 dark:bg-surface-dark/30 ai-glow group relative cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-background-light/80 to-transparent dark:from-background-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end justify-center pb-8 text-sm font-bold tracking-widest uppercase">
                Interactive Dashboard Preview
              </div>
              <img
                src="/dashboard-preview.png"
                alt="Interactive Dashboard Preview"
                className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 border-y border-glass-border-light dark:border-glass-border-dark bg-surface-light/50 dark:bg-surface-dark/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-extrabold text-foreground-light dark:text-foreground-dark mb-2">{stat.number}</div>
                <div className="text-sm font-semibold uppercase tracking-wider text-primary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Built for Success</h2>
            <p className="text-xl text-foreground-light/70 dark:text-foreground-dark/70 max-w-2xl mx-auto">
              Everything you need to optimize your professional profile and land more interviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-3xl glass border border-glass-border-light dark:border-glass-border-dark hover:border-primary/30 transition-all-custom ai-glow overflow-hidden"
              >
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-foreground-light/70 dark:text-foreground-dark/70 mb-8 leading-relaxed">
                  {feature.description}
                </p>
                <ul className="grid grid-cols-1 gap-3">
                  {feature.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-center text-sm font-medium text-foreground-light/80 dark:text-foreground-dark/80">
                      <svg className="w-5 h-5 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden glass border border-primary/20 ai-glow">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />

          <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to transform?</h2>
          <p className="text-xl text-foreground-light/70 dark:text-foreground-dark/70 mb-12 max-w-xl mx-auto">
            Join thousands of professionals who have advanced their careers with our AI tools.
          </p>
          <Link
            to="/dashboard"
            className="inline-block px-12 py-5 bg-primary hover:bg-primary/95 text-white font-bold rounded-2xl shadow-2xl shadow-primary/30 transition-all-custom transform hover:scale-105"
          >
            Start Analysis Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
