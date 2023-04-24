<h1 align="center">JW Reports</h1>

<br>

<p align="center">
    <img 
    alt="App Logo" 
    src="./docs/JWReports-logo.jpg"
    width="350"
    />
</p>

<br>

Está aplicación es para **gestionar los informes de predicación, revisitas y cursos de los Testigos de Jehová.** Muchos hermanos 
que saben desarrollar aplicaciones han hecho aplicaciones de este tipo, así que también **me he motivado a hacerlo con el fin 
de ayudar a los hermanos y mejorar mis habilidades** con React Native y usar el servicio de Supabase. Cabe aclarar que está **no 
es una aplicación oficial de Watch Tower Bible and Tract Society of Pennsylvania.**

También he decido dejar el **código al público** para que se vea el funcionamiento de la aplicación y más hermanos que tengan los 
conocimientos debidos puedan, si ellos lo quieren, **hacer su propia implementación.**

Este documento explica las tecnologías utilizadas, el entorno de desarrollo, estructura, la base de datos, cómo correr en 
desarrollo, el testing, cómo crear su implementación propia, etc.

## 1) Tecnologías

### 1.1) React Native
Es un **marco de desarrollo de aplicaciones móviles** que permite a los desarrolladores crear aplicaciones para iOS y Android 
utilizando la misma **base de código en JavaScript y React.**

**Utiliza una arquitectura de componentes,** lo que significa que las aplicaciones se construyen a partir de **componentes 
reutilizables** que se pueden combinar para crear interfaces de usuario complejas. Estos componentes se pueden personalizar con CSS 
y JavaScript, lo que permite a los desarrolladores **crear aplicaciones móviles personalizadas y únicas.**

Proporciona una **experiencia de desarrollo más rápida** al permitir a los desarrolladores **escribir una vez y ejecutar en 
múltiples plataformas.** Además, utiliza un **enfoque de renderizado nativo,** lo que significa que las aplicaciones se ejecutan 
de manera más eficiente y tienen un mejor rendimiento que las aplicaciones web empaquetadas en una vista web dentro de 
una aplicación nativa.

### 1.2) Typescript
Lenguaje de programación de **código abierto** desarrollado por Microsoft que **amplía la sintaxis de JavaScript** con la adición de 
tipos estáticos opcionales. Se puede considerar como una **capa de abstracción sobre JavaScript** que proporciona una mayor 
seguridad y escalabilidad al código.

Los desarrolladores pueden **especificar tipos de datos para variables, funciones y otros elementos del código,** lo que permite 
**detectar errores de manera más temprana** durante la fase de desarrollo. Además, TypeScript permite a los desarrolladores 
**aprovechar las características avanzadas de ECMAScript, como clases, interfaces y decoradores,** mientras proporciona una 
compatibilidad con versiones anteriores de JavaScript.

### 1.3) Supabase
Es una **alternativa de Firebase de código abierto.** Una **plataforma de bases de datos en la nube** que combina la
simplicidad y la accesibilidad de una **herramienta de gestión de bases de datos** no relacionales con la potencia y
la escalabilidad de una base de datos relacional.

Supabase es una opción popular para desarrolladores y empresas que buscan una solución de bases de datos en la nube para
sus aplicaciones y proyectos.

### 1.4) OneSignal
Es una **plataforma de mensajería y automatización de notificaciones push** para sitios web y aplicaciones móviles. Permite a
los desarrolladores y propietarios de sitios web **enviar notificaciones push personalizadas y automatizadas** a los usuarios en
tiempo real.

### 1.5) Jest
Es la **herramienta de Test más popular** y recomendada para React. Es creado por Facebook. Jest no es solo una biblioteca, es
un marco de prueba. Significa que **viene con una biblioteca de afirmaciones, un corredor de pruebas y soporte** para cosas.
Como ha sido diseñado específicamente para probar las aplicaciones React, también se puede utilizar en otros marcos de JavaScript.

### 1.6) React Native Testing Library
Nos ofrece un nuevo enfoque a más alto nivel sobre los tests, válido tanto para **unitarios como para integración** y al combinarlos
podemos conseguir una cobertura de tests con la que podemos confirmar que estamos desarrollando sobre seguro en proyectos de
cualquier tamaño.

### 1.7) Enlaces
 * [React Native](https://reactnative.dev)  
 * [TypeScript](https://www.typescriptlang.org)  
 * [Supabase](https://supabase.com)  
 * [OneSignal](https://onesignal.com)
 * [Jest](https://jestjs.io)
 * [React Native Testing Library](https://callstack.github.io/react-native-testing-library)

<br>

## 2) Entorno de desarrollo

Para montar el entorno de desarrollo y correr la aplicación se necesitan los siguientes programas:

### 2.1) Node.js
Es un **entorno en tiempo de ejecución multiplataforma para la capa del servidor** (en el lado del servidor) basado en 
JavaScript. Controlado por eventos, diseñado para crear aplicaciones escalables, permitiéndote establecer y gestionar 
múltiples conexiones al mismo tiempo. Gracias a esta característica, no tienes que preocuparte con el bloqueo de procesos, 
pues no hay bloqueos.

Node.js está **basado en el motor V8 de Google**, uno de los intérpretes de lenguaje de programación que existen. Este 
motor se encarga de compilar el código JavaScript en código de máquina, un código de nivel más bajo que no hace falta 
que sea interpretado por el navegador.

### 2.2) Yarn (opcional)
Es un **gestor dependencias de JavaScript**, que está enfocado en la velocidad y la seguridad, y a diferencia de otros gestores
como NPM, YARN es muy rápido y muy fácil de usar.

Además, **devuelve un feedback al usuario bastante amigable**, lo que hace que este sienta que realmente la propia herramienta
vela porque aprendamos a usarla y porque tengamos siempre la mejor y más clara ayuda posible.

### 2.3) Android Studio
Cuando hablamos de Android Studio, nos referimos a un **entorno de desarrollo especializado**. Evidentemente, hablamos de todo
lo que tenga que ver con el desarrollo de herramientas y aplicaciones para sistemas operativos Android.

Permite una **flexibilidad en cuanto al desarrollo de características y funciones** que puede tener una herramienta o app de
dicho sistema.

Este entorno sirve para que las **aplicaciones que se esten desarrollando sean mucho más eficiente y autosuficientes**. Esto
permite, incluso, tener compatibilidades con otros sistemas o plataformas.

### 2.4) Flipper
Flipper es una **plataforma para depurar aplicaciones iOS, Android y React Native**. Puede visualizar, inspeccionar y controlar
sus aplicaciones desde una sencilla interfaz de escritorio. Puede usar Flipper tal cual o extiéndalo usando plugin API.

### 2.5) Enlaces
 * [Node.js](https://nodejs.org)
 * [Yarn](https://yarnpkg.com)
 * [Android Studio](https://developer.android.com/studio)
 * [Flipper](https://fbflipper.com)

<br>