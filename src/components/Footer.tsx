export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-surface/50 backdrop-blur-md pt-stack-lg pb-stack-md px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary opacity-50" data-icon="bubble_chart">bubble_chart</span>
                <span className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-widest">Aura Network</span>
            </div>
            <div className="flex gap-6 text-sm text-on-surface-variant">
                <a href="#" className="hover:text-primary transition-colors">Protocol</a>
                <a href="#" className="hover:text-primary transition-colors">Transparency</a>
                <a href="#" className="hover:text-primary transition-colors">Terms</a>
            </div>
        </div>
    </footer>
  );
}
