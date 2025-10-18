export namespace usePressType {
  interface usePressOptions {
    duration?: number
    onStart?: () => void
    onEnd?: () => void
  }
  export interface usePressParams {
    onPress: () => void
    options: usePressOptions
  }
}