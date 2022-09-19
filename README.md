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
POST /api/v1/user

{
"name": "Example"
"email": "example@whatever.com"
"password": "examplePassword"
"birthday": "01/01/2000"
}

```
Posibles respuestas

- `200 OK `
```json
{
  "message": "Usuario dado de alta"
}
```

- `400 Bad Request `

Depende de cual validacion rompio.


##### Editar usuario

```http
PUT /api/v1/user

{
"name": "Example"
"email": "example@whatever.com"
"password": "examplePassword"
"birthday": "01/01/2000"
}

```
Posibles respuestas

- `200 OK `
```json
{
  "message": "Usuario se edito con exito"
}
```

- `400 Bad Request `

Depende de cual validacion rompio.


##### Eliminar usuario

```http
DELETE /api/v1/user?id=userId


```
Posibles respuestas

- `200 OK `
```json
{
  "message": "Usuario eliminado"
}
```

- `404 Not Found `

```json
{
  "message": "El id del usuario que quiere eliminar no existe"
}
```


##### Mostrar usuario

```http
GET /api/v1/user?userId=userId
```
Posibles respuestas

- `200 OK `

```json
{
"users": [
  {
    "name": "Example"
    "email": "example@whatever.com"
    "password": "examplePassword"
    "birthday": "01/01/2000"
  }]
}
```
- `500 Internal server error `
```json
{
  "message": "Ocurrio un error inesperado. Vuelva a intentarlo mas tarde"
}
```

##### Login

```http
POST /api/v1/login

{
"email": "example@whatever.com"
"password": "examplePassword"
}

```
- `200 OK `
```json
{
  "message": "Logeado con exito"
}
```

- `401 Unauthorized `
```json
{
  "message": "Email o contraseña incorrectas"
}
```


#### Libros 📚

##### Crear libro

```http
POST /api/v1/book

{
"name": "Example"
"author": "Example"
"price": "examplePassword"
}

```
Posibles respuestas

- `200 OK `
```json
{
  "message": "Libro dado de alta"
}
```

- `400 Bad Request `

Depende de cual validacion rompio.

##### Editar libro

```http
PUT /api/v1/book

{
"name": "Example"
"author": "Example"
"price": "examplePassword"
}

```
Posibles respuestas

- `200 OK `
```json
{
  "message": "Libro se edito con exito"
}
```

- `400 Bad Request `

Depende de cual validacion rompio.


##### Eliminar libro

```http
DELETE /api/v1/book?id=bookId


```
Posibles respuestas

- `200 OK `
```json
{
  "message": "Libro eliminado"
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
GET /api/v1/book?name=name&author=author
```
Posibles respuestas

- `200 OK `

```json
{
"books": [
  {
    "name": "Example"
    "author": "Example"
    "price": "examplePrice"
  }]
}
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
POST /api/v1/checkout/buy

{
  "userId": "Example"
  "checkout":[{
      "bookId": "Example"
      "ammount": "1"
  }],
  "totalPrice"=123,
  "date"="01/01/2001"
}

```
Posibles respuestas

- `200 OK `
```json
{
  "message": "Compra realizada"
}
```

- `400 Bad Request `

Depende de cual validacion rompio.

##### Eliminar compra

```http
DELETE /api/v1/checkout/buy?buyId=buyId


```
Posibles respuestas

- `200 OK `
```json
{
  "message": "Se elimino la compra"
}
```

- `404 Not Found `

```json
{
  "message": "El id de la compra que quiere eliminar no existe"
}
```


##### Mostrar compra

```http
GET /api/v1/book?userId=userId&bookId=bookId&date=date
```
Posibles respuestas

- `200 OK `

```json
{
"checkouts":[{
  "userId": "Example"
  "checkout":[{
      "bookId": "Example"
      "ammount": "1"
  }],
  "totalPrice"=123,
  "date"="01/01/2001"
}]
}
```



