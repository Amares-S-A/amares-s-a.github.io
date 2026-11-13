/* datos.js — DATOS EDITABLES DE LA WEB DE AMARES S.A.
   Este es el único archivo que necesitás tocar para cambiar textos, precios, fotos o contactos.
   OJO: este archivo es PÚBLICO. No pongas acá valuaciones, datos de inquilinos ni nada privado. */
"use strict";
/* =====================================================================
   PROPIEDADES
   - fotos: reemplazá las URLs por las fotos reales (o por "img/archivo.jpg"
     si las subís a la misma carpeta en GitHub). La primera es la del edificio.
   - Completá superficie, ambientes, precio, etc. Lo que dejes en "" no se muestra.
   - tour360: subí las fotos 360 a kuula.co o Matterport, copiá el link de
     "Embed/Insertar" y pegalo acá. Aparece la pestaña "Recorrido 360°".
   ===================================================================== */
const WHATSAPP = "5491162515964"; // WhatsApp de Daniel (asesor): 549 + código de área sin 0 + número sin 15. Ej: 5491155551234
const ASESOR = "Daniel";
const EMAIL = ["da.amato", "gmail.com"]; // se arma en el navegador para que los robots no lo levanten tan fácil
const MSG_GENERAL = `Hola ${ASESOR}, te escribo desde la web de Amares S.A. Quería hacerte una consulta sobre los departamentos.`;
const msgPropiedad = t => `Hola ${ASESOR}, te escribo desde la web de Amares S.A. Me interesa el departamento de ${t}. ¿Me podrás dar más información?`;
// (los links de WhatsApp se arman y validan en app.js)

const U = id => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;

