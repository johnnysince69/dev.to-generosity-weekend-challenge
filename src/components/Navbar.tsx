import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-xl border-b border-white/20 shadow-[0_0_15px_rgba(255,177,196,0.1)] z-50 transition-all duration-300 hover:backdrop-blur-3xl">
      <div className="flex justify-between items-center h-20 px-4 md:px-8 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer active:scale-95 transition-transform">
          <span className="material-symbols-outlined text-primary text-3xl" data-icon="bubble_chart">bubble_chart</span>
          <span className="font-headline-md text-headline-md font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary">AURA</span>
        </Link>
        <nav className="hidden md:flex gap-8">
          <Link className="text-on-surface-variant font-body-md hover:text-tertiary transition-all duration-400" href="/create">Start Campaign</Link>
          <Link className="text-on-surface-variant font-body-md hover:text-tertiary transition-all duration-400" href="/dashboard">Dashboard</Link>
        </nav>
        <button className="bg-surface/30 border border-tertiary/50 rounded-full px-6 py-3 font-button-text text-button-text text-tertiary hover:bg-tertiary/10 transition-all duration-400 active:scale-95 shadow-[0_0_10px_rgba(0,221,221,0.2)] hover:shadow-[0_0_20px_rgba(0,221,221,0.4)]">
          Connect Wallet
        </button>
      </div>
    </header>
  );
}
