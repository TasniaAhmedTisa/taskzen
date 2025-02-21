import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className='w-full'>
            <footer className="w-full bg-gray-900 text-white py-10 mt-10 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand Info */}
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold mb-4">TaskZen</h2>
            <p className="text-sm leading-relaxed">
              Empowering you to organize your tasks and boost productivity. Stay on top of your goals with ease.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex justify-center sm:justify-start space-x-6 text-2xl">
              <a href="#" aria-label="GitHub" className="hover:text-blue-400 transition-colors"><FaGithub /></a>
              <a href="#" aria-label="LinkedIn" className="hover:text-blue-400 transition-colors"><FaLinkedin /></a>
              <a href="#" aria-label="Twitter" className="hover:text-blue-400 transition-colors"><FaTwitter /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm">
          © {new Date().getFullYear()} TaskZen. All rights reserved.
        </div>
      </footer>
        </div>
    );
};

export default Footer;