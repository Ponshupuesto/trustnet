// src/pages/LandingPage.tsx
import { CheckCircle, Network, Users, ShieldCheck, Sparkles } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      {/* Hero */}
      <section className="bg-blue-500 text-white px-6 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Trustnet</h1>
        <p className="text-xl md:text-2xl mb-6">
          Crea la red que necesitas. Organiza, vota, administra fondos y conecta con otros… de forma totalmente transparente.
        </p>
        <button className="bg-blue-600 text-white font-bold py-2 px-6 rounded hover:bg-blue-700 transition">
  Iniciar sesión
</button>

      </section>

      {/* ¿Qué es Trustnet? */}
      <section className="px-6 py-16 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">¿Qué es Trustnet?</h2>
        <p className="text-lg text-gray-700">
          Trustnet es una plataforma que te permite crear y gestionar redes de cualquier tipo, de forma sencilla, segura y descentralizada.
          Desde una junta vecinal hasta una DAO internacional.
        </p>
      </section>

      {/* Lo que puedes hacer */}
      <section className="bg-white px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">¿Qué puedes hacer con Trustnet?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { icon: Users, title: "Crear redes", desc: "Reúne personas, crea tus reglas y asigna roles." },
            { icon: CheckCircle, title: "Votar propuestas", desc: "Toma decisiones en comunidad con mecanismos auditables." },
            { icon: ShieldCheck, title: "Administrar fondos", desc: "Gestiona recursos y sube evidencias del uso de fondos." },
            { icon: Sparkles, title: "Compartir calendarios", desc: "Organiza actividades, acuerdos y documentos." },
            { icon: Network, title: "Conectar redes", desc: "Colabora o inspírate con otras redes del ecosistema." },
          ].map(({ icon: Icon, title, desc }, i) => (
            <div key={i} className="flex flex-col items-center text-center space-y-4">
              <Icon className="w-12 h-12 text-blue-600" />
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ICP Section */}
      <section className="bg-gray-100 px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Tecnología ICP</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Todo está respaldado por Internet Computer Protocol (ICP):
          sin servidores centralizados, con datos seguros, votaciones descentralizadas y total transparencia.
        </p>
      </section>

      {/* Casos de uso */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Usos posibles de Trustnet</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-800">
          <div>
            <h3 className="font-semibold">🏘️ Comunidades locales</h3>
            <p>Organiza tu colonia, calle o edificio.</p>
          </div>
          <div>
            <h3 className="font-semibold">🏫 Redes escolares</h3>
            <p>Organiza el PTA o actividades estudiantiles.</p>
          </div>
          <div>
            <h3 className="font-semibold">🌐 DAOs y proyectos Web3</h3>
            <p>Crea propuestas, conecta wallets y administra tu tesorería en cadena.</p>
          </div>
          <div>
            <h3 className="font-semibold">🤝 Redes profesionales y de colaboración</h3>
            <p>Conecta personas por afinidad o propósito común.</p>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-blue-600 text-white px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Empieza a construir tu red ahora</h2>
        <p className="text-lg mb-6">Regístrate, crea tu red y haz que las cosas pasen.</p>
        <button className="bg-blue-600 text-white font-bold py-2 px-6 rounded hover:bg-blue-700 transition">
  Iniciar sesión
</button>

      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6 text-sm">
        Trustnet © 2025. Construyendo redes que confían.
      </footer>
    </div>
  );
}
