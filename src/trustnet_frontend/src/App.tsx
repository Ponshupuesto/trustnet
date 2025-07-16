import React, { useState, useEffect } from 'react';
import { ChevronDown, Users, Vote, Calendar, Shield, Globe, Zap, ArrowRight, Menu, X, CheckCircle, Link2, Wallet, Eye } from 'lucide-react';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: Users, text: "Crea tu propia red con tus reglas", color: "from-purple-500 to-pink-500" },
    { icon: Vote, text: "Genera propuestas y vota", color: "from-blue-500 to-cyan-500" },
    { icon: Wallet, text: "Administra fondos transparentemente", color: "from-green-500 to-emerald-500" },
    { icon: Calendar, text: "Comparte calendarios y actividades", color: "from-orange-500 to-red-500" },
    { icon: Link2, text: "Conecta con otras redes", color: "from-indigo-500 to-purple-500" },
    { icon: Eye, text: "Todo transparente y auditable", color: "from-pink-500 to-rose-500" }
  ];

  const benefits = [
    { icon: Shield, title: "Seguro y Descentralizado", desc: "Tus datos protegidos en blockchain" },
    { icon: Eye, title: "Transparencia Total", desc: "Todas las decisiones son públicas y auditables" },
    { icon: Users, title: "Gobernanza Comunitaria", desc: "Las decisiones las toma la comunidad" },
    { icon: Globe, title: "Escala Global", desc: "Desde lo local hasta lo internacional" }
  ];

  const useCases = [
    { title: "Comunidades Locales", desc: "Organiza tu edificio, calle o barrio", gradient: "from-amber-400 to-orange-500" },
    { title: "Organizaciones Estudiantiles", desc: "Comités y grupos universitarios", gradient: "from-blue-400 to-indigo-500" },
    { title: "Redes Profesionales", desc: "Conecta con colegas y proyectos", gradient: "from-green-400 to-teal-500" },
    { title: "DAOs y Colectivos", desc: "Organizaciones descentralizadas", gradient: "from-purple-400 to-pink-500" }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/10 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 3 + 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-black/80 backdrop-blur-lg' : ''}`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Trustnet
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="hover:text-purple-400 transition-colors">Características</a>
              <a href="#benefits" className="hover:text-purple-400 transition-colors">Beneficios</a>
              <a href="#use-cases" className="hover:text-purple-400 transition-colors">Casos de Uso</a>
              <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all transform hover:scale-105">
                Iniciar Sesión
              </button>
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-white/10">
            <div className="flex flex-col p-6 space-y-4">
              <a href="#features" className="hover:text-purple-400 transition-colors">Características</a>
              <a href="#benefits" className="hover:text-purple-400 transition-colors">Beneficios</a>
              <a href="#use-cases" className="hover:text-purple-400 transition-colors">Casos de Uso</a>
              <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full">
                Iniciar Sesión
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Crea la red
              </span>
              <br />
              <span className="text-white">que necesitas</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              La plataforma para crear y gestionar redes de cualquier tipo, 
              de forma sencilla, segura y completamente transparente.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-lg font-semibold hover:shadow-xl hover:shadow-purple-500/25 transition-all transform hover:scale-105 flex items-center gap-2">
                Crear mi Red
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 border border-white/20 rounded-full text-lg hover:bg-white/10 transition-all">
                Ver Demo
              </button>
            </div>
          </div>

          <div className="mt-16 flex justify-center">
            <ChevronDown className="w-8 h-8 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 px-6">
        <div className="container mx-auto max-w-6xl relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Todo lo que puedes hacer
            </span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`group relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300 transform hover:scale-105 ${
                    activeFeature === index ? 'ring-2 ring-purple-500' : ''
                  }`}
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`} />
                  <div className="relative z-10 flex items-start space-x-4">
                    <div className={`p-3 bg-gradient-to-br ${feature.color} rounded-lg`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <CheckCircle className="w-5 h-5 text-green-400 mb-2" />
                      <p className="text-lg">{feature.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="relative py-20 px-6 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent">
        <div className="container mx-auto max-w-6xl relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Respaldado por Internet Computer
            </span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="text-center space-y-4 group"
                >
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                    <div className="relative p-6 bg-black rounded-full border border-white/20">
                      <Icon className="w-12 h-12" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold">{benefit.title}</h3>
                  <p className="text-gray-400">{benefit.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="relative py-20 px-6">
        <div className="container mx-auto max-w-6xl relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Para todo tipo de redes
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${useCase.gradient} opacity-0 group-hover:opacity-20 transition-opacity`} />
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-3">{useCase.title}</h3>
                  <p className="text-gray-300">{useCase.desc}</p>
                </div>
                <Zap className="absolute bottom-4 right-4 w-8 h-8 text-white/10 group-hover:text-white/30 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6">
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="relative p-12 rounded-3xl bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-sm border border-white/20 text-center space-y-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 animate-pulse" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Inicia sesión, crea tu red y<br />
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  haz que las cosas pasen
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Trustnet: redes que confían, redes que construyen.
              </p>
              <button className="group px-10 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-lg font-semibold hover:shadow-xl hover:shadow-purple-500/25 transition-all transform hover:scale-105 flex items-center gap-3 mx-auto">
                Comenzar Ahora
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-white/10">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold">Trustnet</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2025 Trustnet. Construido en Internet Computer Protocol.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;