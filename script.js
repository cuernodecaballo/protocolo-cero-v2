
/* =========================================================
   PROTOCOLO CERO: ÚLTIMO TURNO
   Sistema reutilizable de 16 desafíos académicos
   ========================================================= */

// ---------- 1. ELEMENTOS DE LA INTERFAZ ----------

const startScreen = document.getElementById("startScreen");
const officeScreen = document.getElementById("officeScreen");
const startButton = document.getElementById("startButton");
const officeMessage = document.getElementById("officeMessage");

const challengePanel = document.getElementById("challengePanel");
const closeChallenge = document.getElementById("closeChallenge");
const challengeUnit = document.getElementById("challengeUnit");
const challengeTitle = document.getElementById("challengeTitle");
const challengeQuestion = document.getElementById("challengeQuestion");
const answerOptions = document.getElementById("answerOptions");
const feedback = document.getElementById("feedback");
const continueButton = document.getElementById("continueButton");

const integrityValue = document.getElementById("integrityValue");
const integrityFill = document.querySelector(".integrity-fill");
const progressValue = document.getElementById("progressValue");
const progressFill = document.getElementById("progressFill");
const scoreValue = document.getElementById("scoreValue");

const terminals = document.querySelectorAll(".terminal");

 // ---------- REGISTRO DE INCIDENCIAS ----------

const desk = document.querySelector(".desk");
let incidentLog = desk?.querySelector(".incident-log");

if (!incidentLog && desk) {
    incidentLog = document.createElement("div");
    incidentLog.className = "incident-log";

    const initialMessage = desk.querySelector("p");

    if (initialMessage) {
        initialMessage.replaceWith(incidentLog);
    } else {
        desk.appendChild(incidentLog);
    }
}

const MAX_INCIDENCES = 8;

function registerIncident(message, type = "SYSTEM") {
    if (!incidentLog) return;

    const timestamp = new Date().toLocaleTimeString("es-PY", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    });

    const entry = document.createElement("div");
    entry.className = "incident-entry";
    entry.dataset.type = type;

    const time = document.createElement("span");
    time.className = "incident-time";
    time.textContent = timestamp + " // ";

    const description = document.createElement("span");
    description.textContent = message;

    entry.append(time, description);
    incidentLog.appendChild(entry);

    while (incidentLog.children.length > MAX_INCIDENCES) {
        incidentLog.firstElementChild.remove();
    }

    incidentLog.scrollTop = incidentLog.scrollHeight;
}

// ---------- 2. BANCO DE DESAFÍOS ----------
// Cada pregunta contiene los mismos campos.
// "correct" es la posición correcta: 0, 1 o 2.

