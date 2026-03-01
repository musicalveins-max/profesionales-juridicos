/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Scale, 
  Users, 
  Briefcase, 
  ChevronRight,
  Clock,
  ShieldCheck,
  Heart,
  Building2,
  HardHat,
  Gavel,
  Home,
  ShieldAlert,
  Send,
  X,
  Loader2,
  User
} from 'lucide-react';

// --- Types ---

interface Lawyer {
  name: string;
  role: string;
  specialties: string[];
  image: string;
}

// --- Data ---

const LAWYERS: Lawyer[] = [
  {
    name: "Álvaro Tovar",
    role: "Representante Legal Abogado",
    specialties: [
      "Derecho civil: Contratos",
      "Obligaciones y responsabilidad civil",
      "Gestión de cobro de cartera",
      "Propiedad horizontal",
      "Derecho laboral",
      "Derecho probatorio y procesal",
      "Derecho de familia"
    ],
    image: "https://drive.google.com/thumbnail?id=1PGxEveizwhaCZ5ttBMCpDtQ_97uDPcV7&sz=w1000"
  },
  {
    name: "Laura Tovar",
    role: "Abogada",
    specialties: ["Pertenencia", "Divisorio", "Restitución de bien inmueble", "Divorcios", "Sucesiones"],
    image: "https://drive.google.com/thumbnail?id=1D-QYIOhKWVamR1yjnBJWJBK24DAZjFo4&sz=w1000"
  },
  {
    name: "Ingrid Ramírez",
    role: "Abogada",
    specialties: ["Sucesiones", "Procesos laborales", "Monitorios", "Indemnizaciones despido sin justa causa", "Pensiones"],
    image: "https://drive.google.com/thumbnail?id=1zm0jusx1gr13tUwCTYreAhojGbtF7USf&sz=w1000"
  },
  {
    name: "Andrés Peñaloza",
    role: "Abogado",
    specialties: ["Procesos penales (primera y segunda instancia)", "Casación y revisión", "Representación de víctima", "Denuncias", "Querellas"],
    image: "https://drive.google.com/thumbnail?id=1Tc1tzgh6xcnmISbssz2uECd5tsL0wUex&sz=w1000"
  },
  {
    name: "Sandra Fernández",
    role: "Abogada",
    specialties: ["Créditos de libranza", "Procesos ejecutivos", "Asesorías financieras", "Créditos de consumo", "Constitución de empresas"],
    image: "https://drive.google.com/thumbnail?id=1LWxBimmpVaZxWHqxJi_CY1tP64I6EgWN&sz=w1000"
  },
  {
    name: "Sonia Peña",
    role: "Abogada",
    specialties: ["Rendición de cuentas", "Cancelación de patrimonio", "Cobro de obligaciones", "Pertenencia", "Reivindicatorios"],
    image: "https://drive.google.com/thumbnail?id=10s9GMM9xMHjjplQnWj_r-9dyigLxFQtR&sz=w1000"
  },
  {
    name: "Dahjer Ibarra",
    role: "Abogado",
    specialties: ["Representación de víctima", "Procesos ejecutivos", "Representación en comisaría de familia", "Acciones de nulidad y restablecimiento de derecho", "Contratación laboral"],
    image: "https://drive.google.com/thumbnail?id=1Izy1ZAoqtLd_9ob-faUaO8mgCnhwPNX0&sz=w1000"
  },
  {
    name: "Gabriela Ávila",
    role: "Abogada",
    specialties: ["Consultora derecho civil, familia y laboral", "Contratos", "Derechos de petición", "Tutelas"],
    image: "https://drive.google.com/thumbnail?id=1cin4M4lkvuAdU9aF9U0aitA2gOxadgAT&sz=w1000"
  }
];

