# Trujillo-y-Asociados
Landing-page para el despacho de abogados Trujillo y Asociados

# Convenciones de manejo de componentes de Astro
## Estructura de carpetas
- `src/components`: Contiene todos los componentes reutilizables de la aplicación.
- `src/pages`: Contiene las páginas principales de la aplicación.
- `src/layouts`: Contiene los diseños de página que pueden ser reutilizados en diferentes páginas.
- `src/assets`: Contiene los archivos estáticos como imágenes, estilos CSS, etc.
- `src/styles`: Contiene los archivos de estilos globales de la aplicación.

## Nomenclatura de archivos
- Los archivos de componentes deben seguir la convención de PascalCase (por ejemplo, `Header.astro`, `Footer.astro`).
- Las páginas deben seguir la convención de kebab-case (por ejemplo, `home.astro`, `about-us.astro`).
- Los archivos de estilos globales deben seguir la convención de kebab-case (por ejemplo, `global.css`).

## Manejo de componentes
- Cada componente debe ser autónomo y reutilizable, con una única responsabilidad.
- Los componentes deben recibir datos a través de props y no deben depender de estados globales.
- Se deben evitar los componentes anidados en exceso para mantener la claridad y la mantenibilidad del código.
- Se deben utilizar comentarios/documentación solo para explicar bloques de código que no pueda documentarse por sí solo.
- Se deben seguir las mejores prácticas de accesibilidad al desarrollar componentes, como el uso de etiquetas semánticas y atributos ARIA cuando sea necesario.
- El comportamiento y diseño específico del componente debe estar contenido dentro de el mismo.
- Se deben evitar los estilos en línea y, en su lugar, utilizar clases CSS para aplicar estilos a los componentes.
- Se deben utilizar nombres de clase descriptivos y específicos para evitar conflictos de estilos.
- Se deben evitar los componentes con demasiadas props, lo que puede indicar que el componente tiene demasiada responsabilidad y debería ser dividido en componentes más pequeños.
- Se deben evitar los componentes que dependen de otros componentes para funcionar, lo que puede dificultar su reutilización y mantenimiento.

## Ejemplo de uso de componentes
```html
---
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
---
<Header title="Trujillo y Asociados" />
<main>
    <h1>Bienvenidos a Trujillo y Asociados</h1>
    <p>Somos un despacho de abogados especializado en derecho civil, penal y laboral.</p>
</main>
<Footer />

<style>
    main {
        padding: 20px;
        text-align: center;
    }
</style>
```

## Contribución
Las Pull Request para este proyecto deben cumplir con el siguiente checklist:
- [ ] El código sigue las convenciones de manejo de componentes de Astro.
- [ ] El código ha sido probado y funciona correctamente.
- [ ] El código está bien documentado y es fácil de entender.
- [ ] No se han introducido errores o problemas de rendimiento en el código existente.
- [ ] No deben agregarse más de 500 líneas de código en una sola Pull Request para facilitar la revisión y mantener la calidad del código.
- [ ] Se han agregado pruebas e2e para cualquier nueva funcionalidad o cambio significativo en el código existente.
- [ ] Está compuesto por commits granulares.
- [ ] Los commits siguen la estructura siguiente:

    ``` 
    tipo(alcance opcional): descripción

    [descripción adicional]

    [tarea de Trello]
    ```

    ### Tipos de tarea:
    - **feat**: Al agregar una nueva funcionalidad a la aplicación.
    - **fix**: Al corregir un error o bug en la aplicación.
    - **docs**: Al agregar o actualizar documentación.
    - **chore**: Al realizar tareas de mantenimiento o configuración.
    - **refactor**: Al reestructurar código sin cambiar su comportamiento.

    ### Tipos de alcance:
    - **tests**: Al agregar o actualizar pruebas.
    - **seo**: Al agregar o actualizar elementos relacionados con la optimización para motores de búsqueda.
    - **design**: Al agregar o actualizar elementos relacionados con el diseño de la aplicación.
    - **behavior**: Al agregar o actualizar elementos relacionados con el comportamiento de la aplicación.
    - **performance**: Al agregar o actualizar elementos relacionados con el rendimiento de la aplicación.

