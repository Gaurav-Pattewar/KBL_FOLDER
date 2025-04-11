const authSwagger={
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "User login",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: {
                    type: "string",
                    example: "user@example.com"
                  },
                  password: {
                    type: "string",
                    example: "password@123"
                  }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: "Login Successful",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    status: { type: "integer", example: 200 },
                    message: { type: "string", example: "LOGIN SUCCESS!" },
                    data: {
                      type: "object",
                      properties: {
                        token: {
                          type: "string",
                          example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                        },
                        user: {
                          type: "object",
                          properties: {
                            id: { type: "integer", example: 5 },
                            email: { type: "string", example: "login@example.com" }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          400: {
            description: "Bad Request - Input validation failed",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: false },
                    status: { type: "integer", example: 400 },
                    message: { type: "string" }
                  }
                },
                examples: {
                  email_required: {
                    summary: "Email is required",
                    value: {
                      success: false,
                      status: 400,
                      message: "email is required"
                    }
                  },
                  password_required: {
                    summary: "Password is required",
                    value: {
                      success: false,
                      status: 400,
                      message: "password is required"
                    }
                  },
                  email_empty: {
                    summary: "Email is empty",
                    value: {
                      success: false,
                      status: 400,
                      message: "email is not allowed to be empty"
                    }
                  },
                  email_invalid: {
                    summary: "Email format is invalid",
                    value: {
                      success: false,
                      status: 400,
                      message: "email must be a valid email"
                    }
                  }
                }
              }
            }
          },
          401: {
            description: "Unauthorized - Invalid credentials",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: false },
                    status: { type: "integer", example: 401 },
                    message: { type: "string", example: "Invalid credentials" }
                  }
                }
              }
            }
          }
        }
      }
    },
}

export default authSwagger;