import { InfoCardProps } from '@/type/wezard/introduce'
import React from 'react'

const InfoCard: React.FC<InfoCardProps> = ({ title, content }) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-slate-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-500/10">
      <h2 className="text-2xl font-semibold text-slate-400 mb-6 flex items-center">
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
  )
}

const Content: React.FC<any> = ({ dict }) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <InfoCard title={dict.zard.content.cardTitle1} content={dict.zard.content.cardContent1} />

          <InfoCard title={dict.zard.content.cardTitle2} content={dict.zard.content.cardContent2} />

          <InfoCard title={dict.zard.content.cardTitle3} content={dict.zard.content.cardContent3} />
        </div>
      </div>
    </section>
  )
}

const StatsSection: React.FC<any> = ({ dict }) => {
  const stats = [
    { number: '45', label: dict.zard.content.singleState },
    { number: '17', label: dict.zard.content.albumState },
    { number: '9', label: dict.zard.content.mSingleState },
    { number: '3700万+', label: dict.zard.content.totalRecordState },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="bg-slate-500/10 border border-white/10 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-400 mb-4">
              {dict.zard.content.stateTitle}
            </h2>
            <p className="text-gray-300 text-xl">{dict.zard.content.stateDesc}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 whitespace-nowrap break-none">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const LegacySection: React.FC<any> = ({ dict }) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 max-w-4xl mx-auto text-center border border-white/10">
          <h2 className="text-3xl font-bold text-slate-400 mb-8">
            {dict.zard.content.legacyTitle}
          </h2>

          <div className="relative my-12">
            <blockquote className="text-2xl md:text-3xl italic text-gray-200 leading-relaxed px-8 md:px-16">
              {dict.zard.content.legacyDesc}
            </blockquote>
            <div className="text-6xl text-blue-500/30 absolute -top-4 left-4">&quot;</div>
            <div className="text-6xl text-blue-500/30 absolute -bottom-8 right-4">&quot;</div>
          </div>

          <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            {dict.zard.content.legacyContent}
          </p>
        </div>
      </div>
    </section>
  )
}

export const MainContent: React.FC<any> = ({ dict }) => {
  return (
    <>
      <Content dict={dict} />
      <StatsSection dict={dict} />
      <LegacySection dict={dict} />
    </>
  )
}
