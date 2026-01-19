# Ejemplo con Node.js, Express, Mongoose y TypeScript para explicar el Hashing de contraseñas con bcrypt

La idea es que en vez de guardar la contraseña en texto plano, se guarde un hash de la contraseña. Este hash es la contraseña procesada con una serie de pases y operaciones logicas para convertir la contraseña en un codigo extraño.
Para verificar si la contraseña es correcta, se compara el hash con la contraseña ingresada, es decir, se vuelve a procesar la contraseña y se compara si el resultado que da es el mismo que el extraño codigo que tenemos guardado.

Este procesado de la contraseña se hace usando unas cadenas de 128 bits conocidas como salt. Esta se almacena dentro del mismo string de texto que el hash final.

# Anatomía del string de Bcrypt

Tomemos este ejemplo de hash: $2b$12$G17p6M2vK9v.2L3R4S5T6uV7wX8yY9zZ0aB1cD2eF3gH4iJ5kL6m.

Identificador del algoritmo ($2b$): Los primeros caracteres indican qué versión de bcrypt se usó.

Factor de costo ($12$): Indica que se realizaron $2^{12}$ iteraciones.

La Salt (G17p6M2vK9v.2L3R4S5T6u): Los siguientes 22 caracteres (en formato Radix-64) son la representación de esos 128 bits de sal.

El Hash (V7wX8yY9zZ0aB1cD2eF3gH4iJ5kL6m.): Los caracteres restantes son el resultado del cifrado final.

Bcrypt requiere mucha memoria y gestión de estados internos (S-Boxes), algo que a las GPUs no se les da tan bien como a los procesadores normales (CPUs). Esto hace que el ataque sea mucho más caro y lento de ejecutar para el ladrón. Si es una agencia gubernamental con una supercomputadora dedicada exclusivamente a tu cuenta durante meses, pueden obtener tu contraseña.

Esto se basa en el Principio de Kerckhoffs: un sistema criptográfico debe ser seguro incluso si todo sobre el sistema, excepto la clave (en este caso, tu contraseña), es de conocimiento público.

Aunque el ladrón sepa que bcrypt usa 4,096 rondas de mezcla (Costo 12), no hay un atajo matemático para llegar al resultado de la ronda 4,096 sin pasar primero por la 1, la 2, la 3...

Para cada intento de adivinanza, el ladrón tiene que gastar el mismo tiempo de electricidad y procesador que gastó el servidor original. Replicar el proceso solo le da la herramienta para intentarlo, pero no le da velocidad.

Resumen: Procesamos la contraseña gastando energia para hacer mas dificil un ataque de fuerza bruta.

# Estructura de la aplicacion:

ExpressMongo/

├── .env //Aqui ponemos la url de mongo y puerto de la aplicacion

├── package.json //Aqui ponemos las dependencias

├── tsconfig.json //Aqui ponemos la configuracion de typescript

├── src/

│   ├── server.ts //Para ir lanzando el servidor

│   ├── types/

│   │   └── usuario.types.ts //Tipos de datos

│   ├── config/

│   │   └── database.ts //Conectarse a MongoDB

│   ├── models/

│   │   └── Usuario.ts //Modelo de usuario utilizado

│   ├── routes/

│   │   └── usuarios.routes.ts //Donde ocurren los Get, Post...

│   ├── data/

│   │   └── usuarios-seed.ts //Para insertar datos

│   └── scripts/

│       └── seedUsuarios.ts //Para probar como funciona el hashing

└── dist/ (se genera automáticamente al compilar)

Herramientas utilizadas:
- Node.js
- Express
- Mongoose
- TypeScript
- Nodemon
- dotenv
- bcrypt


npm install express mongoose dotenv
npm install --save-dev nodemon
npm i --save-dev @types/bcrypt


Para lanzar: npm run dev
Para probar el script del hashing: npm run seed
