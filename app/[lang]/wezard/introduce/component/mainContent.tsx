interface InfoCardProps {
  title: string;
  content: string[];
}

const InfoCard = ({ title, content }: InfoCardProps) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-pink-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-500/10">
      <h2 className="text-2xl font-semibold text-pink-500 mb-6 flex items-center">
        <span className="text-xl mr-3">♪</span>
        {title}
      </h2>
      <div className="space-y-4">
        {content.map((paragraph, index) => (
          <p key={index} className="text-gray-300 leading-relaxed text-lg">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

const Content = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <InfoCard
            title="永恒的声音"
            content={[
              "ZARD，日本音乐史上最成功的乐队之一，以其主唱坂井泉水清澈透明的嗓音和深情的演唱风格，成为了90年代日本乐坛的代表性声音。",
              "从1991年出道至2007年，ZARD创造了连续9张百万单曲的惊人记录，总销量超过3700万张，是日本Oricon公信榜历史上女性歌手销量冠军。"
            ]}
          />
          
          <InfoCard
            title="音乐传奇"
            content={[
              "坂井泉水不仅是一位杰出的歌手，更是才华横溢的作词家。她为ZARD几乎所有歌曲填词，歌词充满诗意和哲理，给予无数人勇气和希望。",
              "《負けないで》、《揺れる想い》、《マイ フレンド》等经典歌曲，至今仍在日本卡拉OK点唱榜上名列前茅，成为国民级金曲。"
            ]}
          />
          
          <InfoCard
            title="文化印记"
            content={[
              "ZARD的音乐深深影响了整个亚洲乐坛，多首歌曲被用作《名侦探柯南》、《灌篮高手》、《龙珠GT》等经典动漫的主题曲，成为一代人的青春记忆。",
              "即使在她离世多年后的今天，ZARD的音乐依然在各大音乐平台拥有极高的播放量，新老歌迷们用各种方式延续着她的音乐生命。"
            ]}
          />
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  const stats = [
    { number: "45", label: "张单曲发行" },
    { number: "17", label: "张原创专辑" },
    { number: "9", label: "连续百万单曲" },
    { number: "3700万+", label: "总销量记录" }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="bg-pink-500/10 border border-pink-500/30 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">辉煌成就</h2>
            <p className="text-gray-300 text-xl">用数字见证传奇</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-pink-500 mb-2 whitespace-nowrap break-none">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const LegacySection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 max-w-4xl mx-auto text-center border border-white/10">
          <h2 className="text-3xl font-bold text-pink-500 mb-8">永恒的精神</h2>
          
          <div className="relative my-12">
            <blockquote className="text-2xl md:text-3xl italic text-gray-200 leading-relaxed px-8 md:px-16">
              即使时光流逝，你的歌声依然在风中回响，激励着每一个不愿放弃的人继续前行。
            </blockquote>
            <div className="text-6xl text-pink-500/30 absolute -top-4 left-4">&quot;</div>
            <div className="text-6xl text-pink-500/30 absolute -bottom-8 right-4">&quot;</div>
          </div>
          
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            坂井泉水的音乐超越了时代的界限，她的歌词中蕴含的勇气、希望和对生活的热爱，
            至今仍在感动着世界各地的人们。在这个网站上，我们将一起回顾她的音乐旅程，
            重温那些经典瞬间，让ZARD的精神永远传承。
          </p>
        </div>
      </div>
    </section>
  );
};

export const MainContent = () => {
  return (
    <>
      <Content />
      <StatsSection />
      <LegacySection />
    </>
  )
}