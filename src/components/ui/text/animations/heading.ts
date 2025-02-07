export const headingAnimation = {
  container: {
    hidden: { opacity: 0 },
    visible: {

      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  },
  letter: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  }
}; 