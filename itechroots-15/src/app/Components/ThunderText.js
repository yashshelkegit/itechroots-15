"use client";

import { useEffect, useRef, useState } from "react";
import CursedTitle from "./CursedTitle";

export default function ThunderText({
	onComplete,
	nextComponent: NextComponent,
}) {
	const canvasRef = useRef(null);
	const containerRef = useRef(null);
	const [animationPhase, setAnimationPhase] = useState("thunder");
	const [scale, setScale] = useState(1);
	// Modified to be a single string for a single line
	const textRef = useRef(["COMING SOON"]);

	useEffect(() => {
		let canvas, ctx, w, h, thunder, text, particles, animationId;
		let zoomAnimationId;

		class Thunder {
			constructor(options = {}) {
				this.lifespan = options.lifespan || Math.round(Math.random() * 1 + 2);
				this.maxlife = this.lifespan;
				this.color = options.color || "#ffffff";
				this.glow = options.glow || "#ffffff";

				// Start thunder from screen edges
				const edge = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
				switch (edge) {
					case 0: // top
						this.x = Math.random() * w;
						this.y = 0;
						break;
					case 1: // right
						this.x = w;
						this.y = Math.random() * h;
						break;
					case 2: // bottom
						this.x = Math.random() * w;
						this.y = h;
						break;
					case 3: // left
						this.x = 0;
						this.y = Math.random() * h;
						break;
				}

				// If target position is provided (for text animation), use it
				if (options.x !== undefined && options.y !== undefined) {
					this.x = options.x;
					this.y = options.y;
				}

				this.width = options.width || 3;
				this.direct = options.direct || Math.random() * Math.PI * 2;
				this.max = options.max || Math.round(Math.random() * 10 + 20);

				this.segments = Array.from({ length: this.max }, () => ({
					direct: this.direct + (Math.PI * Math.random() * 0.2 - 0.1),
					length: Math.random() * 20 + 80,
					change: Math.random() * 0.04 - 0.02,
				}));
			}

			update(index, array) {
				this.segments.forEach(
					(s) =>
						(s.direct += s.change) && Math.random() > 0.96 && (s.change *= -1)
				);

				(this.lifespan > 0 && this.lifespan--) || this.remove(index, array);
			}

			render(ctx) {
				if (this.lifespan <= 0) return;

				ctx.beginPath();
				ctx.globalAlpha = this.lifespan / this.maxlife;
				ctx.strokeStyle = this.color;
				ctx.lineWidth = this.width;
				ctx.shadowBlur = 32;
				ctx.shadowColor = this.glow;
				ctx.moveTo(this.x, this.y);

				let prev = { x: this.x, y: this.y };

				this.segments.forEach((s) => {
					const x = prev.x + Math.cos(s.direct) * s.length;
					const y = prev.y + Math.sin(s.direct) * s.length;
					prev = { x, y };
					ctx.lineTo(x, y);
				});

				ctx.stroke();
				ctx.closePath();
				ctx.shadowBlur = 0;

				const strength = Math.random() * 80 + 40;
				const light = ctx.createRadialGradient(
					this.x,
					this.y,
					0,
					this.x,
					this.y,
					strength
				);

				light.addColorStop(0, "rgba(250, 200, 50, 0.6)");
				light.addColorStop(0.1, "rgba(250, 200, 50, 0.2)");
				light.addColorStop(0.4, "rgba(250, 200, 50, 0.06)");
				light.addColorStop(0.65, "rgba(250, 200, 50, 0.01)");
				light.addColorStop(0.8, "rgba(250, 200, 50, 0)");

				ctx.beginPath();
				ctx.fillStyle = light;
				ctx.arc(this.x, this.y, strength, 0, Math.PI * 2);
				ctx.fill();
				ctx.closePath();
			}

			remove(index, array) {
				array.splice(index, 1);
			}
		}

		class Spark {
			constructor(options = {}) {
				this.x = options.x || w * 0.5;
				this.y = options.y || h * 0.5;
				this.v = options.v || {
					direct: Math.random() * Math.PI * 2,
					weight: Math.random() * 14 + 2,
					friction: 0.88,
				};
				this.a = options.a || {
					change: Math.random() * 0.4 - 0.2,
					min: this.v.direct - Math.PI * 0.4,
					max: this.v.direct + Math.PI * 0.4,
				};
				this.g = options.g || {
					direct: Math.PI * 0.5 + (Math.random() * 0.4 - 0.2),
					weight: Math.random() * 0.25 + 0.25,
				};
				this.width = options.width || Math.random() * 3;
				this.lifespan = options.lifespan || Math.round(Math.random() * 20 + 40);
				this.maxlife = this.lifespan;
				this.color = options.color || "#feca32";
				this.prev = { x: this.x, y: this.y };
			}

			update(index, array) {
				this.prev = { x: this.x, y: this.y };
				this.x += Math.cos(this.v.direct) * this.v.weight;
				this.x += Math.cos(this.g.direct) * this.g.weight;
				this.y += Math.sin(this.v.direct) * this.v.weight;
				this.y += Math.sin(this.g.direct) * this.g.weight;

				this.v.weight > 0.2 && (this.v.weight *= this.v.friction);
				this.v.direct += this.a.change;

				if (this.v.direct > this.a.max || this.v.direct < this.a.min) {
					this.a.change *= -1;
				}

				this.lifespan > 0 && this.lifespan--;
				this.lifespan <= 0 && this.remove(index, array);
			}

			render(ctx) {
				if (this.lifespan <= 0) return;

				ctx.beginPath();
				ctx.globalAlpha = this.lifespan / this.maxlife;
				ctx.strokeStyle = this.color;
				ctx.lineWidth = this.width;
				ctx.moveTo(this.x, this.y);
				ctx.lineTo(this.prev.x, this.prev.y);
				ctx.stroke();
				ctx.closePath();
			}

			remove(index, array) {
				array.splice(index, 1);
			}
		}

		class Particles {
			constructor(options = {}) {
				this.max = options.max || Math.round(Math.random() * 10 + 10);
				this.sparks = Array.from(
					{ length: this.max },
					() => new Spark(options)
				);
			}

			update() {
				this.sparks.forEach((s, i) => s.update(i, this.sparks));
			}

			render(ctx) {
				this.sparks.forEach((s) => s.render(ctx));
			}
		}

		class Text {
			constructor(options = {}) {
				const pool = document.createElement("canvas");
				const buffer = pool.getContext("2d");
				pool.width = w;
				pool.height = h;

				buffer.fillStyle = "rgba(0,0,0,0)";
				buffer.fillRect(0, 0, pool.width, pool.height);

				this.size = options.size || Math.min(w * 0.08, 40);
				// The copy is now a single line
				this.copy = options.copy || ["COMING SOON"];
				this.color = options.color || "#f70800";
				// Slower animation speed with a higher delay
				this.delay = options.delay || 1;
				this.basedelay = this.delay;

				// Use a single temporary canvas for the single line
				const lineCanvas = document.createElement("canvas");
				const lineBuffer = lineCanvas.getContext("2d");
				const font = `${this.size}px danger`;
				lineBuffer.font = font;

				const lineBound = lineBuffer.measureText(this.copy[0]);
				lineCanvas.width = lineBound.width;
				lineCanvas.height = this.size * 1.5;

				lineBuffer.font = font;
				lineBuffer.fillStyle = this.color;
				lineBuffer.fillText(this.copy[0], 0, this.size * 1.1);

				this.bound = {
					width: lineBound.width,
					height: lineCanvas.height,
				};

				this.x = options.x || w * 0.5 - this.bound.width * 0.5;
				this.y = options.y || h * 0.5;

				this.data = lineBuffer.getImageData(
					0,
					0,
					this.bound.width,
					this.bound.height
				);
				this.index = 0;
			}

			update() {
				if (this.index >= this.bound.width) return;
				const data = this.data.data;
				for (
					let i = this.index * 4;
					i < data.length;
					i += 4 * this.data.width
				) {
					const bitmap = data[i] + data[i + 1] + data[i + 2] + data[i + 3];
					if (bitmap > 255 && Math.random() > 0.96) {
						const x = this.x + this.index;
						const y = this.y + i / this.data.width / 4;
						thunder.push(new Thunder({ x, y }));
						if (Math.random() > 0.5) particles.push(new Particles({ x, y }));
					}
				}
				if (this.delay-- < 0) {
					this.index++;
					this.delay += this.basedelay;
				}
			}

			render(ctx) {
				ctx.putImageData(
					this.data,
					this.x,
					this.y,
					0,
					0,
					this.index,
					this.bound.height
				);
			}
		}

		// Add periodic thunder from edges
		function addRandomThunder() {
			// Increased the frequency of random thunder by changing the probability
			if (Math.random() > 0.95) {
				thunder.push(new Thunder());
				if (Math.random() > 0.5) {
					const edge = Math.floor(Math.random() * 4);
					let x, y;
					switch (edge) {
						case 0:
							x = Math.random() * w;
							y = 0;
							break;
						case 1:
							x = w;
							y = Math.random() * h;
							break;
						case 2:
							x = Math.random() * w;
							y = h;
							break;
						case 3:
							x = 0;
							y = Math.random() * h;
							break;
					}
					particles.push(new Particles({ x, y }));
				}
			}
		}

		function update() {
			text?.update();
			thunder?.forEach((l, i) => l.update(i, thunder));
			particles?.forEach((p) => p.update());
			addRandomThunder();
		}

		function render() {
			if (!ctx) return;
			ctx.globalCompositeOperation = "source-over";
			ctx.globalAlpha = 1;
			ctx.clearRect(0, 0, w, h);
			ctx.globalCompositeOperation = "screen";
			if (animationPhase === "thunder") {
				text?.render(ctx);
				thunder?.forEach((l) => l.render(ctx));
				particles?.forEach((p) => p.render(ctx));
			} else if (animationPhase === "zoom") {
				ctx.save();
				ctx.translate(w * 0.5, h * 0.5);
				ctx.scale(scale, scale);
				ctx.translate(-w * 0.5, -h * 0.5);
				text?.render(ctx);
				ctx.restore();
			}
		}

		function checkAnimationComplete() {
			return (
				text?.index >= text?.bound?.width &&
				thunder?.length === 0 &&
				particles?.length === 0
			);
		}

		function handleZoomAnimation() {
			setScale((prev) => {
				const newScale = prev * 1.05;
				if (newScale > 5) {
					setAnimationPhase("complete");
					cancelAnimationFrame(zoomAnimationId);
					onComplete?.();
					return prev;
				}
				return newScale;
			});
			zoomAnimationId = requestAnimationFrame(handleZoomAnimation);
		}

		function loop() {
			update();
			render();
			if (animationPhase === "thunder" && checkAnimationComplete()) {
				setAnimationPhase("zoom");
				handleZoomAnimation();
				return;
			}
			if (animationPhase !== "complete") {
				animationId = requestAnimationFrame(loop);
			}
		}

		function init() {
			if (!containerRef.current) return;
			const container = containerRef.current;
			const rect = container.getBoundingClientRect();
			w = rect.width;
			h = rect.height;
			canvas = canvasRef.current;
			if (!canvas) return;
			ctx = canvas.getContext("2d");
			canvas.width = w;
			canvas.height = h;
			thunder = [];
			particles = [];
			text = new Text({ copy: textRef.current });
			setAnimationPhase("thunder");
			setScale(1);
			loop();
		}

		init();
		const handleResize = () => {
			if (!containerRef.current || animationPhase === "complete") return;
			const container = containerRef.current;
			const rect = container.getBoundingClientRect();
			w = rect.width;
			h = rect.height;
			if (!canvas) return;
			canvas.width = w;
			canvas.height = h;
			thunder = [];
			particles = [];
			text = new Text({ copy: textRef.current });
		};

		const handleClick = (e) => {
			if (animationPhase !== "thunder" || !canvas) return;
			const rect = canvas.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			thunder.push(new Thunder({ x, y }));
			particles.push(new Particles({ x, y }));
		};

		const resizeObserver = new ResizeObserver(handleResize);
		if (containerRef.current) {
			resizeObserver.observe(containerRef.current);
		}
		canvas?.addEventListener("click", handleClick);
		return () => {
			cancelAnimationFrame(animationId);
			cancelAnimationFrame(zoomAnimationId);
			resizeObserver.disconnect();
			canvas?.removeEventListener("click", handleClick);
		};
	}, [animationPhase, onComplete]);

	if (animationPhase === "complete") {
		return NextComponent ? <NextComponent /> : null;
	}

	return (
		<div
			ref={containerRef}
			className="relative w-full h-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
		>
			<div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 flex flex-col items-center justify-center whitespace-nowrap">
				<CursedTitle />
			</div>
			<canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
		</div>
	);
}
