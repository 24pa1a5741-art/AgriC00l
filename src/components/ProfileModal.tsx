import React, { useState } from 'react';
import {
  X,
  QrCode,
  Download,
  Printer,
  KeyRound,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DEMO_CREDENTIALS } from '../data/mockData';

const DEMO_KEYS: Array<'farmer' | 'operator' | 'buyer' | 'admin'> = ['farmer', 'operator', 'buyer', 'admin'];

export const ProfileModal: React.FC = () => {
  const { 
    currentUser, 
    profileModalOpen, 
    setProfileModalOpen, 
    updateUserProfile, 
    switchDemoRole, 
    logout,
    showToast 
  } = useApp();

  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [businessName, setBusinessName] = useState(currentUser?.farmOrBusinessName || '');
  const [activeTab, setActiveTab] = useState<'pass' | 'credentials' | 'roles'>('pass');

  if (!profileModalOpen || !currentUser) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      phone,
      email,
      farmOrBusinessName: businessName,
    });
  };

  const handlePrintCard = () => {
    window.print();
    showToast('Sent Digital Storage Pass to printer dialog', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header banner */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-700 p-6 text-white relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256'}
                  alt={currentUser.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-white/40 shadow-md"
                />
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-white flex items-center justify-center text-[10px] text-emerald-950 font-bold" title="KYC Verified">
                  ✓
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold tracking-tight text-white">{currentUser.name}</h3>
                  <span className="bg-emerald-500/30 text-emerald-100 border border-emerald-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {currentUser.role}
                  </span>
                </div>
                <p className="text-xs text-emerald-200 mt-0.5">
                  {currentUser.location} Hub • Member since {currentUser.memberSince}
                </p>
              </div>
            </div>

            <button
              onClick={() => setProfileModalOpen(false)}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sub tabs */}
          <div className="flex items-center gap-2 mt-5 bg-black/20 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setActiveTab('pass')}
              className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'pass' ? 'bg-white text-emerald-950 shadow-xs font-bold' : 'text-emerald-100 hover:text-white'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Digital Pass</span>
            </button>
            <button
              onClick={() => setActiveTab('credentials')}
              className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'credentials' ? 'bg-white text-emerald-950 shadow-xs font-bold' : 'text-emerald-100 hover:text-white'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Credentials & Security</span>
            </button>
            <button
              onClick={() => setActiveTab('roles')}
              className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'roles' ? 'bg-white text-emerald-950 shadow-xs font-bold' : 'text-emerald-100 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Switch Persona</span>
            </button>
          </div>
        </div>

        {/* Modal content */}
        <div className="p-6 max-h-[72vh] overflow-y-auto">

          {/* TAB 1: DIGITAL AGRI-PASS & ID CARD */}
          {activeTab === 'pass' && (
            <div className="space-y-4">
              <div className="border-2 border-emerald-500/30 rounded-2xl p-5 bg-gradient-to-br from-emerald-50/50 via-white to-slate-50 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-start justify-between border-b border-slate-200/80 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-700 flex items-center justify-center text-white text-xs font-black">
                      AC
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 tracking-tight">AgriCool Digital Cold Pass</div>
                      <div className="text-[10px] text-emerald-700 font-semibold uppercase">Authorized Consignee</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-slate-400">ID: {currentUser.id.toUpperCase()}</div>
                    <div className="text-[10px] font-bold text-emerald-600">● KYC Active</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 items-center">
                  <div className="col-span-2 space-y-1.5 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">Holder</span>
                      <strong className="text-slate-900 text-sm">{currentUser.name}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">Farm / Org</span>
                      <span className="text-slate-700">{currentUser.farmOrBusinessName || 'Direct Producer'}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Designated Hub</span>
                        <strong className="text-emerald-700">{currentUser.location}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Prepaid Balance</span>
                        <strong className="text-slate-900">₹{currentUser.walletBalance.toLocaleString('en-IN')}</strong>
                      </div>
                    </div>
                  </div>

                  {/* QR Code Simulation */}
                  <div className="flex flex-col items-center justify-center bg-white p-2 rounded-xl border border-slate-200 shadow-2xs">
                    <div className="w-20 h-20 bg-slate-900 rounded-lg p-1.5 flex flex-col justify-between">
                      <div className="flex justify-between">
                        <div className="w-4 h-4 bg-white rounded-xs border-2 border-slate-900" />
                        <div className="w-4 h-4 bg-white rounded-xs border-2 border-slate-900" />
                      </div>
                      <div className="grid grid-cols-4 gap-0.5 px-0.5">
                        <div className="h-1 bg-white" />
                        <div className="h-1 bg-slate-900" />
                        <div className="h-1 bg-white" />
                        <div className="h-1 bg-emerald-400" />
                      </div>
                      <div className="flex justify-between">
                        <div className="w-4 h-4 bg-white rounded-xs border-2 border-slate-900" />
                        <div className="w-2 h-2 bg-emerald-400 self-end" />
                      </div>
                    </div>
                    <span className="text-[9px] font-mono text-slate-500 mt-1">Scan at Hub Gate</span>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Rates: ₹500/crate-day</span>
                  <span>Govt Ref: {currentUser.aadhaarOrGst || 'Verified'}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintCard}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Pass Card</span>
                </button>
                <button
                  onClick={() => showToast('Digital Pass downloaded as PDF format', 'success')}
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Pass</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: CREDENTIALS & PROFILE EDIT */}
          {activeTab === 'credentials' && (
            <div className="space-y-4">
              <form onSubmit={handleSaveProfile} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Farm / Business Entity
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">Security Credentials</span>
                    <button
                      type="button"
                      onClick={() => showToast('Password reset link sent to registered email', 'info')}
                      className="text-emerald-700 font-semibold hover:underline"
                    >
                      Update Password
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>Two-Factor Authentication (SMS OTP)</span>
                    <span className="font-bold text-emerald-600">Active</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setProfileModalOpen(false);
                    }}
                    className="text-xs text-red-600 hover:text-red-700 font-bold px-3 py-2 rounded-lg hover:bg-red-50"
                  >
                    Log Out of Session
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md shadow-emerald-700/20"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: PERSONA SWITCHER */}
          {activeTab === 'roles' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500">
                Instantly test different operational views by switching to a verified credential persona:
              </p>
              <div className="space-y-2">
                {DEMO_KEYS.map((key) => {
                  const item = DEMO_CREDENTIALS[key];
                  const isCurrent = currentUser.email.toLowerCase() === item.user.email.toLowerCase();
                  return (
                    <div
                      key={key}
                      onClick={() => {
                        switchDemoRole(key);
                        setProfileModalOpen(false);
                      }}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isCurrent
                          ? 'border-emerald-600 bg-emerald-50/70 shadow-xs'
                          : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={item.user.avatarUrl}
                          alt={item.user.name}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                        />
                        <div>
                          <div className="text-xs font-bold text-slate-900">{item.user.name}</div>
                          <div className="text-[10px] text-slate-500">{item.badge} • {item.user.location}</div>
                        </div>
                      </div>

                      {isCurrent ? (
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                          Active Now
                        </span>
                      ) : (
                        <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                          Switch <ArrowRight className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
