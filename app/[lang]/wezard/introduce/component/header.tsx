export const Header: React.FC<{ dict: Record<string, any> }> = ({ dict }) => {
  return (
    <header className="pt-16 pb-8 text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-white to-blue-800 bg-clip-text text-transparent">
          ZARD
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 font-light tracking-wider">
          {dict.zard.header.description}
        </p>
        <div className="w-40 h-1 bg-gradient-to-r from-transparent via-gray-500 to-transparent mx-auto mt-8"></div>
      </div>
    </header>
  )
}
