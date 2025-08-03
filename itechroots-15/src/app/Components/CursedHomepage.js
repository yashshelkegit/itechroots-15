"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Cursed phrases for floating text
const cursedPhrases = [
	"Make it stop.",
	"Get out of my head!",
	"Leave me alone!",
	"STOP!",
	"It never ends...",
	"Someone help me.",
	"End the pain.",
	"Why won't this end?",
	"Everyone hates me.",
	"What is happiness?",
	"The darkness...",
	"I can hear them.",
	"They're watching me.",
	"Don't look behind you.",
	"I forgot my own name.",
	"This isn't real.",
	"I'm trapped.",
	"No escape.",
	"The walls are closing in.",
	"Help... please...",
	"Everything is broken.",
	"The mirror lied.",
	"I saw it again.",
	"They're inside the walls.",
	"It knows I'm here.",
	"The voices are back.",
	"He's still in the basement.",
	"Blood on the floor.",
	"Why am I still here?",
	"My hands won't stop shaking.",
	"I can't breathe.",
	"I'm not alone.",
	"They're under my bed.",
	"I never left.",
	"Silence is louder here.",
	"It feeds on fear.",
	"Nothing feels real.",
	"I miss the light.",
	"The shadows speak.",
	"Who turned out the lights?",
	"It's coming for me.",
	"This room isn't safe.",
	"Don't sleep.",
	"It whispers at night.",
	"I'm losing time.",
	"Where did everyone go?",
	"There's something in the dark.",
	"My skin is crawling.",
	"I was never alive.",
	"It watches me breathe.",
	"I forgot how to scream.",
];

// Main animated logo component
const CursedMainLogo = () => {
	const [glitchActive, setGlitchActive] = useState(false);
	const [bloodDrip, setBloodDrip] = useState(false);

	useEffect(() => {
		const glitchInterval = setInterval(() => {
			setGlitchActive(true);
			setTimeout(() => setGlitchActive(false), 200);
		}, 3000 + Math.random() * 2000);

		const bloodInterval = setInterval(() => {
			setBloodDrip(true);
			setTimeout(() => setBloodDrip(false), 2000);
		}, 5000 + Math.random() * 3000);

		return () => {
			clearInterval(glitchInterval);
			clearInterval(bloodInterval);
		};
	}, []);

    const titleVariants = {
			hidden: { opacity: 0 },
			visible: {
				opacity: 1,
				transition: {
					staggerChildren: 0.05,
				},
			},
		};

		const letterVariants = {
			hidden: { opacity: 0, y: 20, scale: 0.8 },
			visible: {
				opacity: 1,
				y: 0,
				scale: 1,
				transition: {
					type: "spring",
					damping: 12,
					stiffness: 200,
				},
			},
		};

	return (
		<div className="relative">
			<motion.div
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1.5, ease: "easeOut" }}
				className="text-center"
			>
				<motion.h1
					className={`relative text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold text-white mb-4 ${
						glitchActive ? "animate-glitch" : ""
					}`}
					variants={titleVariants}
					initial="hidden"
					animate="visible"
					style={{
						textShadow: `
                            0 0 10px rgba(220, 38, 127, 0.8),
                            0 0 20px rgba(220, 38, 127, 0.6),
                            0 0 40px rgba(220, 38, 127, 0.4)
                        `,
						transition: "transform 1s ease-out",
					}}
				>
					{/* Split the title into letters for individual animation */}
					{"iTechroots".split("").map((char, index) => (
						<motion.span
							key={index}
							variants={letterVariants}
							className="inline-block" // Must be inline-block to apply transform
						>
							{char === " " ? "\u00A0" : char} {/* Preserve spaces */}
						</motion.span>
					))}
				</motion.h1>

				<motion.div
					initial={{ opacity: 0, scale: 0.5 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 1, duration: 1 }}
					className="relative inline-block"
				>
					<span
						className="text-6xl md:text-7xl font-bold text-white"
						style={{
							fontFamily: "serif",
							textShadow: `
                0 0 15px rgba(255, 255, 255, 0.8),
                0 0 30px rgba(220, 38, 127, 0.6),
                0 0 45px rgba(220, 38, 127, 0.4),
                3px 3px 0px rgba(0,0,0,1)
              `,
						}}
					>
						15.0
					</span>

					{/* Blood drip effect */}
					<AnimatePresence>
						{bloodDrip && (
							<motion.div
								initial={{ height: 0, opacity: 0 }}
								animate={{ height: "100px", opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 2, ease: "easeOut" }}
								className="absolute left-1/2 top-full w-2 bg-red-800 rounded-b-full"
								style={{
									background: "linear-gradient(to bottom, #dc2626, #7f1d1d)",
									boxShadow: "0 0 10px rgba(220, 38, 38, 0.8)",
								}}
							/>
						)}
					</AnimatePresence>
				</motion.div>
			</motion.div>
		</div>
	);
};