const SERVICES = [
  {
    title: "Familiar",
    description: "Todo lo relacionado con el derecho de familia: demanda de alimentos, divorcio, custodia, liquidación de sociedad conyugal, entre otros. Contamos con abogados especializados en derecho de familia, dispuestos a ayudarle y asesorarle en cada etapa de su proceso legal.",
    icon: Heart
  },
  {
    title: "Civil",
    description: "Contamos con abogados especializados en derecho civil, preparados para brindar asesoría en relaciones civiles y privadas. Ofrecemos soluciones efectivas a situaciones que afectan la vida cotidiana, garantizando acompañamiento profesional y oportuno.",
    icon: Gavel
  },
  {
    title: "Comercial",
    description: "Asesoría legal para su negocio. Nuestros abogados cuentan con la experiencia necesaria para orientarle y representarle en asuntos relacionados con su empresa. Brindamos acompañamiento permanente en todo lo relacionado con el área comercial.",
    icon: Building2
  },
  {
    title: "Seguridad y Salud en el Trabajo",
    description: "Le asesoramos en la implementación y creación del Sistema de Gestión de Seguridad y Salud en el Trabajo (SG-SST). Nuestro objetivo es prevenir riesgos legales y evitar inconvenientes futuros relacionados con la seguridad social de sus trabajadores.",
    icon: HardHat
  },
  {
    title: "Penal",
    description: "Expertos en el manejo de cualquier situación legal en materia penal. Nuestros abogados penalistas le brindarán asesoría integral y representación legal adecuada según el caso presentado, protegiendo sus derechos en todo momento.",
    icon: ShieldAlert
  },
  {
    title: "Inmobiliario",
    description: "Ofrecemos asesoría en servicios inmobiliarios, desde el saneamiento de la propiedad de inmuebles hasta cobros de cuotas de administración, entre otros. Con nuestro equipo contará con el respaldo necesario para llevar sus procesos a buen término.",
    icon: Home
  }
];

// --- Components ---

