'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export const PageLoading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-background">
      <div className="flex flex-col items-center space-y-4">
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative w-32 h-32"
        >
          <Image src="/images/zard.jpg" alt="ZARD" fill className="object-contain" priority />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-700 dark:text-gray-200 text-sm font-medium"
        >
          Loading...
        </motion.p>
      </div>
    </div>
  )
}
