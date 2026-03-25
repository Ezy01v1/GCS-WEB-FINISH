// ── Scroll → scrolled class ──
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Hamburger / Mobile Menu ──
const hamburger  = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

function openMenu() {
  if (!hamburger || !mobileMenu) return;
  hamburger.classList.add('active');
  mobileMenu.classList.add('is-open');
  hamburger.setAttribute('aria-expanded', 'true');
  mobileMenu.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  if (!hamburger || !mobileMenu) return;
  hamburger.classList.remove('active');
  mobileMenu.classList.remove('is-open');
  hamburger.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('is-open');
  
  // Opcional: Bloquear el scroll de la página de fondo
  document.body.style.overflow = mobileMenu.classList.contains('is-open') ? 'hidden' : '';
});

// Cierra al tocar un link del menú mobile
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Cierra con Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
});

// ── Active link al hacer scroll (resalta sección actual) ──
const sections  = document.querySelectorAll('section[id], div[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ── Reveal Observer (scroll animations) ──
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.12 }
);

reveals.forEach((item) => io.observe(item));

//── Formulario de contacto ──
function handleForm(e) {
  e.preventDefault();

  const form = e.target;
  const name = form.querySelector('input[placeholder="Nombre completo"]')?.value?.trim() || '';
  const email = form.querySelector('input[type="email"]')?.value?.trim() || '';
  const phone = form.querySelector('input[type="tel"]')?.value?.trim() || '';
  const subject = form.querySelector('input[placeholder*="Asunto"]')?.value?.trim() || '';
  const message = form.querySelector('textarea')?.value?.trim() || '';

  const whatsappNumber = '50494439952';

  const text = `Hola, quiero información sobre Galilee Christian School.

Nombre: ${name}
Correo: ${email}
Teléfono: ${phone}
Asunto: ${subject}
Mensaje: ${message}`;

  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  form.reset();
}

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.querySelector('#contacto form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleForm);
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      closeMenu();
    }
  });
});

//video croos parte espiritual.
const spiritualVideo = document.getElementById('spiritualVideo');
const videoAudioToggle = document.getElementById('videoAudioToggle');

if (spiritualVideo && videoAudioToggle) {
  videoAudioToggle.addEventListener('click', () => {
    spiritualVideo.muted = !spiritualVideo.muted;
    videoAudioToggle.innerHTML = spiritualVideo.muted
      ? '<i class="fa-solid fa-volume-xmark"></i>'
      : '<i class="fa-solid fa-volume-high"></i>';

    videoAudioToggle.setAttribute(
      'aria-label',
      spiritualVideo.muted ? 'Activar sonido' : 'Silenciar video'
    );
  });
}

