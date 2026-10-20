/**
 * CURSO INTENSIVO: IA APLICADA A LA GESTIÓN ADMINISTRATIVA Y OPERATIVA
 * Lógica Interactiva, Simuladores y Navegación Dinámica
 */

document.addEventListener('DOMContentLoaded', () => {
  initComparisonTabs();
  initWeekSwitcher();
  initRoiCalculator();
  initHeaderScroll();
  initMeetingMode();
});

/* ==========================================================================
   1. COMPARADOR INTERACTIVO: ANTES VS DESPUÉS CON IA
   ========================================================================== */
const comparisonCases = {
  documentos: {
    title: "Auditoría de Licitaciones, Contratos y Reglamentos Extensos",
    before: {
      badge: "Flujo Tradicional Manual",
      title: "Lectura exhaustiva y riesgo de omisión humana",
      body: "Un colaborador debe leer 80 a 150 páginas de bases de licitación o contratos. Se toman notas a mano, se corre el riesgo de pasar por alto multas, plazos fatales o requisitos excluyentes.",
      metric: "Tiempo invertido: 3 a 5 Horas por documento"
    },
    after: {
      badge: "Flujo con IA Generativa (Gemini Pro / Claude)",
      title: "Extracción instantánea con citación de página",
      body: "Se carga el PDF en el modelo con la fórmula aprendida en la Sesión 3. El asistente extrae automáticamente una tabla con: cláusulas críticas, garantías requeridas, fechas límite y matriz de riesgos citando página exacta.",
      metric: "Tiempo invertido: 3 a 5 Minutos con verificación"
    }
  },
  reuniones: {
    title: "Minutas de Reunión, Acuerdos y Seguimiento Operativo",
    before: {
      badge: "Flujo Tradicional Manual",
      title: "Redacción manual de memoria y desacuerdos posteriores",
      body: "Al terminar una reunión de 1 hora, alguien debe transcribir apuntes dispersos, redactar el correo formal y esperar días a que los involucrados confirmen compromisos. Muchas tareas quedan en el olvido.",
      metric: "Tiempo invertido: 45 a 60 Minutos post-reunión"
    },
    after: {
      badge: "Flujo con IA (Audio a Texto + Estructuración)",
      title: "Minuta ejecutiva automatizada en 120 segundos",
      body: "Se procesa el audio grabado mediante herramientas de transcripción IA. El prompt maestro organiza la reunión en 3 bloques: Decisiones tomadas, Tareas por responsable con fecha límite y Próximos pasos.",
      metric: "Tiempo invertido: 2 Minutos de revisión final"
    }
  },
  planillas: {
    title: "Fórmulas Avanzadas y Análisis de Datos en Excel / Google Sheets",
    before: {
      badge: "Flujo Tradicional Manual",
      title: "Frustración con sintaxis de fórmulas y macros",
      body: "Buscar tutoriales en internet para armar un BUSCARX anidado o corregir un error #N/A. Dificultad para cruzar dos planillas con nombres de columnas dispares.",
      metric: "Tiempo invertido: 1 a 2 Horas de ensayo y error"
    },
    after: {
      badge: "Flujo con IA (Copilot / ChatGPT / Gemini)",
      title: "Fórmulas perfectas escritas en lenguaje cotidiano",
      body: "El alumno describe en español: 'Cruza la columna RUT con la hoja de Pagos y tráeme solo los montos vencidos mayores a $100.000'. La IA entrega la fórmula exacta y explica cómo auditarla.",
      metric: "Tiempo invertido: 30 Segundos sin errores"
    }
  },
  consultas: {
    title: "Resolución de Dudas sobre Procedimientos y Normativas Internas",
    before: {
      badge: "Flujo Tradicional Manual",
      title: "Interrupciones constantes y búsqueda en carpetas de red",
      body: "El personal administrativo pierde tiempo respondiendo una y otra vez las mismas consultas: ¿Cómo se solicita un reembolso?, ¿Qué formulario exige la mutual?, ¿Dónde está el protocolo de compras?",
      metric: "Tiempo invertido: 5 a 10 Horas semanales del equipo"
    },
    after: {
      badge: "Flujo con Asistente GPT Corporativo Privado (Sesión 6)",
      title: "Bot institucional responde con base documental",
      body: "El Asistente GPT creado durante el curso contiene todos los reglamentos de la empresa. Los colaboradores le preguntan en lenguaje natural y el bot responde al instante según la política oficial.",
      metric: "Respuesta inmediata 24/7 sin interrumpir personal"
    }
  }
};

function initComparisonTabs() {
  const tabs = document.querySelectorAll('.comp-tab');
  const display = document.getElementById('comparisonDisplay');
  if (!tabs.length || !display) return;

  function renderCase(caseKey) {
    const data = comparisonCases[caseKey];
    if (!data) return;

    display.innerHTML = `
      <div class="comp-grid">
        <div class="comp-column col-before">
          <span class="comp-badge"><i class="fa-solid fa-clock-rotate-left"></i> ${data.before.badge}</span>
          <h4 class="comp-title">${data.before.title}</h4>
          <p class="comp-body">${data.before.body}</p>
          <div class="comp-metric"><i class="fa-solid fa-hourglass-half"></i> ${data.before.metric}</div>
        </div>

        <div class="comp-column col-after">
          <span class="comp-badge"><i class="fa-solid fa-wand-magic-sparkles"></i> ${data.after.badge}</span>
          <h4 class="comp-title">${data.after.title}</h4>
          <p class="comp-body">${data.after.body}</p>
          <div class="comp-metric"><i class="fa-solid fa-bolt-lightning"></i> ${data.after.metric}</div>
        </div>
      </div>
    `;
  }

  // Render initial
  renderCase('documentos');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const caseKey = tab.getAttribute('data-case');
      renderCase(caseKey);
    });
  });
}

