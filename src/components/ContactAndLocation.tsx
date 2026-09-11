import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Car,
  Compass,
  Building,
  Send,
  CheckCircle2,
  Navigation
} from 'lucide-react';
import { useChurch } from '../context/ChurchContext';

export const ContactAndLocation: React.FC = () => {
  const { churchInfo } = useChurch();
  const [formSent, setFormSent] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    contact: '',
    type: '探访咨询',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.contact) {
      alert('请填写姓名与联系电话');
      return;
    }
    setFormSent(true);
  };

  return (
    <section id="contact" className="py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-semibold uppercase tracking-wider font-cinzel mb-3">
            <MapPin className="w-3.5 h-3.5 text-amber-700" />
            Location & Contact · 来访交通与联系
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-sc font-bold text-stone-900">
            欢迎来到教会实体园区
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            无论您是初次探访、寻求牧者信仰咨询，还是需要家庭关怀代祷，我们随时乐意为您提供帮助。
          </p>
        </div>

        {/* Location & Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left: Transportation & Campus Guide (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Campus Address Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-serif-sc font-bold text-stone-900 mb-1">
                    {churchInfo.name} · 恩光中心
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600">
                    {churchInfo.address}
                  </p>
                </div>
                <button
                  onClick={() => alert(`已复制教会地址：${churchInfo.address}\n您可在高德地图、腾讯地图或百度地图中直接搜索粘贴导航。`)}
                  className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-xl text-xs font-semibold flex items-center gap-1.5 shrink-0 border border-amber-200 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-amber-700" />
                  <span>地图导航</span>
                </button>
              </div>

              {/* Transit Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100">
                  <div className="flex items-center gap-2 text-stone-900 font-bold text-sm mb-2">
                    <Compass className="w-4 h-4 text-amber-700" />
                    <span>🚇 地铁出行</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    地铁 <strong>1号线 / 18号线</strong> “世纪城站” <strong>B出口</strong> 步行约280米即达大厦入口，乘观光电梯直达2-3楼。
                  </p>
                </div>

                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100">
                  <div className="flex items-center gap-2 text-stone-900 font-bold text-sm mb-2">
                    <Car className="w-4 h-4 text-amber-700" />
                    <span>🚗 自驾与停车</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    导航搜索“恩光中心地下停车场”，聚会信徒在教会迎宾接待台扫码登记，可享 <strong>3小时免费停车</strong> 权益。
                  </p>
                </div>
              </div>

              {/* Campus Floor Distribution */}
              <div className="mt-6 pt-6 border-t border-stone-100">
                <div className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-amber-700" />
                  <span>教会园区楼层设施指引</span>
                </div>
                <div className="space-y-2.5 text-xs text-stone-600">
                  <div className="flex items-start gap-3 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                    <span className="font-bold text-amber-800 shrink-0 w-8">3F</span>
                    <span>
                      <strong>主堂大礼堂（圣殿）</strong>（可容纳800人）、圣餐与浸礼池、圣乐清唱剧排练厅、教牧主任办公室。
                    </span>
                  </div>
                  <div className="flex items-start gap-3 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                    <span className="font-bold text-amber-800 shrink-0 w-8">2F</span>
                    <span>
                      <strong>儿童恩典乐园（主日学）</strong>、母婴哺乳室、青年光盐多功能厅、新朋友爱筵咖啡茶聚室、灵修图书馆。
                    </span>
                  </div>
                  <div className="flex items-start gap-3 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                    <span className="font-bold text-amber-800 shrink-0 w-8">1F</span>
                    <span>
                      <strong>大厦迎宾大堂</strong>、无障碍直升电梯落客区、访客登记指引处。
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Contact info box */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-stone-200 text-center shadow-xs">
                <Phone className="w-5 h-5 text-amber-700 mx-auto mb-2" />
                <div className="text-xs text-stone-400">教务咨询电话</div>
                <div className="text-sm font-semibold text-stone-900 mt-0.5">
                  {churchInfo.phone.split('/')[0]}
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-stone-200 text-center shadow-xs">
                <Mail className="w-5 h-5 text-amber-700 mx-auto mb-2" />
                <div className="text-xs text-stone-400">教会信箱</div>
                <div className="text-sm font-semibold text-stone-900 mt-0.5">
                  {churchInfo.email}
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-stone-200 text-center shadow-xs">
                <Clock className="w-5 h-5 text-amber-700 mx-auto mb-2" />
                <div className="text-xs text-stone-400">教牧接待时间</div>
                <div className="text-sm font-semibold text-stone-900 mt-0.5">
                  周二至周六 9:30-17:30
                </div>
              </div>
            </div>
          </div>

          {/* Right: Message & Pastoral Consultation Form (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs">
            <h3 className="text-xl font-serif-sc font-bold text-stone-900 mb-1">
              联络教牧 / 预约信仰咨询
            </h3>
            <p className="text-xs text-stone-500 mb-6 leading-relaxed">
              如果您有个人灵命疑难、婚姻家庭辅导需要、或希望安排教牧探访，请在此留下信息，我们将严格保护您的隐私并在一个工作日内回复。
            </p>

            {formSent ? (
              <div className="text-center py-8 bg-amber-50/50 rounded-2xl border border-amber-200 p-6">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-stone-900 mb-1">信息已安全送达教牧部</h4>
                <p className="text-xs sm:text-sm text-stone-600 mb-4 leading-relaxed">
                  感谢您的信任，{formState.name}！负责【{formState.type}】的教牧同工将尽快通过电话或微信与您取得联系。愿上帝赐福您！
                </p>
                <button
                  onClick={() => {
                    setFormSent(false);
                    setFormState({ name: '', contact: '', type: '探访咨询', message: '' });
                  }}
                  className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-medium"
                >
                  发送另一条留言
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    您的姓名 / 称谓 *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="例如：张弟兄 / 林女士"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    联系电话 / 微信 *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="以便教牧同工与您取得联系"
                    value={formState.contact}
                    onChange={(e) => setFormState({ ...formState, contact: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    咨询事项类型 *
                  </label>
                  <select
                    value={formState.type}
                    onChange={(e) => setFormState({ ...formState, type: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50"
                  >
                    <option value="初次到访咨询">初次到访与交通咨询</option>
                    <option value="信仰疑难探讨">信仰疑难与圣经解惑</option>
                    <option value="家庭婚姻辅导">家庭婚姻与亲子关系辅导</option>
                    <option value="医院病患探访">病患住院 / 孤寡长者关怀探访</option>
                    <option value="受洗报名意向">受洗班报名与信仰考核</option>
                    <option value="其他教务事项">其他事务咨询</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    留言内容描述
                  </label>
                  <textarea
                    rows={4}
                    placeholder="请简要说明您的具体需求或想向牧者倾诉的内容..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-sm font-medium transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>提交留言与预约</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
