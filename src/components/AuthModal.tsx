import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  KeyRound,
  UserCheck,
  Sparkles,
  ArrowRight,
  Mail,
  Lock,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DEMO_CREDENTIALS } from '../data/mockData';
import type { UserRole, LocationHub } from '../types';

const DEMO_KEYS: Array<'farmer' | 'operator' | 'buyer' | 'admin'> = ['farmer', 'operator', 'buyer', 'admin'];

export const AuthModal: React.FC = () => {
  const { 
    authModalOpen, 
    setAuthModalOpen, 
    loginWithCredentials, 
    switchDemoRole, 
    registerUser, 
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'demo' | 'signin' | 'register'>('demo');
  const [authMethod, setAuthMethod] = useState<'password' | 'otp'>('password');
  
  // Sign in fields
  const [identifier, setIdentifier] = useState('sirisha@agricool.in');
  const [password, setPassword] = useState('farmer123');
  const [otpCode, setOtpCode] = useState('1234');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // Register fields
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regRole, setRegRole] = useState<UserRole>('Farmer');
  const [regLocation, setRegLocation] = useState<LocationHub>('Bhimavaram');
  const [regBusiness, setRegBusiness] = useState('');
  const [regGovtId, setRegGovtId] = useState('');

  if (!authModalOpen) return null;

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const secret = authMethod === 'password' ? password : otpCode;
    const res = loginWithCredentials(identifier, secret, authMethod);
    if (!res.success) {
      setErrorMessage(res.message);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regPhone.trim()) {
      showToast('Please enter your full name and phone number', 'warning');
      return;
    }
    registerUser({
      name: regName,
      phone: regPhone,
      email: regEmail || `${regPhone.replace(/\D/g, '')}@agricool.in`,
      role: regRole,
      location: regLocation,
      farmOrBusinessName: regBusiness || `${regName}'s Farm`,
      aadhaarOrGst: regGovtId || 'Pending KYC',
    });
  };

  const loadPresetCredentials = (key: 'farmer' | 'operator' | 'buyer' | 'admin') => {
    const cred = DEMO_CREDENTIALS[key];
    setIdentifier(cred.credentials.email);
    setPassword(cred.credentials.password);
    setOtpCode(cred.credentials.otp);
    setActiveTab('signin');
    showToast(`Loaded ${cred.user.name}'s credentials into form`, 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-green-700 px-6 sm:px-8 pt-6 pb-5 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                <ShieldCheck className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight">AgriCool Access & Credentials</h3>
                <p className="text-xs text-emerald-100">Multi-Role Decentralized Cold Network</p>
              </div>
            </div>
            <button
              onClick={() => setAuthModalOpen(false)}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-5 bg-black/20 p-1 rounded-xl text-xs sm:text-sm font-semibold">
            <button
              onClick={() => { setActiveTab('demo'); setErrorMessage(''); }}
              className={`flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'demo'
                  ? 'bg-white text-emerald-900 shadow-sm font-bold'
                  : 'text-emerald-100 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>1-Click Personas</span>
            </button>

            <button
              onClick={() => { setActiveTab('signin'); setErrorMessage(''); }}
              className={`flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'signin'
                  ? 'bg-white text-emerald-900 shadow-sm font-bold'
                  : 'text-emerald-100 hover:text-white'
              }`}
            >
              <KeyRound className="w-4 h-4" />
              <span>Sign In</span>
            </button>

            <button
              onClick={() => { setActiveTab('register'); setErrorMessage(''); }}
              className={`flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'register'
                  ? 'bg-white text-emerald-900 shadow-sm font-bold'
                  : 'text-emerald-100 hover:text-white'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Join Network</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">

          {/* TAB 1: 1-CLICK VERIFIED DEMO CREDENTIALS */}
          {activeTab === 'demo' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Select a Verified Demo Persona</h4>
                  <p className="text-xs text-slate-500">Instant login for system testing, client review, and role demonstration.</p>
                </div>
                <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200">
                  Pre-configured
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                {DEMO_KEYS.map((key) => {
                  const item = DEMO_CREDENTIALS[key];
                  return (
                    <div
                      key={key}
                      onClick={() => switchDemoRole(key)}
                      className="group relative bg-slate-50 hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-300 rounded-2xl p-4 cursor-pointer transition-all hover:shadow-md transform hover:-translate-y-0.5"
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={item.user.avatarUrl}
                          alt={item.user.name}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-xs shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-bold text-slate-900 text-sm truncate group-hover:text-emerald-800 transition-colors">
                              {item.user.name}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
                              {item.user.role}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 truncate mt-0.5">
                            {item.user.location} • {item.user.farmOrBusinessName}
                          </p>
                          <p className="text-[11px] text-slate-600 line-clamp-2 mt-1.5 leading-relaxed">
                            {item.description}
                          </p>

                          <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-[11px]">
                            <span className="text-slate-400 font-mono text-[10px]">
                              {item.credentials.email}
                            </span>
                            <span className="text-emerald-700 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                              Login <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 flex items-center justify-between text-xs text-amber-900">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Looking to test password/OTP forms directly? Switch to the <strong>Sign In</strong> tab.</span>
                </div>
                <button
                  onClick={() => setActiveTab('signin')}
                  className="font-bold text-amber-800 hover:text-amber-900 underline shrink-0 ml-2"
                >
                  Go to Sign In
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: CREDENTIAL SIGN IN (PASSWORD OR OTP) */}
          {activeTab === 'signin' && (
            <div className="space-y-5">
              {errorMessage && (
                <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2.5 text-xs text-red-800">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Fast presets pill bar */}
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-slate-500">Quick-Fill Demo Credentials:</span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => loadPresetCredentials('farmer')}
                    className="text-[11px] px-2.5 py-1 bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-slate-700 font-semibold rounded-lg border border-slate-200 transition-colors"
                  >
                    🌱 Farmer (Sirisha)
                  </button>
                  <button
                    type="button"
                    onClick={() => loadPresetCredentials('operator')}
                    className="text-[11px] px-2.5 py-1 bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-slate-700 font-semibold rounded-lg border border-slate-200 transition-colors"
                  >
                    🏢 Operator (Venkata Rao)
                  </button>
                  <button
                    type="button"
                    onClick={() => loadPresetCredentials('buyer')}
                    className="text-[11px] px-2.5 py-1 bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-slate-700 font-semibold rounded-lg border border-slate-200 transition-colors"
                  >
                    🛒 Wholesale Buyer
                  </button>
                  <button
                    type="button"
                    onClick={() => loadPresetCredentials('admin')}
                    className="text-[11px] px-2.5 py-1 bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-slate-700 font-semibold rounded-lg border border-slate-200 transition-colors"
                  >
                    ⚡ SuperAdmin
                  </button>
                </div>
              </div>

              {/* Authentication Mode Switcher */}
              <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setAuthMethod('password')}
                  className={`flex-1 py-2 rounded-lg transition-all ${
                    authMethod === 'password' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600'
                  }`}
                >
                  Password Login
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMethod('otp')}
                  className={`flex-1 py-2 rounded-lg transition-all ${
                    authMethod === 'otp' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600'
                  }`}
                >
                  4-Digit Mobile OTP
                </button>
              </div>

              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email address or Mobile Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="e.g. sirisha@agricool.in or 9848023456"
                      required
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  </div>
                </div>

                {authMethod === 'password' ? (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Security Password
                      </label>
                      <button
                        type="button"
                        onClick={() => showToast('Demo credentials passwords are pre-filled or use: farmer123 / hubops456', 'info')}
                        className="text-xs text-emerald-700 hover:underline font-semibold"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium"
                      />
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        SMS OTP Code
                      </label>
                      <span className="text-[11px] text-emerald-700 font-semibold">
                        Demo OTP: 1234
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        maxLength={4}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder="1234"
                        className="w-full text-center tracking-widest text-lg font-bold py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setOtpSent(true);
                          showToast('Simulated OTP [1234] dispatched to mobile number.', 'info');
                        }}
                        className="text-xs whitespace-nowrap bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold px-3 py-3 rounded-xl transition-colors"
                      >
                        {otpSent ? 'Resend' : 'Get OTP'}
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-600 font-medium">
                    <input type="checkbox" defaultChecked className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                    <span>Keep me logged in on this browser</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-700/20 transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <span>Authenticate & Open Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: REGISTER / JOIN NETWORK */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Your Operational Role
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['Farmer', 'Operator', 'Vendor', 'Aggregator'] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRegRole(r)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        regRole === r
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-500/20'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-base mb-0.5">
                        {r === 'Farmer' ? '🌱' : r === 'Operator' ? '🏢' : r === 'Vendor' ? '🛒' : '📦'}
                      </div>
                      <div className="text-xs font-bold">{r}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Full Legal Name
                  </label>
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Ramesh Varma"
                    required
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Primary Mobile (OTP Verified)
                  </label>
                  <input
                    type="tel"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+91 98480 00000"
                    required
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="e.g. ramesh.farmer@agricool.in"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Nearest Cold Hub
                  </label>
                  <select
                    value={regLocation}
                    onChange={(e) => setRegLocation(e.target.value as LocationHub)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  >
                    <option value="Bhimavaram">Bhimavaram Hub (West Godavari)</option>
                    <option value="Vijayawada">Vijayawada Hub (Gollapudi)</option>
                    <option value="Guntur">Guntur Hub (Mirchi Yard)</option>
                    <option value="Hyderabad">Hyderabad Hub (Kothapet/Shamshabad)</option>
                    <option value="Other">Other Region / Cluster</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Farm / Enterprise Name
                  </label>
                  <input
                    type="text"
                    value={regBusiness}
                    onChange={(e) => setRegBusiness(e.target.value)}
                    placeholder="e.g. Green Valley Farm (3 Acres)"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Aadhaar / Farmer ID / GSTIN (KYC Verification)
                </label>
                <input
                  type="text"
                  value={regGovtId}
                  onChange={(e) => setRegGovtId(e.target.value)}
                  placeholder="e.g. 12-digit Aadhaar UID or GST number"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-700/20 transition-all flex items-center justify-center gap-2 text-sm mt-2"
              >
                <span>Register & Issue Digital Cold Storage Card</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
