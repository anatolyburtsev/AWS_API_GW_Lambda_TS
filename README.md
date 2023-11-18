# Simple API on AWS: APi Gateway + Lambda

OpenAPI Schema:
```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "Warehouse Stock API",
    "description": "Manages stock and orders for a warehouse.",
    "version": "v1.0.0"
  },
  "servers": [
    {
      "url": "https://XXXXXXXXXXXXXX.execute-api.us-east-1.amazonaws.com/prod"
    }
  ],
  "paths": {
    "/stock": {
      "get": {
        "description": "Get current stocks in the warehouse",
        "operationId": "GetStock",
        "responses": {
          "200": {
            "description": "Stock details",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "coffee": {
                      "type": "integer",
                      "example": 10
                    }
                  }
                }
              }
            }
          }
        },
        "deprecated": false
      }
    },
    "/order": {
      "post": {
        "description": "Create a new order",
        "operationId": "PostOrder",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "client_name": {
                    "type": "string",
                    "example": "John Doe"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Order confirmation",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "order_id": {
                      "type": "integer",
                      "example": 123
                    }
                  }
                }
              }
            }
          }
        },
        "deprecated": false
      }
    }
  },
  "components": {
    "schemas": {}
  }
}
```