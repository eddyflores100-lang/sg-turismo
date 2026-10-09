# SG-Turismo · Solicitudes de cotización

Web estática editable para solicitar transporte por WhatsApp. Conserva marca, contactos e imágenes del repositorio anterior. Es una reconstrucción HTML/CSS/JS, no una recuperación de las fuentes React originales.

## Ejecutar y publicar

Node 22+. Ejecutar `npm ci` y `npm test`. Servir y publicar exclusivamente `dist/`, por ejemplo con `python -m http.server 8080 --directory dist`. Las rutas relativas permiten subdirectorios. CI genera un artefacto; no despliega.

Fuentes: index.html y assets/. Validación y texto en assets/inquiry.mjs; interacción en assets/site.mjs. No hay backend, analítica ni almacenamiento local. Archivo histórico en archive/legacy; chunks _next, galerías y SEO antiguos se preservan pero no se publican.

## Flujo

Origen, destino, fecha, pasajeros y tipo de viaje producen un borrador que el visitante revisa y abre en WhatsApp. Destinatario conservado: 593999094233. No envía mensajes automáticamente ni comprueba disponibilidad, cobra o confirma reservas. Editar un campo invalida el borrador. Sin JavaScript los campos están desactivados y se ofrecen teléfono/correo.

Se retiraron métricas, antigüedad y garantías de seguros/equipamiento no verificadas. Las fotos no prueban titularidad ni disponibilidad del vehículo.

## Antes del lanzamiento

Confirmar titularidad de marca, fotos, ambos teléfonos, WhatsApp, correo y dirección. Los contactos provienen del código anterior, no de llamadas o mensajes de verificación. Acordar con el operador capacidad, precio total, condiciones de reserva, pagos/cancelación y servicios reales. Probar recepción del mensaje solo con autorización; no se envió ninguno durante desarrollo.

Definir hosting/dominio y generar SEO para el dominio real. El build excluye sitemaps y manifest antiguos. No hubo despliegue.

## Servicio reutilizable AliceLabs

Base para adaptar webs de transporte: identidad, contenido autorizado, contactos del cliente, solicitud de cotización y entrega de fuentes. Acordar precio, páginas, revisiones, hosting y aceptación por escrito. Reservas, pagos, inventario y CRM son desarrollos adicionales, no incluidos.
