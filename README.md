# SantyTravel (SG-Turismo) · Web Estática

Sitio web completo de **SG-Turismo (SantyTravel)** extraído de `https://santytravel.space-z.ai/`.

Contiene todos los recursos optimizados:
- `index.html`: Estructura HTML con soporte para SEO, metadatos y enlaces directos a WhatsApp.
- `404.html`: Fallback para SPAs.
- `.nojekyll`: Archivo de configuración para que GitHub Pages sirva correctamente los assets en la carpeta `_next`.
- `_next/static/`: Chunks de JavaScript interactivo, estilos Tailwind compilados y fuentes WOFF2.
- `buses/`: Ilustraciones de la flota (6 modelos de buses y vans).
- `fleet-photos/`: Galería fotográfica de la flota (20 imágenes de alta resolución).
- `scenes/`: Destinos turísticos de Ecuador (Quito, Baños, Cotopaxi, Chimborazo, Cuenca, etc.).
- `bus-hero.jpg`: Imagen principal del Hero.
- `logo.svg`: Isotipo vectorial local.

---

## 🚀 Cómo publicar en Cloudflare Pages

Cloudflare Pages es la opción recomendada para este tipo de proyecto estático por su CDN global ultrarrápido y compatibilidad directa.

### Opción A: Desde el panel de Cloudflare (Sin comandos)
1. Inicia sesión en [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Ve a **Compute (Workers & Pages)** > **Pages** > **Create application** > **Upload assets**.
3. Asigna un nombre a tu proyecto (ej: `santytravel`).
4. Arrastra y suelta la carpeta `santytravel` (o comprime el contenido en ZIP y súbelo).
5. Haz clic en **Deploy site**. ¡Tu sitio estará en vivo en pocos segundos con SSL gratuito!

### Opción B: Mediante Wrangler CLI
```bash
npx wrangler pages deploy . --project-name=santytravel
```

### Opción C: Conectando tu repositorio de GitHub
1. Sube este proyecto a tu GitHub (ver instrucciones abajo).
2. En Cloudflare Pages, selecciona **Connect to Git**.
3. Selecciona tu repositorio.
4. En **Build configuration**:
   - **Framework preset**: `None`
   - **Build command**: *(dejar en blanco)*
   - **Build output directory**: `.` (o dejar en blanco / raíz)
5. Haz clic en **Save and Deploy**. Cada commit que hagas a `main` actualizará tu web automáticamente.

---

## 🐙 Cómo subir el proyecto a GitHub

1. Abre una terminal en esta carpeta (`santytravel`).
2. Si aún no tienes un repositorio en GitHub, crea uno nuevo en [github.com/new](https://github.com/new) (por ejemplo: `santytravel`).
3. Conecta este repositorio local a GitHub y sube los archivos:

```bash
# Cambia la URL por la de tu repositorio de GitHub:
git remote add origin https://github.com/TU_USUARIO/santytravel.git
git branch -M main
git push -u origin main
```

---

## 🌐 Publicar en GitHub Pages

1. En tu repositorio de GitHub, ve a **Settings** > **Pages**.
2. En **Build and deployment** > **Source**, elige **Deploy from a branch**.
3. Selecciona la rama **main** y la carpeta `/ (root)`.
4. Haz clic en **Save**.
5. En un par de minutos tu sitio estará accesible en `https://TU_USUARIO.github.io/santytravel/`.

> **Nota:** Si usas un dominio personalizado en GitHub Pages (ej: `www.santytravel.com`), todas las rutas `/` funcionarán directamente. Si usas el subdominio por defecto `TU_USUARIO.github.io/santytravel/`, te recomendamos configurar un Custom Domain o usar Cloudflare Pages para que las rutas absolutas (`/scenes/...`, `/_next/...`) no requieran prefijo de ruta.

---

## 💻 Prueba local

Para visualizar el sitio en tu computadora:

```bash
# Con Python:
python -m http.server 8080

# O con Node.js / npx:
npx serve .
```

Luego abre tu navegador en `http://localhost:8080`.
