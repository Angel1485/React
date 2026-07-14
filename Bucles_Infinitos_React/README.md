# Taller de Bucles Infinitos en React

Proyecto académico que reproduce, analiza y corrige dos errores frecuentes
relacionados con bucles infinitos y renderizados descontrolados en React.

## Estructura del proyecto

Al abrir la aplicación, ambos casos muestran por defecto la versión
corregida, para que el proyecto no quede bloqueado. Cada caso tiene un
botón "Ver versión con error" para observar el problema de forma controlada.

## Caso 1 · Bucle infinito mediante useEffect

### Qué ocurre al ejecutar el ejemplo con error
Al activar BuggyEffectLoop, el contador en pantalla empieza a subir sin
detenerse. El navegador consume cada vez más CPU y la pestaña puede volverse
lenta o dejar de responder si se deja corriendo.

### Por qué se produce
El useEffect llama a setCount(count + 1) sin un arreglo de dependencias.
Sin ese segundo argumento, React ejecuta el efecto después de cada
renderizado. Esto genera el siguiente ciclo:

1. El componente se renderiza.
2. useEffect se ejecuta y actualiza el estado.
3. El cambio de estado provoca un nuevo renderizado.
4. Al no existir arreglo de dependencias, el efecto se vuelve a ejecutar
   tras ese renderizado, repitiendo el paso 2 indefinidamente.

### Síntomas
- El contador en pantalla sube muy rápido y sin parar.
- El uso de CPU/memoria del navegador aumenta notablemente.
- La pestaña se vuelve poco responsiva.

### Cómo se solucionó
En FixedEffectLoop.jsx se agregó un arreglo de dependencias explícito
([count]), una condición de control (count < 5) y una función de limpieza
(clearTimeout) para detener las actualizaciones de forma ordenada.

### Diferencia entre versiones
La versión con error no tiene arreglo de dependencias ni condición de
control, por lo que se repite indefinidamente. La versión corregida solo
se ejecuta cuando count cambia y se detiene al llegar a 5.

## Caso 2 · Error "Too many re-renders"

### Qué ocurre al ejecutar el ejemplo con error
Al activar BuggyRerender, React interrumpe la ejecución y muestra el error
"Too many re-renders. React limits the number of renders to prevent an
infinite loop."

### Por qué se produce
setCount(count + 1) se llama directamente en el cuerpo del componente,
durante el renderizado, en lugar de dentro de un manejador de eventos.
Cada render dispara una nueva actualización de estado, que dispara otro
render, en un ciclo continuo que React detiene automáticamente.

### Síntomas
- La aplicación muestra de inmediato el mensaje de error de React.
- La consola registra el mismo error con su traza.

### Cómo se solucionó
En FixedRerender.jsx la actualización de estado se movió a un manejador
de eventos (handleIncrement), que solo se ejecuta cuando el usuario hace
clic en el botón.

### Diferencia entre versiones
La versión con error actualiza el estado en cada render sin intervención
del usuario. La versión corregida solo actualiza el estado cuando el
usuario hace clic.

## Cómo instalar y ejecutar el proyecto localmente

Requisitos: Node.js 18 o superior y npm.

    git clone <URL_DEL_REPOSITORIO>
    cd taller-bucles-infinitos-react
    npm install
    npm run dev

La aplicación quedará disponible en http://localhost:5173. Por defecto se
cargan las versiones corregidas de ambos casos.