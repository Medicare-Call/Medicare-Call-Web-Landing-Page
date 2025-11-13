import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.ts";
const app = new Hono();

// Enable logger
app.use("*", logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  })
);

// Health check endpoint
app.get("/make-server-6e07f166/health", (c) => {
  return c.json({ status: "ok" });
});

// Consultation submission endpoint
app.post("/make-server-6e07f166/consultations", async (c) => {
  try {
    const body = await c.req.json();
    const { name, phone, email, message } = body;

    // Validate required fields
    if (!name || !phone || !email) {
      console.log(
        "Consultation submission validation error: Missing required fields"
      );
      return c.json(
        {
          success: false,
          error: "필수 정보를 모두 입력해주세요.",
        },
        400
      );
    }

    // Create a unique key for this consultation using timestamp
    const timestamp = new Date().toISOString();
    const key = `consultation:${timestamp}:${email}`;

    // Store consultation data
    const consultationData = {
      name,
      phone,
      email,
      message: message || "",
      submittedAt: timestamp,
    };

    await kv.set(key, consultationData);

    console.log(`Consultation saved successfully: ${key}`);
    return c.json({
      success: true,
      message: "상담 신청이 완료되었습니다.",
    });
  } catch (error) {
    console.log(`Error saving consultation: ${error}`);
    return c.json(
      {
        success: false,
        error: "상담 신청 중 오류가 발생했습니다. 다시 시도해주세요.",
      },
      500
    );
  }
});

Deno.serve(app.fetch);
