"use client";
import React from "react";
import { motion } from "framer-motion";
import { TestimonialsColumn, Testimonial } from "./testimonials-columns";

interface AnimatedTestimonialsProps {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const AnimatedTestimonials: React.FC<AnimatedTestimonialsProps> = ({
  testimonials,
  title = "What our customers say",
  subtitle = "See what our customers have to say about us.",
  className = ""
}) => {
  // Split testimonials into columns
  const firstColumn = testimonials.slice(0, Math.ceil(testimonials.length / 3));
  const secondColumn = testimonials.slice(Math.ceil(testimonials.length / 3), Math.ceil(testimonials.length * 2 / 3));
  const thirdColumn = testimonials.slice(Math.ceil(testimonials.length * 2 / 3));

  return (
    <section className={`bg-background-light dark:bg-background-dark py-16 relative ${className}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text-light dark:text-text-dark mb-4">
            {title}
          </h2>
          <p className="text-subtle-light dark:text-subtle-dark text-lg">
            {subtitle}
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

export default AnimatedTestimonials;
