# dwec

# UT05 Práctica DOM

## Objetivo
Evolucionar de la unidad anterior para visualizar los objetos creados en formato HTML utilizando el API de DOM o el framework jQuery. La práctica consiste en implementar una Single Page Application (SPA).

## Herramientas
Para el desarrollo de la práctica deberás utilizar la herramienta de gestión de versiones GIT e ir guardando una copia de la versión realizada en GitHub.

## Requisitos de la práctica
Implementar un diseño de HTML que sirva de esqueleto para cargar el contenido generado en la práctica de la unidad UT04. El esqueleto debe estar preparado para mostrar el siguiente contenido:
- Cabecera
- Pie
- Zona central donde modificar el contenido
- Menú de opciones (integrado en la cabecera o en un lateral)
- Navegación con migas de pan
- Listados de elementos (grid para mostrar los elementos)
- Ficha de elemento individual para cada tipo de objeto creado

Podrás utilizar un framework como Bootstrap para que tu página quede más vistosa, o utilizar una plantilla que hayas encontrado en Internet, aunque se tendrá en cuenta si haces tu propio desarrollo. No se podrá reutilizar la plantilla de los ejemplos del curso.

## Funcionalidades a desarrollar

### Funcionalidades obligatorias
1. **Inicialización de objetos:**
    - Crear una función o método que cree los objetos iniciales que va a contener nuestra página.
    - Añadir un mínimo de:
        - 3 categorías, con 4 platos en cada categoría.
        - 4 alergenos.
        - 3 menús, con al menos 3 platos en cada menú.
        - 3 restaurantes.
    - Si utilizas MVC, esto se haría en el evento `onLoad()`.

2. **Carga inicial de la página:**
    - Mostrar en la zona central todas las categorías disponibles.
    - Incluir un menú con los enlaces a dichas categorías.
    - El enlace de inicio de la página deberá mostrar esta distribución nuevamente.

3. **Página inicial:**
    - Mostrar 3 platos de forma aleatoria.

4. **Navegación por categorías:**
    - Al cliquear en una categoría desde el menú o la zona central, mostrar todos los platos de la categoría en la zona central.
    - Sustituir las categorías iniciales por el listado de platos.

5. **Ficha de platos:**
    - Al cliquear en un plato, mostrar su ficha con todas sus propiedades.

6. **Opciones del menú:**
    - **Alergenos:**
        - Acceso al listado de alergenos registrados.
        - Al cliquear en un alergeno, mostrar el listado de platos que pueden contener ese alergeno.
    - **Menús:**
        - Misma funcionalidad que los alergenos.
    - **Restaurantes:**
        - Menú desplegable con todos los restaurantes registrados.
        - Al cliquear en un restaurante, mostrar la información del restaurante.

### Funcionalidades optativas
7. **Implementación utilizando el patrón MVC.**

8. **Navegabilidad:**
    - Al acceder a un menú y ver sus platos, poder navegar a la información de cada plato.
    - Al acceder a un alergeno, el listado de platos debe ser cliqueable para acceder a la ficha del plato.
    - Incluir migas de pan para revisar en qué opción estamos ubicados.
