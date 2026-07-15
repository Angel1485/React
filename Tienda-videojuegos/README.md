# 🎮 Gestor de Videojuegos

**Estudiante:** Angel Sarango
**Opción seleccionada:** Número 2
**Ejercicio:** Gestión de lista o Tienda de videojuegos

---

## 1. Opción seleccionada para desarrollar
Se eligió la **Opción 2**, correspondiente al ejercicio de creación, visualización y gestión de una lista de videojuegos, enviado previamente para revisión en la plataforma Krake. Antes de esta entrega final, se incorporaron todas las correcciones necesarias para su correcto funcionamiento.

---

## 2. Descripción breve del ejercicio y su funcionalidad principal
Es una aplicación web desarrollada con **React** que permite administrar un catálogo de videojuegos de forma sencilla e intuitiva. Su objetivo es ofrecer una interfaz funcional para registrar, modificar, eliminar y consultar información de videojuegos, manteniendo los datos guardados de forma persistente en el navegador.

Sus funciones principales son:
- Visualizar la lista de videojuegos en tarjetas organizadas y adaptables a cualquier dispositivo.
- Agregar nuevos videojuegos mediante un formulario con validaciones de campos.
- Editar la información de cualquier registro existente.
- Eliminar videojuegos de la lista.
- Mostrar notificaciones visuales para confirmar cada acción realizada.
- Conservar los datos al recargar la página usando almacenamiento local.

---

## 3. Explicación general de cómo se construye y muestra la lista
La lista de videojuegos se gestiona y visualiza siguiendo este flujo:

1. **Carga inicial de datos**:
   Al abrir la aplicación, se verifica si existen datos guardados en `localStorage`. Si hay registros y la lista no está vacía, se cargan esos datos. Si no hay información guardada o la lista está vacía, se carga automáticamente la lista predeterminada que contiene el archivo `data.js`.

2. **Renderizado en la interfaz**:
   Los registros se recorren mediante el método `map()` de JavaScript y se muestran en forma de tarjetas, donde se presenta toda la información de cada juego: nombre, género, plataforma, estado, progreso y opciones de edición y eliminación.

3. **Actualización y persistencia**:
   Cada vez que se agrega, modifica o elimina un videojuego, el estado de la lista se actualiza y automáticamente se guarda el contenido completo en `localStorage`. Esto asegura que los cambios no se pierdan al cerrar o recargar la página.

---

## 4. Correcciones realizadas
A partir de la retroalimentación recibida en la revisión del ejercicio en Krake, se aplicaron los siguientes ajustes:

- **Carga de datos corregida**: Se modificó la lógica para que, si la lista guardada está vacía, se vuelva a cargar la lista original de `data.js` y no quede la interfaz en blanco.
- **Notificaciones mejoradas**: Se ajustó el tiempo de duración de las alertas para que permanezcan visibles 5 segundos y desaparezcan lentamente en 1 segundo, sin verse afectadas al mover el ratón.
- **Diseño y estilos**: Se mejoró la apariencia de las tarjetas, se agregó un efecto de degradado tipo arcoíris en la barra de progreso, se mantuvo la estructura original solicitada y se aseguró que todo se adapte correctamente a pantallas pequeñas.
- **Sincronización de estado**: Se corrigió el funcionamiento entre el estado de React y el almacenamiento local para evitar conflictos o pérdida de información al recargar la página.

---

## 5. Pasos necesarios para instalar y ejecutar el proyecto localmente

1. **Descargar o clonar el repositorio**

git clone <URL_DE_TU_REPOSITORIO>

2. Instalar las dependencias

Ejecuta este comando para instalar todos los paquetes necesarios:

npm install

Luego ejecuta: npm run dev

Luego: Ingresa a la dirección que aparece en la consola, generalmente es: http://localhost:5173 