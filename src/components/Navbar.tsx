import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  Calendar,
  Menu,
  X,
  MessageCircle,
  Activity,
  ChevronDown,
  ChevronRight,
  Ear,
  Wind,
  Sparkles,
  Smile,
  ShieldAlert,
  Compass,
  Moon,
  Stethoscope,
  ArrowRight,
} from 'lucide-react';
import { DOCTOR_INFO, SERVICES_DATA } from '../data/medicalData';
import { PageType } from '../types';

interface NavbarProps {
  currentPage: PageType;
  onNavigate: (page: PageType, serviceId?: string) => void;
  onOpenBooking: (serviceName?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenBooking,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close desktop dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks: { id: PageType; label: string; hasDropdown?: boolean }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services', hasDropdown: true },
    { id: 'contact', label: 'Contact' },
  ];

  const getHref = (page: PageType, serviceId?: string) => {
    if (page === 'service-detail' && serviceId) return `/services/${serviceId}`;
    if (page === 'services') return '/services';
    if (page === 'about') return '/about';
    if (page === 'contact') return '/contact';
    return '/';
  };

  const handleNavClick = (page: PageType, serviceId?: string) => {
    onNavigate(page, serviceId);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Ear': return <Ear className="w-4 h-4 text-blue-600" />;
      case 'Wind': return <Wind className="w-4 h-4 text-blue-600" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4 text-blue-600" />;
      case 'Smile': return <Smile className="w-4 h-4 text-blue-600" />;
      case 'ShieldAlert': return <ShieldAlert className="w-4 h-4 text-blue-600" />;
      case 'Compass': return <Compass className="w-4 h-4 text-blue-600" />;
      case 'Moon': return <Moon className="w-4 h-4 text-blue-600" />;
      default: return <Activity className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-200">
      {/* Main Navigation Bar */}
      <nav
        className={`w-full bg-white transition-all duration-200 ${
          isScrolled
            ? 'shadow-xs py-3.5 border-b border-slate-100'
            : 'py-4 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Doctor Identity */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            id="brand-logo-btn"
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-sm group-hover:border-blue-500 group-hover:shadow-md transition-all shrink-0 flex items-center justify-center">
              <img
                src={DOCTOR_INFO.clinicLogo}
                alt="Dr. Hasnain Haider ENT Specialist Logo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="block text-base sm:text-lg font-extrabold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                {DOCTOR_INFO.name}
              </span>
              <span className="block text-[11px] font-bold text-blue-600 tracking-wide uppercase mt-0.5">
                ENT SPECIALIST & SURGEON
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              if (link.id === 'services') {
                return (
                  <div
                    key={link.id}
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={() => setServicesDropdownOpen(true)}
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                  >
                    <a
                      href="/services"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick('services');
                      }}
                      id="nav-link-services"
                      className={`text-sm font-medium transition-colors inline-flex items-center gap-1 py-2 ${
                        currentPage === 'services' || currentPage === 'service-detail'
                          ? 'text-blue-600 font-semibold'
                          : 'text-slate-700 hover:text-blue-600'
                      }`}
                    >
                      <span>Services</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          servicesDropdownOpen ? 'rotate-180 text-blue-600' : 'opacity-60'
                        }`}
                      />
                    </a>

                    {/* Services Dropdown Menu */}
                    {servicesDropdownOpen && (
                      <div className="absolute left-1/2 -translate-x-1/2 top-full pt-1.5 w-72 z-50 animate-in fade-in zoom-in-95 duration-150">
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-2 space-y-1">
                          <a
                            href="/services"
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavClick('services');
                            }}
                            id="nav-dropdown-all-services"
                            className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2">
                              <Stethoscope className="w-4 h-4 text-blue-600" />
                              <span>All Services Overview</span>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>

                          <div className="h-px bg-slate-100 my-1" />

                          <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Separate Treatment Pages
                          </div>

                          {SERVICES_DATA.map((srv) => (
                            <a
                              key={srv.id}
                              href={`/services/${srv.id}`}
                              onClick={(e) => {
                                e.preventDefault();
                                handleNavClick('service-detail', srv.id);
                              }}
                              id={`nav-dropdown-${srv.id}`}
                              className="w-full text-left px-3 py-2 rounded-xl text-xs text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors flex items-center justify-between group"
                            >
                              <div className="flex items-center gap-2.5 truncate">
                                {renderServiceIcon(srv.iconName)}
                                <span className="font-medium truncate">{srv.title}</span>
                              </div>
                              <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-blue-600 shrink-0" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <a
                  key={link.id}
                  href={getHref(link.id)}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.id);
                  }}
                  id={`nav-link-${link.id}`}
                  className={`text-sm font-medium transition-colors inline-flex items-center gap-1 ${
                    currentPage === link.id
                      ? 'text-blue-600 font-semibold'
                      : 'text-slate-700 hover:text-blue-600'
                  }`}
                >
                  <span>{link.label}</span>
                </a>
              );
            })}
          </div>

          {/* Desktop Action: Clean Blue "Call Now" Pill Button */}
          <div className="hidden sm:flex items-center">
            <a
              href={DOCTOR_INFO.phoneTel}
              id="header-call-btn"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-xs active:scale-95"
            >
              <Phone className="w-4 h-4" />
              <span>Call Now</span>
            </a>
          </div>

          {/* Mobile Actions & Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={DOCTOR_INFO.phoneTel}
              id="mobile-nav-call-btn"
              aria-label="Call Now"
              className="px-3.5 py-1.5 rounded-full text-white bg-blue-600 hover:bg-blue-700 shadow-xs text-xs font-semibold flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Now</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle-btn"
              aria-label="Toggle Menu"
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none border border-slate-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
            <div className="space-y-1">
              {navLinks.map((link) => {
                if (link.id === 'services') {
                  return (
                    <div key={link.id} className="space-y-1">
                      <div className="flex items-center justify-between w-full rounded-xl">
                        <a
                          href="/services"
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick('services');
                          }}
                          id="mobile-link-services"
                          className={`flex-1 text-left px-3 py-2.5 text-sm font-semibold rounded-xl ${
                            currentPage === 'services' || currentPage === 'service-detail'
                              ? 'bg-blue-50 text-blue-700'
                              : 'text-slate-800 hover:bg-slate-50'
                          }`}
                        >
                          Services
                        </a>
                        <button
                          onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                          id="mobile-toggle-services-sub"
                          aria-label="Toggle Services Submenu"
                          className="p-2 text-slate-500 hover:text-blue-600"
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                              mobileServicesOpen ? 'rotate-180 text-blue-600' : ''
                            }`}
                          />
                        </button>
                      </div>

                      {/* Expanded mobile service sub-links */}
                      {mobileServicesOpen && (
                        <div className="pl-3 pr-1 py-1 space-y-1 border-l-2 border-blue-100 ml-3">
                          <a
                            href="/services"
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavClick('services');
                            }}
                            className="w-full text-left px-3 py-2 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-lg flex items-center justify-between"
                          >
                            <span>All Services Overview</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                          {SERVICES_DATA.map((srv) => (
                            <a
                              key={srv.id}
                              href={`/services/${srv.id}`}
                              onClick={(e) => {
                                e.preventDefault();
                                handleNavClick('service-detail', srv.id);
                              }}
                              id={`mobile-sub-${srv.id}`}
                              className="w-full text-left px-3 py-1.5 text-xs text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg flex items-center gap-2"
                            >
                              {renderServiceIcon(srv.iconName)}
                              <span className="truncate">{srv.title}</span>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <a
                    key={link.id}
                    href={getHref(link.id)}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.id);
                    }}
                    id={`mobile-link-${link.id}`}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold ${
                      currentPage === link.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </a>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <a
                href={DOCTOR_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="mobile-drawer-whatsapp-btn"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl font-semibold text-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Appointment</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                id="mobile-drawer-schedule-btn"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs transition-colors shadow-xs"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Consultation</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
