# Hola, soy José Pablo 👋
### El about me que nadie pidió

**👉 [jostamht.github.io/About-Me](https://jostamht.github.io/About-Me/)**

Esto empezó como una presentación en PDF en 2025 para que mis amigos supieran quién soy. Terminó siendo una página web con encuestas, un sistema de votación, un carrusel de testimonios y un meme final. No sé en qué momento se me fue de las manos, pero me divertí mucho.

> *«Te prometo que sí soy un buen tipo por muy dudoso que se vea esto.»*

Estilo: oscuro, dorado y un poquito dramático, como si mi vida fuera un tráiler de película.

---

## 🗺️ Qué vas a encontrar (en orden de scroll)

| # | Sección | De qué va |
|---|---|---|
| 00 | **Portada** | «HOLA. SOY JOSÉ PABLO.» más una baraja de **evidencia fotográfica** con tres fotos reales: Saladix, una carrera y trekking. Se navega con flechas o con el teclado. |
| 01 | **Validación social** | Cuatro encuestas a mis amigos, con resultados «completamente científicos (más o menos)». |
| — | **Testimonios** | Cinco comentarios de amigos *reales (supuestamente)*, en carrusel. Hay uno larguísimo con botón de «Leer comentario completo». |
| 02 | **Lore personal** | Mi línea del tiempo, de 2000 a 2026, en dos capítulos. |
| 03 | **Cosas buenas** | Doce portadas: lo que me gusta y lo que estoy disfrutando ahora. |
| 04 | **Side quests** | Diez misiones secundarias con torres de nivel de habilidad. |
| 05 | **Banda sonora** | Mi playlist de Spotify. Preferencia declarada por **los boleros**. |
| 06 | **Q&A** | Preguntas que probablemente no necesitabas hacer. |
| 07 | **La decisión más importante** | El gran final. Y sí, hay meme. |

---

## 📊 Las encuestas (la parte más seria, en teoría)

Le pregunté a mis amigos, y los números hablaron:

| Pregunta | Promedio | Veredicto de la tarjeta |
|---|---|---|
| ¿Qué tan confiable soy? | **9.4** / 10 | «Formato APA casi certificado» |
| ¿Qué tan carismático soy? | **8.6** / 10 | «El encanto es debatible» |
| ¿Soy un buen tipo? | **9.5** / 10 | «La gente ha hablado» |
| ¿Qué tan inteligente me ves? | **8.6** / 10 | «Aprobado por mis amigos» |

Cada tarjeta es **interactiva**:

- Tiene un slider de «¿Y tú qué opinas?» para sumar **tu propio voto**.
- El histograma y el promedio se recalculan en el momento, con mis diez respuestas originales más la tuya.
- Si te arrepientes, hay botón de **Restablecer**.
- Tu voto se guarda solo en tu navegador (`localStorage`). No hay servidor, así que nadie más lo ve y nadie puede inflar mis números. Tampoco puedo hacerlo yo (lo intenté, es broma).

Las distribuciones originales las reconstruí a ojo a partir de los gráficos del PDF, así que **no se garantiza objetividad en la muestra**. Está escrito en la página y todo.

---

## 🕹️ Side quests

Mis habilidades en forma de torres de 10 segmentos. Los porcentajes son **autoevaluaciones ilustrativas**, así que cualquier parecido con mi nivel real es pura coincidencia:

| Habilidad | Nivel |
|---|---|
| 🎨 Diseño | 82 % |
| 📸 Fotografía | 66 % |
| 🎤 Canto | 64 % |
| ✂️ Arts & Crafts | 60 % |
| 🏋️ Weightlifting | 50 % |
| ✏️ Dibujar | 41 % |
| 🍳 Cocina | 38 % |
| 🖌️ Pintar | 16 % |
| 💃 Baile | 12 % |
| 🧵 Costurar | 9 % |

---

## 🎬 Cosas buenas

Las dos estanterías tienen seis categorías cada una: anime, libro, videojuego, manga, series y películas.

| | Favoritos de siempre | Lo que estoy disfrutando ahora |
|---|---|---|
| **Anime** | Gurren Lagann | Mob Psycho 100 |
| **Libro** | Historia de la belleza | Muscle Ladder |
| **Videojuego** | Death Stranding | Yakuza 3 Remastered |
| **Manga** | The Boxer | Hardcore Leveling Warrior |
| **Series** | The Mandalorian | The Wonderfools |
| **Películas** | Iron Man | Spider-Man: Brand New Day |

Las tarjetas usan relación 2:3 y `object-fit: cover`, para que ninguna portada quede cortada de forma rara.

---

## 🤔 Q&A

- **¿No te da vergüenza?** Sí, bastante. Pero uno tiene que adaptarse o morir.
- **¿Dulce o salado?** Salado.
- **¿Frío o calor?** Antes team frío, ahora más team caliente.
- **¿Color favorito?** Todos, pero sobre todo azul, celeste, turquesa, morado, verdes y naranjas, con degradado incluido.

---

## 💬 El gran final

La pregunta es si quieres ser mi amigo. Hay dos botones:

- 🟢 **sí**
- 🔴 **sí, pero rojo**

Los dos abren WhatsApp con el mensaje «Sí, seamos amikos». Aquí no hay forma de decir que no, y es a propósito.

---

## 🛠️ Por dentro

Todo es **HTML, CSS y JavaScript** sin frameworks ni compilación. Para verlo en tu compu, abre `index.html` en el navegador y listo.

```
About-Me/
├── index.html    → el contenido
├── styles.css    → el tema oscuro y dorado
├── script.js     → baraja de fotos, votos, carrusel y animaciones
└── assets/       → fotos, portadas y meme
```

- **Tipografías:** Space Grotesk (títulos) y DM Sans (texto), de Google Fonts.
- **Detalles:** barra de progreso de lectura, animaciones al hacer scroll, menú que marca la sección activa y navegación con flechas del teclado en los carruseles.
- **Accesibilidad:** enlace para saltar al contenido, textos alternativos en las fotos y respeto por `prefers-reduced-motion` (si tu sistema pide menos movimiento, la página se calma).
- **Publicación:** GitHub Pages (`.nojekyll` incluido).

### Al compartir el enlace
Las etiquetas Open Graph están directamente en el `<head>`, con la imagen horizontal `assets/about-me-share-2026.jpg` (1200×630) como arte para WhatsApp, Facebook y X. La dirección canónica es `https://jostamht.github.io/About-Me/`.

> 💡 Si WhatsApp sigue mostrando una vista previa vieja, agrega un parámetro inocuo al enlace, por ejemplo `?v=20261031`, y lo vuelve a leer.

---

## 📝 Bitácora de cambios

- **Oct 2026:** línea del tiempo ampliada (2006, 2008, 2015, 2016, 2021 y «Escuela de la vida» pasa a 2026). Se retiró un comentario de los testimonios. Se actualizaron Side Quests y Q&A. La baraja de portada pasó a tres fotos reales. Las portadas usan `cover` en lugar de `contain`.
- **30 oct 2026:** galería ampliada con series y películas. Death Stranding reemplazó a Portal 2 como videojuego favorito.
- **Antes:** la cronología de fe se retiró por petición del autor (o sea, yo).

---

*Hecho con curiosidad, humor y demasiado tiempo libre.*
*Idea original: 2025 · Reinterpretación web: 2026*
