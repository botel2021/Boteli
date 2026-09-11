import React, { useState } from 'react';
import { Church, BookCheck, Shield, Heart, Award, Quote } from 'lucide-react';
import { PASTORS_DATA, CHURCH_INFO } from '../data/churchData';

export const AboutAndPastors: React.FC = () => {
  const [showCreed, setShowCreed] = useState(false);

  return (
    <section id="about-us" className="py-20 bg-stone-100/80 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-semibold uppercase tracking-wider font-cinzel mb-3">
            <Church className="w-3.5 h-3.5 text-amber-700" />
            About Our Church & Pastors
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-sc font-bold text-stone-900">
            关于恩典之光基督教会
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            我们是一间立足圣经真理、持守普世大公教会正统信仰的基督教会。
            自{CHURCH_INFO.foundedYear}创立以来，竭力传扬纯正福音，见证基督博爱，致力于服侍城市与关怀邻舍。
          </p>
        </div>

        {/* Church Overview & Exterior Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Left: Exterior Photo */}
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden shadow-xl border border-stone-200 group">
            <img
              src="/src/assets/images/church_exterior_warm_1789118281568.jpg"
              alt="恩典之光基督教会园区外景"
              referrerPolicy="no-referrer"
              className="w-full h-[360px] sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-6">
              <div className="text-white">
                <div className="font-serif-sc font-bold text-lg">恩光中心主堂外观</div>
                <div className="text-xs text-stone-300 mt-0.5">
                  位于高新区天府大道中段 · 清新宁静的崇拜与团契园区
                </div>
              </div>
            </div>
          </div>

          {/* Right: Vision, Mission & 4 Core Commitments */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-xs">
              <div className="flex items-center gap-2.5 text-amber-800 font-bold text-lg font-serif-sc mb-3">
                <Shield className="w-5 h-5 text-amber-700" />
                <span>教会的异象与使命 (Vision & Mission)</span>
              </div>
              <p className="text-stone-700 text-xs sm:text-sm leading-relaxed mb-4">
                <strong>异象：</strong>建立一间以基督为中心、以圣经真理为根基、在现代都市中发出纯净信仰之光的门徒教会。
              </p>
              <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                <strong>使命：</strong>带领未信者认识救主耶稣基督，培育信徒在生命中活出真理，借着爱心的行动服侍人群，将荣耀归于三一真神。
              </p>
            </div>

            {/* Apostles Creed Accordion Callout */}
            <div className="bg-amber-50/70 p-6 rounded-3xl border border-amber-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-stone-900 font-bold text-base font-serif-sc">
                  <BookCheck className="w-5 h-5 text-amber-700" />
                  <span>信仰宣言：我们所信的 (Statement of Faith)</span>
                </div>
                <button
                  onClick={() => setShowCreed(!showCreed)}
                  className="text-xs text-amber-800 hover:text-amber-950 font-semibold underline"
                >
                  {showCreed ? '收起信经' : '阅读使徒信经'}
                </button>
              </div>

              {showCreed && (
                <div className="mt-4 pt-4 border-t border-amber-200/80 text-xs text-stone-700 leading-relaxed font-serif-sc space-y-2 bg-white/70 p-4 rounded-xl">
                  <p>
                    我信上帝，全能的父，创造天地的主。
                  </p>
                  <p>
                    我信我主耶稣基督，上帝独生的子；因圣灵感孕，由童贞女马利亚所生；在本丢彼拉多手下受难，被钉于十字架，受死，埋葬；降在阴间；第三天从死人中复活；升天，坐在全能父上帝的右边；将来必从那里降临，审判活人死人。
                  </p>
                  <p>
                    我信圣灵；我信圣而公之教会；我信圣徒相通；我信罪得赦免；我信身体复活；我信永生。阿们！
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pastoral Team Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-serif-sc font-bold text-stone-900">
              教牧与宣教团队 (Pastoral Team)
            </h3>
            <p className="text-stone-600 text-xs sm:text-sm mt-2">
              忠心服侍、以爱牧养的牧师与传道同工
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PASTORS_DATA.map((pastor) => (
              <div
                key={pastor.id}
                className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Avatar placeholder / portrait styling */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-700 to-stone-900 text-amber-100 flex items-center justify-center font-serif-sc text-2xl font-bold mb-4 shadow-sm">
                    {pastor.name.slice(0, 1)}
                  </div>

                  <h4 className="text-xl font-serif-sc font-bold text-stone-900 mb-0.5">
                    {pastor.name}
                  </h4>
                  <div className="text-xs font-cinzel text-amber-800 font-semibold mb-2">
                    {pastor.title}
                  </div>
                  <div className="text-xs text-stone-500 mb-4 bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-100">
                    负责事工：{pastor.role}
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                    {pastor.bio}
                  </p>
                </div>

                {/* Pastor favorite Scripture */}
                <div className="mt-4 pt-4 border-t border-stone-100 bg-amber-50/40 p-3.5 rounded-2xl border border-amber-100">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-800 mb-1">
                    <Quote className="w-3 h-3 text-amber-700" />
                    <span>座右铭金句：</span>
                  </div>
                  <p className="text-xs text-stone-600 font-serif-sc italic leading-relaxed">
                    {pastor.verse}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
