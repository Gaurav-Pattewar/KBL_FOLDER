// // Description: Swagger configuration for API documentation
// const swaggerDocument = {
//   openapi: "3.0.0",
//   info: {
//     title: "Stage Gate API Documentation",
//     version: "1.0.0",
//     description: "API documentation for Stage Gate application"
//   },
//   paths: {
//     "/auth/login": {
//       post: {
//         tags: ["Auth"],
//         summary: "User login",
//         requestBody: {
//           required: true,
//           content: {
//             "application/json": {
//               schema: {
//                 type: "object",
//                 required: ["email", "password"],
//                 properties: {
//                   email: {
//                     type: "string",
//                     example: "user@example.com"
//                   },
//                   password: {
//                     type: "string",
//                     example: "password@123"
//                   }
//                 }
//               }
//             }
//           }
//         },
//         responses: {
//           200: {
//             description: "Login Successful",
//             content: {
//               "application/json": {
//                 schema: {
//                   type: "object",
//                   properties: {
//                     success: { type: "boolean", example: true },
//                     status: { type: "integer", example: 200 },
//                     message: { type: "string", example: "LOGIN SUCCESS!" },
//                     data: {
//                       type: "object",
//                       properties: {
//                         token: {
//                           type: "string",
//                           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
//                         },
//                         user: {
//                           type: "object",
//                           properties: {
//                             id: { type: "integer", example: 5 },
//                             email: { type: "string", example: "login@example.com" }
//                           }
//                         }
//                       }
//                     }
//                   }
//                 }
//               }
//             }
//           },
//           400: {
//             description: "Bad Request - Input validation failed",
//             content: {
//               "application/json": {
//                 schema: {
//                   type: "object",
//                   properties: {
//                     success: { type: "boolean", example: false },
//                     status: { type: "integer", example: 400 },
//                     message: { type: "string" }
//                   }
//                 },
//                 examples: {
//                   email_required: {
//                     summary: "Email is required",
//                     value: {
//                       success: false,
//                       status: 400,
//                       message: "email is required"
//                     }
//                   },
//                   password_required: {
//                     summary: "Password is required",
//                     value: {
//                       success: false,
//                       status: 400,
//                       message: "password is required"
//                     }
//                   },
//                   email_empty: {
//                     summary: "Email is empty",
//                     value: {
//                       success: false,
//                       status: 400,
//                       message: "email is not allowed to be empty"
//                     }
//                   },
//                   email_invalid: {
//                     summary: "Email format is invalid",
//                     value: {
//                       success: false,
//                       status: 400,
//                       message: "email must be a valid email"
//                     }
//                   }
//                 }
//               }
//             }
//           },
//           401: {
//             description: "Unauthorized - Invalid credentials",
//             content: {
//               "application/json": {
//                 schema: {
//                   type: "object",
//                   properties: {
//                     success: { type: "boolean", example: false },
//                     status: { type: "integer", example: 401 },
//                     message: { type: "string", example: "Invalid credentials" }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     },
//     "/user": {
//       get: {
//         summary: "Get all users (admin only)",
//         tags: ["User"],
//         security: [
//           {
//             bearerAuth: []
//           }
//         ],
//         responses: {
//           200: {
//             description: "List of users fetched successfully",
//             content: {
//               "application/json": {
//                 schema: {
//                   type: "object",
//                   properties: {
//                     success: { type: "boolean", example: true },
//                     statusCode: { type: "integer", example: 200 },
//                     message: { type: "string", example: "Users fetched successfully" },
//                     data: {
//                       type: "array",
//                       items: { type: "object" }
//                     }
//                   }
//                 }
//               }
//             }
//           },
//           401: {
//             description: "Unauthorized - Missing or invalid token",
//             content: {
//               "application/json": {
//                 schema: {
//                   type: "object",
//                   properties: {
//                     success: { type: "boolean", example: false },
//                     statusCode: { type: "integer", example: 401 },
//                     message: { type: "string", example: "Missing or invalid token" }
//                   }
//                 }
//               }
//             }
//           },
//           403: {
//             description: "Forbidden - Admin access required",
//             content: {
//               "application/json": {
//                 schema: {
//                   type: "object",
//                   properties: {
//                     success: { type: "boolean", example: false },
//                     statusCode: { type: "integer", example: 403 },
//                     message: { type: "string", example: "Admin access required" }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     },
//     "/user/{id}": {
//   get: {
//     summary: "Get user by ID",
//     tags: ["User"],
//     security: [
//       {
//         bearerAuth: []
//       }
//     ],
//     parameters: [
//       {
//         name: "id",
//         in: "path",
//         required: true,
//         schema: {
//           type: "string"
//         },
//         description: "ID of the user to fetch"
//       }
//     ],
//     responses: {
//       200: {
//         description: "User fetched successfully",
//         content: {
//           "application/json": {
//             schema: {
//               type: "object",
//               properties: {
//                 success: { type: "boolean", example: true },
//                 statusCode: { type: "integer", example: 200 },
//                 message: { type: "string", example: "User fetched successfully" },
//                 data: {
//                   type: "object",
//                   properties: {
//                     id: { type: "integer", example: 1 },
//                     email: { type: "string", example: "user@example.com" },
//                     name: { type: "string", example: "John Doe" }
//                     // add other user fields here
//                   }
//                 }
//               }
//             }
//           }
//         }
//       },
//       401: {
//         description: "Unauthorized - Missing or invalid token",
//         content: {
//           "application/json": {
//             schema: {
//               type: "object",
//               properties: {
//                 success: { type: "boolean", example: false },
//                 statusCode: { type: "integer", example: 401 },
//                 message: { type: "string", example: "Missing or invalid token" }
//               }
//             }
//           }
//         }
//       },
//       404: {
//         description: "User not found",
//         content: {
//           "application/json": {
//             schema: {
//               type: "object",
//               properties: {
//                 success: { type: "boolean", example: false },
//                 statusCode: { type: "integer", example: 404 },
//                 message: { type: "string", example: "User not found" }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
//     }
//   },
//   components: {
//     securitySchemes: {
//       bearerAuth: {
//         type: "http",
//         scheme: "bearer",
//         bearerFormat: "JWT"
//       }
//     }
//   }
// };

// export default swaggerDocument;

import authSwagger from "../modules/auth/auth.swagger.js";
import userSwagger from "../modules/user/user.swagger.js";
const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Stage Gate API",
    version: "1.0.0",
    description: "API Documentation",
  },
  paths: {
    ...authSwagger,
    ...userSwagger,
    },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

export default swaggerDocument;




