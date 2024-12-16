# Pronostik

**Pronostik** es una aplicación desarrollada con React que utiliza la API de OpenWeather para proporcionar información meteorológica en tiempo real. La aplicación ofrece datos detallados sobre una variedad de parámetros climáticos, lo que la convierte en una herramienta útil para conocer el estado del tiempo actual y el pronóstico para los próximos días.

## Características principales

- **Información detallada del clima:** Pronostik muestra datos como la temperatura actual, la calidad del aire, la presión atmosférica, la velocidad y dirección del viento, la nubosidad y más.

- **Pronóstico a 5 días:** Además del clima actual, ofrece predicciones detalladas para los próximos cinco días.

- **Mapas interactivos:** Gracias a la integración de las APIs de OpenWeather y Leaflet, la aplicación incluye mapas interactivos que permiten visualizar diferentes parámetros meteorológicos en tiempo real de manera clara y atractiva.

## Tecnologías utilizadas

- **React:** Framework principal para el desarrollo de la interfaz de usuario.
- **API de OpenWeather:** Fuente principal de datos meteorológicos.
- **Leaflet:** Librería para la creación de mapas interactivos.

## Instalación y uso

1. Clona este repositorio:
   ```bash
   git clone https://github.com/samucopp/pronostik.git
   ```
2. Accede al directorio del proyecto:
   ```bash
   cd pronostik
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Gestiona la clave API:
   - Crea un archivo `apikey.js` en la raíz del proyecto.
   - Copia el contenido del archivo `apikey_example.js` y reemplaza la clave de ejemplo con tu propia clave de la API de OpenWeather.
   - El archivo `apikey.js` está incluido en el `.gitignore`, por lo que no se subirá al repositorio.

5. Inicia la aplicación:
   ```bash
   npm run dev
   ```
6. Abre [http://localhost:3000](http://localhost:3000) para ver la aplicación en tu navegador.

## Contribuir

Si deseas contribuir a Platto, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama para tu característica o corrección (`git checkout -b mi-nueva-caracteristica`).
3. Realiza tus cambios y haz un commit (`git commit -am 'Añadí una nueva característica'`).
4. Sube tus cambios a tu repositorio forked (`git push origin mi-nueva-caracteristica`).
5. Crea un Pull Request desde tu repositorio hacia el repositorio original.

## Colaboradores

[![GitHub](https://img.shields.io/badge/GitHub-@Izorrai-blue?style=flat-square&logo=github)](https://github.com/Izorrai)
[![GitHub](https://img.shields.io/badge/GitHub-@JorgePascualFuentecilla-blue?style=flat-square&logo=github)](https://github.com/JorgePascualFuentecilla)
[![GitHub](https://img.shields.io/badge/GitHub-@samucopp-blue?style=flat-square&logo=github)](https://github.com/samucopp)