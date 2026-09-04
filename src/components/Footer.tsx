export default function Footer() {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Aura. Powered by Generosity.
          </p>
          <div className="flex space-x-6">
            <span className="text-gray-400 text-sm">Built for DEV Weekend Challenge</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
