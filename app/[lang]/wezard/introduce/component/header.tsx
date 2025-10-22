export const Header = () => {
  return (
    <header className="pt-16 pb-8 text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-light mb-4 bg-gradient-to-r from-white to-pink-500 bg-clip-text text-transparent">
          ZARD
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 font-light tracking-wider">
          坂井泉水 - 永不褪色的音乐传奇
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent mx-auto mt-8"></div>
      </div>
    </header>
  );
};