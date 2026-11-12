/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";
import { getCustomOgFile } from "@/lib/og";
import { DATA } from "@/data/resume";

export const runtime = "nodejs";
export const alt = `${DATA.name} | Full Stack Developer`;
export const size = {
  width: 1200,
  height: 630,
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
            "radial-gradient(circle at 80% 30%, rgba(59, 130, 246, 0.18) 0%, transparent 48%), radial-gradient(circle at 20% 70%, rgba(148, 163, 184, 0.1) 0%, transparent 50%), radial-gradient(circle at 50% 0%, rgba(30, 41, 59, 0.35) 0%, transparent 60%)",
          padding: "64px 80px",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          position: "relative",
        }}
      >
        {/* Left Column: Role, Name, Bio, Tech Badges */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            maxWidth: "700px",
          }}
        >
          {/* Eyebrow with blue accent line */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "3px",
                backgroundColor: "#3b82f6",
                borderRadius: "2px",
              }}
            />
            <span
              style={{
                fontSize: "15px",
                fontWeight: 700,
                color: "#60a5fa",
                letterSpacing: "2.5px",
                textTransform: "uppercase",
              }}
            >
              Full-Stack Developer & Cloud
            </span>
          </div>

          {/* Big Bold Headline */}
          <div
            style={{
              fontSize: "78px",
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              marginBottom: "20px",
            }}
          >
            Shubham Kumar
          </div>

          {/* Bio statement */}
          <div
            style={{
              fontSize: "23px",
              fontWeight: 400,
              color: "#94a3b8",
              lineHeight: 1.45,
              marginBottom: "32px",
              maxWidth: "660px",
            }}
          >
            Building clean, fast web apps and scalable cloud architectures that just work.
          </div>

          {/* Minimalist Tech Badges */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
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
                  padding: "7px 16px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  color: "#f1f5f9",
                  fontSize: "15px",
                  fontWeight: 600,
                }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Hero Squircle Portrait Avatar with Moody Lighting */}
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
                width: "280px",
                height: "280px",
                borderRadius: "44px",
                padding: "6px",
                backgroundColor: "#09090b",
                border: "2px solid rgba(255, 255, 255, 0.15)",
                boxShadow:
                  "0 30px 70px -15px rgba(0, 0, 0, 1), 0 0 60px rgba(59, 130, 246, 0.2)",
                overflow: "hidden",
              }}
            >
              <img
                src={avatarBase64}
                alt={DATA.name}
                width="264"
                height="264"
                style={{
                  width: "264px",
                  height: "264px",
                  borderRadius: "38px",
                  objectFit: "cover",
                }}
              />
            </div>

            {/* Subtle Location Tag */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginTop: "16px",
                padding: "6px 16px",
                borderRadius: "9999px",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                fontSize: "13px",
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
    }
  );
}
