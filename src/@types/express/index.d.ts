import express from "express";

declare global {
  namespace Express {
    // Overwrite the Request information
    interface Request {
      // To pass the property "user" with id (string) attribute
      user?: {
        id: string;
      };
    }
  }
}
