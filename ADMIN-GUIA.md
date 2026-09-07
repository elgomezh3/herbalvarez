# Guía del panel de contenido (/admin)

El sitio de Herbalvarez tiene un panel para administrar la sección **Atletas**
sin tocar código. Está hecho con [Sveltia CMS](https://sveltiacms.app/) y guarda
todo directamente en el repositorio de GitHub `elgomezh3/herbalvarez`.

Cada cambio que guardas en el panel:

1. Hace un commit en la rama `main` de GitHub.
2. Vercel detecta el commit y vuelve a publicar el sitio (1–2 minutos).
3. La tarjeta aparece / cambia / desaparece en `herbalvarez.com`.

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

Ya estás dentro. Verás la colección **Atletas** con la lista de tarjetas.

> Si algún día el token expira, el panel te pedirá uno nuevo: repite los pasos
> de arriba. No afecta el contenido ya guardado.

---

## 2. Agregar un atleta

1. En **Atletas**, haz clic en **"New Atleta"** (arriba a la derecha).
2. Llena los campos:

   | Campo | Qué poner |
   | --- | --- |
   | **Nombre completo** | El nombre real. Puedes dejarlo vacío por ahora: mientras tanto la tarjeta usa el usuario de Instagram como título. |
   | **Disciplina** | Boxeo, MMA, Muay Thai, Kickboxing… |
   | **Categoría o club** | Peso wélter, Amateur élite, Club Álvarez Box… |
   | **Usuario de Instagram** | Solo el usuario, **sin la @** y sin el enlace. Ej.: `boxeoalvarez`. Es obligatorio: la tarjeta enlaza a `instagram.com/ese-usuario`. |
   | **Foto** | Ver el punto 3. Opcional. |
   | **Testimonio (texto corto)** | Una frase **real** de la persona, con su permiso. Si no tienes una, **déjalo vacío**: la tarjeta simplemente no muestra frase. Nunca inventes un testimonio. |
   | **Relación con la marca** | Elige la opción honesta: sin relación comercial / recibe producto / patrocinado / atleta del equipo. Si no es "sin relación", la tarjeta muestra esa declaración. |
   | **Orden** | Número. Menor = aparece primero. Ej.: 1, 2, 3… |
   | **Publicado** | Actívalo para que se vea en el sitio. |

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

## Preguntas frecuentes

**¿Puedo editar los productos, precios o el carrito desde aquí?**
No. El panel solo administra la sección Atletas. Todo lo demás se cambia en el código.

**Guardé un cambio y no se ve en el sitio.**
Espera 1–2 minutos y recarga. Si sigue igual, revisa en Vercel que el último
deploy haya salido en verde.

**Me equivoqué y quiero deshacer.**
Cada cambio es un commit en GitHub. Se puede revertir desde GitHub o pidiendo
ayuda con el código.

**¿Otra persona puede entrar?**
Solo quien tenga un token de GitHub con acceso de escritura al repositorio.
Hoy eres tú. No compartas tu token.