const challenges = [

    {
        id: 1,
        unit: "UNIDAD 1 · FUNDAMENTOS TECNOLÓGICOS",
        title: "Hardware bajo presión",
        question:
            "El operador debe identificar los componentes de una estación. " +
            "¿Cuál opción clasifica correctamente los tres elementos?",
        answers: [
            "Teclado: hardware; sistema operativo: software; router: dispositivo de red.",
            "Teclado: software; sistema operativo: hardware; router: documento.",
            "Teclado: red; sistema operativo: red; router: software."
        ],
        correct: 0,
        explanation:
            "El teclado es un componente físico, el sistema operativo es software " +
            "y el router permite conectar dispositivos mediante una red."
    },

    {
        id: 2,
        unit: "UNIDAD 1 · MODELO SISTÉMICO",
        title: "La cadena de procesamiento",
        question:
            "Un sensor mide la temperatura de una máquina. El programa compara " +
            "la lectura con un límite y, si lo supera, activa una alerta. " +
            "¿Cuál es la secuencia correcta de ENTRADA, PROCESO y SALIDA?",
        answers: [
            "Entrada: lectura del sensor. Proceso: comparar con el límite. Salida: alerta.",
            "Entrada: alerta. Proceso: lectura del sensor. Salida: comparar con el límite.",
            "Entrada: comparar con el límite. Proceso: alerta. Salida: lectura del sensor."
        ],
        correct: 0,
        explanation:
            "La entrada son los datos recibidos; el proceso es la operación aplicada " +
            "a esos datos; la salida es el resultado que genera el sistema."
    },

    {
        id: 3,
        unit: "UNIDAD 1 · INTELIGENCIA ARTIFICIAL",
        title: "Diagnóstico de IA",
        question:
            "Una IA genera un resumen con una fuente dudosa. El curso se gestiona " +
            "en Moodle, el equipo se coordina por Teams y los documentos se comparten " +
            "en Google Workspace. ¿Qué procedimiento es el más responsable?",
        answers: [
            "Copiar el resumen sin revisarlo y entregarlo en cualquier plataforma.",
            "Pedir a la IA un resultado con contexto, objetivo y formato claros; verificar " +
            "las fuentes y los límites de la respuesta; entregar en Moodle, coordinar " +
            "por Teams y colaborar en Google Workspace.",
            "Pedir a la IA que garantice que todo es correcto y eliminar las fuentes originales."
        ],
        correct: 1,
        explanation:
            "La IA puede cometer errores y generar referencias inexistentes. Un buen " +
            "prompt define contexto, objetivo y formato, pero no garantiza exactitud. " +
            "Las fuentes deben verificarse. Moodle permite gestionar actividades del curso, " +
            "Teams facilita la comunicación y Google Workspace permite colaborar en documentos."
    },

    
{
    id: 4,
    unit: "UNIDAD 2 · VIRTUALIZACIÓN",
    title: "Sistema aislado",
    question:
        "Una técnica debe probar un programa diseñado para Linux en una computadora física que utiliza Windows. ¿Qué opción describe correctamente una solución virtualizada?",
    answers: [
        "Instalar Linux como si fuera un componente físico adicional de la computadora.",
        "Crear una máquina virtual que ejecute Linux como sistema invitado sobre el equipo anfitrión, asignándole recursos físicos.",
        "Abrir Linux como un documento dentro de una carpeta de Windows."
    ],
    correct: 1,
    explanation:
        "La computadora física aporta el hardware. La virtualización crea un entorno lógico donde puede ejecutarse un sistema invitado. Windows actúa como anfitrión en este caso, mientras Linux funciona dentro de la máquina virtual."
},
 
{
    id: 5,
    unit: "UNIDAD 2 · SISTEMAS OPERATIVOS",
    title: "Recursos críticos",
    question:
        "Una aplicación empresarial funciona en Linux, pero el equipo de trabajo utiliza Windows. ¿Qué decisión demuestra que comprendés el papel de los sistemas operativos?",
    answers: [
        "Instalar una máquina virtual o un entorno compatible, según los requisitos de la aplicación, y comprobar los recursos disponibles.",
        "Cambiar obligatoriamente a macOS porque todos los sistemas operativos funcionan de manera idéntica.",
        "Eliminar la memoria RAM para que el sistema operativo libere recursos."
    ],
    correct: 0,
    explanation:
        "Windows, Linux y macOS son sistemas operativos que administran procesos, memoria y dispositivos, pero difieren en compatibilidad y funcionamiento. La solución depende de los requisitos del programa y de los recursos disponibles."
},

{
    id: 6,
    unit: "UNIDAD 3 · BÚSQUEDA DIGITAL",
    title: "Búsqueda de emergencia",
    question:
        "Necesitás estudios recientes sobre inteligencia artificial en educación y querés excluir los videojuegos. ¿Qué procedimiento combina mejor las herramientas de navegación y búsqueda?",
    answers: [
        "Abrir cualquier página del navegador y elegir el primer resultado sin aplicar filtros.",
        "Instalar varias extensiones desconocidas y aceptar todos sus permisos para ampliar los resultados.",
        "Usar un navegador actualizado, buscar la frase exacta con operadores booleanos y aplicar filtros por fecha o tipo de documento; instalar extensiones solo si son confiables y necesarias."
    ],
    correct: 2,
    explanation:
        "El navegador permite acceder a la web. Los buscadores ofrecen operadores y filtros para refinar resultados, mientras que las extensiones agregan funciones al navegador. Conviene revisar su procedencia y permisos. Las opciones de búsqueda varían según la plataforma."
},

    {
        id: 7,
        unit: "UNIDAD 3 · FUENTES CONFIABLES",
        title: "Fuente confiable",
        question:
            "Dos páginas presentan cifras diferentes sobre el mismo tema. ¿Qué fuente " +
            "conviene priorizar para una investigación académica?",
        answers: [
            "La que tenga el título más llamativo y más visitas.",
            "La primera que aparezca en el buscador, sin revisar su contenido.",
            "La que permita identificar autoría, fecha, metodología y referencias verificables."
        ],
        correct: 2,
        explanation:
            "La confiabilidad se evalúa mediante evidencias: autoría, actualidad, " +
            "método, referencias y posibilidad de verificar las afirmaciones."
    },

    {
        id: 8,
        unit: "UNIDAD 3 · ACCESIBILIDAD",
        title: "Interfaz accesible",
        question:
            "Una página usa texto gris claro sobre fondo blanco y botones identificados " +
            "solo mediante colores. ¿Qué mejora responde mejor a la accesibilidad?",
        answers: [
            "Aumentar el contraste y acompañar los colores con texto o señales comprensibles.",
            "Reducir el tamaño de la letra para que entre más contenido.",
            "Eliminar los nombres de los botones y conservar únicamente los colores."
        ],
        correct: 0,
        explanation:
            "El contraste suficiente mejora la lectura. La información no debe depender " +
            "solo del color, y los controles necesitan etiquetas comprensibles."
    },

    {
        id: 9,
        unit: "UNIDAD 4 · OFIMÁTICA",
        title: "Informe dañado",
        question:
            "Vas a producir un informe académico. Identificá ENTRADA, PROCESO y SALIDA " +
            "en este trabajo: disponés de datos y fuentes, los organizás con títulos " +
            "y estilos, y finalmente entregás un documento estructurado.",
        answers: [
            "Entrada: documento final. Proceso: datos originales. Salida: títulos y estilos.",
            "Entrada: datos y fuentes. Proceso: organizar y aplicar estilos. " +
            "Salida: informe estructurado.",
            "Entrada: estilos. Proceso: informe final. Salida: fuentes sin organizar."
        ],
        correct: 1,
        explanation:
            "Los datos y las fuentes son la entrada; la organización y el formato son " +
            "el proceso; el documento estructurado es la salida. Los estilos coherentes " +
            "también facilitan crear un índice automático."
    },

{
    id: 10,
    unit: "UNIDAD 4 · HOJAS DE CÁLCULO",
    title: "Cálculo de emergencia",
    question:
        "Una planilla contiene notas en B2:B6 y registros de varios cursos. Necesitás calcular el promedio y mostrar únicamente los registros de un curso. Identificá ENTRADA, PROCESO y SALIDA.",
    answers: [
        "Entrada: el promedio final. Proceso: copiar el resultado. Salida: las notas originales.",
        "Entrada: las notas y los registros. Proceso: calcular con =PROMEDIO(B2:B6) y aplicar un filtro por curso. Salida: el promedio y los registros filtrados.",
        "Entrada: el filtro. Proceso: mostrar las notas sin calcular. Salida: una fórmula vacía."
    ],
    correct: 1,
    explanation:
        "La entrada son las notas y los registros; el proceso incluye la fórmula y el filtro; la salida contiene el promedio calculado y las filas que cumplen el criterio. El nombre de la función puede variar según la aplicación y la configuración regional."
},

    
{
    id: 11,
    unit: "UNIDAD 4 · PRESENTACIONES Y VISUALIZACIÓN",
    title: "Presentación bajo presión",
    question:
        "Tenés que presentar las ventas de cinco productos ante un equipo directivo. ¿Qué diseño comunica mejor los resultados en una presentación digital?",
    answers: [
        "Una diapositiva con un párrafo extenso, texto pequeño y varios colores sin función.",
        "Una diapositiva con un gráfico de barras etiquetado, título informativo, texto breve y contraste suficiente.",
        "Una diapositiva con imágenes decorativas sin cifras, etiquetas ni explicación."
    ],
    correct: 1,
    explanation:
        "Una presentación eficaz prioriza un mensaje por diapositiva, jerarquía visual, texto legible y contraste adecuado. Un gráfico de barras etiquetado permite comparar las ventas entre productos."
},


    {
        id: 12,
        unit: "UNIDAD 6 · COLABORACIÓN DIGITAL",
        title: "Acceso denegado",
        question:
            "Una compañera necesita comentar un informe compartido, pero no debe editarlo. " +
            "¿Qué permiso corresponde otorgarle?",
        answers: [
            "Propietaria, para que pueda administrar todos los accesos.",
            "Comentadora, si la plataforma ofrece ese rol y satisface la tarea.",
            "Editora, aunque solo necesite dejar observaciones."
        ],
        correct: 1,
        explanation:
            "Se debe conceder el menor nivel de acceso que permita realizar la tarea. " +
            "Los nombres y capacidades exactas dependen de la plataforma."
    },

    
{
    id: 13,
    unit: "UNIDAD 6 · GESTIÓN DE ARCHIVOS Y FLUJOS",
    title: "Archivos duplicados",
    question:
        "Un equipo debe editar un informe compartido, organizar una reunión y recuperar cambios anteriores si algo sale mal. ¿Qué flujo de trabajo es el más adecuado?",
    answers: [
        "Guardar copias con nombres improvisados, coordinar por mensajes sueltos y sobrescribir todos los archivos.",
        "Usar carpetas compartidas con permisos e historial de versiones, programar la reunión en Calendar u Outlook y coordinarla mediante Meet o Teams.",
        "Enviar el documento públicamente, sin controlar permisos, y confiar en que todos utilicen la misma versión."
    ],
    correct: 1,
    explanation:
        "Las carpetas compartidas y el control de versiones ayudan a organizar y recuperar documentos. Calendar y Outlook permiten programar reuniones; Meet y Teams facilitan encuentros virtuales. Estas herramientas pueden integrarse con Drive y Microsoft 365, según la configuración disponible."
},


    {
        id: 14,
        unit: "UNIDAD 7 · HERRAMIENTAS MULTIMEDIA",
        title: "Diagrama incorrecto",
        question:
            "Un formulario recibe una solicitud, el sistema comprueba si está completa " +
            "y luego muestra aprobación o rechazo. Identificá ENTRADA, PROCESO y SALIDA.",
        answers: [
            "Entrada: aprobación o rechazo. Proceso: mostrar el resultado. " +
            "Salida: formulario recibido.",
            "Entrada: formulario enviado. Proceso: verificar si está completo. " +
            "Salida: aprobación o rechazo.",
            "Entrada: verificación. Proceso: formulario enviado. Salida: comprobar los datos."
        ],
        correct: 1,
        explanation:
            "El formulario aporta los datos de entrada; la verificación es el proceso; " +
            "la decisión resultante es la salida. Un diagrama de flujo debe representar " +
            "ese orden con símbolos y flechas coherentes."
    },

    {
        id: 15,
        unit: "UNIDAD 9 · INVESTIGACIÓN ACADÉMICA",
        title: "Referencia fantasma",
        question:
            "Una IA proporciona una referencia bibliográfica, pero no encontrás el artículo " +
            "ni el DOI indicado. ¿Qué deberías hacer antes de citarlo?",
        answers: [
            "Buscar el título y los datos en catálogos o bases fiables y citarlo solo " +
            "si podés verificar la fuente.",
            "Incluirlo igualmente porque la referencia tiene formato APA.",
            "Inventar un enlace para que la bibliografía parezca completa."
        ],
        correct: 0,
        explanation:
            "El formato correcto no demuestra que una fuente exista. Hay que verificar " +
            "los datos bibliográficos y no inventar referencias."
    },

    
{
    id: 16,
    unit: "UNIDAD 9 · INVESTIGACIÓN DIGITAL",
    title: "Investigación final",
    question:
        "Estás preparando un trabajo académico con diez artículos. Querés encontrar estudios, guardar sus datos bibliográficos y generar citas consistentes. ¿Qué flujo de trabajo es el más sólido?",
    answers: [
        "Copiar referencias de una IA sin comprobarlas y generar citas de memoria.",
        "Buscar estudios en Google Académico, verificar los documentos y utilizar un gestor como Zotero, Mendeley o MyBib para organizar referencias y preparar citas, revisándolas antes de entregar.",
        "Guardar únicamente los títulos en un documento y omitir la bibliografía final."
    ],
    correct: 1,
    explanation:
        "Google Académico ayuda a localizar literatura científica. Zotero, Mendeley y MyBib permiten gestionar referencias con diferentes funciones. Es necesario verificar los datos, revisar el formato de citación y citar las fuentes realmente consultadas."
},

];


