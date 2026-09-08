# Guía del panel de contenido (/admin)

El sitio de Herbalvarez tiene un panel para administrar **todo el contenido**
sin tocar código. Está hecho con [Sveltia CMS](https://sveltiacms.app/) y guarda
todo directamente en el repositorio de GitHub `elgomezh3/herbalvarez`.

En el panel hay tres áreas:

- **Secciones del sitio** — el texto de cada sección: título, párrafo y listas
  (Portada, El problema, Banda dorada, Productos–encabezado, Por qué es diferente,
  Atletas–encabezado, Contacto). Ver el punto 6.
- **Productos** — un producto por ficha (nombre, claim, descripción, imagen…).
  Ver el punto 7.
- **Atletas** — un atleta por ficha. Ver los puntos 2 a 5.

Cada cambio que guardas en el panel:

1. Hace un commit en la rama `main` de GitHub.
2. Vercel detecta el commit y vuelve a publicar el sitio (1–2 minutos).
3. El cambio aparece en `herbalvarez.com`.

---

## 1. Entrar a /admin

Abre **https://herbalvarez.com/admin** (o `http://localhost:3000/admin` si lo
corres en tu compu).

La primera vez necesitas un **token personal de GitHub**. Se hace una sola vez;
después el navegador lo recuerda.

### Crear el token (una sola vez)

1. En la pantalla de login del panel, haz clic en **"Sign In with Token"**.
2. El panel abre un enlace a GitHub con los permisos ya seleccionados.
   Si te pide elegir, usa un **fine-grained token** con acceso **solo al
   repositorio `elgomezh3/herbalvarez`** y permiso de **Contents: Read and write**.
3. Ponle una expiración (90 días está bien) y genera el token.
4. **Copia el token** (empieza con `github_pat_...`). GitHub solo lo muestra una vez.
5. Vuelve al panel, pega el token en el cuadro y confirma.

Ya estás dentro. En la barra de la izquierda verás **Secciones del sitio**,
**Productos** y **Atletas**.

> Si algún día el token expira, el panel te pedirá uno nuevo: repite los pasos
> de arriba. No afecta el contenido ya guardado.

---

## 2. Agregar un atleta

1. En **Atletas**, haz clic en **"New Atleta"** (arriba a la derecha).
2. Llena los campos:

   Cada ficha se ve como las de la sección **Productos**: foto de un lado, texto
   del otro, alternando. Así se llena cada parte:

   | Campo | Dónde sale en la ficha | Qué poner |
   | --- | --- | --- |
   | **Nombre completo** | Título grande | El nombre real. Si lo dejas vacío, el título usa el `@usuario` de Instagram. |
   | **Disciplina** | Línea de arriba (junto al `@usuario`) | Boxeo, MMA, Muay Thai, Béisbol… |
   | **Categoría o club** | Misma línea, después de la disciplina | Peso wélter, Amateur élite, Club Álvarez Box… Opcional. |
   | **Usuario de Instagram** | Línea de arriba + primer enlace de redes | Solo el usuario, **sin la @** y sin el enlace. Ej.: `boxeoalvarez`. Obligatorio. |
   | **Récord como atleta** | Frase destacada bajo el nombre | Su marca: `12-1, 8 KO`, `Guante de Oro 2024`, `.312 de bateo`… Opcional. |
   | **Foto** | El lado de la imagen | Ver el punto 3. Opcional. |
   | **Testimonio (texto corto)** | Párrafo de descripción | Una frase **real** de la persona, con su permiso. Si no tienes una, **déjala vacía**. Nunca inventes un testimonio. |
   | **En qué le han ayudado los productos** | Etiquetas | Frases muy cortas, una por renglón: "Menos dolor de manos", "Duerme mejor"… Opcional. |
   | **Redes sociales** | Enlaces de abajo | Agrega TikTok, Facebook, YouTube, etc. con el **enlace completo** (`https://…`). Instagram ya se toma del campo de arriba, no lo repitas. |
   | **Relación con la marca** | Nota chica al final | Elige la opción honesta: sin relación comercial / recibe producto / patrocinado / atleta del equipo. |
   | **Orden** | — | Número. Menor = aparece primero. Ej.: 1, 2, 3… |
   | **Publicado** | — | Actívalo para que se vea en el sitio. |

   > Para agregar una red social o una etiqueta: en ese campo haz clic en
   > **"Add"** y llena el renglón nuevo. Para quitar, usa la **X** del renglón.

3. Haz clic en **"Save"**.

En 1–2 minutos la tarjeta aparece en `herbalvarez.com` en la sección Atletas.

---

## 3. Subir la foto de un atleta

