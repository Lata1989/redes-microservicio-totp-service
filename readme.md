totp-service/
│
├── src/
│   ├── config/
│   │   ├── database.js       # Configuración de la base de datos
│   │   └── envConfig.js      # Variables de entorno
│   │
│   ├── controllers/
│   │   └── totpController.js  # Controlador para manejar la lógica TOTP
│   │
│   ├── routes/
│   │   └── totpRoutes.js      # Rutas para el microservicio TOTP
│   │
│   ├── app.js                 # Configuración de la aplicación Express
│   └── server.js              # Entrada del servidor
│
├── .env                       # Variables de entorno
├── .gitignore                 # Archivos y carpetas a ignorar en Git
├── package.json               # Dependencias y scripts
└── package-lock.json          # Detalles de dependencias específicas
