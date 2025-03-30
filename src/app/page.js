"use client";
import styles from "./page.module.scss";
import { projects } from "../data";
import Card from "../components/Card";
import { useScroll } from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import Gallery from "@/components/Card/gallery";
import bg from "../../public/images/bgbg.jpg";
import Head from "next/head";

export default function Home() {
	const container = useRef(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ["start start", "end end"],
	});

	useEffect(() => {
		const lenis = new Lenis();

		function raf(time) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);
	});

	return (
		<>
			<Head>
				<title>My Awesome Next.js App</title>
				<meta name="description" content="This is my amazing Next.js app" />
				<meta name="keywords" content="Next.js, SEO, React" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<main
				ref={container}
				className={{
					...styles.main,
					backgroundImage: `url(${bg})`,
					width: "100%",
					height: "100%",
				}}
			>
				{projects.map((project, i) => {
					const targetScale = 1 - (projects.length - i) * 0.05;

					if (project.gallery)
						return (
							<Gallery
								key={`p_${i}`}
								i={i}
								{...project}
								progress={scrollYProgress}
								range={[i * 0.25, 1]}
								targetScale={targetScale}
							/>
						);
					return (
						<Card
							key={`p_${i}`}
							i={i}
							{...project}
							progress={scrollYProgress}
							range={[i * 0.25, 1]}
							targetScale={targetScale}
						/>
					);
				})}
			</main>
		</>
	);
}