1. Abre el atleta (o créalo) y ve al campo **Foto**.
2. Haz clic en **"Choose an image"** → **"Upload"** y elige el archivo de tu compu.
3. Recomendado: foto **vertical** (retrato), enfocada en la persona, mínimo
   1000 px de alto, en JPG o PNG. Se recorta automáticamente a un rectángulo
   vertical en la tarjeta.
4. Guarda con **"Save"**.

La imagen se guarda en `public/atletas/` dentro del repositorio.

> **Si un atleta no tiene foto:** la tarjeta muestra un recuadro verde neutro
> con su inicial y la palabra "Sin foto". No pasa nada por dejarlo así un tiempo.

---

## 4. Despublicar a alguien (sin borrarlo)

1. Abre el atleta en el panel.
2. Cambia **Publicado** a **apagado** (off).
3. **"Save"**.

La tarjeta desaparece del sitio en el siguiente redeploy, pero el registro
queda guardado. Para volver a mostrarlo, activa **Publicado** otra vez.

### Borrarlo de verdad

Abre el atleta y usa **"Delete entry"** (abajo). Esto sí elimina el archivo
del repositorio. Úsalo solo si de verdad no lo quieres más.

---

## 5. Cambiar el orden de las tarjetas

Edita el campo **Orden** de cada atleta. El sitio los muestra de menor a mayor.
Si dos tienen el mismo número, se ordenan por el usuario de Instagram.

---

## 6. Editar el texto de las otras secciones

En la barra de la izquierda, entra a **Secciones del sitio**. Cada renglón es una
sección de la página:

| Renglón | Qué controla |
| --- | --- |
| **Portada (Hero)** | El título grande de arriba, el párrafo, los dos botones, los 3 números. |
| **El problema** | Título, párrafo y las 4 tarjetas de dolores. |
| **Banda dorada en movimiento** | Las frases que corren en la franja dorada. |
| **Productos — encabezado** | El título "Cinco fórmulas…", el párrafo y el aviso legal del final. Los productos en sí se editan en **Productos** (punto 7). |
| **Por qué es diferente** | El título del panel verde, el párrafo y los 4 pilares. |
| **Atletas — encabezado** | El título "La comunidad en el ring", el eyebrow y el párrafo. Los atletas se editan en **Atletas**. |
| **Contacto** | Título, párrafo, correo, WhatsApp, redes y la letra chica del final. |

**Cómo funciona un título de sección:** el campo **Título** acepta varios
renglones. Cada renglón que escribas sale en una línea distinta en el sitio.
No lo dejes vacío.

**Listas (dolores, pilares, frases, redes):** usa **"Add"** para agregar un
elemento y la **X** para quitarlo. Puedes arrastrarlos para reordenar.

Cuando termines, **"Save"**. En 1–2 minutos el cambio está en línea.

---

## 7. Editar productos

En **Productos** cada ficha es un producto. Campos:

| Campo | Qué poner |
| --- | --- |
| **Nombre** | Ej.: Descanso Total. |
| **Categoría** | Recuperación / Rendimiento / Ring / Bienestar. |
| **Formato** | Ej.: `Aceite · 60 ml · uso tópico`. |
| **Frase destacada (claim)** | La línea en negrita bajo el nombre. |
| **Descripción** | El párrafo. |
| **Usos / etiquetas** | Frases cortas, una por renglón. |
| **Imagen del producto** | Foto del envase, fondo transparente (PNG) de preferencia. |
| **Foto de fondo de la fila** | Solo para filas destacadas. Normalmente vacío. |
| **Color de acento** | Rubí (recuperación) / Oro / Neutro. |
| **Orden** | Menor = aparece primero. |
| **Publicado** | Apágalo para ocultar el producto sin borrarlo. |

Para **agregar** un producto usa **"New Producto"**; para quitarlo, **"Delete
entry"**.

---

## Preguntas frecuentes

**¿Puedo editar precios o el carrito desde aquí?**
No. El panel administra el contenido (textos, productos, atletas). No hay tienda
ni carrito todavía; los botones "Comprar" y "Pedir" llevan a la sección de
contacto.

**Guardé un cambio y no se ve en el sitio.**
Espera 1–2 minutos y recarga. Si sigue igual, revisa en Vercel que el último
deploy haya salido en verde.

**Me equivoqué y quiero deshacer.**
Cada cambio es un commit en GitHub. Se puede revertir desde GitHub o pidiendo
ayuda con el código.

**¿Otra persona puede entrar?**
Solo quien tenga un token de GitHub con acceso de escritura al repositorio.
Hoy eres tú. No compartas tu token.
