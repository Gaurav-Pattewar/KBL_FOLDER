const userSwagger = {
"/user": {
      get: {
        summary: "Get all users (admin only)",
        tags: ["User"],
        security: [
          {
            bearerAuth: []
          }
        ],
        responses: {
          200: {
            description: "List of users fetched successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    statusCode: { type: "integer", example: 200 },
                    message: { type: "string", example: "Users fetched successfully" },
                    data: {
                      type: "array",
                      items: { type: "object" }
                    }
                  }
                }
              }
            }
          },
          401: {
            description: "Unauthorized - Missing or invalid token",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: false },
                    statusCode: { type: "integer", example: 401 },
                    message: { type: "string", example: "Missing or invalid token" }
                  }
                }
              }
            }
          },
          403: {
            description: "Forbidden - Admin access required",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: false },
                    statusCode: { type: "integer", example: 403 },
                    message: { type: "string", example: "Admin access required" }
                  }
                }
              }
            }
          }
        }
      }
    },
"/user/{id}": {
  get: {
    summary: "Get user by ID[This is dummy API ,please do not excute it]",
    tags: ["User"],
    security: [
      {
        bearerAuth: []
      }
    ],
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: {
          type: "string"
        },
        description: "ID of the user to fetch"
      }
    ],
    responses: {
      200: {
        description: "User fetched successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: { type: "boolean", example: true },
                statusCode: { type: "integer", example: 200 },
                message: { type: "string", example: "User fetched successfully" },
                data: {
                  type: "object",
                  properties: {
                    id: { type: "integer", example: 1 },
                    email: { type: "string", example: "user@example.com" },
                    name: { type: "string", example: "John Doe" }
                    // add other user fields here
                  }
                }
              }
            }
          }
        }
      },
      401: {
        description: "Unauthorized - Missing or invalid token",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: { type: "boolean", example: false },
                statusCode: { type: "integer", example: 401 },
                message: { type: "string", example: "Missing or invalid token" }
              }
            }
          }
        }
      },
      404: {
        description: "User not found",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: { type: "boolean", example: false },
                statusCode: { type: "integer", example: 404 },
                message: { type: "string", example: "User not found" }
              }
            }
          }
        }
      }
    }
  }
    }
}

export default userSwagger;