const PROPIEDADES = [
  {
    id: "av-de-mayo-676",
    titulo: "Av. de Mayo 676",
    unidad: "5º piso",
    barrio: "Monserrat",
    direccionMapa: "Avenida de Mayo 676, Ciudad Autónoma de Buenos Aires, Argentina",
    operacion: "Venta",          // "Venta" o "Alquiler"
    precio: "Consultar",         // ej: "USD 185.000"
    ambientes: null,             // número: 1, 2, 3, 4... (para el filtro)
    destino: "Vivienda",         // "Vivienda", "Inversión" o "Uso profesional"
    estado: "Disponible",        // "Disponible", "Reservado", "Vendido"...
    tour360: "",                 // link de embed de Kuula / Matterport (vacío = no se muestra)
    streetView: "https://www.google.com/maps/embed?pb=!4v1794603015231!6m8!1m7!1sHZd2atgrl5XyUVr765cWIg!2m2!1d-34.60866872871124!2d-58.3760264182954!3f168.48368378871697!4f30.878491241104513!5f0.7820865974627469",  // fachada (Google Maps → Compartir → Insertar mapa)
    descripcion: "Departamento en un edificio de época sobre la Avenida de Mayo, a pasos del Cabildo y de Plaza de Mayo. Techos altos, carpinterías de madera y la escala de la arquitectura porteña de principios del siglo XX.",
    specs: { "Superficie": "","Dormitorios": "", "Baños": "", "Piso": "5º", "Expensas": "" },
    fotos: [
      { src: U("photo-1486406146926-c627a92ad1ab"), label: "Edificio" },
      { src: U("photo-1502672260266-1c1ef2d93688"), label: "Living" },
      { src: U("photo-1484154218962-a197022b5858"), label: "Cocina" },
      { src: U("photo-1505691938895-1758d7feb511"), label: "Dormitorio" }
    ]
  },
  {
    id: "san-martin-1101",
    titulo: "Av. San Martín 1101",
    unidad: "11º A",
    barrio: "Retiro",
    direccionMapa: "San Martín 1101, Ciudad Autónoma de Buenos Aires, Argentina",
    operacion: "Venta",          // "Venta" o "Alquiler"
    precio: "Consultar",         // ej: "USD 185.000"
    ambientes: null,             // número: 1, 2, 3, 4... (para el filtro)
    destino: "Vivienda",         // "Vivienda", "Inversión" o "Uso profesional"
    estado: "Disponible",        // "Disponible", "Reservado", "Vendido"...
    tour360: "",                 // link de embed de Kuula / Matterport (vacío = no se muestra)
    streetView: "https://www.google.com/maps/embed?pb=!4v1794603080767!6m8!1m7!1sjv12Jqkm0WEyOoMgVYE78Q!2m2!1d-34.59504706148645!2d-58.3744402419166!3f60.77616778967902!4f23.37763446886666!5f0.7820865974627469",  // fachada (Google Maps → Compartir → Insertar mapa)
    descripcion: "Unidad en piso alto en Retiro, cerca de Plaza San Martín. Vistas abiertas, buena luz natural y conexión inmediata con el microcentro y Puerto Madero.",
    specs: { "Superficie": "","Dormitorios": "", "Baños": "", "Piso": "11º", "Expensas": "" },
    fotos: [
      { src: U("photo-1545324418-cc1a3fa10c00"), label: "Edificio" },
      { src: U("photo-1522708323590-d24dbb6b0267"), label: "Living" },
      { src: U("photo-1556909114-f6e7ad7d3136"), label: "Cocina" },
      { src: U("photo-1540518614846-7eded433c457"), label: "Dormitorio" }
    ]
  },
  {
    id: "quintana-80",
    titulo: "Quintana 80",
    unidad: "",
    barrio: "Recoleta",
    direccionMapa: "Avenida Presidente Manuel Quintana 80, Ciudad Autónoma de Buenos Aires, Argentina",
    operacion: "Venta",          // "Venta" o "Alquiler"
    precio: "Consultar",         // ej: "USD 185.000"
    ambientes: null,             // número: 1, 2, 3, 4... (para el filtro)
    destino: "Vivienda",         // "Vivienda", "Inversión" o "Uso profesional"
    estado: "Disponible",        // "Disponible", "Reservado", "Vendido"...
    tour360: "",                 // link de embed de Kuula / Matterport (vacío = no se muestra)
    streetView: "https://www.google.com/maps/embed?pb=!4v1794603119912!6m8!1m7!1skDkaf93Pf-fHKSn7dZY80w!2m2!1d-34.59012557245445!2d-58.38381712766734!3f281.667479952116!4f27.12901366325478!5f0.4000000000000002",  // fachada (Google Maps → Compartir → Insertar mapa)
    descripcion: "Sobre la Avenida Quintana, en el corazón de Recoleta. Un entorno de cafés, galerías y edificios señoriales, a metros de Plaza Francia y del Cementerio de la Recoleta.",
    specs: { "Superficie": "","Dormitorios": "", "Baños": "", "Piso": "", "Expensas": "" },
    fotos: [
      { src: U("photo-1460317442991-0ec209397118"), label: "Edificio" },
      { src: U("photo-1493809842364-78817add7ffb"), label: "Living" },
      { src: U("photo-1556912173-3bb406ef7e77"), label: "Cocina" },
      { src: U("photo-1560185007-cde436f6a4d0"), label: "Dormitorio" }
    ]
  },
  {
    id: "libertad-1550",
    titulo: "Libertad 1550",
    unidad: "4º B",
    barrio: "Recoleta",
    direccionMapa: "Libertad 1550, Ciudad Autónoma de Buenos Aires, Argentina",
    operacion: "Venta",          // "Venta" o "Alquiler"
    precio: "Consultar",         // ej: "USD 185.000"
    ambientes: null,             // número: 1, 2, 3, 4... (para el filtro)
    destino: "Vivienda",         // "Vivienda", "Inversión" o "Uso profesional"
    estado: "Disponible",        // "Disponible", "Reservado", "Vendido"...
    tour360: "",                 // link de embed de Kuula / Matterport (vacío = no se muestra)
    streetView: "https://www.google.com/maps/embed?pb=!4v1794603184272!6m8!1m7!1s1vBKYuXPIgdZto_88UoV2A!2m2!1d-34.5903811996313!2d-58.38498531009276!3f58.76850424241926!4f40.86643085547087!5f0.7820865974627469",  // fachada (Google Maps → Compartir → Insertar mapa)
    descripcion: "Departamento en una de las cuadras más tranquilas de Recoleta, cerca de Av. Alvear y Av. del Libertador. Ideal para quien busca ubicación premium con perfil residencial.",
    specs: { "Superficie": "","Dormitorios": "", "Baños": "", "Piso": "4º", "Expensas": "" },
    fotos: [
      { src: U("photo-1574362848149-11496d93a7c7"), label: "Edificio" },
      { src: U("photo-1554995207-c18c203602cb"), label: "Living" },
      { src: U("photo-1600566753190-17f0baa2a6c3"), label: "Cocina" },
      { src: U("photo-1616594039964-ae9021a400a0"), label: "Dormitorio" }
    ]
  },
  {
    id: "alvear-1491",
    titulo: "Av. Alvear 1491",
    unidad: "27º D",
    barrio: "Recoleta",
    direccionMapa: "Avenida Alvear 1491, Ciudad Autónoma de Buenos Aires, Argentina",
    operacion: "Venta",          // "Venta" o "Alquiler"
    precio: "Consultar",         // ej: "USD 185.000"
    ambientes: null,             // número: 1, 2, 3, 4... (para el filtro)
    destino: "Vivienda",         // "Vivienda", "Inversión" o "Uso profesional"
    estado: "Disponible",        // "Disponible", "Reservado", "Vendido"...
    tour360: "",                 // link de embed de Kuula / Matterport (vacío = no se muestra)
    streetView: "https://www.google.com/maps/embed?pb=!4v1794603241719!6m8!1m7!1sju3SRaehYOZ0c82Mk8geBw!2m2!1d-34.59176060724946!2d-58.38565815867727!3f216.2825320157907!4f6.82429318226427!5f0.7820865974627469",  // fachada (Google Maps → Compartir → Insertar mapa)
    descripcion: "Piso 27 sobre la avenida más elegante de Buenos Aires. Vistas panorámicas a la ciudad y al río, en un entorno de embajadas, hoteles y boutiques.",
    specs: { "Superficie": "","Dormitorios": "", "Baños": "", "Piso": "27º", "Expensas": "" },
    fotos: [
      { src: U("photo-1515263487990-61b07816b324"), label: "Edificio" },
      { src: U("photo-1600210492486-724fe5c67fb0"), label: "Living" },
      { src: U("photo-1600607687939-ce8a6c25118c"), label: "Ambientes" },
      { src: U("photo-1600585154340-be6161a56a0c"), label: "Vistas" }
    ]
  }
];