// ---------- 3. ESTADO DE LA PARTIDA ----------

let currentChallenge = null;
let answered = false;
let summaryVisible = false;
let integrity = 100;
let score = 0;

// Guardamos cada resultado para elaborar el resumen final.
const results = new Map();


// ---------- 4. INICIO DEL JUEGO ----------


startButton.addEventListener("click", function () {
    gameAudio.musica.pause();
gameAudio.musica.currentTime = 0;
    startScreen.hidden = true;
    officeScreen.hidden = false;

    AudioSystem.startAmbient();
AudioSystem.playStartup();
AudioSystem.playNoise(0.5, 0.08);

    updateHUD();
    registerIncident("Turno iniciado. Operador: Bryan Epstein.", "SYSTEM");
});

const restartButton = document.getElementById("restartButton");

restartButton.addEventListener("click", function () {
    restartGame();
    AudioSystem.playNoise(0.3, 0.12);
});

 // ---------- 5. SELECCIÓN DE CONSOLAS ----------

const operationsTerminal = document.getElementById("operationsTerminal");
const networkTerminal = document.getElementById("networkTerminal");
const systemsTerminal = document.getElementById("systemsTerminal");

operationsTerminal.addEventListener("click", function () {
    registerIncident("Terminal abierto: T-01", "INFO");

    const pendingChallenge = challenges.find(function (challenge) {
        return !results.has(challenge.id);
    });

    if (pendingChallenge) {
        openChallenge(pendingChallenge, operationsTerminal);
    } else {
        showFinalSummary();
        summaryVisible = true;
    }
});

