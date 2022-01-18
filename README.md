Contendra las rutas necesarias que permitan listar los productos existentes, ingresar productos nuevos, borrar y modificar sus detalles, asi como interactuar con el carrito
Se implementara una API Restful con los verbos get, post, put y delete, para cumplir con todas las acciones necesarias
Debe brindar al frontend un mecanismo de ingreso autorizado al sistema basado en JWT (Json Web Token)
Los productos ingresados se almacenaran en una base de datos MongoDB
El usuario podra registrar sus credenciales de acceso (email y password) para luego poder ingresar a su cuenta. Estas credenciales seran guardadas en la DB, encriptando la contraseña
El cliente tendra una sesion activa de usuario con tiempo de expiracion configurable
Implementaras un canal de chat basado en websockets, el cual permita atender las consultas del cliente
La arquitectura del servidor estara basada en capas (MVC)
El servidor podra tomar configuraciones desde un archivo externo
Dispondra de una vista creada con pug, que permita ver la configuracion del servidor
Se enviara un mail a una casilla configurable, por cada registro nuevo de usuario y con cada orden de compra generada
En caso de detectar algun error, el servidor enviara una vista implementada con ejs, que contenga el id y el detalle completo

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

REQUISITOS BASE

INICIO: al momento de requerir la ruta base '/'
    permitir un menu de ingreso al sistema con email y password asi como tambien la posibilidad de registro de un nuevo usuario
    el menu de registro consta del nombre completo del cliente, numero telefonico, email y campo de password duplicado para verificar coincidencia
    si un usuario se loguea exitosamente o esta en sesion activa, la ruta '/' hara una redireccion a la ruta del carrito /productos
    la ruta /productos devolvera el listado de todos los productos disponibles para la compra
    la ruta /productos/:categoria devolvera los productos por la categoria requerida
    los items podran ser agregados al carrito de compras y listados a traves de la ruta /carrito
    se podran modificar y borrar por su id a traves de la ruta /carrito/:id

FLOW: se puede solicitar un producto especifico con la ruta /productos/:id, donde id es el id del item generado por MongoDB y devolver la descripcion del producto (foto, precio, selector de cantidad)
    si se ingresa a /productos/:id y el producto no existe en MongoDB, debemos responder un mensaje adecuado que indique algo relacionado a que el producto no existe

MONGODB: implementar al menos estas colecciones:
    USUARIOS: clientes registrados
    PRODUCTOS: catalogo completo
        link para foto (puede almacenarse en modo estatico en la pagina en una subruta /images/:productoid)
        precio unitario descripcion
        categoria
    MENSAJES: chat del usuario (preguntas y respuestas)
        email: del usuario que pregunta o al que se responde
        tipo ('usuario' para preguntas o 'sistema' para respuestas)
        fecha y hora
        cuerpo del mensaje
    CARRITO: orden temporal de compra
        email
        fecha y hora
        items con sus cantidades
        direccion de entrega
    ORDENES: las ordenes generadas, que deben incluir los productos, descripciones y los precios al momento de la compra
        items: las ordenes deben poder tener productos surtidos, cada uno con su cantidad. Por ej: dos remeras y una gorra
        numero de orden: se extrae de la cantidad de ordenes almacenadas
        fecha y hora
        estado (por defecto en 'generada')
        email de quien realizo la orden
        finalizada la orden, enviar un mail a la direccion de mi cuenta con los detalles de la orden
        se dispondra de un archivo de configuracion externo con opciones para desarrollo y otras para produccion, que seran visualizadas a traves de una vista construida con hbs. como paramentros de configuracion esta el puerto de escucha del servidor, la url de la base de datos, el mail que recibira notificaciones del backend, tiempo de expiracion de sesion y los que sea necesario incluir
        vamos a contar con un canal de chat general donde el usuario enviara los mensajes en la ruta /chat y en /chat/:email podra ver solo los suyos. Se utilizara la coleccion mensajes en MongoDB. la tecnologia a utilizar sera Websockets. El servidor implementara una vista, utilizando hbs, para visualizar todos los mensajes y poder responder individualmente a ellos, eligiendo el mail de respuesta
