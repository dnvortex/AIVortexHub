import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-darkBg-card py-12 border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/">
              <a className="flex items-center mb-6">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  <span className="text-xl font-bold">DN</span>
                </div>
                <span className="ml-2 text-xl font-inter font-bold">VORTEX</span>
              </a>
            </Link>
            <p className="text-gray-400 mb-6">
              Building the future with AI-powered solutions and education for businesses and developers worldwide.
            </p>
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} DN VORTEX. All rights reserved.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              <li><Link href="/services"><a className="text-gray-400 hover:text-white transition">AI Bot Development</a></Link></li>
              <li><Link href="/services"><a className="text-gray-400 hover:text-white transition">Custom AI Applications</a></Link></li>
              <li><Link href="/services"><a className="text-gray-400 hover:text-white transition">Website Development</a></Link></li>
              <li><Link href="/services"><a className="text-gray-400 hover:text-white transition">AI Templates</a></Link></li>
              <li><Link href="/services"><a className="text-gray-400 hover:text-white transition">AI Consulting</a></Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Resources</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Documentation</a></li>
              <li><Link href="/courses"><a className="text-gray-400 hover:text-white transition">AI Learning Hub</a></Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">API Reference</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Community Forum</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Careers</a></li>
              <li><Link href="/contact"><a className="text-gray-400 hover:text-white transition">Contact</a></Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a></li>
            </ul>
            <div className="mt-6">
              <p className="text-gray-400">
                <strong>Address:</strong><br />
                253 Albany Rd, Pelham<br />
                Pietermaritzburg, 3201
              </p>
              <p className="text-gray-400 mt-2">
                <strong>Phone:</strong><br />
                0638225148
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
