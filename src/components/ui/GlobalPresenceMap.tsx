"use client";
import { WorldMap } from "./WorldMap";
import { motion } from "framer-motion";
import { getGlobalPresenceConfig } from "../../config";

interface GlobalPresenceMapProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function GlobalPresenceMap({
  title,
  subtitle,
  className = ""
}: GlobalPresenceMapProps) {
  const config = getGlobalPresenceConfig();
  const displayTitle = title || config.title;
  const displaySubtitle = subtitle || config.subtitle;
  return (
    <div className={`py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-text-light dark:text-text-dark mb-4">
            {displayTitle}
          </h2>
          <p className="text-subtle-light dark:text-subtle-dark text-lg max-w-3xl mx-auto">
            {displaySubtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="relative"
        >
          <WorldMap
            dots={config.map.connections}
            lineColor={config.map.lineColor}
            showLabels={config.map.showLabels}
            animationDuration={config.map.animationDuration}
            loop={config.map.loop}
          />
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12"
        >
          {config.stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-subtle-light dark:text-subtle-dark">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
