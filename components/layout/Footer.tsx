import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="text-white font-semibold bg-gradient-to-r from-pink-600 to-rose-500 relative overflow-hidden">
      {/* Subtle background grid pattern to match the overall theme's depth */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Brand */}
          <div className="text-center md:text-left group">
            <p className="text-white font-black text-2xl tracking-wide transition-transform duration-300 group-hover:scale-105" style={{ fontFamily: "'Catamaran', sans-serif" }}>
              Maharani Rizka
            </p>
            <p className="text-pink-100 text-sm mt-1.5 font-medium tracking-wide">
              English Educator &amp; Curriculum Specialist
            </p>
          </div>

          {/* Nav Links */}
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-pink-100">
            {['Tentang', 'Pengalaman', 'Keahlian', 'Portofolio', 'Kontak'].map((item, i) => {
              const hrefs = ['#about', '#experience', '#skills', '#portfolio', '#contact'];
              return (
                <li key={item}>
                  <a 
                    href={hrefs[i]} 
                    className="relative py-1 hover:text-white transition-colors duration-300 group/link"
                  >
                    {item}
                    {/* Animated Underline Effect */}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover/link:w-full rounded-full"></span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a 
              href="#contact"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white hover:text-pink-600 flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1 text-white"
              aria-label="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedinIn} className="w-4 h-4" />
            </a>
            <a 
              href="#contact"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white hover:text-pink-600 flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1 text-white"
              aria-label="GitHub"
            >
              <FontAwesomeIcon icon={faGithub} className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Separator */}
        <hr className="border-white/20 my-8" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-sm text-pink-100">
          <p>
            &copy; {year} Maharani Rizka Ramadhani Wijaya. Made with{' '}
            <FontAwesomeIcon icon={faHeart} className="w-3.5 h-3.5 text-white animate-pulse mx-0.5 drop-shadow-md" />
          </p>
        </div>
      </div>
    </footer>
  );
}