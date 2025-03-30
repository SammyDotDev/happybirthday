"use client";
import Image from "next/image";
import styles from "./style.module.scss";
import { useTransform, motion, useScroll } from "framer-motion";
import { useRef } from "react";

const Gallery = ({
	i,
	src,
	color,
	targetScale,
	gallery,
	progress,
	range,
	title,
}) => {
	const container = useRef(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ["start end", "start start"],
	});

	const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
	const scale = useTransform(progress, range, [1, targetScale]);

	return (
		<div ref={container} className={styles.cardContainer}>
			<motion.div
				style={{
					backgroundColor: color,
					scale,
					top: `calc(-5vh + ${i * 25}px)`,
				}}
				className={styles.card}
			>
				<h2>{title}</h2>
				<div className={styles.body}>
					<div className={styles.imageContainer}>
						{gallery.map((item) => {
							console.log(item.src);
							return (
								<Image
									key={item.id}
									fill
									src={`/images/${item.src}`}
									alt="image"
									className="imageus"
									style={
										{
											// objectFit: "contain",
										}
									}
								/>
							);
						})}
					</div>
				</div>
				<div className={styles.description}>
					<p
						style={{
							textAlign: "center",
                            fontWeight:"bold"
						}}
					>
						Happy Hirthday my love, I love you so much
					</p>
				</div>
			</motion.div>
		</div>
	);
};

export default Gallery;