// Coming Soon thunder component
const ComingSoonThunder = () => {
	const canvasRef = useRef(null);
	const containerRef = useRef(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(true), 2000);
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		if (!isVisible) return;

		let canvas, ctx, w, h, thunder, text, particles, animationId;

		class Thunder {
			constructor(options = {}) {
				this.lifespan = options.lifespan || Math.round(Math.random() * 10 + 15);
				this.maxlife = this.lifespan;
				this.color = options.color || "#dc2626";
				this.glow = options.glow || "#dc2626";
				this.x = options.x || Math.random() * w;
				this.y = options.y || Math.random() * h;
				this.width = options.width || 2;
				this.direct = options.direct || Math.random() * Math.PI * 2;
				this.max = options.max || Math.round(Math.random() * 8 + 15);
				this.segments = Array.from({ length: this.max }, () => ({
					direct: this.direct + (Math.PI * Math.random() * 0.3 - 0.15),
					length: Math.random() * 15 + 60,
					change: Math.random() * 0.06 - 0.03,
				}));
			}

			update(index, array) {
				this.segments.forEach(
					(s) =>
						(s.direct += s.change) && Math.random() > 0.94 && (s.change *= -1)
				);
				(this.lifespan > 0 && this.lifespan--) || this.remove(index, array);
			}

			render(ctx) {
				if (this.lifespan <= 0) return;
				ctx.beginPath();
				ctx.globalAlpha = this.lifespan / this.maxlife;
				ctx.strokeStyle = this.color;
				ctx.lineWidth = this.width;
				ctx.shadowBlur = 20;
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

				const strength = Math.random() * 60 + 30;
				const light = ctx.createRadialGradient(
					this.x,
					this.y,
					0,
					this.x,
					this.y,
					strength
				);
				light.addColorStop(0, "rgba(220, 38, 38, 0.4)");
				light.addColorStop(0.1, "rgba(220, 38, 38, 0.2)");
				light.addColorStop(0.4, "rgba(220, 38, 38, 0.06)");
				light.addColorStop(0.65, "rgba(220, 38, 38, 0.01)");
				light.addColorStop(0.8, "rgba(220, 38, 38, 0)");
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

		class Text {
			constructor(options = {}) {
				const pool = document.createElement("canvas");
				const buffer = pool.getContext("2d");
				pool.width = w;
				pool.height = h;
				buffer.fillStyle = "rgba(0,0,0,0)";
				buffer.fillRect(0, 0, pool.width, pool.height);

				this.size = options.size || Math.min(w * 0.08, 60);
				this.copy = options.copy || "COMING SOON";
				this.color = options.color || "#dc2626";
				this.delay = options.delay || 1;
				this.basedelay = this.delay;

				buffer.font = `${this.size}px serif`;
				const bound = buffer.measureText(this.copy);
				this.bound = {
					width: bound.width,
					height: this.size * 1.5,
				};

				this.x = options.x || w * 0.5 - this.bound.width * 0.5;
				this.y = options.y || h * 0.5 - this.bound.height * 0.5;

				buffer.fillStyle = this.color;
				buffer.fillText(this.copy, 0, this.size * 1.1);

				this.data = buffer.getImageData(
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
					if (bitmap > 255 && Math.random() > 0.95) {
						const x = this.x + this.index;
						const y = this.y + i / this.data.width / 4;
						thunder.push(new Thunder({ x, y }));
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

		function update() {
			text?.update();
			thunder?.forEach((l, i) => l.update(i, thunder));
		}

		function render() {
			if (!ctx) return;

			ctx.globalCompositeOperation = "source-over";
			ctx.globalAlpha = 1;
			ctx.clearRect(0, 0, w, h);
			ctx.globalCompositeOperation = "screen";

			text?.render(ctx);
			thunder?.forEach((l) => l.render(ctx));
		}

		function loop() {
			update();
			render();
			animationId = requestAnimationFrame(loop);
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
			text = new Text();

			loop();
		}

		init();

		const handleResize = () => {
			if (!containerRef.current) return;

			const container = containerRef.current;
			const rect = container.getBoundingClientRect();
			w = rect.width;
			h = rect.height;

			if (!canvas) return;
			canvas.width = w;
			canvas.height = h;

			thunder = [];
			text = new Text();
		};

		const handleClick = (e) => {
			if (!canvas) return;

			const rect = canvas.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			thunder.push(new Thunder({ x, y }));
		};

		const resizeObserver = new ResizeObserver(handleResize);
		if (containerRef.current) {
			resizeObserver.observe(containerRef.current);
		}

		canvas?.addEventListener("click", handleClick);

		return () => {
			cancelAnimationFrame(animationId);
			resizeObserver.disconnect();
			canvas?.removeEventListener("click", handleClick);
		};
	}, [isVisible]);

	if (!isVisible) return null;

	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 1.5 }}
			ref={containerRef}
			className="relative w-full h-40 flex items-center justify-center"
		>
			<canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
		</motion.div>
	);
};

// Main homepage component
const CursedHomepage = () => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [particles, setParticles] = useState([]);
	const [floatingPhrases, setFloatingPhrases] = useState([]);
	const heroRef = useRef(null);

	// Mouse tracking for parallax
	useEffect(() => {
		const handleMouseMove = (e) => {
			const rect = heroRef.current?.getBoundingClientRect();
			if (rect) {
				setMousePosition({
					x: (e.clientX - rect.left - rect.width / 2) / rect.width,
					y: (e.clientY - rect.top - rect.height / 2) / rect.height,
				});
			}
		};

		if (typeof window !== "undefined") {
			window.addEventListener("mousemove", handleMouseMove);
		}

		return () => {
			if (typeof window !== "undefined") {
				window.removeEventListener("mousemove", handleMouseMove);
			}
		};
	}, []);

	// Generate floating particles
	useEffect(() => {
		const newParticles = Array.from({ length: 50 }, (_, i) => ({
			id: i,
			x: Math.random() * 100,
			y: Math.random() * 100,
			size: Math.random() * 4 + 1,
			speed: Math.random() * 1.5 + 0.3,
			opacity: Math.random() * 0.8 + 0.2,
		}));
		setParticles(newParticles);
	}, []);

	// Animate particles
	useEffect(() => {
		const animateParticles = () => {
			setParticles((prev) =>
				prev.map((particle) => ({
					...particle,
					y: particle.y <= -5 ? 105 : particle.y - particle.speed * 0.05,
				}))
			);
		};

		const interval = setInterval(animateParticles, 50);
		return () => clearInterval(interval);
	}, []);

	// Floating phrases effect
	useEffect(() => {
		const intervalId = setInterval(() => {
			const newPhrase = {
				id: Date.now(),
				text: cursedPhrases[Math.floor(Math.random() * cursedPhrases.length)],
				x: Math.random() * 100,
				y: Math.random() * 100,
			};
			setFloatingPhrases((prev) => {
				const updatedPhrases = [...prev, newPhrase];
				if (updatedPhrases.length > 30) {
					return updatedPhrases.slice(-30);
				}
				return updatedPhrases;
			});
		}, 400);

		return () => clearInterval(intervalId);
	}, []);

	return (
		<div
			ref={heroRef}
			className="relative min-h-screen overflow-hidden bg-black"
			style={{
				backgroundImage:
					'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23800000" fill-opacity="0.1"%3E%3Cpath d="M20 20c0 5.5-4.5 10-10 10s-10-4.5-10-10 4.5-10 10-10 10 4.5 10 10zm10 0c0 5.5-4.5 10-10 10s-10-4.5-10-10 4.5-10 10-10 10 4.5 10 10z"/%3E%3C/g%3E%3C/svg%3E")',
			}}
		>
			{/* Animated Background Grid */}
			<div
				className="absolute inset-0 opacity-10"
				style={{
					backgroundImage: `
            linear-gradient(rgba(220, 38, 38, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(220, 38, 38, 0.3) 1px, transparent 1px)
          `,
					backgroundSize: "60px 60px",
					transform: `translate(${mousePosition.x * 15}px, ${
						mousePosition.y * 15
					}px)`,
					transition: "transform 0.1s ease-out",
				}}
			/>

			{/* Floating Particles */}
			{particles.map((particle) => (
				<div
					key={particle.id}
					className="absolute rounded-full bg-red-600"
					style={{
						left: `${particle.x}%`,
						top: `${particle.y}%`,
						width: `${particle.size}px`,
						height: `${particle.size}px`,
						opacity: particle.opacity,
						boxShadow: `0 0 ${particle.size * 3}px rgba(220, 38, 38, 0.8)`,
						transform: `translate(${mousePosition.x * particle.size * 1.5}px, ${
							mousePosition.y * particle.size * 1.5
						}px)`,
						transition: "transform 0.2s ease-out",
					}}
				/>
			))}

			{/* Pulsing Vignette */}
			<div
				className="absolute inset-0 pointer-events-none"
				style={{
					background:
						"radial-gradient(circle at center, transparent 20%, rgba(220, 38, 38, 0.2) 60%, rgba(0, 0, 0, 0.8) 100%)",
					animation: "pulse 3s ease-in-out infinite",
				}}
			/>

			{/* Cursed floating phrases */}
			<div className="absolute inset-0 z-10 pointer-events-none">
				<AnimatePresence>
					{floatingPhrases.map((phrase) => (
						<motion.div
							key={phrase.id}
							className="absolute font-serif font-bold text-red-400 text-sm opacity-0"
							style={{
								top: `${phrase.y}vh`,
								left: `calc(${phrase.x}vw - 2em)`,
								whiteSpace: "nowrap",
								textShadow: "0 0 8px rgba(220, 38, 38, 0.8)",
							}}
							initial={{ opacity: 0, scale: 0.1, rotate: -10 }}
							animate={{
								opacity: 0.7,
								scale: 1,
								rotate: 0,
								transition: { duration: 0.8 },
							}}
							exit={{
								opacity: 0,
								scale: 0.1,
								rotate: 10,
								transition: { duration: 2, ease: "easeOut" },
							}}
						>
							{phrase.text}
						</motion.div>
					))}
				</AnimatePresence>
			</div>

			{/* Main Content */}
			<div className="relative z-20 flex flex-col items-center justify-center min-h-screen text-center space-y-20">
				{/* Main Logo */}
				<CursedMainLogo />

				{/* Coming Soon Thunder Text */}
				<ComingSoonThunder />

				{/* Subtitle */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 3, duration: 1 }}
					className="text-center"
				>
					<p className="text-red-300 text-xl md:text-2xl font-light tracking-wider">
						The darkness awaits...
					</p>
					<motion.div
						animate={{ opacity: [0.5, 1, 0.5] }}
						transition={{ duration: 2, repeat: Infinity }}
						className="mt-4 text-red-500 text-lg"
					>
						Enter if you dare
					</motion.div>
				</motion.div>
			</div>

			<style jsx>{`
				@keyframes pulse {
					0%,
					100% {
						opacity: 0.3;
					}
					50% {
						opacity: 0.6;
					}
				}
			`}</style>
		</div>
	);
};

export default CursedHomepage;
