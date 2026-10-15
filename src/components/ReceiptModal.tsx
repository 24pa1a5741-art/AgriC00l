import React from 'react';
import {
  X,
  Printer,
  Download,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ReceiptModal: React.FC = () => {
  const { receiptModalBooking, setReceiptModalBooking, showToast } = useApp();

  if (!receiptModalBooking) return null;

  const booking = receiptModalBooking;

  const handlePrint = () => {
    window.print();
    showToast('Sent official warehouse receipt to printer', 'info');
  };

  const handleDownloadPdf = () => {
    showToast(`Warehouse Deposit Receipt for ${booking.id} downloaded successfully`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Receipt Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-black text-lg">
                AC
              </div>
              <div>
                <h3 className="text-lg font-bold tracking-tight">Electronic Warehouse Deposit Receipt</h3>
                <p className="text-xs text-slate-400">AgriCool Decentralized Cold Chain Network</p>
              </div>
            </div>
            <button
              onClick={() => setReceiptModalBooking(null)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Receipt Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Metadata bar */}
          <div className="flex items-center justify-between border-b border-dashed border-slate-300 pb-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Consignment ID</span>
              <strong className="text-xl font-mono text-emerald-800">{booking.id}</strong>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Inward Date</span>
              <span className="text-xs font-semibold text-slate-700">
                {new Date(booking.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </div>

          {/* Consignor / Farmer details */}
          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Depositor / Farmer</span>
              <div className="font-bold text-slate-900 text-sm">{booking.customerName}</div>
              <div className="text-slate-500 mt-0.5">{booking.phone}</div>
              <div className="text-slate-500">{booking.location} Hub Cluster</div>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Allocated Cold Bay</span>
              <div className="font-bold text-emerald-700 text-sm">{booking.storageUnit}</div>
              <div className="text-slate-500 mt-0.5 font-mono">{booking.batchCode || 'LOT-VERIFIED-01'}</div>
              <div className="text-slate-500">Solar Continuous Power</div>
            </div>
          </div>

          {/* Commodity & Climate specifications */}
          <div className="border border-slate-200 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 border-b border-slate-100 pb-2">
              <span>Produce & Storage Specification</span>
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px] uppercase font-bold">
                {booking.status}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 block font-semibold">Produce Type</span>
                <strong className="text-slate-800 text-sm">{booking.produce}</strong>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 block font-semibold">Quantity</span>
                <strong className="text-slate-800 text-sm">{booking.crates} Crates</strong>
                <span className="text-[10px] text-slate-500 block">~{booking.crates * 22} kg</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 block font-semibold">Core Temp</span>
                <strong className="text-emerald-700 text-sm">{booking.temperature}°C</strong>
                <span className="text-[10px] text-slate-500 block">Automated IoT</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 block font-semibold">Duration</span>
                <strong className="text-slate-800 text-sm">{booking.durationDays} Days</strong>
                <span className="text-[10px] text-slate-500 block">Pay-as-you-go</span>
              </div>
            </div>
          </div>

          {/* Pricing & Billing calculation */}
          <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-4 text-xs space-y-2">
            <div className="flex justify-between text-slate-600">
              <span>Storage Fee ({booking.crates} crates × {booking.durationDays} days @ ₹500/day):</span>
              <span className="font-semibold text-slate-800">
                ₹{(booking.crates * booking.durationDays * 500).toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Logistics & Electric Cargo Dispatch:</span>
              <span className="font-semibold text-slate-800">
                {booking.pickupRequired ? 'Included (Zero Extra Pilot Fee)' : 'Self-Drop'}
              </span>
            </div>
            <div className="border-t border-emerald-300/60 pt-2 flex justify-between items-center text-sm font-bold text-slate-900">
              <span>Total Amount Payable:</span>
              <span className="text-emerald-800 text-base">
                ₹{booking.totalAmount.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Digital Signature & Barcode representation */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Hub In-Charge Seal</div>
              <div className="text-xs font-bold text-slate-800 mt-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Digitally Certified by AgriCool Hub Ops</span>
              </div>
            </div>

            {/* Simulated barcode */}
            <div className="flex flex-col items-end">
              <div className="flex gap-0.5 h-7">
                <div className="w-1 bg-slate-900" />
                <div className="w-0.5 bg-slate-900" />
                <div className="w-1.5 bg-slate-900" />
                <div className="w-0.5 bg-slate-900" />
                <div className="w-2 bg-slate-900" />
                <div className="w-1 bg-slate-900" />
                <div className="w-0.5 bg-slate-900" />
                <div className="w-1.5 bg-slate-900" />
                <div className="w-1 bg-slate-900" />
              </div>
              <span className="text-[9px] font-mono text-slate-500 mt-0.5">{booking.id}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Official Receipt</span>
            </button>
            <button
              onClick={handleDownloadPdf}
              className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-emerald-700/20"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
