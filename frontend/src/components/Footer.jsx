import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 pt-12 pb-8 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-xl font-bold text-primary mb-4">
                            <span className="text-secondary mr-1">Fake</span>Alibaba
                        </h3>
                        <p className="text-gray-500 mb-4 text-sm leading-relaxed">
                            The world's leading fake B2B e-commerce marketplace. Connect with suppliers, manufacturers, and wholesalers from around the globe.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><FaFacebook size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><FaTwitter size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><FaInstagram size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><FaLinkedin size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><FaYoutube size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-gray-800 mb-4">Customer Services</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/help" className="text-gray-500 hover:text-primary">Help Center</Link></li>
                            <li><Link to="/contact" className="text-gray-500 hover:text-primary">Contact Us</Link></li>
                            <li><Link to="/report-abuse" className="text-gray-500 hover:text-primary">Report Abuse</Link></li>
                            <li><Link to="/dispute" className="text-gray-500 hover:text-primary">Submit a Dispute</Link></li>
                            <li><Link to="/policies" className="text-gray-500 hover:text-primary">Policies & Rules</Link></li>
                        </ul>
                    </div>

                    {/* About Us */}
                    <div>
                        <h4 className="font-bold text-gray-800 mb-4">About Us</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/about" className="text-gray-500 hover:text-primary">About Fake-Alibaba</Link></li>
                            <li><Link to="/sitemap" className="text-gray-500 hover:text-primary">Sitemap</Link></li>
                            <li><Link to="/partners" className="text-gray-500 hover:text-primary">Partners</Link></li>
                            <li><Link to="/blog" className="text-gray-500 hover:text-primary">Blog</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-bold text-gray-800 mb-4">Trade Alert</h4>
                        <p className="text-gray-500 text-sm mb-4">Subscribe to our newsletter to get updates on new products and promotions.</p>
                        <form className="flex flex-col space-y-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="input-field text-sm"
                            />
                            <button type="button" className="btn btn-primary text-sm py-2">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Fake-Alibaba.com. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link to="/privacy" className="hover:text-gray-600">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-gray-600">Terms of Use</Link>
                        <Link to="/legal" className="hover:text-gray-600">Legal User Guide</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
