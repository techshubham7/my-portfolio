/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";
import { getCustomOgFile } from "@/lib/og";
import { DATA } from "@/data/resume";

export const runtime = "nodejs";
export const alt = `${DATA.name} | Full Stack Developer`;
export const size = {
  width: 2400,
  height: 1260,
};
export const contentType = "image/png";

export default async function Image() {
  // 1. If custom designer image exists in /public (e.g. og.png), serve it directly
  const custom = getCustomOgFile();
  if (custom) {
    try {
      const fileBuffer = fs.readFileSync(custom.absolutePath);
      return new Response(new Uint8Array(fileBuffer), {
        headers: {
          "Content-Type": custom.contentType,
          "Cache-Control": "public, max-age=86400, stale-while-revalidate=43200",
        },
      });
    } catch (e) {
      console.error("Failed to read custom OG image from public:", e);
    }
  }

  // 2. Load avatar for dynamic card
  let avatarBase64 = "";
  try {
    const avatarPath = path.join(process.cwd(), "public", "me.jpeg");
    if (fs.existsSync(avatarPath)) {
      const avatarBuf = fs.readFileSync(avatarPath);
      avatarBase64 = `data:image/jpeg;base64,${avatarBuf.toString("base64")}`;
    }
  } catch (e) {
    console.error("Failed to load avatar for OG:", e);
  }

  // 3. Load authentic Georgia Bold Italic font matching the portfolio website
  let georgiaFont: Buffer | null = null;
  try {
    const fontPath = path.join(process.cwd(), "src/assets/fonts/Georgia-BoldItalic.ttf");
    if (fs.existsSync(fontPath)) {
      georgiaFont = fs.readFileSync(fontPath);
    }
  } catch (e) {
    console.error("Failed to load Georgia font:", e);
  }

  // 4. Render Retina @2x (2400 x 1260) with signature bold italic serif typography
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#000000",
          backgroundImage:
            "radial-gradient(circle at 80% 30%, rgba(59, 130, 246, 0.22) 0%, transparent 50%), radial-gradient(circle at 15% 70%, rgba(148, 163, 184, 0.1) 0%, transparent 50%), radial-gradient(circle at 50% 0%, rgba(30, 41, 59, 0.4) 0%, transparent 60%)",
          padding: "128px 160px",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          position: "relative",
        }}
      >
        {/* Left Column: Role, Headline, Bio, Tech Badges */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            maxWidth: "1420px",
          }}
        >
          {/* Eyebrow with blue accent line */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              marginBottom: "36px",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "6px",
                backgroundColor: "#3b82f6",
                borderRadius: "4px",
              }}
            />
            <span
              style={{
                fontSize: "30px",
                fontWeight: 700,
                color: "#60a5fa",
                letterSpacing: "5px",
                textTransform: "uppercase",
              }}
            >
              Full-Stack Developer & Cloud
            </span>
          </div>

          {/* Signature Headline: "Hi, I'm Shubham" with authentic bold blue italic serif */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "32px",
              marginBottom: "40px",
            }}
          >
            <span
              style={{
                fontSize: "152px",
                fontWeight: 900,
                color: "#ffffff",
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}
            >
              Hi, I&apos;m
            </span>
            <span
              style={{
                fontSize: "180px",
                fontFamily: "Georgia",
                fontStyle: "italic",
                fontWeight: 900,
                color: "#3b82f6",
                letterSpacing: "-0.03em",
                lineHeight: 1,
              }}
            >
              Shubham
            </span>
          </div>

          {/* Bio statement */}
          <div
            style={{
              fontSize: "44px",
              fontWeight: 400,
              color: "#94a3b8",
              lineHeight: 1.45,
              marginBottom: "64px",
              maxWidth: "1340px",
            }}
          >
            Building clean, fast web apps and scalable cloud architectures that just work.
          </div>

          {/* Minimalist Tech Badges */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            {[
              "Next.js",
              "TypeScript",
              "Go",
              "Node.js",
              "AWS",
              "Docker",
              "PostgreSQL",
            ].map((tech) => (
              <div
                key={tech}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "14px 32px",
                  borderRadius: "16px",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "2px solid rgba(255, 255, 255, 0.12)",
                  color: "#f1f5f9",
                  fontSize: "30px",
                  fontWeight: 600,
                }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Hero Squircle Portrait Avatar */}
        {avatarBase64 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "560px",
                height: "560px",
                borderRadius: "88px",
                padding: "12px",
                backgroundColor: "#09090b",
                border: "4px solid rgba(255, 255, 255, 0.15)",
                boxShadow:
                  "0 60px 140px -30px rgba(0, 0, 0, 1), 0 0 120px rgba(59, 130, 246, 0.25)",
                overflow: "hidden",
              }}
            >
              <img
                src={avatarBase64}
                alt={DATA.name}
                width="528"
                height="528"
                style={{
                  width: "528px",
                  height: "528px",
                  borderRadius: "76px",
                  objectFit: "cover",
                }}
              />
            </div>

            {/* Subtle Location Tag */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginTop: "32px",
                padding: "12px 32px",
                borderRadius: "9999px",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                border: "2px solid rgba(255, 255, 255, 0.08)",
                fontSize: "26px",
                color: "#94a3b8",
                fontWeight: 500,
              }}
            >
              <span>📍 {DATA.location}</span>
            </div>
          </div>
        )}
      </div>
    ),
    {
      ...size,
      fonts: georgiaFont
        ? [
            {
              name: "Georgia",
              data: georgiaFont,
              style: "italic",
              weight: 900,
            },
          ]
        : undefined,
    }
  );
}
