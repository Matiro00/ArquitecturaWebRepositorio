# Tesoros Literarios

## Hecho por Matias Ezequiel Romero

### Descripcion 

Este proyecto comprende una aplicacion REST hecho en express y js para la compra de libros. 
Para ello el usuario se tendra que logear y elegir los libros que quiera comprar. 

La compra de libros esta limitada al stock que se tenga del mismo. El mismo no requiere un metodo de pago solo el mail del usuario en el cual se le enviara 

### Endpoints

#### Usuario 🙂

##### Crear usuario

```http
POST /user

{
"name": "Example",
"email": "example@whatever.com",
"password": "examplePassword",
"isActive":true
}

```
Posibles respuestas

- `200 OK `
```json
{
    "mensaje": "Se creo el usuario con exito",
    "url": "http://localhost:3000/user/id"
}
```

- `400 Bad Request `

AlreadyCreatedEntity: Si se ingresa un usuario con un mismo nombre
```json
{
    "mensaje": "Ya existe un usuario con ese nombre"
}
```

- `500 Internal server error `
```json
{
  "mensaje": "Ocurrio un error inesperado. Vuelva a intentarlo mas tarde"
}
```

##### Editar usuario

```http
PUT /user/id

{
"name": "Example",
"email": "example@whatever.com",
"password": "examplePassword",
"isActive":true
}

```
Posibles respuestas

- `200 OK `
```json
{
    "mensaje": "Se modifico el usuario con exito",
    "usuario": {
        "id": 48,
        "name": "test34",
        "email": "testEdited@gmail.com",
        "password": "testEdit123",
        "isActive": true
    }
}
```

- `404 Bad Request `

NotFoundError: El id del usuario que se quiere editar no existe
```json
{
    "mensaje": "Usuario no encontrado"
}
```
AlreadyCreatedEntity: Si se ingresa un usuario con un mismo nombre
```json
{
    "mensaje": "Ya existe un usuario con ese nombre"
}
```

- `500 Internal server error `
```json
{
  "mensaje": "Ocurrio un error inesperado. Vuelva a intentarlo mas tarde"
}
```


##### Eliminar usuario

```http
DELETE /user/id


```
Posibles respuestas

- `200 OK `
```json
{
    "mensaje": "Se elimino el usuario con exito",
    "usuario": [
        {
            "id": 49,
            "name": "test123",
            "email": "test@gmail.com",
            "password": "test123",
            "isActive": 1
        }
    ]
}
```

- `404 Not Found `

```json
{
  "mensaje": "Usuario no encontrado"
}
```

- `500 Internal server error `
```json
{
  "mensaje": "Ocurrio un error inesperado. Vuelva a intentarlo mas tarde"
}
```


##### Mostrar usuario

```http
GET /user
```
Posibles respuestas

- `200 OK `

```json
[
    {
        "id": 48,
        "name": "testqw",
        "email": "testEdited@gmail.com",
        "password": "testEdit123",
        "isActive": true
    },
    {
        "id": 50,
        "name": "test",
        "email": "test@gmail.com",
        "password": "test123",
        "isActive": true
    }
]


```
- `500 Internal server error `
```json
{
  "message": "Ocurrio un error inesperado. Vuelva a intentarlo mas tarde"
}
```

##### Mostrar usuario por id

```http
GET /user/id
```
Posibles respuestas

- `200 OK `

```json
[
    {
        "id": 48,
        "name": "testqw",
        "email": "testEdited@gmail.com",
        "password": "testEdit123",
        "isActive": true
    }
]

```
- `404 Not Found `

```json
{
  "mensaje": "Usuario no encontrado"
}
```

```
- `500 Internal server error `
```json
{
  "message": "Ocurrio un error inesperado. Vuelva a intentarlo mas tarde"
}
```

##### Login

```http
POST /login

{
"name": "example",
"password": "examplePassword"
}

```
- `200 OK `
```json
{
    "mensaje": "Se logeo con exito"
}
```

- `500 Internal server error `

```json
{
  "message": "Ocurrio un error inesperado. Vuelva a intentarlo mas tarde"
}
```

##### Logout

```http
POST /logout

```
- `200 OK `
```json
{
    "mensaje": "Se elimino la sesion con exito"
}
```

- `500 Internal server error `
```json
{
  "message": "Ocurrio un error inesperado. Vuelva a intentarlo mas tarde"
}
```

#### Libros 📚

##### Crear libro

```http
POST /book

{
    "name": "test",
    "author": "testAuthor",
    "price": 1,
    "isForSale": true,
    "amount": 5
}

```
Posibles respuestas

- `200 OK `
```json
{
    "mensaje": "Se creo el libro con exito",
    "url": "http://localhost:3000/user/id"
}
```

- `404 Bad Request `

AlreadyCreatedEntity: Si se ingresa un usuario con un mismo nombre
```json
{
    "mensaje": "Ya existe un libro con ese nombre"
}
```

- `500 Internal server error `
```json
{
  "message": "Ocurrio un error inesperado. Vuelva a intentarlo mas tarde"
}
```

##### Editar libro

```http
PUT /api/v1/book/id

{
    "name": "bookEdited123",
    "author": "authorEdited",
    "price": 1,
    "isForSale": true,
    "amount": 10
}