networkTerminal.addEventListener("click", function () {
    registerIncident("Terminal abierto: N-07", "INFO");
    showConsoleInfo("network");
});

systemsTerminal.addEventListener("click", function () {
    registerIncident("Terminal abierto: T-02", "INFO");
    showConsoleInfo("systems");
});


// ---------- 6. MOSTRAR UNA PREGUNTA ----------

function openChallenge(challenge, terminal) {
    currentChallenge = challenge;
    AudioSystem.playNoise(0.22, 0.07);
    answered = false;
summaryVisible = false;
    challengeUnit.textContent = challenge.unit;
    challengeTitle.textContent =
        String(challenge.id).padStart(2, "0") +
        " // " + challenge.title;

    challengeQuestion.textContent = challenge.question;

    answerOptions.replaceChildren();
    answerOptions.hidden = false;

    feedback.replaceChildren();
    feedback.hidden = true;
    feedback.className = "feedback";

    continueButton.hidden = true;
    continueButton.textContent = "VOLVER A LA OFICINA";

    challenge.answers.forEach(function (answer, index) {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "answer-button";
        button.textContent =
            String.fromCharCode(65 + index) + ". " + answer;

        button.addEventListener("click", function () {
            checkAnswer(index);
        });

        answerOptions.appendChild(button);
    });

    const terminalCode =
        terminal.querySelector(".monitor-code").textContent;

    officeMessage.textContent =
        terminalCode + " / DESAFÍO " +
        String(challenge.id).padStart(2, "0");

    challengePanel.hidden = false;

    challengePanel.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

 // ---------- 7. INFORMACIÓN DE LAS CONSOLAS ----------

function showConsoleInfo(type) {
    currentChallenge = null;
    answered = false;
    summaryVisible = true;

    AudioSystem.playNoise(0.22, 0.07);

    const completed = results.size;
    const total = challenges.length;
    const pending = total - completed;
    const percentage = Math.round((completed / total) * 100);

    let area;
    let code;
    let title;
    let status;
    let message;

    if (type === "systems") {
        area = "SISTEMAS";
        code = "T-02";
        title = "DIAGNÓSTICO TÉCNICO";

        status =
            "Desafíos completados: " + completed + "/" + total +
            ". Pendientes: " + pending + ".";

        message =
            "INTEGRIDAD: " + integrity + "%.\n" +
            "PUNTUACIÓN: " + score + "/" + (total * 10) + ".\n" +
            "PROGRESO ACADÉMICO: " + percentage + "%.\n" +
            (integrity <= 30
                ? "ALERTA: integridad crítica. El sistema está gravemente comprometido."
                : integrity <= 60
                    ? "ADVERTENCIA: integridad reducida. Revisá los errores registrados."
                    : "Estado de integridad dentro de los parámetros de observación.");
    } else {
        area = "RED Y COMUNICACIONES";
        code = "N-07";
        title = "ESTADO DE LA CONEXIÓN";

        if (completed === total) {
            status = "Todos los registros académicos fueron recibidos.";
            message =
                "CANAL RESTAURADO.\n" +
                "Los " + total + " registros están disponibles.\n" +
                "El informe final está listo para su consulta.";
        } else if (completed >= Math.ceil(total / 2)) {
            status = "Señal parcialmente restaurada.";
            message =
                "REGISTROS RECIBIDOS: " + completed + "/" + total + ".\n" +
                "Quedan " + pending + " registros pendientes.\n" +
                "La conexión mejora, pero todavía hay datos sin recuperar.";
        } else if (completed > 0) {
            status = "Señal débil. Se detectan transmisiones parciales.";
            message =
                "REGISTROS RECIBIDOS: " + completed + "/" + total + ".\n" +
                "Quedan " + pending + " registros pendientes.\n" +
                "Continuá con las operaciones para recuperar la transmisión.";
        } else {
            status = "Enlace con el servidor central: inestable.";
            message =
                "No se recibieron registros académicos.\n" +
                "El canal permanece en observación.\n" +
                "Iniciá las operaciones para establecer la transmisión.";
        }
    }

    challengeUnit.textContent = code + " // " + area;
    challengeTitle.textContent = title;
    challengeQuestion.textContent = status;

    answerOptions.replaceChildren();
    answerOptions.hidden = true;

    feedback.textContent = message;
    feedback.hidden = false;
    feedback.className = "feedback";

    continueButton.hidden = false;
    continueButton.textContent = "VOLVER A LA OFICINA";

    officeMessage.textContent = code + " / " + area;

    challengePanel.hidden = false;
    challengePanel.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


// ---------- 7. COMPROBAR RESPUESTAS ----------

function checkAnswer(selectedIndex) {
    if (answered || !currentChallenge) return;

    answered = true;

    const isCorrect =
        selectedIndex === currentChallenge.correct;
            if (isCorrect) {
        registerIncident(
            "Desafío " + currentChallenge.id + " resuelto correctamente.",
            "SUCCESS"
        );
    } else {
        registerIncident(
            "Error en desafío " + currentChallenge.id +
            ". Integridad actual: " + integrity + "%.",
            "ERROR"
        );
    }

    const buttons = answerOptions.querySelectorAll("button");

    buttons.forEach(function (button, index) {
        button.disabled = true;

        if (index === currentChallenge.correct) {
            button.classList.add("correct-answer");
        } else if (index === selectedIndex && !isCorrect) {
            button.classList.add("wrong-answer");
        }
    });
    
if (isCorrect) {
    score += 10;
    AudioSystem.playTone(660, 0.16, 0.045);
} else {
    integrity = Math.max(0, integrity - 15);

    AudioSystem.playTone(180, 0.45, 0.12);
    AudioSystem.playNoise(0.4, 0.10);

    if (integrity <= 30) {
        AudioSystem.playNoise(0.8, 0.14);
    }
    if (isCorrect) {
    registerIncident(
        "Desafío " + currentChallenge.id +
        " resuelto correctamente. Integridad: " +
        integrity + "%.",
        "SUCCESS"
    );
} else {
    registerIncident(
        "Error en desafío " + currentChallenge.id +
        ". Integridad restante: " + integrity + "%.",
        "ERROR"
    );
}
}

    results.set(currentChallenge.id, {
        selectedIndex: selectedIndex,
        correct: isCorrect
    });

    updateHUD();
    updateIntegrityEffects();

    feedback.hidden = false;
    feedback.className = isCorrect
        ? "feedback correct"
        : "feedback";

    const heading = document.createElement("strong");
    heading.textContent = isCorrect
        ? "RESPUESTA CORRECTA // +10 PUNTOS"
        : "RESPUESTA INCORRECTA // INTEGRIDAD -15%";

    const explanation = document.createElement("p");
    explanation.textContent = currentChallenge.explanation;

    feedback.replaceChildren(heading, explanation);

    continueButton.hidden = false;

    if (results.size === challenges.length) {
        continueButton.textContent = "VER INFORME FINAL";
    }
}


// ---------- 8. ACTUALIZAR PUNTUACIÓN Y PROGRESO ----------

function updateHUD() {
    progressValue.textContent =
        results.size + " / " + challenges.length;

    progressFill.style.width =
        (results.size / challenges.length * 100) + "%";

    scoreValue.textContent = score;

    integrityValue.textContent = integrity + "%";

    integrityFill.style.width = integrity + "%";

    if (integrity <= 30) {
        integrityFill.style.background = "#d52c2c";
    } else if (integrity <= 60) {
        integrityFill.style.background = "#b66b38";
    } else {
        integrityFill.style.background = "#a33b35";
    }
}


// ---------- 9. CAMBIAR EL ESTADO VISUAL DE LA OFICINA ----------

function updateIntegrityEffects() {
    officeScreen.classList.remove(
        "integrity-warning",
        "integrity-critical",
        "integrity-failed"
    );

    if (integrity === 0) {
        officeScreen.classList.add("integrity-failed");
        officeMessage.textContent =
            "SEÑAL PERDIDA // SISTEMA FUERA DE CONTROL";
    } else if (integrity <= 30) {
        officeScreen.classList.add("integrity-critical");
        officeMessage.textContent =
            "ALERTA CRÍTICA // SEÑAL INESTABLE";
    } else if (integrity <= 60) {
        officeScreen.classList.add("integrity-warning");
        officeMessage.textContent =
            "ADVERTENCIA // INTEGRIDAD COMPROMETIDA";
    }
}


// ---------- 10. MOSTRAR EL RESUMEN FINAL ----------

function showFinalSummary() {summaryVisible = true;
    AudioSystem.playMetalHit();
    challengePanel.hidden = false;

    challengeUnit.textContent =
        "SAHUR INC. / INFORME DE CIERRE";

    challengeTitle.textContent = "Registro de evaluación";

    challengeQuestion.textContent =
        "Turno completado. Resultado: " +
        score + " de " + (challenges.length * 10) +
        " puntos. Se respondieron " +
        results.size + " de " + challenges.length +
        " desafíos. La integridad final fue " +
        integrity + "%.";

    answerOptions.replaceChildren();
    answerOptions.hidden = true;

    feedback.replaceChildren();
    feedback.hidden = false;
    feedback.className = "feedback";

    challenges.forEach(function (challenge) {
        const result = results.get(challenge.id);

        const entry = document.createElement("div");
        entry.className = "summary-entry " +
            (result.correct ? "is-correct" : "is-wrong");

        const heading = document.createElement("strong");
        heading.textContent =
            String(challenge.id).padStart(2, "0") +
            " // " + challenge.title +
            (result.correct ? " // CORRECTO" : " // INCORRECTO");

        const chosen = document.createElement("p");
        chosen.textContent =
            "Tu respuesta: " + challenge.answers[result.selectedIndex];

        const correctAnswer = document.createElement("p");
        correctAnswer.textContent =
            "Respuesta correcta: " +
            challenge.answers[challenge.correct];

        const explanation = document.createElement("p");
        explanation.textContent = challenge.explanation;

        entry.append(
            heading,
            chosen,
            correctAnswer,
            explanation
        );

        feedback.appendChild(entry);
    });

    continueButton.hidden = false;
    continueButton.textContent = "VOLVER A LA OFICINA";

    officeMessage.textContent =
        "EVALUACIÓN COMPLETADA // INFORME DISPONIBLE";

    challengePanel.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


// ---------- 11. CERRAR EL PANEL ----------

function returnToOffice() {
    challengePanel.hidden = true;
    answerOptions.hidden = false;

    officeMessage.textContent =
        results.size === challenges.length
            ? "EVALUACIÓN COMPLETADA"
            : "TODOS LOS SISTEMAS EN OBSERVACIÓN";
}


function restartGame() {
    score = 0;
    integrity = 100;
    results.clear();
    answered = false;
    summaryVisible = false;
    currentChallenge = null;

    challengePanel.hidden = true;
    answerOptions.hidden = false;
    answerOptions.replaceChildren();

    feedback.replaceChildren();
    feedback.hidden = true;
    feedback.className = "feedback";

    continueButton.hidden = true;
    continueButton.textContent = "VOLVER A LA OFICINA";

    officeScreen.classList.remove(
        "integrity-warning",
        "integrity-critical",
        "integrity-failed"
    );

    updateHUD();
    updateIntegrityEffects();

    officeMessage.textContent =
        "TODOS LOS SISTEMAS EN OBSERVACIÓN";
            registerIncident("Sistema reiniciado. Nuevo turno preparado.", "WARNING");

    AudioSystem.playNoise(0.3, 0.12);
}


closeChallenge.addEventListener("click", returnToOffice);

continueButton.addEventListener("click", function () {
    if (results.size === challenges.length && !summaryVisible) {
        showFinalSummary();
    } else {
        returnToOffice();
    }
});

/* =====================================
   PROTOCOLO CERO // SISTEMA DE AUDIO
   ===================================== */
// Audios del juego
const gameAudio = {
    musica: new Audio("audio/musica.mp3"),
    ambiente: new Audio("audio/ambiente.mp3"),
    metal: new Audio("audio/metal.mp3"),
    interferencia: new Audio("audio/interferencia.wav")
};


gameAudio.musica.loop = true;
gameAudio.musica.volume = 0.70;

gameAudio.ambiente.loop = true;
gameAudio.ambiente.volume = 0.30;

gameAudio.metal.volume = 0.35;
gameAudio.interferencia.volume = 0.25;
const AudioSystem = {
    context: null,
    master: null,
    ambientGain: null,
    ambientOscillator: null,
    enabled: true,
    started: false,

    init() {
        if (this.context) return;

        const AudioContextClass =
            window.AudioContext || window.webkitAudioContext;

        if (!AudioContextClass) {
            console.warn("Audio no compatible con este navegador.");
            return;
        }

        this.context = new AudioContextClass();

        this.master = this.context.createGain();
        this.master.gain.value = 0.35;
        this.master.connect(this.context.destination);

        this.ambientGain = this.context.createGain();
        this.ambientGain.gain.value = 0;
        this.ambientGain.connect(this.master);

        this.ambientOscillator = this.context.createOscillator();
        this.ambientOscillator.type = "sawtooth";
        this.ambientOscillator.frequency.value = 48;
        this.ambientOscillator.connect(this.ambientGain);
        this.ambientOscillator.start();

        const lowTone = this.context.createOscillator();
        const lowGain = this.context.createGain();

        lowTone.type = "sine";
        lowTone.frequency.value = 52;
        lowGain.gain.value = 0.12;

        lowTone.connect(lowGain);
        lowGain.connect(this.ambientGain);
        lowTone.start();

        this.started = true;
    },
    
    
    

playStartup() {
    if (!this.enabled) return;

    this.init();

    if (this.context && this.context.state === "suspended") {
        this.context.resume();
    }

    this.playNoise(0.4, 0.08);
    this.playTone(440, 0.25, 0.04);

    window.setTimeout(() => {
        this.playDistantAlarm();
    }, 1200);

},

    startAmbient() {
    if (!this.enabled) return;

    gameAudio.ambiente.play().catch(error => {
        console.warn("No se pudo reproducir el ambiente:", error);
    });
},

    stopAmbient() {
        if (!this.context || !this.ambientGain) return;

        this.ambientGain.gain.setTargetAtTime(
            0,
            this.context.currentTime,
            0.15
        );
    },

    playNoise(duration = 0.18, volume = 0.12) {
    if (!this.enabled) return;

    gameAudio.interferencia.currentTime = 0;
gameAudio.interferencia.playbackRate = 4;
    gameAudio.interferencia.play().catch(error => {
        console.warn(
            "No se pudo reproducir interferencia.wav:",
            error
        );
    });
},

    playTone(frequency = 440, duration = 0.2, volume = 0.08) {
        if (!this.enabled || !this.context) return;

        const ctx = this.context;
        const oscillator = ctx.createOscillator();
        const gain = ctx.createGain();

        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(
            frequency,
            ctx.currentTime
        );

        gain.gain.setValueAtTime(volume, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(
            0.001,
            ctx.currentTime + duration
        );

        oscillator.connect(gain);
        gain.connect(this.master);

        oscillator.start();
        oscillator.stop(ctx.currentTime + duration);
    },
    
    // Golpe metálico distante
    playMetalHit() {
    if (!this.enabled) return;

    gameAudio.metal.currentTime = 0;
    gameAudio.metal.play().catch(error => {
        console.warn("No se pudo reproducir el aviso de tareas:", error);
    });
},

    // Alarma lejana y apagada
    playDistantAlarm() {
        if (!this.enabled || !this.context) return;

        const ctx = this.context;
        const now = ctx.currentTime;
        const oscillator = ctx.createOscillator();
        const gain = ctx.createGain();

        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(280, now);
        oscillator.frequency.linearRampToValueAtTime(350, now + 0.7);
        oscillator.frequency.linearRampToValueAtTime(280, now + 1.5);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.022, now + 0.25);
        gain.gain.setValueAtTime(0.022, now + 0.8);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

        oscillator.connect(gain);
        gain.connect(this.master);

        oscillator.start(now);
        oscillator.stop(now + 1.85);
    },

toggle() {
    this.enabled = !this.enabled;

    Object.values(gameAudio).forEach(audio => {
        audio.muted = !this.enabled;
    });

    if (this.enabled) {
        if (!gameAudio.musica.paused || !gameAudio.ambiente.paused) {
            // Los audios que ya estaban reproduciéndose continúan.
        } else {
            const startScreen = document.getElementById("startScreen");
            const officeScreen = document.getElementById("officeScreen");

            if (startScreen && !startScreen.hidden) {
                gameAudio.musica.play().catch(() => {});
            } else if (officeScreen && !officeScreen.hidden) {
                gameAudio.ambiente.play().catch(() => {});
            }
        }
    }

    const button = document.getElementById("soundToggle");
    // Música de la pantalla inicial
document.addEventListener("DOMContentLoaded", function () {
    const startScreen = document.getElementById("startScreen");

    if (startScreen && !startScreen.hidden && AudioSystem.enabled) {
        gameAudio.musica.play().catch(() => {
            // El navegador puede exigir una interacción del usuario.
        });
    }
});
    if (button) {
        button.textContent = this.enabled
            ? "SONIDO: ACTIVADO"
            : "SONIDO: SILENCIADO";

        button.setAttribute("aria-pressed", String(this.enabled));
    }
}
};
document.addEventListener("click", function iniciarMusica() {
    const startScreen = document.getElementById("startScreen");

    if (!AudioSystem.enabled || !startScreen || startScreen.hidden) {
        return;
    }

    gameAudio.musica.play().catch(error => {
        console.warn("No se pudo reproducir musica.mp3:", error);
    });
});
// Conectar el botón para activar y silenciar el audio
document.getElementById("soundToggle").addEventListener("click", function () {
    AudioSystem.toggle();
});