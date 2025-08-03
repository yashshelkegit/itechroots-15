"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

const CursedTitle = () => {
	const [isGlitching, setIsGlitching] = useState(false);
	const [bloodDrops, setBloodDrops] = useState([]);
	const [corruptedText, setCorruptedText] = useState(["iTechRoots", "15.0"]);
	const containerRef = useRef(null);
	const controls = useAnimation();

	// Cursed text corruption
	const corruptedChars = "!@#$%^&*()_+-=[]{}|;':\",./<>?~`";
	const originalText = ["iTechRoots", "15.0"];

	// Initialize blood drops
	useEffect(() => {
		const drops = Array.from({ length: 15 }, (_, i) => ({
			id: i,
			x: Math.random() * 100,
			y: -10,
			speed: Math.random() * 2 + 1,
			size: Math.random() * 8 + 4,
			opacity: Math.random() * 0.8 + 0.2,
		}));
		setBloodDrops(drops);
	}, []);

	// Blood drip animation
	useEffect(() => {
		const animateBlood = () => {
			setBloodDrops((prev) =>
				prev.map((drop) => {
					let newY = drop.y + drop.speed;
					if (newY > 110) {
						newY = -10;
						return {
							...drop,
							y: newY,
							x: Math.random() * 100,
							speed: Math.random() * 2 + 1,
						};
					}
					return { ...drop, y: newY };
				})
			);
		};

		const interval = setInterval(animateBlood, 50);
		return () => clearInterval(interval);
	}, []);

	// Text corruption effect
	useEffect(() => {
		const corruptText = () => {
			setIsGlitching(true);

			let corrupted = originalText.map((line) =>
				line
					.split("")
					.map((char) => {
						if (Math.random() < 0.3 && char !== " ") {
							return corruptedChars[
								Math.floor(Math.random() * corruptedChars.length)
							];
						}
						return char;
					})
					.join("")
			);

			setCorruptedText(corrupted);

			setTimeout(() => {
				setCorruptedText(originalText);
				setIsGlitching(false);
			}, 200);
		};

		const interval = setInterval(corruptText, 3000 + Math.random() * 4000);
		return () => clearInterval(interval);
	}, []);

	// Breathing/pulsing animation
	useEffect(() => {
		controls.start({
			scale: [1, 1.02, 0.98, 1],
			transition: {
				duration: 4,
				ease: "easeInOut",
				repeat: Infinity,
			},
		});
	}, [controls]);

	const letterVariants = {
		hidden: {
			opacity: 0,
			y: 20,
			rotateX: -90,
			scale: 0.8,
		},
		visible: (i) => ({
			opacity: 1,
			y: 0,
			rotateX: 0,
			scale: 1,
			transition: {
				type: "spring",
				damping: 15,
				stiffness: 100,
				delay: i * 0.1,
			},
		}),
		cursed: {
			y: [0, -5, 2, -3, 0],
			rotateZ: [0, 2, -1, 1, 0],
			scale: [1, 1.1, 0.9, 1.05, 1],
			transition: {
				duration: 0.3,
				ease: "easeInOut",
			},
		},
	};

	return (
		<div
			ref={containerRef}
			className="relative w-full h-auto flex items-center justify-center p-8 overflow-visible"
		>
			{/* Blood drops */}
			<div className="absolute inset-0 pointer-events-none">
				{bloodDrops.map((drop) => (
					<div
						key={drop.id}
						className="absolute bg-red-900 rounded-full"
						style={{
							left: `${drop.x}%`,
							top: `${drop.y}%`,
							width: `${drop.size}px`,
							height: `${drop.size}px`,
							opacity: drop.opacity,
							boxShadow: `0 0 ${drop.size}px rgba(139, 0, 0, 0.8)`,
						}}
					/>
				))}
			</div>

			{/* Main cursed title */}
			<motion.div
				className="relative z-10 w-full flex flex-col items-center justify-center text-center"
				animate={controls}
			>
				{/* First line: iTechRoots */}
				<motion.h1
					className={`relative text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-red-100 whitespace-nowrap select-none overflow-visible leading-none ${
						isGlitching ? "animate-cursedGlitch" : ""
					}`}
					style={{
						fontFamily: "'Creepster','Chiller', serif",
						textShadow: `
                            0 0 5px rgba(139, 0, 0, 1),
                            0 0 10px rgba(139, 0, 0, 0.8),
                            0 0 15px rgba(139, 0, 0, 0.6),
                            0 0 20px rgba(139, 0, 0, 0.4),
                            0 0 35px rgba(139, 0, 0, 0.2),
                            2px 2px 4px rgba(0, 0, 0, 0.8)
                        `,
						filter: "drop-shadow(0 0 10px rgba(139, 0, 0, 0.8))",
						letterSpacing: "0.05em",
					}}
					initial="hidden"
					animate="visible"
				>
					{corruptedText[0].split("").map((char, index) => (
						<motion.span
							key={`line1-${index}`}
							custom={index}
							variants={letterVariants}
							animate={isGlitching ? "cursed" : "visible"}
							className="inline-block cursor-default"
							style={{
								filter: `hue-rotate(${
									isGlitching ? Math.random() * 360 : 0
								}deg)`,
							}}
						>
							{char === " " ? "\u00A0" : char}
						</motion.span>
					))}
				</motion.h1>

				{/* Second line: 15.0 */}
				<motion.h2
					className={`relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-red-100 whitespace-nowrap select-none overflow-visible leading-none mt-2 ${
						isGlitching ? "animate-cursedGlitch" : ""
					}`}
					style={{
						fontFamily: "'Creepster','Chiller', serif",
						textShadow: `
                            0 0 5px rgba(139, 0, 0, 1),
                            0 0 10px rgba(139, 0, 0, 0.8),
                            0 0 15px rgba(139, 0, 0, 0.6),
                            0 0 20px rgba(139, 0, 0, 0.4),
                            0 0 35px rgba(139, 0, 0, 0.2),
                            2px 2px 4px rgba(0, 0, 0, 0.8)
                        `,
						filter: "drop-shadow(0 0 10px rgba(139, 0, 0, 0.8))",
						letterSpacing: "0.1em",
					}}
					initial="hidden"
					animate="visible"
				>
					{corruptedText[1].split("").map((char, index) => (
						<motion.span
							key={`line2-${index}`}
							custom={index + corruptedText[0].length}
							variants={letterVariants}
							animate={isGlitching ? "cursed" : "visible"}
							className="inline-block cursor-default"
							style={{
								filter: `hue-rotate(${
									isGlitching ? Math.random() * 360 : 0
								}deg)`,
							}}
						>
							{char === " " ? "\u00A0" : char}
						</motion.span>
					))}
				</motion.h2>
			</motion.div>

			{/* Enhanced cursed CSS animations */}
			<style jsx>{`
				@import url("https://fonts.googleapis.com/css2?family=Creepster&display=swap");

				@keyframes cursedGlitch {
					0% {
						transform: translate(0) skew(0deg);
						filter: hue-rotate(0deg) brightness(1);
					}
					10% {
						transform: translate(-2px, 2px) skew(2deg);
						filter: hue-rotate(90deg) brightness(1.2);
					}
					20% {
						transform: translate(-4px, -2px) skew(-1deg);
						filter: hue-rotate(180deg) brightness(0.8);
					}
					30% {
						transform: translate(4px, 2px) skew(1deg);
						filter: hue-rotate(270deg) brightness(1.1);
					}
					40% {
						transform: translate(2px, -2px) skew(-2deg);
						filter: hue-rotate(360deg) brightness(0.9);
					}
					50% {
						transform: translate(-3px, 3px) skew(1deg);
						filter: hue-rotate(45deg) brightness(1.3);
					}
					60% {
						transform: translate(3px, -1px) skew(-1deg);
						filter: hue-rotate(135deg) brightness(0.7);
					}
					70% {
						transform: translate(-1px, -3px) skew(2deg);
						filter: hue-rotate(225deg) brightness(1.1);
					}
					80% {
						transform: translate(2px, 1px) skew(-2deg);
						filter: hue-rotate(315deg) brightness(0.9);
					}
					90% {
						transform: translate(-2px, -1px) skew(1deg);
						filter: hue-rotate(180deg) brightness(1.2);
					}
					100% {
						transform: translate(0) skew(0deg);
						filter: hue-rotate(0deg) brightness(1);
					}
				}

				@keyframes creepyFog {
					0%,
					100% {
						opacity: 0.3;
						transform: scale(1) rotate(0deg);
					}
					25% {
						opacity: 0.5;
						transform: scale(1.1) rotate(1deg);
					}
					50% {
						opacity: 0.4;
						transform: scale(0.9) rotate(-1deg);
					}
					75% {
						opacity: 0.6;
						transform: scale(1.05) rotate(0.5deg);
					}
				}

				.animate-cursedGlitch {
					animation: cursedGlitch 0.2s infinite;
				}
			`}</style>
		</div>
	);
};

export default CursedTitle;
