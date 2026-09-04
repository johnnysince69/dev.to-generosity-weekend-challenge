"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);

  const handleConnect = () => {
    // Simulate wallet connection
    setTimeout(() => {
      setWalletConnected(true);
    }, 500);
  };

  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-xl border-b border-white/20 shadow-[0_0_15px_rgba(255,177,196,0.1)] z-50 transition-all duration-300 hover:backdrop-blur-3xl">
      <div className="flex justify-between items-center h-20 px-4 md:px-8 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer active:scale-95 transition-transform">
          <span className="material-symbols-outlined text-primary text-3xl">bubble_chart</span>
          <span className="font-headline-md text-headline-md font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary">AURA</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          <Link className="text-on-surface-variant font-body-md hover:text-tertiary transition-all duration-400" href="/create">Start Campaign</Link>
          <Link className="text-on-surface-variant font-body-md hover:text-tertiary transition-all duration-400" href="/dashboard">Dashboard</Link>

          {walletConnected ? (
              <div className="flex items-center gap-2 bg-surface/50 border border-tertiary/30 rounded-full px-4 py-2 shadow-[0_0_10px_rgba(0,221,221,0.1)]">
                 <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
                 <span className="font-label-mono text-xs text-on-surface">0x7a...4fB2</span>
              </div>
          ) : (
              <button onClick={handleConnect} className="bg-surface/30 border border-tertiary/50 rounded-full px-6 py-3 font-button-text text-button-text text-tertiary hover:bg-tertiary/10 transition-all duration-400 active:scale-95 shadow-[0_0_10px_rgba(0,221,221,0.2)] hover:shadow-[0_0_20px_rgba(0,221,221,0.4)]">
                Connect Wallet
              </button>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
           {walletConnected ? (
              <div className="flex items-center gap-2 bg-surface/50 border border-tertiary/30 rounded-full px-3 py-1.5 shadow-[0_0_10px_rgba(0,221,221,0.1)]">
                 <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
                 <span className="font-label-mono text-xs text-on-surface">0x7a..B2</span>
              </div>
           ) : (
               <button onClick={handleConnect} className="text-tertiary text-sm border border-tertiary/50 rounded-full px-3 py-1.5">
                   Connect
               </button>
           )}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-on-surface">
            <span className="material-symbols-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isMenuOpen && (
        <nav className="md:hidden absolute top-20 left-0 w-full bg-background border-b border-white/10 p-4 flex flex-col gap-4 shadow-lg">
          <Link onClick={() => setIsMenuOpen(false)} className="text-on-surface-variant font-body-md hover:text-tertiary transition-all" href="/create">Start Campaign</Link>
          <Link onClick={() => setIsMenuOpen(false)} className="text-on-surface-variant font-body-md hover:text-tertiary transition-all" href="/dashboard">Dashboard</Link>
        </nav>
      )}
    </header>
  );
}
