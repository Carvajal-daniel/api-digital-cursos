const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "API de Usuários",
    version: "1.0.0",
    description: "API com rotas públicas, protegidas e admin"
  },
  paths: {
    "/users": {
      post: {
        summary: "Cria um novo usuário",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  email: { type: "string" },
                  password: { type: "string" }
                },
                required: ["name", "email", "password"]
              }
            }
          }
        },
        responses: { 201: { description: "Usuário criado com sucesso" } }
      }
    },
    "/users/login": {
      post: {
        summary: "Login do usuário",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string" },
                  password: { type: "string" }
                },
                required: ["email", "password"]
              }
            }
          }
        },
        responses: { 200: { description: "Login bem-sucedido" }, 401: { description: "Credenciais inválidas" } }
      }
    },
    "/users/{id}": {
      put: {
        summary: "Atualiza usuário pelo ID (protegido)",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { type: "object", properties: { name: { type: "string" }, email: { type: "string" }, password: { type: "string" } } }
            }
          }
        },
        responses: { 200: { description: "Usuário atualizado" }, 404: { description: "Não encontrado" }, 401: { description: "Não autorizado" } }
      }
    },
    "/users/{email}": {
      get: {
        summary: "Busca usuário pelo email (protegido)",
        parameters: [{ name: "email", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Usuário encontrado" }, 404: { description: "Não encontrado" }, 401: { description: "Não autorizado" } }
      }
    },
    "/users/admin-dashboard": {
      get: {
        summary: "Dashboard admin",
        responses: { 200: { description: "Bem-vindo Admin" }, 403: { description: "Sem permissão" }, 401: { description: "Não autorizado" } }
      }
    }
  },
  components: {
    securitySchemes: { bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" } }
  },
  security: [{ bearerAuth: [] }]
};

module.exports = swaggerDocument;
