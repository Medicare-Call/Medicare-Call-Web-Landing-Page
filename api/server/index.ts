import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { handle } from "hono/vercel";
import * as kv from "./kv_store.js";

const CONSULT_NOTIFY_EMAIL = process.env.CONSULT_NOTIFY_EMAIL || "medicare924@gmail.com";
const MAIL_FROM = process.env.MAIL_FROM || "onboarding@resend.dev";
const RESEND_API_KEY = process.env.RESEND_API_KEY;

async function sendConsultationEmail(params: {
  name: string;
  phone: string;
  email: string;
  message?: string;
  submittedAt: string;
}) {
  if (!RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not set on the server");
  }

  const subject = `[메디케어콜 상담신청] ${params.name} / ${params.phone}`;
  const text = `새 상담 신청이 접수되었습니다.\n\n신청시각: ${params.submittedAt}\n이름: ${params.name}\n연락처: ${params.phone}\n이메일: ${params.email}\n문의내용: ${params.message || "(없음)"}`;

  const resp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: MAIL_FROM,
      to: [CONSULT_NOTIFY_EMAIL],
      reply_to: params.email,
      subject,
      text,
    }),
  });

  if (!resp.ok) {
    const errText = await resp.text();
    throw new Error(`Failed to send consultation email: ${resp.status} ${errText}`);
  }
}

const app = new Hono().basePath("/api/server");

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

    try {
      await kv.set(key, consultationData);
    } catch (kvError) {
      console.log(`KV save skipped/failed: ${kvError}`);
    }

    await sendConsultationEmail({
      name,
      phone,
      email,
      message,
      submittedAt: timestamp,
    });

    console.log(`Consultation saved successfully: ${key}`);
    return c.json({
      success: true,
      message: "상담 신청이 완료되었습니다.",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.log(`Error saving consultation: ${message}`);
    return c.json(
      {
        success: false,
        error: "상담 신청 중 오류가 발생했습니다. 다시 시도해주세요.",
        debug: message,
      },
      500
    );
  }
});

export default handle(app);
