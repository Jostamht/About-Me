# About-Me · José Pablo

Web personal estática adaptada del PDF de 2025.

- Cada encuesta empieza con exactamente diez respuestas originales (reconstruidas aproximadamente de los gráficos del PDF); **el promedio original permanece visible**.
- Un slider **dentro de cada tarjeta** incorpora de inmediato una única evaluación adicional por visitante (11 votos por tarjeta al moverlo). Se recalcula el gráfico y el promedio combinado sin alterar los diez datos iniciales. Hay botón para quitar la evaluación.
- Se guarda únicamente en `localStorage`: los votos de distintas personas no se acumulan en un servidor.
- Los seis testimonios se muestran **uno a la vez** como carrusel con flechas y un «Leer comentario completo» para el cuarto.
- Las ocho portadas originales usan `object-fit: contain` y ajuste absoluto dentro del marco para evitar recortes.
- Spotify, meme, cronologías y enlaces de WhatsApp permanecen.

Sin compilación: abrir `index.html` en cualquier navegador moderno.
