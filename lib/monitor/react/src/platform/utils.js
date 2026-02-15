export const isNext = () => {
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined' &&
    window.__NEXT_DATA__ &&
    document.getElementById('__next')
  )
}
