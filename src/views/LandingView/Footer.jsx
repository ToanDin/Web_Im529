import React from 'react';

export default function Footer() {
  return (
    <footer className="max-w-7xl mx-auto px-6 border-t border-white/5 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 uppercase tracking-wider pb-10">
      <div className="flex items-center gap-2">
        <span className="font-serif font-bold text-white tracking-widest text-sm">IM 529</span>
        <span>&copy; {new Date().getFullYear()} All Rights Reserved.</span>
      </div>
      <div className="flex gap-6">
        <a href="https://www.facebook.com/profile.php?id=61581848043440" target="_blank" rel="noopener noreferrer" className="hover:text-brand-purple-light transition-colors">
          Facebook
        </a>
        <a href="https://www.instagram.com/im529.bdn?fbclid=IwY2xjawR6QEpleHRuA2FlbQIxMABicmlkETFzM3kyczZadnZMYnJIVGRYc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHtujXZw_jou38YI9J8ZWXnw4LqnuSMkbzvxEinGKc2VYes9PfaQ0K0uf-_l1_aem_rNg-Ed6WlMpVLdMilmT0rQ" target="_blank" rel="noopener noreferrer" className="hover:text-brand-purple-light transition-colors">
          Instagram
        </a>
        <a href="#admin" className="hover:text-brand-purple-light transition-colors">
          Admin Console
        </a>
      </div>
    </footer>
  );
}