/* ==========================================================================
   2. SWITCHER Y NAVEGADOR DE SEMANAS (PASO A PASO)
   ========================================================================== */
function initWeekSwitcher() {
  const buttons = document.querySelectorAll('.week-nav-btn');
  const weekBlocks = document.querySelectorAll('.week-block');
  if (!buttons.length || !weekBlocks) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedWeek = btn.getAttribute('data-week');

      if (selectedWeek === 'all') {
        weekBlocks.forEach(wb => {
          wb.style.display = 'block';
        });
      } else {
        weekBlocks.forEach(wb => {
          if (wb.getAttribute('data-week-index') === selectedWeek) {
            wb.style.display = 'block';
          } else {
            wb.style.display = 'none';
          }
        });
      }

      // Smooth scroll toward the week block if not in viewport
      const targetElement = document.getElementById(selectedWeek === 'all' ? 'week-1' : `week-${selectedWeek}`);
      if (targetElement) {
        const yOffset = -120;
        const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });
}

/* ==========================================================================
   3. CALCULADORA DE RETORNO DE INVERSIÓN (ROI)
   ========================================================================== */
function initRoiCalculator() {
  const numPart = document.getElementById('numParticipantes');
  const horAhorr = document.getElementById('horasAhorradas');
  const costoHora = document.getElementById('costoHoraHombre');

  const valPart = document.getElementById('valParticipantes');
  const valHoras = document.getElementById('valHoras');
  const valCosto = document.getElementById('valCostoHora');

  const totalHorasMesEl = document.getElementById('totalHorasMes');
  const totalAhorroMesEl = document.getElementById('totalAhorroMes');
  const tiempoRetornoEl = document.getElementById('tiempoRetorno');

  const COSTO_CURSO = 600000; // CLP

  function calculate() {
    const participantes = parseInt(numPart.value, 10);
    const horasPorSemana = parseInt(horAhorr.value, 10);
    const valorHora = parseInt(costoHora.value, 10);

    // Update labels
    valPart.textContent = participantes;
    valHoras.textContent = horasPorSemana;
    valCosto.textContent = '$' + valorHora.toLocaleString('es-CL');

    // Cálculos mensuales (4 semanas por mes)
    const horasMesPorPersona = horasPorSemana * 4;
    const totalHorasMes = horasMesPorPersona * participantes;
    const ahorroMonetarioMes = totalHorasMes * valorHora;

    totalHorasMesEl.textContent = `${totalHorasMes} hrs`;
    totalAhorroMesEl.textContent = '$' + ahorroMonetarioMes.toLocaleString('es-CL') + ' CLP';

    // Tiempo de recuperación de los $600.000 CLP
    if (ahorroMonetarioMes >= COSTO_CURSO) {
      const dias = Math.round((COSTO_CURSO / ahorroMonetarioMes) * 30);
      tiempoRetornoEl.textContent = `~${dias} Días (Retorno Inmediato)`;
      tiempoRetornoEl.style.color = '#34d399';
    } else {
      const meses = (COSTO_CURSO / ahorroMonetarioMes).toFixed(1);
      tiempoRetornoEl.textContent = `${meses} Meses`;
      tiempoRetornoEl.style.color = '#fbbf24';
    }
  }

  if (numPart && horAhorr && costoHora) {
    numPart.addEventListener('input', calculate);
    horAhorr.addEventListener('input', calculate);
    costoHora.addEventListener('input', calculate);
    calculate();
  }
}

/* ==========================================================================
   4. HEADER SCROLL EFFECT
   ========================================================================== */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   5. MODO REUNIÓN / PRESENTACIÓN EN PANTALLA
   ========================================================================== */
function initMeetingMode() {
  const btn = document.getElementById('btnModoPresentacion');
  if (!btn) return;

  let isMeeting = false;
  btn.addEventListener('click', () => {
    isMeeting = !isMeeting;
    document.body.classList.toggle('meeting-mode', isMeeting);
    btn.innerHTML = isMeeting 
      ? '<i class="fa-solid fa-compress"></i> <span>Salir de Modo Reunión</span>' 
      : '<i class="fa-solid fa-tv"></i> <span>Modo Reunión</span>';
    
    if (isMeeting) {
      alert("Modo Reunión Activado: Tipografía optimizada para lectura en proyector o pantalla de sala de juntas.");
    }
  });
}

/* ==========================================================================
   6. MODAL DE FORMALIZACIÓN Y COTIZACIÓN
   ========================================================================== */
function abrirModalContacto() {
  const modal = document.getElementById('modalContacto');
  if (modal) {
    modal.classList.add('active');
  }
}

function cerrarModalContacto() {
  const modal = document.getElementById('modalContacto');
  if (modal) {
    modal.classList.remove('active');
  }
}

// Cerrar al clickear backdrop
window.addEventListener('click', (e) => {
  const modal = document.getElementById('modalContacto');
  if (e.target === modal) {
    cerrarModalContacto();
  }
});

function enviarPropuesta(event) {
  event.preventDefault();
  cerrarModalContacto();

  // Mostrar Toast
  const toast = document.getElementById('toastNotification');
  if (toast) {
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 5000);
  }
}

// Exponer funciones al scope global para botones inline
window.abrirModalContacto = abrirModalContacto;
window.cerrarModalContacto = cerrarModalContacto;
window.enviarPropuesta = enviarPropuesta;
