import type { Config } from "@netlify/functions";
import { db } from "../../db/index.js";
import { contactMessages } from "../../db/schema.js";

const NOTIFICATION_EMAIL = process.env.CONTACT_TO_EMAIL || "derbysix.11.mz@gmail.com";

async function sendNotificationEmail(name: string, email: string, message: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY is not set — skipping email notification, message was still saved.");
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [NOTIFICATION_EMAIL],
      reply_to: email,
      subject: `Nuovo messaggio da ${name}`,
      text: `Hai ricevuto un nuovo messaggio dal form di contatto.\n\nNome: ${name}\nEmail: ${email}\n\nMessaggio:\n${message}`,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    console.error("Resend API error:", response.status, body);
  }
}

export default async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  await db.insert(contactMessages).values({ name, email, message });
  await sendNotificationEmail(name, email, message);

  return Response.json({ ok: true });
};

export const config: Config = {
  path: "/api/contact",
  method: "POST",
};
