![portada](/assets/Prompty_Header.png)
# Prompty
Prompty es una aplicación fullstack diseñada para mejorar y entrenar la forma en que realizamos prompts a OpenAI, mediante prompts recomendadas por categoría o prompts personalizadas. La app permite a los usuarios filtrar las prompts recomendadas por categoría y por keyword, y permite realizar consultas a openAI y guardar los chats favoritos. Prompty esta desplegada con Render. [Presentacion de negocio](https://www.canva.com/design/DAGLVV45Oow/pAhHG-zd_XYpmuZ-_z10Lw/edit?utm_content=DAGLVV45Oow&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton "presentacion de negocio")




## Requerimientos
- **Proyecto FullStack:** generación de una aplicación con Frontend(React) y Backend (node.js express).
- **Manejo de BBDD:** implentación de BBDD relacionales o no relacionales. Asincronía y validadores.
- **API Rest:** creación de un API Rest con el framework Express de node.js. CRUDs de los datos.
- **Frontend con React:**  Utilización de React Hooks y enrutamiento con route-react-dom.
- **Enrutamiento:** implementación de enrutamiento Link con route-react-dom.
- **CSS con SASS:**  Uso de normalize.css y libreria SASS con mixins y variables.
- **Documentación:** documentación de API (Swagger) y de codigo (JSDoc).
- **GitHub y ReadMe:** Uso de Git utilizando ramas sub-develop por funcionalidad.
- **Despliegue:** Despliegue de app en Render, y bbdd en Render (PosgreSQL) y Mongo DB Atlas.

### evolutivo Fase II
- **Autenticación con JWT/NodeMailer:** implementación de sistema de autenticación.
- **Testing unitario:** testing de la aplicación con XXX.

## Tecnologías
- **Frontend:** React, JSXm, HTML, css con SASS.
- **Librerias:** react-hook-form, react-loader-spinner.
- **Backend:** Node.js, Express, API Rest.
- **BBDD:** MongoDB, PosgreSQL, ODM Mongoose.
- **Cloud:** Render (Web App, PosgreSQL), MongoDB Atlas (MongoDB).
- **API:** OpenAI API.

## Funcionalidades Principales
  - **Filtro de prompts recomendados** por categoría o por palabra clave.
  - **Boton Reset filtros** para resetear los criterios de filtro y volver a mostrar todos los prompts.
  - **Aplicar prompts a OpenAI** tanto recomendados como personalizados.
  - **Chat con OpenAI** continua la conversación contextual con nuevos prompts.
  - **Guarda tus chats favoritos** en el chat puedes guardar o actualizar tus chats favoritos.
  - **Vuelve a tus chats guardados** recupera e interactura con tus chats favoritos guardados.

## Diseño de Producto
![producto](/assets/Prompty_Diseño_Producto.png)
[Link Figma](https://www.figma.com/design/EtgnS1jxxpBmdz1Hz9audK/Prompty?node-id=0-1&t=n1kD0XiqbAdGSdIY-1)

## Diseño de Arquitectura de Software

![portada](/assets/Prompty_Diagrama_Arquitectura_Software.drawio.png)
[Link Drawio](https://drive.google.com/file/d/1w3QXcT2WZ2Hm4dBp5nVAC5zl6Bs0sPmA/view?usp=sharing)


## Modelos Entidad Relación y Lógicos BBDD

![portada](/assets/Prompty_BBDD.drawio.png)
[Link Drawio](https://drive.google.com/file/d/1NGVx5dkuDIdyKl_5vmZ6ATTxxuYbfeTF/view?usp=sharing)


## Instalación
1. Haz un fork del repositorio en GitHub.

2. Clonar el repositorio:
    ```bash
    git clone https://github.com/emiliolatorre/Prompty.git
    ```
3. Navegar al directorio del proyecto:
    ```bash
    cd proyecto
    ```
4. Instalar las dependencias en el Backend:
    ```bash
    npm install
    ```
5. Navegar a la carpeta /client:
    ```bash
    cd client
    ```
6. Instalar las dependencias en el Frontend:
    ```bash
    npm install
    ```
7. Navegar de nuevo a la carpeta root del proyecto:
    ```bash
    cd ..
    ```

## Uso
1. Iniciar el servidor de desarrollo, tanto backend, seeder, como frontend:
    ```bash
    npm run dev
    ```
2. Abrir en el navegador:
    ```
    https://prompty-4y5d.onrender.com
    ```

## Estructura del Proyecto
/project-root

- **/assets**: Contiene activos generales del proyecto.
  
- **/client**: proyecto Front con React.
  - **/dist**: Archivos generados después de compilar el proyecto.
  - **/node_modules**: Dependencias del proyecto cliente.
  - **/public**: Archivos públicos del frontend.
  - **/src**: Código fuente del frontend.
    - **/assets**: Activos específicos del frontend.
    - **/components**: Componentes reutilizables de React.
    - **/context**: Archivos de contexto de React.
    - **/styles**: Archivos de estilos (CSS, SASS, etc.).
    - **App.jsx**: Componente principal de la aplicación React.
    - **main.jsx**: Punto de entrada del frontend.
  - **.env**: Variables de entorno para el frontend.
  - **.eslintrc.cjs**: Configuración de ESLint para el frontend.
  - **.gitignore**: Archivos y carpetas ignorados por Git en el frontend.
  - **index.html**: Documento HTML principal.
  - **package-lock.json**: Archivo de bloqueo de versiones de dependencias.
  - **package.json**: Configuración del proyecto y dependencias del frontend.
  - **README.md**: Documentación del frontend.
  - **vite.config.js**: Configuración de Vite para el frontend.

- **/controllers**: Controladores de la aplicación backend.
- **/middlewares**: Middlewares de la aplicación backend.
- **/models**: Modelos de datos del backend.
- **/node_modules**: Dependencias del proyecto backend.
- **/queries**: Consultas SQL y scripts relacionados.
- **/routes**: Definición de rutas de la aplicación backend.
- **/seed**: Scripts para la inicialización de la base de datos.
- **/services**: Lógica de negocio y servicios del backend.
- **/test**: Pruebas unitarias y de integración.
- **/utils**: Utilidades y funciones helper.
  - **/config**: Archivos de configuración.
  - **/sql**: Consultas SQL.
- **/validators**: Validadores de datos.

- **.env**: Variables de entorno para el backend.
- **.gitignore**: Archivos y carpetas ignorados por Git en el backend.
- **index.js**: Punto de entrada del backend.
- **package-lock.json**: Archivo de bloqueo de versiones de dependencias.
- **package.json**: Configuración del proyecto y dependencias del backend.

## Licencia
Este proyecto está bajo la Licencia MIT.

## Contacto
- GitHub: [emiliolatorre](https://github.com/emiliolatorre)
- Email: emiliolatorreguerra@example.com