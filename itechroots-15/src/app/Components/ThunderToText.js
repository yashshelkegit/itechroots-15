"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThunderText from "./ThunderText";

// Array of cursed phrases to be displayed
const phrases = [
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

const CursedHeroSection = () => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [particles, setParticles] = useState([]);
	const [floatingPhrases, setFloatingPhrases] = useState([]);
	const heroRef = useRef(null);

	// Mouse tracking for parallax and custom cursor
	useEffect(() => {
		const handleMouseMove = (e) => {
			const rect = heroRef.current?.getBoundingClientRect();
			if (rect) {
				// Set the relative mouse position for parallax effects
				setMousePosition({
					x: (e.clientX - rect.left - rect.width / 2) / rect.width,
					y: (e.clientY - rect.top - rect.height / 2) / rect.height,
				});
			}
		};

		// Add event listener only if window is defined (on the client)
		if (typeof window !== "undefined") {
			window.addEventListener("mousemove", handleMouseMove);
		}

		// Cleanup function to remove event listener
		return () => {
			if (typeof window !== "undefined") {
				window.removeEventListener("mousemove", handleMouseMove);
			}
		};
	}, []);

	// Generate floating particles
	useEffect(() => {
		const newParticles = Array.from({ length: 30 }, (_, i) => ({
			id: i,
			x: Math.random() * 100,
			y: Math.random() * 100,
			size: Math.random() * 3 + 1,
			speed: Math.random() * 2 + 0.5,
			opacity: Math.random() * 0.7 + 0.3,
		}));
		setParticles(newParticles);
	}, []);

	// Floating animation for particles
	useEffect(() => {
		const animateParticles = () => {
			setParticles((prev) =>
				prev.map((particle) => ({
					...particle,
					y: particle.y <= -5 ? 105 : particle.y - particle.speed * 0.1,
				}))
			);
		};

		const interval = setInterval(animateParticles, 50);
		return () => clearInterval(interval);
	}, []);

	// Floating phrases effect - reduced frequency and quantity
	useEffect(() => {
		const intervalId = setInterval(() => {
			const newPhrase = {
				id: Date.now(),
				text: phrases[Math.floor(Math.random() * phrases.length)],
				x: Math.random() * 100,
				y: Math.random() * 100,
			};
			setFloatingPhrases((prev) => {
				// Add the new phrase and keep only the last 15 phrases (reduced from 50)
				const updatedPhrases = [...prev, newPhrase];
				if (updatedPhrases.length > 15) {
					return updatedPhrases.slice(-15);
				}
				return updatedPhrases;
			});
		}, 800); // Increased interval from 250ms to 800ms

		return () => clearInterval(intervalId);
	}, []);

	return (
		<div ref={heroRef} className="relative min-h-screen overflow-hidden">
			{/* Animated Background Grid */}
			<div
				className="absolute inset-0 opacity-20"
				style={{
					backgroundImage: `
                        linear-gradient(rgba(139, 69, 19, 0.3) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(139, 69, 19, 0.3) 1px, transparent 1px)
                    `,
					backgroundSize: "50px 50px",
					transform: `translate(${mousePosition.x * 20}px, ${
						mousePosition.y * 20
					}px)`,
					transition: "transform 0.1s ease-out",
				}}
			/>

			{/* Floating Particles - now a horror-inspired red/pink */}
			{particles.map((particle) => (
				<div
					key={particle.id}
					className="absolute rounded-full bg-white"
					style={{
						left: `${particle.x}%`,
						top: `${particle.y}%`,
						width: `${particle.size}px`,
						height: `${particle.size}px`,
						opacity: particle.opacity,
						boxShadow: `0 0 ${particle.size * 2}px rgba(220, 38, 127, 0.8)`,
						transform: `translate(${mousePosition.x * particle.size * 2}px, ${
							mousePosition.y * particle.size * 2
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
						"radial-gradient(circle at center, transparent 30%, rgba(139, 0, 0, 0.3) 70%, rgba(0, 0, 0, 0.7) 100%)",
					animation: "pulse 4s ease-in-out infinite",
				}}
			/>

			{/* Cursed floating phrases wrapper */}
			<div id="wrapper" className="absolute inset-0 z-10 pointer-events-none">
				<AnimatePresence>
					{floatingPhrases.map((phrase) => (
						<motion.div
							key={phrase.id}
							className="absolute font-pt-sans-narrow font-bold text-gray-300 opacity-0"
							style={{
								top: `${phrase.y}vh`,
								left: `calc(${phrase.x}vw - 1.75em)`,
								whiteSpace: "nowrap",
								textShadow: "0 0 5px rgba(220, 38, 127, 0.5)",
							}}
							initial={{ opacity: 0, scale: 1 }}
							animate={{
								opacity: [0, 0.8, 0.6],
								scale: 1,
								transition: { duration: 0.3, ease: "easeOut" },
							}}
							exit={{
								opacity: 0,
								scale: 3, // Zoom out effect - scale up to 3x
								transition: { duration: 0.6, ease: "easeIn" }, // Faster exit (reduced from 3s)
							}}
						>
							{phrase.text}
						</motion.div>
					))}
				</AnimatePresence>
			</div>

			{/* Main Content */}
			<div className="relative z-20 flex flex-col items-center justify-center text-center">
				{/* Overlay under ThunderText */}
				<div className="absolute inset-0 z-0 bg-black opacity-45" />
				<ThunderText />
			</div>

			<style jsx>{`
				.font-pt-sans-narrow {
					font-family: sans-serif;
				}

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

export default CursedHeroSection;
