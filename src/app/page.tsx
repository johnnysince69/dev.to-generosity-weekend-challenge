"use client";

import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function syncSize() {
      const w = canvas?.clientWidth || 1280;
      const h = canvas?.clientHeight || 720;
      if (canvas && (canvas.width !== w || canvas.height !== h)) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(syncSize);
      resizeObserver.observe(canvas);
    }
    syncSize();

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;
    const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;
    const fs = `precision highp float;
varying vec2 v_texCoord;
uniform float u_time;
uniform vec2 u_resolution;

void main() {
    vec2 uv = v_texCoord;
    float time = u_time * 0.5;

    vec2 p = uv * 2.0 - 1.0;
    p.x *= u_resolution.x / u_resolution.y;

    float len = length(p);
    float ang = atan(p.y, p.x);

    float wave1 = sin(len * 5.0 - time * 2.0 + ang * 2.0);
    float wave2 = cos(len * 8.0 + time * 1.5 - p.x * 3.0);
    float wave3 = sin(p.x * 4.0 + p.y * 4.0 + time);

    float noise = wave1 * 0.5 + wave2 * 0.3 + wave3 * 0.2;

    vec3 color1 = vec3(1.0, 0.0, 0.5); // Rose #FF007F
    vec3 color2 = vec3(0.75, 0.0, 1.0); // Purple #BF00FF
    vec3 color3 = vec3(0.0, 1.0, 1.0); // Cyan #00FFFF
    vec3 darkBg = vec3(0.05, 0.05, 0.08); // Very dark base

    float mix1 = smoothstep(-1.0, 1.0, noise);
    float mix2 = smoothstep(-0.5, 0.5, sin(ang * 3.0 + time));

    vec3 finalColor = mix(color1, color2, mix1);
    finalColor = mix(finalColor, color3, mix2 * 0.5);

    float intensity = exp(-len * 1.5) * (0.8 + 0.2 * sin(time * 3.0));
    finalColor = mix(darkBg, finalColor, intensity * (0.4 + 0.6 * noise));

    // Add subtle scanlines
    finalColor *= 0.95 + 0.05 * sin(uv.y * u_resolution.y * 0.5);

    gl_FragColor = vec4(finalColor, 1.0);
}`;

    const program = (gl as WebGLRenderingContext).createProgram();
    if (!program) return;

    const vShader = (gl as WebGLRenderingContext).createShader((gl as WebGLRenderingContext).VERTEX_SHADER);
    const fShader = (gl as WebGLRenderingContext).createShader((gl as WebGLRenderingContext).FRAGMENT_SHADER);
    if (!vShader || !fShader) return;

    (gl as WebGLRenderingContext).shaderSource(vShader, vs);
    (gl as WebGLRenderingContext).compileShader(vShader);
    (gl as WebGLRenderingContext).shaderSource(fShader, fs);
    (gl as WebGLRenderingContext).compileShader(fShader);
    (gl as WebGLRenderingContext).attachShader(program, vShader);
    (gl as WebGLRenderingContext).attachShader(program, fShader);
    (gl as WebGLRenderingContext).linkProgram(program);
    (gl as WebGLRenderingContext).useProgram(program);

    const positionBuffer = (gl as WebGLRenderingContext).createBuffer();
    (gl as WebGLRenderingContext).bindBuffer((gl as WebGLRenderingContext).ARRAY_BUFFER, positionBuffer);
    (gl as WebGLRenderingContext).bufferData((gl as WebGLRenderingContext).ARRAY_BUFFER, new Float32Array([
      -1, -1, 1, -1, -1, 1,
      -1, 1, 1, -1, 1, 1
    ]), (gl as WebGLRenderingContext).STATIC_DRAW);

    const positionLocation = (gl as WebGLRenderingContext).getAttribLocation(program, "a_position");
    (gl as WebGLRenderingContext).enableVertexAttribArray(positionLocation);
    (gl as WebGLRenderingContext).vertexAttribPointer(positionLocation, 2, (gl as WebGLRenderingContext).FLOAT, false, 0, 0);

    const timeLocation = (gl as WebGLRenderingContext).getUniformLocation(program, "u_time");
    const resolutionLocation = (gl as WebGLRenderingContext).getUniformLocation(program, "u_resolution");

    let animationFrameId: number;
    const startTime = performance.now();

    function render(time: number) {
      if (!canvas || !gl) return;
      (gl as WebGLRenderingContext).viewport(0, 0, canvas.width, canvas.height);
      (gl as WebGLRenderingContext).uniform1f(timeLocation, (time - startTime) / 1000.0);
      (gl as WebGLRenderingContext).uniform2f(resolutionLocation, canvas.width, canvas.height);
      (gl as WebGLRenderingContext).drawArrays((gl as WebGLRenderingContext).TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    }

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden px-4 md:px-8 py-16">
        {/* Background Shader */}
        <div className="absolute inset-0 z-0 opacity-60">
          <canvas ref={canvasRef} className="w-full h-full block"></canvas>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-surface/40 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse shadow-[0_0_8px_#00FFFF]"></span>
                <span className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-widest">Live on Solana Mainnet</span>
            </div>

            <h1 className="font-display-lg text-display-lg md:text-[80px] font-extrabold tracking-tighter leading-tight drop-shadow-2xl">
                The Future of Philanthropy is <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary">Transparent</span>
            </h1>

            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto drop-shadow-md">
                Empowering impact through AI-driven storytelling and immutable blockchain transparency. Every donation tracked, every story amplified.
            </p>

            <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 pt-4">
                <Link href="/create" className="w-full sm:w-auto text-center bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-on-primary font-button-text text-button-text font-bold py-4 px-10 rounded-full shadow-[0_0_20px_rgba(255,177,196,0.3)] transition-all duration-300 active:scale-95">
                    Start a Campaign
                </Link>
                <Link href="/dashboard" className="w-full sm:w-auto text-center border border-white/20 bg-surface/30 backdrop-blur-md hover:bg-surface/50 text-on-surface font-button-text text-button-text font-bold py-4 px-10 rounded-full transition-all duration-300 active:scale-95">
                    View Analytics
                </Link>
            </div>
        </div>

        {/* Subtle bottom gradient fade to match background */}
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-0"></div>
      </section>

      {/* Feature Grid */}
      <section className="relative z-10 px-4 md:px-8 py-20 bg-background">
          <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                  <h2 className="font-headline-lg text-headline-lg font-bold mb-4">Powered by the Edge</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant">Integrating best-in-class decentralized and AI primitives.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Google AI Card */}
                  <div className="glass-panel p-8 rounded-2xl flex flex-col gap-4 group hover:border-primary/50 transition-colors duration-500 relative overflow-hidden">
                      <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500"></div>
                      <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center border border-white/5 shadow-inner">
                          <span className="material-symbols-outlined text-primary text-3xl" data-icon="psychology">psychology</span>
                      </div>
                      <h3 className="font-headline-md text-headline-md font-semibold mt-4">Insightful Data</h3>
                      <p className="font-body-md text-body-md text-on-surface-variant">Google AI transforms raw ideas into compelling, empathetic campaign narratives.</p>
                      <div className="mt-auto pt-4 flex items-center gap-2 text-primary font-label-mono text-label-mono uppercase tracking-widest">
                          <span>Powered by Gemini</span>
                          <span className="material-symbols-outlined text-sm" data-icon="arrow_forward">arrow_forward</span>
                      </div>
                  </div>

                  {/* ElevenLabs Card */}
                  <div className="glass-panel p-8 rounded-2xl flex flex-col gap-4 group hover:border-secondary/50 transition-colors duration-500 relative overflow-hidden">
                      <div className="absolute -right-20 -top-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-all duration-500"></div>
                      <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center border border-white/5 shadow-inner">
                          <span className="material-symbols-outlined text-secondary text-3xl" data-icon="graphic_eq">graphic_eq</span>
                      </div>
                      <h3 className="font-headline-md text-headline-md font-semibold mt-4">Voice of Impact</h3>
                      <p className="font-body-md text-body-md text-on-surface-variant">ElevenLabs generates emotional, highly-realistic audio voiceovers for accessibility.</p>
                      <div className="mt-auto pt-4 flex items-center gap-2 text-secondary font-label-mono text-label-mono uppercase tracking-widest">
                          <span>Powered by ElevenLabs</span>
                          <span className="material-symbols-outlined text-sm" data-icon="arrow_forward">arrow_forward</span>
                      </div>
                  </div>

                  {/* Solana Card */}
                  <div className="glass-panel p-8 rounded-2xl flex flex-col gap-4 group hover:border-tertiary/50 transition-colors duration-500 relative overflow-hidden">
                      <div className="absolute -right-20 -top-20 w-64 h-64 bg-tertiary/10 rounded-full blur-3xl group-hover:bg-tertiary/20 transition-all duration-500"></div>
                      <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center border border-white/5 shadow-inner">
                          <span className="material-symbols-outlined text-tertiary text-3xl" data-icon="currency_bitcoin">currency_bitcoin</span>
                      </div>
                      <h3 className="font-headline-md text-headline-md font-semibold mt-4">Instant Transparency</h3>
                      <p className="font-body-md text-body-md text-on-surface-variant">Solana enables near-instant, low-fee micro-donations with an immutable ledger.</p>
                      <div className="mt-auto pt-4 flex items-center gap-2 text-tertiary font-label-mono text-label-mono uppercase tracking-widest">
                          <span>Powered by Solana</span>
                          <span className="material-symbols-outlined text-sm" data-icon="arrow_forward">arrow_forward</span>
                      </div>
                  </div>

                  {/* Snowflake Card */}
                  <div className="glass-panel p-8 rounded-2xl flex flex-col gap-4 group hover:border-white/40 transition-colors duration-500 relative overflow-hidden">
                      <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-500"></div>
                      <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center border border-white/5 shadow-inner">
                          <span className="material-symbols-outlined text-on-surface text-3xl" data-icon="analytics">analytics</span>
                      </div>
                      <h3 className="font-headline-md text-headline-md font-semibold mt-4">Secure Insights</h3>
                      <p className="font-body-md text-body-md text-on-surface-variant">Snowflake aggregates campaign metadata and anonymous donation trends seamlessly.</p>
                      <div className="mt-auto pt-4 flex items-center gap-2 text-on-surface font-label-mono text-label-mono uppercase tracking-widest">
                          <span>Powered by Snowflake</span>
                          <span className="material-symbols-outlined text-sm" data-icon="arrow_forward">arrow_forward</span>
                      </div>
                  </div>

              </div>
          </div>
      </section>
    </div>
  );
}