// ── BOT FAQ ──
(() => {
  const WHATSAPP_NUMBER = '50494439952';
  const WHATSAPP_DEFAULT_MSG = 'Hola, quiero información sobre Galilee Christian School.';

  const fab = document.getElementById('gcsChatFab');
  const chat = document.getElementById('gcsChat');
  const closeBtn = document.getElementById('gcsChatClose');
  const body = document.getElementById('gcsChatBody');
  const input = document.getElementById('gcsChatInput');
  const send = document.getElementById('gcsChatSend');
  const wa = document.getElementById('gcsChatWhatsapp');

  if (!fab || !chat || !closeBtn || !body || !input || !send || !wa) return;

  wa.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MSG)}`;

  const openChat = () => {
    chat.classList.add('is-open');
    chat.setAttribute('aria-hidden', 'false');
    setTimeout(() => input.focus(), 50);
  };

  const closeChat = () => {
    chat.classList.remove('is-open');
    chat.setAttribute('aria-hidden', 'true');
  };

  const addMsg = (text, who = 'bot') => {
    const div = document.createElement('div');
    div.className = `gcs-msg ${who === 'user' ? 'gcs-msg-user' : 'gcs-msg-bot'}`;
    div.textContent = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  };

  const normalize = (text) =>
    (text || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();

  const answers = [
  // ── REQUISITOS / MATRÍCULA / INSCRIPCIÓN
  {
    keys: [
      'requisito', 'requisitos', 'matricula', 'matricularse', 'matricular',
      'inscripcion', 'inscripciones', 'inscribir', 'inscribirme', 'inscribirlo',
      'documento', 'documentos', 'papeles', 'papeleria', 'tramite', 'tramites',
      'enrolamiento', 'admision', 'admisiones', 'nuevo ingreso', 'primer ingreso',
      'cupo', 'cupos', 'lugar', 'lugares', 'disponibilidad'
    ],
    text: '📌 Los requisitos generales son: partida de nacimiento, copia de identidad del encargado y récord o constancia de notas del año anterior (si aplica). Para confirmar lo que necesitas según el grado específico, escríbenos por WhatsApp y te orientamos paso a paso.'
  },

  // ── NIVELES / GRADOS
  {
    keys: [
      'nivel', 'niveles', 'grado', 'grados', 'preescolar', 'kinder', 'kínder',
      'pre-k', 'prek', 'primaria', 'secundaria', 'bachillerato', 'colegio',
      'preparatoria', 'elementary', 'high school', 'hasta que grado', 'hasta qué grado',
      'que grados', 'qué grados', 'que niveles', 'qué niveles', 'desde que edad',
      'desde qué edad', 'edad minima', 'edad mínima', 'anos', 'años'
    ],
    text: '🎓 Ofrecemos todos los niveles: Preescolar (3–6 años), Primaria (Grades 1–6) y Secundaria (Grades 7–12). Usamos el currículo americano Abeka Books integrado con formación cristiana en cada etapa.'
  },

  // ── HORARIOS
  {
    keys: [
      'horario', 'horarios', 'hora', 'horas', 'atencion', 'atención',
      'cuando abren', 'cuándo abren', 'cuando cierran', 'cuándo cierran',
      'que hora', 'qué hora', 'a que hora', 'a qué hora',
      'horario escolar', 'horario clases', 'entrada', 'salida',
      'que dias', 'qué días', 'dias de clase', 'días de clase'
    ],
    text: '🕒 El horario de atención en secretaría es de lunes a viernes, 8:00 AM – 3:00 PM. Para más detalles sobre el horario escolar de cada nivel, escríbenos por WhatsApp.'
  },

  // ── UBICACIÓN / CÓMO LLEGAR
  {
    keys: [
      'ubicacion', 'ubicación', 'direccion', 'dirección', 'mapa', 'maps',
      'como llego', 'cómo llego', 'llegar', 'donde estan', 'dónde están',
      'donde queda', 'dónde queda', 'donde esta', 'dónde está',
      'siguatepeque', 'comayagua', 'catacamas', 'olancho', 'juticalpa',
      'sede', 'sedes', 'sucursal', 'sucursales', 'campus'
    ],
    text: '📍 Tenemos dos sedes:\n\n🏫 Sede Principal: Siguatepeque, Comayagua, Honduras.\n🏫 Sede 2: Catacamas, Olancho, Honduras.\n\nPuedes ver la ubicación exacta en el mapa de la sección de Contacto en nuestra página.'
  },

  // ── COSTOS / PRECIOS / MENSUALIDAD
  {
    keys: [
      'costo', 'costos', 'precio', 'precios', 'mensualidad', 'mensualidades',
      'cuanto cuesta', 'cuánto cuesta', 'cuanto cobran', 'cuánto cobran',
      'cuanto es', 'cuánto es', 'tarifa', 'tarifas', 'valor', 'valores',
      'pago', 'pagos', 'cuota', 'cuotas', 'matricula costo', 'costo matricula',
      'pension', 'pensión', 'colegiatura', 'financiamiento'
    ],
    text: '💰 Los costos varían según el nivel educativo y el proceso de matrícula. Para darte la información correcta y actualizada, te recomendamos escribirnos directamente por WhatsApp — te atendemos con gusto.'
  },

  // ── CONTACTO / TELÉFONO / WHATSAPP / REDES
  {
    keys: [
      'contacto', 'contactar', 'telefono', 'teléfono', 'correo', 'email',
      'whatsapp', 'mensaje', 'llamar', 'comunicarme', 'comunicarse',
      'facebook', 'instagram', 'tiktok', 'youtube', 'redes', 'redes sociales',
      'numero', 'número'
    ],
    text: '📞 Puedes contactarnos por WhatsApp al +504 9443-9952, escribirnos al correo galileechristianschool@gmail.com, o visitarnos en cualquiera de nuestras sedes. También nos encuentras en Facebook, Instagram, TikTok y YouTube como Galilee Christian School.'
  },

  // ── BECAS / DESCUENTOS
  {
    keys: [
      'beca', 'becas', 'descuento', 'descuentos', 'apoyo economico',
      'apoyo económico', 'subsidio', 'ayuda financiera', 'beca completa',
      'media beca', 'hermanos', 'descuento hermanos', 'familia numerosa'
    ],
    text: '🎁 Tenemos opciones de beca y descuento según disponibilidad y requisitos — incluyendo descuentos para familias con más de un hijo en la institución. Escríbenos por WhatsApp para conocer las opciones disponibles para tu caso.'
  },

  // ── CURRÍCULO / PLAN DE ESTUDIOS
  {
    keys: [
      'curriculo', 'currículo', 'curriculum', 'plan de estudios', 'materias',
      'asignaturas', 'abeka', 'abeka books', 'libros', 'textos', 'bilingue',
      'bilingüe', 'trilingue', 'trilingüe', 'idiomas', 'ingles', 'inglés',
      'frances', 'francés', 'español', 'educacion cristiana', 'educación cristiana',
      'religion', 'religión', 'biblia', 'programa academico', 'programa académico'
    ],
    text: '📚 Usamos el currículo americano Abeka Books, reconocido internacionalmente por su excelencia y enfoque cristiano. Nuestros estudiantes reciben clases en español, inglés y francés, con Educación Cristiana integrada en todos los niveles.'
  },

  // ── UNIVERSIDAD / BECAS ORU
  {
    keys: [
      'universidad', 'oru', 'oral roberts', 'oral roberts university',
      'beca universitaria', 'intercambio', 'estudiar en estados unidos',
      'estados unidos', 'eeuu', 'usa', 'exterior', 'extranjero',
      'graduados', 'egresados', 'despues del colegio', 'después del colegio'
    ],
    text: '🎓 Tenemos alianza con Oral Roberts University (ORU) en Estados Unidos. Nuestros graduados pueden aplicar a becas y programas de intercambio universitario. Es una de las grandes ventajas de estudiar con currículo Abeka y estándares internacionales.'
  },

  // ── PORTAL / NOTAS / PLATAFORMA ONLINE
  {
    keys: [
      'portal', 'notas', 'calificaciones', 'cloud campus', 'plataforma',
      'sistema', 'app', 'aplicacion', 'aplicación', 'online', 'en linea',
      'en línea', 'virtual', 'tareas', 'asistencia', 'comunicados',
      'reportes', 'boletas', 'boletin', 'boletín', 'ver notas', 'mis notas'
    ],
    text: '💻 Usamos Cloud Campus Pro como plataforma digital. Desde ahí, padres y estudiantes pueden ver notas en tiempo real, tareas, asistencia, comunicados y más. Puedes acceder desde el botón "Portal Académico" en nuestra página web.'
  },

  // ── HISTORIA / FUNDADORES
  {
    keys: [
      'historia', 'fundacion', 'fundación', 'fundadores', 'fundador',
      'cuando fundaron', 'cuándo fundaron', 'cuando abrieron', 'cuándo abrieron',
      'cuando empezaron', 'cuándo empezaron', 'origen', 'como nacio',
      'cómo nació', 'pastor celeo', 'celeo', 'castaneda', 'castañeda',
      'cuantos años', 'cuántos años', 'anos de historia', 'años de historia'
    ],
    text: '✝️ Galilee Christian School nació de la visión del Pastor Celeo Castañeda, quien soñó desde joven con una escuela bilingüe cristiana que transformara generaciones. En 2015 abrimos nuestras puertas — y Dios superó toda expectativa. Hoy llevamos más de 10 años formando estudiantes con excelencia y fe.'
  },

  // ── FE / VALORES / CRISTIANA
  {
    keys: [
      'cristiana', 'cristiano', 'fe', 'valores', 'biblia', 'dios',
      'religion', 'religión', 'iglesia', 'pastoral', 'ministerio',
      'formacion espiritual', 'formación espiritual', 'devocional',
      'culto', 'oracion', 'oración', 'base doctrinal', 'principios',
      'que creen', 'qué creen', 'doctrina'
    ],
    text: '✝️ Somos una institución cristiana fundamentada en la Biblia como Palabra de Dios. Creemos en Jesucristo como único Salvador. Nuestros estudiantes participan en devocionales, cultos escolares y actividades espirituales que forman su carácter y fe.'
  },

  // ── SEDES / OLANCHO / CATACAMAS
  {
    keys: [
      'olancho', 'catacamas', 'juticalpa', 'segunda sede', 'otra sede',
      'sucursal olancho', 'galilee olancho', 'tienen sede en olancho',
      'hay galilee en catacamas'
    ],
    text: '📍 ¡Sí! Además de nuestra sede principal en Siguatepeque, Comayagua, tenemos presencia en Catacamas, Olancho. El mismo estándar académico cristiano, en dos ubicaciones.'
  },

  // ── HOMESCHOOL / EN LÍNEA
  {
    keys: [
      'homeschool', 'home school', 'casa', 'educacion en casa', 'educación en casa',
      'clases en linea', 'clases en línea', 'virtual', 'online', 'a distancia',
      'educacion virtual', 'educación virtual', 'modalidad', 'modalidades'
    ],
    text: '🏠 Sí ofrecemos modalidad de Homeschool y clases en línea. Esta área se expandió durante la pandemia y sigue disponible. Para conocer los detalles y disponibilidad, escríbenos por WhatsApp.'
  }
];

  const reply = (raw) => {
    const text = normalize(raw);
    if (!text) return;

    for (const answer of answers) {
      if (answer.keys.some((key) => text.includes(key))) {
        addMsg(answer.text, 'bot');
        return;
      }
    }

    addMsg(
      'Puedo ayudarte con requisitos, niveles, horarios, ubicación, costos y contacto. Si deseas atención personalizada, toca el botón de WhatsApp.',
      'bot'
    );
  };

  const sendMsg = () => {
    const text = input.value.trim();
    if (!text) return;

    addMsg(text, 'user');
    input.value = '';

    setTimeout(() => reply(text), 180);
  };

  fab.addEventListener('click', () => {
    if (chat.classList.contains('is-open')) closeChat();
    else openChat();
  });

  closeBtn.addEventListener('click', closeChat);

  send.addEventListener('click', sendMsg);

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMsg();
    if (e.key === 'Escape') closeChat();
  });

  chat.addEventListener('click', (e) => {
    const btn = e.target.closest('.gcs-chip');
    if (!btn) return;

    const q = btn.getAttribute('data-q');
    const mapping = {
      requisitos: 'requisitos',
      niveles: 'niveles',
      horarios: 'horarios',
      ubicacion: 'ubicacion',
      costos: 'costos',
      contacto: 'contacto'
    };

    const message = mapping[q] || q;
    addMsg(message, 'user');
    setTimeout(() => reply(message), 150);
  });

  document.addEventListener('click', (e) => {
    const clickedInsideChat = chat.contains(e.target);
    const clickedFab = fab.contains(e.target);

    if (!clickedInsideChat && !clickedFab) {
      closeChat();
    }
  });
})();

