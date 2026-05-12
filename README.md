# Validador Documentos LATAM

Este proyecto es una pequeña API de validación de formato de documentos de diversos paises de LATAM, no guarda información solo corre algoritmos que verifican que el formato del documento sea válido dependiendo del pais.

Tambien dispone de una vista simple hecha con HTMX a modo de demo.

## Endpoints

``` POST /api/validate ```

Request estandar

```
{
  "country": "string",
  "docType": "string",
  "value": "string"
}
```

Ejemplo de Response

```
{
  "valid": true,
  "country": "co",
  "docType": "nit",
  "value": "123456789-6"
}
```

## Países y documentos soportados

| País | Documentos |
|-----|------|
| Colombia | CC, CE, NIT(Con dígito verificador) |
| Chile | RUT, RUN (Ambos con dígito verificador) |

## Como correr localmente el proyecto

Primero se instalan las dependencias del proyecto

```
npm install 
```

Después se puede correr mediante el comando

```
npm start
```

Ya cuando este corriendo se puede ir a la URL: localhost:3000/docs en donde esta SwaggerUI para probar el endpoint directamente

## Herramientas utilizadas

Node.js, Fastify, Swagger UI, HTMX
