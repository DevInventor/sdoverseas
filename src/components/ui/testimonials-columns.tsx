"use client";
import React from "react";
import { motion } from "framer-motion";

export interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
  company?: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-background"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role, company }, i) => (
                <div className="p-6 rounded-2xl border border-primary/20 shadow-lg shadow-primary/10 max-w-xs w-full bg-background-light dark:bg-background-dark" key={i}>
                  <div className="text-sm text-text-light dark:text-text-dark leading-relaxed mb-4">
                    "{text}"
                  </div>
                  <div className="flex items-center gap-3">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <div className="font-semibold tracking-tight leading-5 text-text-light dark:text-text-dark text-sm">
                        {name}
                      </div>
                      <div className="leading-5 opacity-70 tracking-tight text-xs text-subtle-light dark:text-subtle-dark">
                        {role}{company && `, ${company}`}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