/* ---------- POR QUÉ AMARES (editable) ---------- */
const POR_QUE = [
  { t: "Trato directo con el propietario", d: "Todas las unidades son propiedad de Amares S.A.: sin intermediarios entre vos y quien decide." },
  { t: "Ubicaciones premium", d: "Recoleta, Retiro y el centro histórico: barrios que sostienen el valor de la propiedad en el tiempo." },
  { t: "Un asesor que te acompaña", d: "Daniel, nuestro asesor comercial, te responde por WhatsApp y coordina las visitas." }
];

/* ---------- TESTIMONIOS (solo reales; si queda vacío, la sección no aparece) ----------
   Ejemplo: { texto: "Excelente atención...", autor: "Nombre A.", estrellas: 5 } */
const TESTIMONIOS = [];

/* ---------- PREGUNTAS FRECUENTES (editable) ---------- */
const FAQ = [
  { q: "¿Cómo coordino una visita?", a: "Escribile a Daniel, nuestro asesor, por WhatsApp o completá el formulario indicando la propiedad. Te propone días y horarios." },
  { q: "¿Quién es el propietario?", a: "Todas las unidades son propiedad de Amares S.A., así que tratás directamente con el dueño." },
  { q: "¿Qué formas de pago aceptan?", a: "Consultanos por las condiciones de cada propiedad y te informamos las alternativas." },
  { q: "¿Las propiedades son aptas crédito?", a: "Depende de cada unidad. Consultanos por la propiedad que te interesa y te confirmamos." },
  { q: "¿Puedo ver la propiedad de forma virtual?", a: "Sí. Las propiedades con recorrido 360° se pueden recorrer desde esta misma página; para el resto podemos hacer una videollamada." }
];

