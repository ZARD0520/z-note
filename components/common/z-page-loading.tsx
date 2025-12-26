'use client'

import { motion } from 'framer-motion'

export const PageLoading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-background">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-16 h-16">
          <motion.div
            className="absolute inset-0 border-4 border-primary-border border-t-primary rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>
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