const Navbar = ({ onConsultClick }: { onConsultClick: () => void }) => (
  <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-24">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-brand-black flex items-center justify-center rounded-lg shadow-lg">
            <Scale className="text-white w-10 h-10" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-serif font-bold tracking-tight text-gray-900 leading-none">
              Profesionales Jurídicos
            </span>
            <span className="text-sm font-sans font-medium text-gray-500 uppercase tracking-widest">
              de Colombia
            </span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="#inicio" className="hover:text-brand-black transition-colors">Inicio</a>
          <a href="#nosotros" className="hover:text-brand-black transition-colors">Nosotros</a>
          <a href="#servicios" className="hover:text-brand-black transition-colors">Servicios</a>
          <a href="#equipo" className="hover:text-brand-black transition-colors">Equipo</a>
          <a href="#contacto" className="hover:text-brand-black transition-colors">Contacto</a>
          <button 
            onClick={onConsultClick}
            className="flex items-center gap-2 text-white bg-brand-black px-6 py-2.5 rounded-full font-bold hover:bg-gray-800 transition-all shadow-lg"
          >
            <MessageCircle size={18} />
            <span>Consultar ahora</span>
          </button>
        </div>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section id="inicio" className="relative h-[80vh] flex items-center overflow-hidden bg-gray-100">
    <div className="absolute inset-0 opacity-20">
      <img 
        src="https://drive.google.com/thumbnail?id=1cIJagcmjiMNklG8B8U0Dsxwda5v7EFeS&sz=w1920" 
        alt="Justicia" 
        className="w-full h-full object-cover"
      />
    </div>
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-900">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl"
      >
        <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-6 text-gray-900">
          Abogados Profesionales Jurídicos de Colombia
        </h1>
        <p className="text-xl md:text-2xl font-light text-gray-700 mb-8 leading-relaxed">
          Excelencia legal, integridad y compromiso con la justicia en cada caso. 
          Su tranquilidad jurídica es nuestra prioridad.
        </p>
        <div className="flex flex-wrap gap-4">
          <a 
            href="#contacto" 
            className="bg-brand-black text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-all shadow-xl flex items-center gap-2"
          >
            Consultar Ahora <ChevronRight size={20} />
          </a>
          <a 
            href="#equipo" 
            className="border border-brand-black/20 backdrop-blur-sm text-brand-black px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-black/5 transition-all"
          >
            Ver Nuestro Equipo
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

const Features = () => (
  <section className="py-24 bg-white border-y border-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-3 gap-12">
        <div className="flex flex-col gap-4">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-brand-black">
            <ShieldCheck size={28} />
          </div>
          <h3 className="text-2xl font-serif font-bold text-gray-900">Confianza Total</h3>
          <p className="text-gray-600 leading-relaxed">
            Manejamos cada caso con la máxima discreción y profesionalismo, 
            asegurando que sus intereses estén siempre protegidos.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-brand-black">
            <Clock size={28} />
          </div>
          <h3 className="text-2xl font-serif font-bold text-gray-900">Respuesta Ágil</h3>
          <p className="text-gray-600 leading-relaxed">
            Entendemos que el tiempo es crucial en asuntos legales. 
            Brindamos asesoría oportuna y efectiva.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-brand-black">
            <Briefcase size={28} />
          </div>
          <h3 className="text-2xl font-serif font-bold text-gray-900">Experiencia Multidisciplinaria</h3>
          <p className="text-gray-600 leading-relaxed">
            Contamos con especialistas en diversas áreas del derecho para 
            ofrecer una solución integral a sus necesidades.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const Services = () => (
  <section id="servicios" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-gray-900">Nuestros Servicios</h2>
        <div className="w-24 h-1 bg-brand-black/10 mx-auto mb-6"></div>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Soluciones legales integrales adaptadas a sus necesidades específicas.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES.map((service, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-gray-50 p-8 rounded-3xl border border-gray-200 hover:border-brand-black/20 transition-all group"
          >
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-black mb-6 group-hover:bg-brand-black group-hover:text-white transition-colors shadow-sm">
              <service.icon size={32} />
            </div>
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">{service.title}</h3>
            <p className="text-gray-600 leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Team = () => (
  <section id="equipo" className="py-24 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-gray-900">Nuestro Equipo de Expertos</h2>
        <div className="w-24 h-1 bg-brand-black/10 mx-auto mb-6"></div>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Profesionales altamente calificados dedicados a defender sus derechos.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {LAWYERS.map((lawyer, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -10 }}
            className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-200 flex flex-col h-full"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img 
                src={lawyer.image} 
                alt={lawyer.name} 
                className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-serif font-bold mb-1 text-gray-900">{lawyer.name}</h3>
              <p className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wider">{lawyer.role}</p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {lawyer.specialties.map((spec, sIdx) => (
                  <span key={sIdx} className="text-[11px] bg-gray-100 px-2 py-1 rounded-md text-gray-700 border border-gray-200">
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Contact = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const summary = `RESUMEN DE CONTACTO
Nombre: ${formData.name}
Asunto: ${formData.subject}
Teléfono: ${formData.phone}
Descripción del caso: ${formData.message}
Nivel de urgencia: Media`;

    const encodedMessage = encodeURIComponent(summary);
    window.open(`https://wa.me/573212021513?text=${encodedMessage}`, '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contacto" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-serif font-bold mb-8 text-gray-900">Contáctenos</h2>
            <p className="text-gray-600 text-lg mb-12 leading-relaxed">
              Estamos listos para escuchar su caso y brindarle la mejor asesoría legal. 
              Visítenos en nuestra oficina o comuníquese por cualquiera de nuestros canales.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-black text-white rounded-full flex items-center justify-center shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900">Ubicación</h4>
                  <p className="text-gray-600">Barrio Restrepo, Bogotá D.C.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-black text-white rounded-full flex items-center justify-center shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900">Teléfonos</h4>
                  <p className="text-gray-600">WhatsApp: 321 202 1513</p>
                  <p className="text-gray-600">Llamadas: 314 381 8057</p>
                  <p className="text-gray-600">Fijo: (601) 404 2495</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-black text-white rounded-full flex items-center justify-center shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900">Correo Electrónico</h4>
                  <p className="text-gray-600">contacto@profesionalesjuridicos.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-gray-400">Nombre Completo</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-4 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-black/5" 
                    placeholder="Ej. Juan Pérez" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-gray-400">Teléfono</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full p-4 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-black/5" 
                    placeholder="Ej. 321 000 0000" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-gray-400">Asunto</label>
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full p-4 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-black/5" 
                  placeholder="Ej. Consulta Familiar" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-gray-400">Mensaje</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4} 
                  className="w-full p-4 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-black/5" 
                  placeholder="Describa brevemente su consulta legal..."
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-brand-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors shadow-lg"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-gray-50 text-gray-900 py-12 border-t border-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-gray-200 pb-12 mb-12">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-brand-black flex items-center justify-center rounded-lg">
            <Scale className="text-white w-8 h-8" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-serif font-bold">Profesionales Jurídicos</span>
            <span className="text-xs font-sans uppercase tracking-widest opacity-60">de Colombia</span>
          </div>
        </div>
        <div className="flex gap-8 text-sm font-medium text-gray-600">
          <a href="#inicio" className="hover:text-brand-black transition-colors">Inicio</a>
          <a href="#nosotros" className="hover:text-brand-black transition-colors">Nosotros</a>
          <a href="#servicios" className="hover:text-brand-black transition-colors">Servicios</a>
          <a href="#equipo" className="hover:text-brand-black transition-colors">Equipo</a>
          <a href="#contacto" className="hover:text-brand-black transition-colors">Contacto</a>
        </div>
      </div>
      <div className="text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Profesionales Jurídicos de Colombia. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
);

const WhatsAppButton = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) => {
  const [messages, setMessages] = React.useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const chatEndRef = React.useRef<HTMLDivElement>(null);
  const [chatSession, setChatSession] = React.useState<any>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initChat = async () => {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: `Actúa como asistente virtual de un despacho jurídico profesional en Colombia.
Tu objetivo es orientar al usuario, identificar su necesidad legal y preparar su caso para enviarlo a un abogado humano por WhatsApp.

Sigue estas reglas estrictamente:
1. Saluda de manera profesional y amable.
2. Pregunta qué tipo de asesoría necesita (Familiar, Civil, Comercial, Penal, Inmobiliario o Seguridad y Salud en el Trabajo) Y pide que describa brevemente su caso.
3. Haz máximo 2 preguntas adicionales si necesitas claridad sobre el caso.
4. Una vez que el caso esté claro y hayas hecho tus preguntas de seguimiento, solicita su nombre completo y su número de teléfono para que un abogado pueda contactarlo.
5. Cuando tengas toda la información, genera un resumen estructurado EXACTAMENTE con este formato:

RESUMEN PARA ABOGADO
Nombre:
Área legal:
Teléfono:
Descripción del caso:
Nivel de urgencia: (Alta / Media / Baja)

Reglas importantes:
- Sé claro y profesional.
- No des asesoría jurídica profunda ni soluciones definitivas.
- No inventes información.
- No cambies el formato del resumen.
- No agregues texto adicional después del resumen.
- Mantén el resumen en máximo 6 líneas claras.
- Usa lenguaje formal.
- El resumen debe estar listo para enviarse por WhatsApp.
- Si el usuario aún no quiere hablar con abogado, continúa orientando de forma general.
- Tu prioridad es recopilar la información correcta y preparar el caso para que un abogado lo atienda rápidamente.`,
      },
    });
    setChatSession(chat);
    
    // Initial greeting
    setIsLoading(true);
    try {
      const response = await chat.sendMessage({ message: "Hola, inicia la conversación saludando profesionalmente." });
      setMessages([{ role: 'assistant', content: response.text || '' }]);
    } catch (error) {
      console.error("Error initializing chat:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpen = () => {
    if (!isOpen && messages.length === 0) {
      initChat();
    }
    setIsOpen(!isOpen);
  };

  const handleSend = async () => {
    if (!input.trim() || !chatSession || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await chatSession.sendMessage({ message: userMessage });
      const assistantMessage = response.text || '';
      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Lo siento, ha ocurrido un error. Por favor intenta de nuevo." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendToWhatsApp = (content: string) => {
    const encodedMessage = encodeURIComponent(content);
    window.open(`https://wa.me/573212021513?text=${encodedMessage}`, '_blank');
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="fixed bottom-24 right-8 z-50 w-[350px] md:w-[400px] h-[500px] bg-brand-gray-dark border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 bg-white text-brand-black flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-black rounded-full flex items-center justify-center">
                <Scale className="text-white w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Asistente Virtual</h4>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] uppercase tracking-widest font-bold">En línea</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-brand-black/10 p-2 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-hide">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-white text-brand-black rounded-tr-none' 
                    : 'bg-white/5 text-gray-300 border border-white/10 rounded-tl-none'
                }`}>
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                  {msg.role === 'assistant' && msg.content.includes('RESUMEN PARA ABOGADO') && (
                    <button 
                      onClick={() => sendToWhatsApp(msg.content)}
                      className="mt-3 w-full bg-[#25D366] text-white py-2 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                    >
                      <MessageCircle size={16} fill="currentColor" /> Enviar a WhatsApp
                    </button>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 p-3 rounded-2xl border border-white/10 rounded-tl-none">
                  <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10 bg-brand-black/50">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Escribe tu mensaje..."
                className="w-full bg-brand-black border border-white/10 rounded-full py-3 pl-5 pr-12 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white text-brand-black rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={handleOpen}
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
        aria-label="Chat with Assistant"
      >
        {isOpen ? <X size={36} /> : <MessageCircle size={36} fill="currentColor" />}
        {!isOpen && (
          <span className="absolute right-full mr-4 bg-white text-brand-black px-4 py-2 rounded-lg text-sm font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            ¿Necesita ayuda? Hable con nuestro asistente
          </span>
        )}
      </button>
    </>
  );
};

export default function App() {
  const [isChatOpen, setIsChatOpen] = React.useState(false);

  return (
    <div className="min-h-screen selection:bg-white selection:text-brand-black bg-brand-black">
      <Navbar onConsultClick={() => setIsChatOpen(true)} />
      <main>
        <Hero />
        <Features />
        
        {/* About Section */}
        <section id="nosotros" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                  <img 
                    src="https://drive.google.com/thumbnail?id=1su-_xRQJZNzxwAJGK7FkEchaSIG04BBg&sz=w1000" 
                    alt="Oficina Legal" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-8 -right-8 bg-brand-black text-white p-8 rounded-2xl shadow-2xl hidden md:block">
                  <p className="text-4xl font-serif font-bold mb-1">15+</p>
                  <p className="text-sm uppercase tracking-widest opacity-80">Años de Experiencia</p>
                </div>
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight text-gray-900">
                  Comprometidos con la Defensa de sus Derechos
                </h2>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  Profesionales Jurídicos de Colombia es una firma de abogados líder en el país, 
                  caracterizada por su ética, rigurosidad jurídica y resultados efectivos. 
                  Nuestro equipo está conformado por especialistas en diversas ramas del derecho, 
                  lo que nos permite abordar casos complejos con una visión integral.
                </p>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Nuestra misión es proporcionar soluciones legales innovadoras y personalizadas, 
                  siempre bajo los más altos estándares de calidad y honestidad.
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div className="border-l-2 border-gray-200 pl-4">
                    <h4 className="font-bold mb-1 text-gray-900">Misión</h4>
                    <p className="text-sm text-gray-600">Defender con integridad y excelencia cada causa confiada.</p>
                  </div>
                  <div className="border-l-2 border-gray-200 pl-4">
                    <h4 className="font-bold mb-1 text-gray-900">Visión</h4>
                    <p className="text-sm text-gray-600">Ser el referente de confianza jurídica en toda Colombia.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Team />
        <Services />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </div>
  );
}