```
Posibles respuestas

- `200 OK `
```json
{
    "mensaje": "Se modifico el libro con exito",
    "libro": {
        "id": 45,
        "name": "bookEdited123",
        "author": "authorEdited",
        "price": 1,
        "isForSale": true,
        "amount": 10
    }
}
```

- `400 Bad Request `
```json
{
    "mensaje": "Ya existe un libro con ese nombre"
}
```

- `404 Not Found `
```json
{
    "mensaje": "Libro no encontrado"
}
```

##### Eliminar libro

```http
DELETE /book/id


```
Posibles respuestas

- `200 OK `
```json
{
    "mensaje": "Se elimino el libro con exito",
    "libro": [
        {
            "id": 45,
            "name": "bookEdited123",
            "author": "authorEdited",
            "price": 1,
            "isForSale": 1,
            "amount": 10
        }
    ]
}
```

- `404 Not Found `

```json
{
  "message": "El id del libro que quiere eliminar no existe"
}
```
##### Mostrar libro

```http
GET /book
```
Posibles respuestas

- `200 OK `

```json
[
    {
        "id": 45,
        "name": "bookEdited123",
        "author": "authorEdited",
        "price": 1,
        "isForSale": true,
        "amount": 10
    }
]
```

- `500 Internal server error `
```json
{
  "message": "Ocurrio un error inesperado. Vuelva a intentarlo mas tarde"
}
```

##### Mostrar libro por id

```http
GET /book/id
```
Posibles respuestas

- `200 OK `

```json
[
    {
        "id": 45,
        "name": "bookEdited123",
        "author": "authorEdited",
        "price": 1,
        "isForSale": true,
        "amount": 10
    }
]
```

- `500 Internal server error `
```json
{
  "message": "Ocurrio un error inesperado. Vuelva a intentarlo mas tarde"
}
```

#### Compra 🛒

##### Crear compra

```http
POST /checkout

{
    "idUser": 48,
    "items":[
        {
            "id":"46",
            "amount": 1
        }
    ],
    "date": "2000/03/12"
}

```
Posibles respuestas

- `200 OK `
```json
{
    "mensaje": "Se creo el comprobante con exito",
    "url": "http://localhost:3000/checkout/43"
}
```
DeactivatedEntity
- `400 Bad Request `
```json
{
    "mensaje": "El usuario/libro ingresado esta desactivado"
}
```
NotFoundError
- `404 Not Found `
```json
{
    "mensaje": "Id de usuario invalido"
}
{
    "mensaje": "Libro no encontrado"
}
```
OutOfStock
- `400 Bad Request `
```json
{
    "mensaje": "El libro (book.name) no tiene suficiente stock"
}
```
- `500 Internal server error `
```json
{
  "message": "Ocurrio un error inesperado. Vuelva a intentarlo mas tarde"
}
```

Depende de cual validacion rompio.

##### Eliminar compra

```http
DELETE /checkout/id


```
Posibles respuestas

- `200 OK `
```json
{
    "mensaje": "Se elimino el comprobante con exito",
    "libro": [
        {
            "id": 43,
            "id_user": 50,
            "date": "2001-09-12T03:00:00.000Z",
            "totalPrice": 1
        }
    ]
}
```

- `404 Not Found `

```json
{
    "mensaje": "Id del comprobante invalido"
}
```

- `500 Internal server error `
```json
{
  "message": "Ocurrio un error inesperado. Vuelva a intentarlo mas tarde"
}
```

##### Mostrar compra

```http
GET /checkout
```
Posibles respuestas

- `200 OK `

```json
[
    {
        "id": 43,
        "id_user": 50,
        "date": "2001-09-12T03:00:00.000Z",
        "totalPrice": 1,
        "items": [
            {
                "id": 46,
                "name": "test",
                "author": "testAuthor",
                "price": 1
            }
        ]
    }
]
```
- `500 Internal server error `
```json
{
  "message": "Ocurrio un error inesperado. Vuelva a intentarlo mas tarde"
}
```
##### Mostrar compra por id

```http
GET /checkout/id
```
Posibles respuestas

- `200 OK `

```json
[
    {
        "id": 43,
        "id_user": 50,
        "date": "2001-09-12T03:00:00.000Z",
        "totalPrice": 1,
        "items": [
            {
                "id": 46,
                "name": "test",
                "author": "testAuthor",
                "price": 1
            }
        ]
    }
]
```
NotFoundError

- `404 Not Found `
```json
{
    "mensaje": "Id del comprobante invalido"
}
```
```
- `500 Internal server error `
```json
{
  "message": "Ocurrio un error inesperado. Vuelva a intentarlo mas tarde"
}
```

##### Editar compra

```http
PUT /checkout/id

{
    "idUser":50,
    "date": "2001/09/12"
}

```
Posibles respuestas

- `200 OK `
```json
{
    "mensaje": "Se modifico el usuario con exito",
    "checkout": {
        "id": 43,
        "id_user": 50,
        "date": "2001-09-12T03:00:00.000Z",
        "totalPrice": 1
    }
}
```
DeactivatedEntity
- `400 Bad Request `
```json
{
    "mensaje": "El usuario/libro ingresado esta desactivado"
}
```
NotFoundError
- `404 Not Found `
```json
{
    "mensaje": "Id del comprobante invalido"
}
{
    "mensaje": "Usuario no encontrado"
}
```
- `500 Internal server error `
```json
{
  "message": "Ocurrio un error inesperado. Vuelva a intentarlo mas tarde"
}
```
