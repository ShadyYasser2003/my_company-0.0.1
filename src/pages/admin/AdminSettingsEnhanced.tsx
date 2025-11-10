import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Save, Settings, Building2, Phone, Globe, MapPin, Home, Info, Briefcase, 
  FolderOpen, MessageSquare, CheckCircle, AlertCircle, Loader2, ChevronDown,
  ChevronRight, Mail, Facebook, Twitter, Linkedin, Github, Instagram,
  Youtube, ExternalLink, RefreshCw, Shield, Eye, Target, Award, Users,
  TrendingUp, Sparkles, Zap, Cloud, Database, Palette, Clock, MessageCircle,
  FileText, Workflow, GitBranch, Code2, Package, TestTube, FileCheck, Server,
  Upload, Trash2, GripVertical, Plus, ArrowUp, ArrowDown, Lock, Activity, Cpu
} from 'lucide-react';
import { GLOBAL_CONFIG } from '../../config/global';
import { supabase } from '../../utils/supabase/client';
import { fetchSettingsFromDB, saveSettingsToDB } from '../../utils/settingsDatabase';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { Alert, AlertDescription } from '../../components/ui/alert';

export function AdminSettingsEnhanced() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [settings, setSettings] = useState<any>(GLOBAL_CONFIG);

  // Load settings from database
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      setError('');
      
      const result = await fetchSettingsFromDB();
      
      if (result.success && result.settings) {
        // Deep merge with defaults to ensure all properties exist
        setSettings(deepMerge(GLOBAL_CONFIG, result.settings));
      } else {
        console.log('Settings not found, using defaults');
        setSettings(GLOBAL_CONFIG);
      }
    } catch (err) {
      console.error('Error loading settings:', err);
      setError('Failed to load settings. Using defaults.');
      setSettings(GLOBAL_CONFIG);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');
      
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (!session || sessionError) {
        setError('Please log in to save settings');
        setSaving(false);
        return;
      }

      const result = await saveSettingsToDB(settings);

      if (!result.success) {
        throw new Error(result.error || 'Failed to save settings');
      }
      
      setSaved(true);
      setError('');
      setTimeout(() => setSaved(false), 3000);
      
      // Reload the page to apply changes
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err: any) {
      console.error('Save error:', err);
      setError(err.message || 'Failed to save settings. Please try again.');
      setTimeout(() => setError(''), 5000);
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (path: string[], value: any) => {
    setSettings((prev: any) => {
      const newSettings = JSON.parse(JSON.stringify(prev));
      let current = newSettings;
      
      for (let i = 0; i < path.length - 1; i++) {
        if (!current[path[i]]) {
          current[path[i]] = {};
        }
        current = current[path[i]];
      }
      
      current[path[path.length - 1]] = value;
      return newSettings;
    });
  };

  const deepMerge = (target: any, source: any): any => {
    const output = { ...target };
    
    if (isObject(target) && isObject(source)) {
      Object.keys(source).forEach(key => {
        if (isObject(source[key])) {
          if (!(key in target)) {
            Object.assign(output, { [key]: source[key] });
          } else {
            output[key] = deepMerge(target[key], source[key]);
          }
        } else {
          Object.assign(output, { [key]: source[key] });
        }
      });
    }
    
    return output;
  };

  const isObject = (item: any): boolean => {
    return item && typeof item === 'object' && !Array.isArray(item);
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-cyan-500 animate-spin mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Settings className="w-8 h-8 text-cyan-500" />
              <h1 className="text-slate-900 dark:text-white">Global Settings</h1>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Manage all website configuration. Changes are saved to the database and reflected across the entire website.
            </p>
          </div>

          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-cyan-500 hover:bg-cyan-600 text-white"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save All Changes
              </>
            )}
          </Button>
        </div>

        {/* Verification Banner */}
        <Alert className="mb-6 bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800">
          <Database className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
          <AlertDescription className="text-cyan-800 dark:text-cyan-200">
            <div className="flex items-center justify-between">
              <span>
                <strong>Need to verify your changes?</strong> Use the verification tool to confirm all data is saved to and loaded from the database.
              </span>
              <Link to="/admin/settings-verification">
                <Button variant="outline" size="sm" className="ml-4">
                  <Eye className="w-4 h-4 mr-2" />
                  Verify Database
                </Button>
              </Link>
            </div>
          </AlertDescription>
        </Alert>

        {/* Status Messages */}
        <AnimatePresence>
          {saved && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6"
            >
              <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                <AlertDescription className="text-green-800 dark:text-green-200">
                  Settings saved successfully! Page will reload to apply changes...
                </AlertDescription>
              </Alert>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6"
            >
              <Alert className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                <AlertDescription className="text-red-800 dark:text-red-200">
                  {error}
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Tabs */}
        <Tabs defaultValue="company" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 lg:grid-cols-11 mb-6">
            <TabsTrigger value="company">
              <Building2 className="w-4 h-4 mr-2" />
              Company
            </TabsTrigger>
            <TabsTrigger value="contact">
              <Phone className="w-4 h-4 mr-2" />
              Contact
            </TabsTrigger>
            <TabsTrigger value="social">
              <Globe className="w-4 h-4 mr-2" />
              Social
            </TabsTrigger>
            <TabsTrigger value="navigation">
              <FileText className="w-4 h-4 mr-2" />
              Navigation
            </TabsTrigger>
            <TabsTrigger value="home">
              <Home className="w-4 h-4 mr-2" />
              Home
            </TabsTrigger>
            <TabsTrigger value="about">
              <Info className="w-4 h-4 mr-2" />
              About
            </TabsTrigger>
            <TabsTrigger value="services">
              <Briefcase className="w-4 h-4 mr-2" />
              Services
            </TabsTrigger>
            <TabsTrigger value="portfolio">
              <FolderOpen className="w-4 h-4 mr-2" />
              Portfolio
            </TabsTrigger>
            <TabsTrigger value="contactPage">
              <MessageSquare className="w-4 h-4 mr-2" />
              Contact Page
            </TabsTrigger>
            <TabsTrigger value="states">
              <TrendingUp className="w-4 h-4 mr-2" />
              States
            </TabsTrigger>
            <TabsTrigger value="cicdPipeline">
              <Workflow className="w-4 h-4 mr-2" />
              CI/CD Pipeline
            </TabsTrigger>
          </TabsList>

          {/* Company Tab */}
          <TabsContent value="company" className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="text-slate-900 dark:text-white mb-6">Company Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input
                    value={settings.company?.name || ''}
                    onChange={(e) => updateSetting(['company', 'name'], e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Short Name</Label>
                  <Input
                    value={settings.company?.nameShort || ''}
                    onChange={(e) => updateSetting(['company', 'nameShort'], e.target.value)}
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label>Full Name</Label>
                  <Input
                    value={settings.company?.nameFull || ''}
                    onChange={(e) => updateSetting(['company', 'nameFull'], e.target.value)}
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label>Tagline</Label>
                  <Input
                    value={settings.company?.tagline || ''}
                    onChange={(e) => updateSetting(['company', 'tagline'], e.target.value)}
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label>Tagline Extended</Label>
                  <Input
                    value={settings.company?.taglineExtended || ''}
                    onChange={(e) => updateSetting(['company', 'taglineExtended'], e.target.value)}
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={settings.company?.description || ''}
                    onChange={(e) => updateSetting(['company', 'description'], e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label>Description Long</Label>
                  <Textarea
                    value={settings.company?.descriptionLong || ''}
                    onChange={(e) => updateSetting(['company', 'descriptionLong'], e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label>Slogan</Label>
                  <Input
                    value={settings.company?.slogan || ''}
                    onChange={(e) => updateSetting(['company', 'slogan'], e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Founded Year</Label>
                  <Input
                    type="number"
                    value={settings.company?.foundedYear || 2020}
                    onChange={(e) => updateSetting(['company', 'foundedYear'], parseInt(e.target.value) || 2020)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Employee Count</Label>
                  <Input
                    value={settings.company?.employeeCount || ''}
                    onChange={(e) => updateSetting(['company', 'employeeCount'], e.target.value)}
                    placeholder="e.g., 50+"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Client Count</Label>
                  <Input
                    value={settings.company?.clientCount || ''}
                    onChange={(e) => updateSetting(['company', 'clientCount'], e.target.value)}
                    placeholder="e.g., 500+"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Project Count</Label>
                  <Input
                    value={settings.company?.projectCount || ''}
                    onChange={(e) => updateSetting(['company', 'projectCount'], e.target.value)}
                    placeholder="e.g., 500+"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Countries Served</Label>
                  <Input
                    value={settings.company?.countriesServed || ''}
                    onChange={(e) => updateSetting(['company', 'countriesServed'], e.target.value)}
                    placeholder="e.g., 45+"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="text-slate-900 dark:text-white mb-6">Contact Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Primary Email</Label>
                  <Input
                    type="email"
                    value={settings.contact?.email || ''}
                    onChange={(e) => updateSetting(['contact', 'email'], e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Support Email</Label>
                  <Input
                    type="email"
                    value={settings.contact?.emailSupport || ''}
                    onChange={(e) => updateSetting(['contact', 'emailSupport'], e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Sales Email</Label>
                  <Input
                    type="email"
                    value={settings.contact?.emailSales || ''}
                    onChange={(e) => updateSetting(['contact', 'emailSales'], e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input
                    type="tel"
                    value={settings.contact?.phone || ''}
                    onChange={(e) => updateSetting(['contact', 'phone'], e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Phone Formatted</Label>
                  <Input
                    type="tel"
                    value={settings.contact?.phoneFormatted || ''}
                    onChange={(e) => updateSetting(['contact', 'phoneFormatted'], e.target.value)}
                    placeholder="e.g., +1 (555) 000-0000"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Phone International</Label>
                  <Input
                    type="tel"
                    value={settings.contact?.phoneInternational || ''}
                    onChange={(e) => updateSetting(['contact', 'phoneInternational'], e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>WhatsApp Number</Label>
                  <Input
                    value={settings.contact?.whatsapp || ''}
                    onChange={(e) => updateSetting(['contact', 'whatsapp'], e.target.value)}
                    placeholder="15551234567"
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Format: country code + number (no + or spaces)
                  </p>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label>Address</Label>
                  <Textarea
                    value={settings.contact?.address || ''}
                    onChange={(e) => updateSetting(['contact', 'address'], e.target.value)}
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Address Line 1</Label>
                  <Input
                    value={settings.contact?.addressLine1 || ''}
                    onChange={(e) => updateSetting(['contact', 'addressLine1'], e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Address Line 2</Label>
                  <Input
                    value={settings.contact?.addressLine2 || ''}
                    onChange={(e) => updateSetting(['contact', 'addressLine2'], e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>City</Label>
                  <Input
                    value={settings.contact?.city || ''}
                    onChange={(e) => updateSetting(['contact', 'city'], e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Country</Label>
                  <Input
                    value={settings.contact?.country || ''}
                    onChange={(e) => updateSetting(['contact', 'country'], e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Input
                    value={settings.contact?.timezone || ''}
                    onChange={(e) => updateSetting(['contact', 'timezone'], e.target.value)}
                    placeholder="e.g., GMT+0"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label>Google Maps Share Link</Label>
                  <Input
                    value={settings.contact?.mapShareLink || ''}
                    onChange={(e) => updateSetting(['contact', 'mapShareLink'], e.target.value)}
                    placeholder="https://share.google/..."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Latitude</Label>
                  <Input
                    type="number"
                    step="any"
                    value={settings.contact?.latitude || 0}
                    onChange={(e) => updateSetting(['contact', 'latitude'], parseFloat(e.target.value) || 0)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Longitude</Label>
                  <Input
                    type="number"
                    step="any"
                    value={settings.contact?.longitude || 0}
                    onChange={(e) => updateSetting(['contact', 'longitude'], parseFloat(e.target.value) || 0)}
                  />
                </div>

                <div className="md:col-span-2">
                  <Alert>
                    <MapPin className="w-4 h-4" />
                    <AlertDescription>
                      Current Location: Lat {settings.contact?.latitude || 0}, Lng {settings.contact?.longitude || 0}
                      <br />
                      <a
                        href={`https://www.google.com/maps?q=${settings.contact?.latitude || 0},${settings.contact?.longitude || 0}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-cyan-600 dark:text-cyan-400 hover:underline mt-2"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Preview on Google Maps
                      </a>
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Social Media Tab */}
          <TabsContent value="social" className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="text-slate-900 dark:text-white mb-6">Social Media Links</h2>
              
              <div className="grid grid-cols-1 gap-6">
                {Object.keys(settings.social || {}).map((platform) => (
                  <div key={platform} className="space-y-2">
                    <Label className="capitalize flex items-center gap-2">
                      {platform === 'facebook' && <Facebook className="w-4 h-4" />}
                      {platform === 'twitter' && <Twitter className="w-4 h-4" />}
                      {platform === 'linkedin' && <Linkedin className="w-4 h-4" />}
                      {platform === 'github' && <Github className="w-4 h-4" />}
                      {platform === 'instagram' && <Instagram className="w-4 h-4" />}
                      {platform === 'youtube' && <Youtube className="w-4 h-4" />}
                      {platform}
                    </Label>
                    <Input
                      type="url"
                      value={settings.social?.[platform as keyof typeof settings.social] || ''}
                      onChange={(e) => updateSetting(['social', platform], e.target.value)}
                      placeholder={`https://${platform}.com/yourprofile`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Navigation Tab */}
          <TabsContent value="navigation" className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="text-slate-900 dark:text-white mb-6">Navigation Settings</h2>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Admin Label</Label>
                  <Input
                    value={settings.navigation?.adminLabel || ''}
                    onChange={(e) => updateSetting(['navigation', 'adminLabel'], e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Admin Dashboard Label</Label>
                  <Input
                    value={settings.navigation?.adminDashboardLabel || ''}
                    onChange={(e) => updateSetting(['navigation', 'adminDashboardLabel'], e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Mobile Menu Label</Label>
                  <Input
                    value={settings.navigation?.mobileMenuLabel || ''}
                    onChange={(e) => updateSetting(['navigation', 'mobileMenuLabel'], e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Close Menu Label</Label>
                  <Input
                    value={settings.navigation?.closeMenuLabel || ''}
                    onChange={(e) => updateSetting(['navigation', 'closeMenuLabel'], e.target.value)}
                  />
                </div>

                <div className="space-y-4">
                  <Label>Navigation Links</Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    These links are automatically generated from: Home, About, Services, Portfolio, Contact.
                    Link paths are managed by the routing system.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Home Page Tab */}
          <TabsContent value="home" className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="text-slate-900 dark:text-white mb-6">Home Page Content</h2>
              
              <Accordion type="multiple" className="w-full">
                {/* Hero Section */}
                <AccordionItem value="hero">
                  <AccordionTrigger>
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Hero Section
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                      <div className="space-y-2">
                        <Label>Badge Text</Label>
                        <Input
                          value={settings.home?.hero?.badge || ''}
                          onChange={(e) => updateSetting(['home', 'hero', 'badge'], e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Badge Icon</Label>
                        <Input
                          value={settings.home?.hero?.badgeIcon || ''}
                          onChange={(e) => updateSetting(['home', 'hero', 'badgeIcon'], e.target.value)}
                          placeholder="e.g., ✨"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Title</Label>
                        <Input
                          value={settings.home?.hero?.title || ''}
                          onChange={(e) => updateSetting(['home', 'hero', 'title'], e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Title Highlight</Label>
                        <Input
                          value={settings.home?.hero?.titleHighlight || ''}
                          onChange={(e) => updateSetting(['home', 'hero', 'titleHighlight'], e.target.value)}
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <Label>Title Full</Label>
                        <Input
                          value={settings.home?.hero?.titleFull || ''}
                          onChange={(e) => updateSetting(['home', 'hero', 'titleFull'], e.target.value)}
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          value={settings.home?.hero?.description || ''}
                          onChange={(e) => updateSetting(['home', 'hero', 'description'], e.target.value)}
                          rows={3}
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <Label>Description Short</Label>
                        <Input
                          value={settings.home?.hero?.descriptionShort || ''}
                          onChange={(e) => updateSetting(['home', 'hero', 'descriptionShort'], e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Primary CTA Button</Label>
                        <Input
                          value={settings.home?.hero?.ctaPrimary || ''}
                          onChange={(e) => updateSetting(['home', 'hero', 'ctaPrimary'], e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Secondary CTA Button</Label>
                        <Input
                          value={settings.home?.hero?.ctaSecondary || ''}
                          onChange={(e) => updateSetting(['home', 'hero', 'ctaSecondary'], e.target.value)}
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <Label>Scroll Indicator Text</Label>
                        <Input
                          value={settings.home?.hero?.scrollIndicatorText || ''}
                          onChange={(e) => updateSetting(['home', 'hero', 'scrollIndicatorText'], e.target.value)}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Global Presence Section */}
                <AccordionItem value="globalPresence">
                  <AccordionTrigger>
                    <span className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Global Presence Section
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                      <div className="space-y-2">
                        <Label>Badge Text</Label>
                        <Input
                          value={settings.home?.globalPresence?.badge || ''}
                          onChange={(e) => updateSetting(['home', 'globalPresence', 'badge'], e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Badge Icon</Label>
                        <Input
                          value={settings.home?.globalPresence?.badgeIcon || ''}
                          onChange={(e) => updateSetting(['home', 'globalPresence', 'badgeIcon'], e.target.value)}
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <Label>Title</Label>
                        <Input
                          value={settings.home?.globalPresence?.title || ''}
                          onChange={(e) => updateSetting(['home', 'globalPresence', 'title'], e.target.value)}
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          value={settings.home?.globalPresence?.description || ''}
                          onChange={(e) => updateSetting(['home', 'globalPresence', 'description'], e.target.value)}
                          rows={2}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* DevOps Section */}
                <AccordionItem value="devops">
                  <AccordionTrigger>
                    <span className="flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      DevOps Section
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                      <div className="space-y-2">
                        <Label>Badge Text</Label>
                        <Input
                          value={settings.home?.devops?.badge || ''}
                          onChange={(e) => updateSetting(['home', 'devops', 'badge'], e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Badge Icon</Label>
                        <Input
                          value={settings.home?.devops?.badgeIcon || ''}
                          onChange={(e) => updateSetting(['home', 'devops', 'badgeIcon'], e.target.value)}
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <Label>Title</Label>
                        <Input
                          value={settings.home?.devops?.title || ''}
                          onChange={(e) => updateSetting(['home', 'devops', 'title'], e.target.value)}
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          value={settings.home?.devops?.description || ''}
                          onChange={(e) => updateSetting(['home', 'devops', 'description'], e.target.value)}
                          rows={2}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* CI/CD Pipeline Section */}
                <AccordionItem value="cicdPipeline">
                  <AccordionTrigger>
                    <span className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4" />
                      CI/CD Pipeline Section
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                      <div className="space-y-2">
                        <Label>Badge Text</Label>
                        <Input
                          value={settings.home?.cicdPipeline?.badge || ''}
                          onChange={(e) => updateSetting(['home', 'cicdPipeline', 'badge'], e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Badge Icon</Label>
                        <Input
                          value={settings.home?.cicdPipeline?.badgeIcon || ''}
                          onChange={(e) => updateSetting(['home', 'cicdPipeline', 'badgeIcon'], e.target.value)}
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <Label>Title</Label>
                        <Input
                          value={settings.home?.cicdPipeline?.title || ''}
                          onChange={(e) => updateSetting(['home', 'cicdPipeline', 'title'], e.target.value)}
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          value={settings.home?.cicdPipeline?.description || ''}
                          onChange={(e) => updateSetting(['home', 'cicdPipeline', 'description'], e.target.value)}
                          rows={2}
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <Label>Success Title</Label>
                        <Input
                          value={settings.home?.cicdPipeline?.successTitle || ''}
                          onChange={(e) => updateSetting(['home', 'cicdPipeline', 'successTitle'], e.target.value)}
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <Label>Success Description</Label>
                        <Input
                          value={settings.home?.cicdPipeline?.successDescription || ''}
                          onChange={(e) => updateSetting(['home', 'cicdPipeline', 'successDescription'], e.target.value)}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Technologies Section */}
                <AccordionItem value="technologies">
                  <AccordionTrigger>
                    <span className="flex items-center gap-2">
                      <Database className="w-4 h-4" />
                      Technologies Section
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                      <div className="space-y-2">
                        <Label>Badge Text</Label>
                        <Input
                          value={settings.home?.technologies?.badge || ''}
                          onChange={(e) => updateSetting(['home', 'technologies', 'badge'], e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Badge Icon</Label>
                        <Input
                          value={settings.home?.technologies?.badgeIcon || ''}
                          onChange={(e) => updateSetting(['home', 'technologies', 'badgeIcon'], e.target.value)}
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <Label>Title</Label>
                        <Input
                          value={settings.home?.technologies?.title || ''}
                          onChange={(e) => updateSetting(['home', 'technologies', 'title'], e.target.value)}
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          value={settings.home?.technologies?.description || ''}
                          onChange={(e) => updateSetting(['home', 'technologies', 'description'], e.target.value)}
                          rows={2}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Why Choose Us Section */}
                <AccordionItem value="whyChoose">
                  <AccordionTrigger>
                    <span className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Why Choose Us Section
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                      <div className="space-y-2">
                        <Label>Badge Text</Label>
                        <Input
                          value={settings.home?.whyChoose?.badge || ''}
                          onChange={(e) => updateSetting(['home', 'whyChoose', 'badge'], e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Badge Icon</Label>
                        <Input
                          value={settings.home?.whyChoose?.badgeIcon || ''}
                          onChange={(e) => updateSetting(['home', 'whyChoose', 'badgeIcon'], e.target.value)}
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <Label>Title</Label>
                        <Input
                          value={settings.home?.whyChoose?.title || ''}
                          onChange={(e) => updateSetting(['home', 'whyChoose', 'title'], e.target.value)}
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          value={settings.home?.whyChoose?.description || ''}
                          onChange={(e) => updateSetting(['home', 'whyChoose', 'description'], e.target.value)}
                          rows={2}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Performance Section */}
                <AccordionItem value="performance">
                  <AccordionTrigger>
                    <span className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Performance Section
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                      <div className="space-y-2">
                        <Label>Badge Text</Label>
                        <Input
                          value={settings.home?.performance?.badge || ''}
                          onChange={(e) => updateSetting(['home', 'performance', 'badge'], e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Badge Icon</Label>
                        <Input
                          value={settings.home?.performance?.badgeIcon || ''}
                          onChange={(e) => updateSetting(['home', 'performance', 'badgeIcon'], e.target.value)}
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <Label>Title</Label>
                        <Input
                          value={settings.home?.performance?.title || ''}
                          onChange={(e) => updateSetting(['home', 'performance', 'title'], e.target.value)}
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          value={settings.home?.performance?.description || ''}
                          onChange={(e) => updateSetting(['home', 'performance', 'description'], e.target.value)}
                          rows={2}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* CTA Section */}
                <AccordionItem value="cta">
                  <AccordionTrigger>
                    <span className="flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Call-to-Action Section
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                      <div className="space-y-2">
                        <Label>Badge Text</Label>
                        <Input
                          value={settings.home?.cta?.badge || ''}
                          onChange={(e) => updateSetting(['home', 'cta', 'badge'], e.target.value)}
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <Label>Title</Label>
                        <Input
                          value={settings.home?.cta?.title || ''}
                          onChange={(e) => updateSetting(['home', 'cta', 'title'], e.target.value)}
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <Label>Title Alternative</Label>
                        <Input
                          value={settings.home?.cta?.titleAlt || ''}
                          onChange={(e) => updateSetting(['home', 'cta', 'titleAlt'], e.target.value)}
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          value={settings.home?.cta?.description || ''}
                          onChange={(e) => updateSetting(['home', 'cta', 'description'], e.target.value)}
                          rows={2}
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <Label>Description Alternative</Label>
                        <Textarea
                          value={settings.home?.cta?.descriptionAlt || ''}
                          onChange={(e) => updateSetting(['home', 'cta', 'descriptionAlt'], e.target.value)}
                          rows={2}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Button Text</Label>
                        <Input
                          value={settings.home?.cta?.buttonText || ''}
                          onChange={(e) => updateSetting(['home', 'cta', 'buttonText'], e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Button Text Alternative</Label>
                        <Input
                          value={settings.home?.cta?.buttonTextAlt || ''}
                          onChange={(e) => updateSetting(['home', 'cta', 'buttonTextAlt'], e.target.value)}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </TabsContent>

          {/* About Page Tab - Similar structure, I'll continue with the pattern */}
          <TabsContent value="about" className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="text-slate-900 dark:text-white mb-6">About Page Content</h2>
              
              <Accordion type="multiple" className="w-full">
                {/* Hero Section */}
                <AccordionItem value="hero">
                  <AccordionTrigger>
                    <span className="flex items-center gap-2">
                      <Info className="w-4 h-4" />
                      Hero Section
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                      <div className="space-y-2">
                        <Label>Badge Text</Label>
                        <Input
                          value={settings.about?.hero?.badge || ''}
                          onChange={(e) => updateSetting(['about', 'hero', 'badge'], e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Badge Icon</Label>
                        <Input
                          value={settings.about?.hero?.badgeIcon || ''}
                          onChange={(e) => updateSetting(['about', 'hero', 'badgeIcon'], e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Title</Label>
                        <Input
                          value={settings.about?.hero?.title || ''}
                          onChange={(e) => updateSetting(['about', 'hero', 'title'], e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Title Prefix</Label>
                        <Input
                          value={settings.about?.hero?.titlePrefix || ''}
                          onChange={(e) => updateSetting(['about', 'hero', 'titlePrefix'], e.target.value)}
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <Label>Title Highlight</Label>
                        <Input
                          value={settings.about?.hero?.titleHighlight || ''}
                          onChange={(e) => updateSetting(['about', 'hero', 'titleHighlight'], e.target.value)}
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          value={settings.about?.hero?.description || ''}
                          onChange={(e) => updateSetting(['about', 'hero', 'description'], e.target.value)}
                          rows={2}
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <Label>Description Extended</Label>
                        <Textarea
                          value={settings.about?.hero?.descriptionExtended || ''}
                          onChange={(e) => updateSetting(['about', 'hero', 'descriptionExtended'], e.target.value)}
                          rows={2}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Mission Section */}
                <AccordionItem value="mission">
                  <AccordionTrigger>
                    <span className="flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Mission Section
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-6 pt-4">
                      <div className="space-y-2">
                        <Label>Title</Label>
                        <Input
                          value={settings.about?.mission?.title || ''}
                          onChange={(e) => updateSetting(['about', 'mission', 'title'], e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          value={settings.about?.mission?.description || ''}
                          onChange={(e) => updateSetting(['about', 'mission', 'description'], e.target.value)}
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Description Short</Label>
                        <Textarea
                          value={settings.about?.mission?.descriptionShort || ''}
                          onChange={(e) => updateSetting(['about', 'mission', 'descriptionShort'], e.target.value)}
                          rows={2}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Vision Section */}
                <AccordionItem value="vision">
                  <AccordionTrigger>
                    <span className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Vision Section
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-6 pt-4">
                      <div className="space-y-2">
                        <Label>Title</Label>
                        <Input
                          value={settings.about?.vision?.title || ''}
                          onChange={(e) => updateSetting(['about', 'vision', 'title'], e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          value={settings.about?.vision?.description || ''}
                          onChange={(e) => updateSetting(['about', 'vision', 'description'], e.target.value)}
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Description Short</Label>
                        <Textarea
                          value={settings.about?.vision?.descriptionShort || ''}
                          onChange={(e) => updateSetting(['about', 'vision', 'descriptionShort'], e.target.value)}
                          rows={2}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Team Section */}
                <AccordionItem value="team">
                  <AccordionTrigger>
                    <span className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Team Section
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-6 pt-4">
                      <div className="space-y-2">
                        <Label>Title</Label>
                        <Input
                          value={settings.about?.team?.title || ''}
                          onChange={(e) => updateSetting(['about', 'team', 'title'], e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Title Alternative</Label>
                        <Input
                          value={settings.about?.team?.titleAlt || ''}
                          onChange={(e) => updateSetting(['about', 'team', 'titleAlt'], e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          value={settings.about?.team?.description || ''}
                          onChange={(e) => updateSetting(['about', 'team', 'description'], e.target.value)}
                          rows={2}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Description Extended</Label>
                        <Textarea
                          value={settings.about?.team?.descriptionExtended || ''}
                          onChange={(e) => updateSetting(['about', 'team', 'descriptionExtended'], e.target.value)}
                          rows={2}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </TabsContent>

          {/* Services Page Tab */}
          <TabsContent value="services" className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="text-slate-900 dark:text-white mb-6">Services Page Content</h2>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Hero Badge Text</Label>
                  <Input
                    value={settings.services?.hero?.badge || ''}
                    onChange={(e) => updateSetting(['services', 'hero', 'badge'], e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Hero Badge Icon</Label>
                  <Input
                    value={settings.services?.hero?.badgeIcon || ''}
                    onChange={(e) => updateSetting(['services', 'hero', 'badgeIcon'], e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Hero Title</Label>
                  <Input
                    value={settings.services?.hero?.title || ''}
                    onChange={(e) => updateSetting(['services', 'hero', 'title'], e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Hero Title Prefix</Label>
                  <Input
                    value={settings.services?.hero?.titlePrefix || ''}
                    onChange={(e) => updateSetting(['services', 'hero', 'titlePrefix'], e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Hero Title Highlight</Label>
                  <Input
                    value={settings.services?.hero?.titleHighlight || ''}
                    onChange={(e) => updateSetting(['services', 'hero', 'titleHighlight'], e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Hero Description</Label>
                  <Textarea
                    value={settings.services?.hero?.description || ''}
                    onChange={(e) => updateSetting(['services', 'hero', 'description'], e.target.value)}
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Hero Description Extended</Label>
                  <Textarea
                    value={settings.services?.hero?.descriptionExtended || ''}
                    onChange={(e) => updateSetting(['services', 'hero', 'descriptionExtended'], e.target.value)}
                    rows={2}
                  />
                </div>

                <Alert>
                  <Info className="w-4 h-4" />
                  <AlertDescription>
                    Services content (cards, features) is managed through the Services management page in the admin panel.
                    These settings only control the hero section text.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </TabsContent>

          {/* Portfolio Page Tab */}
          <TabsContent value="portfolio" className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="text-slate-900 dark:text-white mb-6">Portfolio Page Content</h2>
              
              <Accordion type="multiple" className="w-full">
                {/* Hero Section */}
                <AccordionItem value="hero">
                  <AccordionTrigger>
                    <span className="flex items-center gap-2">
                      <FolderOpen className="w-4 h-4" />
                      Hero Section
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                      <div className="space-y-2">
                        <Label>Badge Text</Label>
                        <Input
                          value={settings.portfolio?.hero?.badge || ''}
                          onChange={(e) => updateSetting(['portfolio', 'hero', 'badge'], e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Badge Icon</Label>
                        <Input
                          value={settings.portfolio?.hero?.badgeIcon || ''}
                          onChange={(e) => updateSetting(['portfolio', 'hero', 'badgeIcon'], e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Title</Label>
                        <Input
                          value={settings.portfolio?.hero?.title || ''}
                          onChange={(e) => updateSetting(['portfolio', 'hero', 'title'], e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Title Prefix</Label>
                        <Input
                          value={settings.portfolio?.hero?.titlePrefix || ''}
                          onChange={(e) => updateSetting(['portfolio', 'hero', 'titlePrefix'], e.target.value)}
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <Label>Title Highlight</Label>
                        <Input
                          value={settings.portfolio?.hero?.titleHighlight || ''}
                          onChange={(e) => updateSetting(['portfolio', 'hero', 'titleHighlight'], e.target.value)}
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          value={settings.portfolio?.hero?.description || ''}
                          onChange={(e) => updateSetting(['portfolio', 'hero', 'description'], e.target.value)}
                          rows={2}
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <Label>Description Extended</Label>
                        <Textarea
                          value={settings.portfolio?.hero?.descriptionExtended || ''}
                          onChange={(e) => updateSetting(['portfolio', 'hero', 'descriptionExtended'], e.target.value)}
                          rows={2}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Filters Section */}
                <AccordionItem value="filters">
                  <AccordionTrigger>
                    <span className="flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Filters & Labels
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                      <div className="space-y-2">
                        <Label>All Projects Label</Label>
                        <Input
                          value={settings.portfolio?.filters?.all || ''}
                          onChange={(e) => updateSetting(['portfolio', 'filters', 'all'], e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>All Label Short</Label>
                        <Input
                          value={settings.portfolio?.filters?.allLabel || ''}
                          onChange={(e) => updateSetting(['portfolio', 'filters', 'allLabel'], e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Category Label</Label>
                        <Input
                          value={settings.portfolio?.filters?.categoryLabel || ''}
                          onChange={(e) => updateSetting(['portfolio', 'filters', 'categoryLabel'], e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Search Placeholder</Label>
                        <Input
                          value={settings.portfolio?.filters?.searchPlaceholder || ''}
                          onChange={(e) => updateSetting(['portfolio', 'filters', 'searchPlaceholder'], e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Sort Label</Label>
                        <Input
                          value={settings.portfolio?.filters?.sortLabel || ''}
                          onChange={(e) => updateSetting(['portfolio', 'filters', 'sortLabel'], e.target.value)}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Card Labels */}
                <AccordionItem value="card">
                  <AccordionTrigger>
                    <span className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Project Card Labels
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                      <div className="space-y-2">
                        <Label>View Button</Label>
                        <Input
                          value={settings.portfolio?.card?.viewButton || ''}
                          onChange={(e) => updateSetting(['portfolio', 'card', 'viewButton'], e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>View Button Alternative</Label>
                        <Input
                          value={settings.portfolio?.card?.viewButtonAlt || ''}
                          onChange={(e) => updateSetting(['portfolio', 'card', 'viewButtonAlt'], e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Tech Stack Label</Label>
                        <Input
                          value={settings.portfolio?.card?.techStackLabel || ''}
                          onChange={(e) => updateSetting(['portfolio', 'card', 'techStackLabel'], e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Category Label</Label>
                        <Input
                          value={settings.portfolio?.card?.categoryLabel || ''}
                          onChange={(e) => updateSetting(['portfolio', 'card', 'categoryLabel'], e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Date Label</Label>
                        <Input
                          value={settings.portfolio?.card?.dateLabel || ''}
                          onChange={(e) => updateSetting(['portfolio', 'card', 'dateLabel'], e.target.value)}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Project Detail Labels */}
                <AccordionItem value="projectDetail">
                  <AccordionTrigger>
                    <span className="flex items-center gap-2">
                      <Info className="w-4 h-4" />
                      Project Detail Labels
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                      <div className="space-y-2">
                        <Label>Back Button</Label>
                        <Input
                          value={settings.portfolio?.projectDetail?.backButton || ''}
                          onChange={(e) => updateSetting(['portfolio', 'projectDetail', 'backButton'], e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Technologies Title</Label>
                        <Input
                          value={settings.portfolio?.projectDetail?.technologiesTitle || ''}
                          onChange={(e) => updateSetting(['portfolio', 'projectDetail', 'technologiesTitle'], e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Overview Title</Label>
                        <Input
                          value={settings.portfolio?.projectDetail?.overviewTitle || ''}
                          onChange={(e) => updateSetting(['portfolio', 'projectDetail', 'overviewTitle'], e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Features Title</Label>
                        <Input
                          value={settings.portfolio?.projectDetail?.featuresTitle || ''}
                          onChange={(e) => updateSetting(['portfolio', 'projectDetail', 'featuresTitle'], e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>View Demo Button</Label>
                        <Input
                          value={settings.portfolio?.projectDetail?.viewDemoButton || ''}
                          onChange={(e) => updateSetting(['portfolio', 'projectDetail', 'viewDemoButton'], e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Inquire Button</Label>
                        <Input
                          value={settings.portfolio?.projectDetail?.inquireButton || ''}
                          onChange={(e) => updateSetting(['portfolio', 'projectDetail', 'inquireButton'], e.target.value)}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </TabsContent>

          {/* Contact Page Tab */}
          <TabsContent value="contactPage" className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="text-slate-900 dark:text-white mb-6">Contact Page Content</h2>
              
              <Accordion type="multiple" className="w-full">
                {/* Hero Section */}
                <AccordionItem value="hero">
                  <AccordionTrigger>
                    <span className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Hero Section
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                      <div className="space-y-2">
                        <Label>Badge Text</Label>
                        <Input
                          value={settings.contactPage?.hero?.badge || ''}
                          onChange={(e) => updateSetting(['contactPage', 'hero', 'badge'], e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Badge Icon</Label>
                        <Input
                          value={settings.contactPage?.hero?.badgeIcon || ''}
                          onChange={(e) => updateSetting(['contactPage', 'hero', 'badgeIcon'], e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Title</Label>
                        <Input
                          value={settings.contactPage?.hero?.title || ''}
                          onChange={(e) => updateSetting(['contactPage', 'hero', 'title'], e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Title Prefix</Label>
                        <Input
                          value={settings.contactPage?.hero?.titlePrefix || ''}
                          onChange={(e) => updateSetting(['contactPage', 'hero', 'titlePrefix'], e.target.value)}
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <Label>Title Highlight</Label>
                        <Input
                          value={settings.contactPage?.hero?.titleHighlight || ''}
                          onChange={(e) => updateSetting(['contactPage', 'hero', 'titleHighlight'], e.target.value)}
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          value={settings.contactPage?.hero?.description || ''}
                          onChange={(e) => updateSetting(['contactPage', 'hero', 'description'], e.target.value)}
                          rows={2}
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <Label>Description Extended</Label>
                        <Textarea
                          value={settings.contactPage?.hero?.descriptionExtended || ''}
                          onChange={(e) => updateSetting(['contactPage', 'hero', 'descriptionExtended'], e.target.value)}
                          rows={2}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Form Labels */}
                <AccordionItem value="form">
                  <AccordionTrigger>
                    <span className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Contact Form Labels
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                      <div className="md:col-span-2 space-y-2">
                        <Label>Form Title</Label>
                        <Input
                          value={settings.contactPage?.form?.title || ''}
                          onChange={(e) => updateSetting(['contactPage', 'form', 'title'], e.target.value)}
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <Label>Form Subtitle</Label>
                        <Input
                          value={settings.contactPage?.form?.subtitle || ''}
                          onChange={(e) => updateSetting(['contactPage', 'form', 'subtitle'], e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Name Label</Label>
                        <Input
                          value={settings.contactPage?.form?.nameLabel || ''}
                          onChange={(e) => updateSetting(['contactPage', 'form', 'nameLabel'], e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Name Placeholder</Label>
                        <Input
                          value={settings.contactPage?.form?.namePlaceholder || ''}
                          onChange={(e) => updateSetting(['contactPage', 'form', 'namePlaceholder'], e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Email Label</Label>
                        <Input
                          value={settings.contactPage?.form?.emailLabel || ''}
                          onChange={(e) => updateSetting(['contactPage', 'form', 'emailLabel'], e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Email Placeholder</Label>
                        <Input
                          value={settings.contactPage?.form?.emailPlaceholder || ''}
                          onChange={(e) => updateSetting(['contactPage', 'form', 'emailPlaceholder'], e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Phone Label</Label>
                        <Input
                          value={settings.contactPage?.form?.phoneLabel || ''}
                          onChange={(e) => updateSetting(['contactPage', 'form', 'phoneLabel'], e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Message Label</Label>
                        <Input
                          value={settings.contactPage?.form?.messageLabel || ''}
                          onChange={(e) => updateSetting(['contactPage', 'form', 'messageLabel'], e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Submit Button</Label>
                        <Input
                          value={settings.contactPage?.form?.submitButton || ''}
                          onChange={(e) => updateSetting(['contactPage', 'form', 'submitButton'], e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Success Title</Label>
                        <Input
                          value={settings.contactPage?.form?.successTitle || ''}
                          onChange={(e) => updateSetting(['contactPage', 'form', 'successTitle'], e.target.value)}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* WhatsApp Section */}
                <AccordionItem value="whatsapp">
                  <AccordionTrigger>
                    <span className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp Settings
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-6 pt-4">
                      <div className="space-y-2">
                        <Label>Button Text</Label>
                        <Input
                          value={settings.contactPage?.whatsapp?.buttonText || ''}
                          onChange={(e) => updateSetting(['contactPage', 'whatsapp', 'buttonText'], e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Button Text Alternative</Label>
                        <Input
                          value={settings.contactPage?.whatsapp?.buttonTextAlt || ''}
                          onChange={(e) => updateSetting(['contactPage', 'whatsapp', 'buttonTextAlt'], e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Default Message</Label>
                        <Textarea
                          value={settings.contactPage?.whatsapp?.defaultMessage || ''}
                          onChange={(e) => updateSetting(['contactPage', 'whatsapp', 'defaultMessage'], e.target.value)}
                          rows={2}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </TabsContent>

          {/* States Tab - Numeric Values Control */}
          <TabsContent value="states" className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <div className="mb-6">
                <h2 className="text-slate-900 dark:text-white mb-2 flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-cyan-500" />
                  Numeric States & Metrics
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Control all numeric values, metrics, timeouts, and statistics displayed across the website. 
                  All values are stored in the database and update dynamically.
                </p>
              </div>
              
              <Accordion type="multiple" className="w-full">
                {/* Company Numbers */}
                <AccordionItem value="company-numbers">
                  <AccordionTrigger>
                    <span className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      Company Statistics
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                      <div className="space-y-2">
                        <Label>Founded Year</Label>
                        <Input
                          type="number"
                          value={settings.company?.foundedYear || 2020}
                          onChange={(e) => updateSetting(['company', 'foundedYear'], parseInt(e.target.value) || 2020)}
                        />
                        <p className="text-xs text-slate-500 dark:text-slate-400">The year your company was founded</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Location Coordinates */}
                <AccordionItem value="location-coordinates">
                  <AccordionTrigger>
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Location Coordinates
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                      <div className="space-y-2">
                        <Label>Latitude</Label>
                        <Input
                          type="number"
                          step="any"
                          value={settings.contact?.latitude || 0}
                          onChange={(e) => updateSetting(['contact', 'latitude'], parseFloat(e.target.value) || 0)}
                        />
                        <p className="text-xs text-slate-500 dark:text-slate-400">Latitude coordinate for map display</p>
                      </div>

                      <div className="space-y-2">
                        <Label>Longitude</Label>
                        <Input
                          type="number"
                          step="any"
                          value={settings.contact?.longitude || 0}
                          onChange={(e) => updateSetting(['contact', 'longitude'], parseFloat(e.target.value) || 0)}
                        />
                        <p className="text-xs text-slate-500 dark:text-slate-400">Longitude coordinate for map display</p>
                      </div>

                      <div className="md:col-span-2">
                        <Alert>
                          <MapPin className="w-4 h-4" />
                          <AlertDescription>
                            Current Location: Lat {settings.contact?.latitude || 0}, Lng {settings.contact?.longitude || 0}
                            <br />
                            <a
                              href={`https://www.google.com/maps?q=${settings.contact?.latitude || 0},${settings.contact?.longitude || 0}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-cyan-600 dark:text-cyan-400 hover:underline mt-2"
                            >
                              <ExternalLink className="w-3 h-3" />
                              Preview on Google Maps
                            </a>
                          </AlertDescription>
                        </Alert>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Global Presence Metrics */}
                <AccordionItem value="global-presence-metrics">
                  <AccordionTrigger>
                    <span className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Global Presence Metrics (Homepage)
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                      {settings.home?.globalPresence?.metrics?.map((metric: any, index: number) => (
                        <div key={index} className="space-y-2">
                          <Label>{metric.label || `Metric ${index + 1}`}</Label>
                          <Input
                            type="number"
                            value={metric.value || 0}
                            onChange={(e) => {
                              const newMetrics = [...(settings.home?.globalPresence?.metrics || [])];
                              newMetrics[index] = { ...newMetrics[index], value: parseInt(e.target.value) || 0 };
                              updateSetting(['home', 'globalPresence', 'metrics'], newMetrics);
                            }}
                          />
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {metric.sublabel || 'Metric value'}
                          </p>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* DevOps Metrics */}
                <AccordionItem value="devops-metrics">
                  <AccordionTrigger>
                    <span className="flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      DevOps Metrics (Homepage)
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                      {settings.home?.devops?.metrics?.map((metric: any, index: number) => (
                        <div key={index} className="space-y-2">
                          <Label>{metric.label || `Metric ${index + 1}`}</Label>
                          <Input
                            type="number"
                            value={metric.value || 0}
                            onChange={(e) => {
                              const newMetrics = [...(settings.home?.devops?.metrics || [])];
                              newMetrics[index] = { ...newMetrics[index], value: parseInt(e.target.value) || 0 };
                              updateSetting(['home', 'devops', 'metrics'], newMetrics);
                            }}
                          />
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Suffix: {metric.suffix || 'none'} - {metric.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* CI/CD Pipeline Metrics */}
                <AccordionItem value="cicd-metrics">
                  <AccordionTrigger>
                    <span className="flex items-center gap-2">
                      <Cloud className="w-4 h-4" />
                      CI/CD Pipeline Metrics (Homepage)
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                      {settings.home?.cicdPipeline?.metrics?.map((metric: any, index: number) => (
                        <div key={index} className="space-y-2">
                          <Label>{metric.label || `Metric ${index + 1}`}</Label>
                          <Input
                            type="number"
                            value={metric.value || 0}
                            onChange={(e) => {
                              const newMetrics = [...(settings.home?.cicdPipeline?.metrics || [])];
                              newMetrics[index] = { ...newMetrics[index], value: parseInt(e.target.value) || 0 };
                              updateSetting(['home', 'cicdPipeline', 'metrics'], newMetrics);
                            }}
                          />
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Suffix: {metric.suffix || 'none'} - {metric.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Performance Metrics */}
                <AccordionItem value="performance-metrics">
                  <AccordionTrigger>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Performance Metrics (Homepage)
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                      {settings.home?.performance?.metrics?.map((metric: any, index: number) => (
                        <div key={index} className="space-y-2">
                          <Label>{metric.label || `Metric ${index + 1}`}</Label>
                          <Input
                            type="number"
                            value={metric.value || 0}
                            onChange={(e) => {
                              const newMetrics = [...(settings.home?.performance?.metrics || [])];
                              newMetrics[index] = { ...newMetrics[index], value: parseInt(e.target.value) || 0 };
                              updateSetting(['home', 'performance', 'metrics'], newMetrics);
                            }}
                          />
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {metric.description || 'Performance metric'} (Suffix: {metric.suffix || 'none'})
                          </p>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Contact Form Timeout */}
                <AccordionItem value="contact-form-timeout">
                  <AccordionTrigger>
                    <span className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      Contact Form Settings
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                      <div className="space-y-2">
                        <Label>Success Message Timeout (ms)</Label>
                        <Input
                          type="number"
                          value={settings.contactPage?.form?.successTimeoutMs || 3000}
                          onChange={(e) => updateSetting(['contactPage', 'form', 'successTimeoutMs'], parseInt(e.target.value) || 3000)}
                        />
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Time in milliseconds before form resets after successful submission
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Homepage Hero Statistics */}
                <AccordionItem value="hero-stats">
                  <AccordionTrigger>
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Homepage Hero Statistics
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-6 pt-4">
                      {settings.home?.stats?.map((stat: any, index: number) => (
                        <div key={index} className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                          <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                            Stat {index + 1}: {stat.label}
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label>Value (Number)</Label>
                              <Input
                                type="number"
                                value={stat.value || 0}
                                onChange={(e) => {
                                  const newStats = [...(settings.home?.stats || [])];
                                  newStats[index] = { ...newStats[index], value: parseInt(e.target.value) || 0 };
                                  updateSetting(['home', 'stats'], newStats);
                                }}
                              />
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                Numeric value (e.g., 500, 99)
                              </p>
                            </div>

                            <div className="space-y-2">
                              <Label>Suffix</Label>
                              <Input
                                value={stat.suffix || ''}
                                onChange={(e) => {
                                  const newStats = [...(settings.home?.stats || [])];
                                  newStats[index] = { ...newStats[index], suffix: e.target.value };
                                  updateSetting(['home', 'stats'], newStats);
                                }}
                                placeholder="e.g., +, %, M+"
                              />
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                Text after number (e.g., +, %, M+)
                              </p>
                            </div>

                            <div className="space-y-2">
                              <Label>Label</Label>
                              <Input
                                value={stat.label || ''}
                                onChange={(e) => {
                                  const newStats = [...(settings.home?.stats || [])];
                                  newStats[index] = { ...newStats[index], label: e.target.value };
                                  updateSetting(['home', 'stats'], newStats);
                                }}
                                placeholder="e.g., Projects Delivered"
                              />
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                Description text below the number
                              </p>
                            </div>
                          </div>
                          <div className="mt-3 p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded border border-cyan-200 dark:border-cyan-800">
                            <p className="text-sm text-cyan-800 dark:text-cyan-200">
                              Preview: <span className="font-bold text-lg">{stat.value}{stat.suffix}</span> {stat.label}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* About Page Stats */}
                <AccordionItem value="about-stats">
                  <AccordionTrigger>
                    <span className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      About Page Statistics
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-6 pt-4">
                      {settings.about?.stats?.map((stat: any, index: number) => (
                        <div key={index} className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                          <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                            Stat {index + 1}: {stat.label}
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label>Value (Number)</Label>
                              <Input
                                type="number"
                                value={typeof stat.value === 'number' ? stat.value : parseInt(String(stat.value).replace(/\D/g, '')) || 0}
                                onChange={(e) => {
                                  const newStats = [...(settings.about?.stats || [])];
                                  newStats[index] = { ...newStats[index], value: parseInt(e.target.value) || 0 };
                                  updateSetting(['about', 'stats'], newStats);
                                }}
                              />
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                Numeric value (e.g., 50, 500, 99)
                              </p>
                            </div>

                            <div className="space-y-2">
                              <Label>Suffix</Label>
                              <Input
                                value={stat.suffix || ''}
                                onChange={(e) => {
                                  const newStats = [...(settings.about?.stats || [])];
                                  newStats[index] = { ...newStats[index], suffix: e.target.value };
                                  updateSetting(['about', 'stats'], newStats);
                                }}
                                placeholder="e.g., +, %"
                              />
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                Text after number (e.g., +, %)
                              </p>
                            </div>

                            <div className="space-y-2">
                              <Label>Label</Label>
                              <Input
                                value={stat.label || ''}
                                onChange={(e) => {
                                  const newStats = [...(settings.about?.stats || [])];
                                  newStats[index] = { ...newStats[index], label: e.target.value };
                                  updateSetting(['about', 'stats'], newStats);
                                }}
                                placeholder="e.g., Team Members"
                              />
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                Description text below the number
                              </p>
                            </div>
                          </div>
                          <div className="mt-3 p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded border border-cyan-200 dark:border-cyan-800">
                            <p className="text-sm text-cyan-800 dark:text-cyan-200">
                              Preview: <span className="font-bold text-lg">{stat.value}{stat.suffix}</span> {stat.label}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Additional Numeric Controls */}
                <AccordionItem value="additional-controls">
                  <AccordionTrigger>
                    <span className="flex items-center gap-2">
                      <Database className="w-4 h-4" />
                      Additional Numeric Controls
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-4">
                      <Alert className="bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800">
                        <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                        <AlertDescription className="text-cyan-800 dark:text-cyan-200">
                          <strong>Dynamic System:</strong> All numeric values on this page are fetched from the database in real-time. 
                          When you update and save these values, they immediately affect the website display after page refresh.
                        </AlertDescription>
                      </Alert>

                      <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                        <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                        <AlertDescription className="text-green-800 dark:text-green-200">
                          <strong>Best Practice:</strong> Keep metric values realistic and consistent with your company's actual performance. 
                          Consider updating these values regularly to reflect growth and current status.
                        </AlertDescription>
                      </Alert>

                      <div className="space-y-2">
                        <h3 className="text-slate-900 dark:text-white">Implementation Notes</h3>
                        <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2 list-disc list-inside">
                          <li>All values are stored in the <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">global_settings</code> database table</li>
                          <li>Changes take effect after saving and reloading the website</li>
                          <li>Numeric values support integers and decimals (latitude/longitude)</li>
                          <li>Metrics with suffixes (%, +, M+, /7) are configured separately</li>
                          <li>The website fetches these values on page load using the SettingsContext</li>
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </TabsContent>

          {/* CI/CD Pipeline Tab */}
          <TabsContent value="cicdPipeline" className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-slate-900 dark:text-white mb-2">CI/CD Pipeline Stages</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Manage the pipeline stages displayed on the homepage. Add, edit, remove, or reorder stages.
                  </p>
                </div>
                <Button
                  onClick={() => {
                    const newStage = {
                      stage: 'New Stage',
                      icon: 'Code2',
                      description: 'Description of this stage',
                      details: ['Detail 1', 'Detail 2', 'Detail 3'],
                      color: 'from-cyan-500 to-blue-600',
                      position: 'left',
                    };
                    const newStages = [...(settings.home?.cicdPipeline?.stages || []), newStage];
                    updateSetting(['home', 'cicdPipeline', 'stages'], newStages);
                  }}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Stage
                </Button>
              </div>

              <div className="space-y-4">
                {settings.home?.cicdPipeline?.stages?.map((stage: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 border-2 border-slate-200 dark:border-slate-600"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stage.color} flex items-center justify-center`}>
                          <span className="text-white font-bold">{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-900 dark:text-white">{stage.stage}</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Position: {stage.position}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            if (index === 0) return;
                            const newStages = [...(settings.home?.cicdPipeline?.stages || [])];
                            [newStages[index - 1], newStages[index]] = [newStages[index], newStages[index - 1]];
                            updateSetting(['home', 'cicdPipeline', 'stages'], newStages);
                          }}
                          disabled={index === 0}
                        >
                          <ArrowUp className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            if (index === (settings.home?.cicdPipeline?.stages?.length || 0) - 1) return;
                            const newStages = [...(settings.home?.cicdPipeline?.stages || [])];
                            [newStages[index], newStages[index + 1]] = [newStages[index + 1], newStages[index]];
                            updateSetting(['home', 'cicdPipeline', 'stages'], newStages);
                          }}
                          disabled={index === (settings.home?.cicdPipeline?.stages?.length || 0) - 1}
                        >
                          <ArrowDown className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            if (confirm('Are you sure you want to delete this stage?')) {
                              const newStages = (settings.home?.cicdPipeline?.stages || []).filter((_: any, i: number) => i !== index);
                              updateSetting(['home', 'cicdPipeline', 'stages'], newStages);
                            }
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Stage Name</Label>
                        <Input
                          value={stage.stage || ''}
                          onChange={(e) => {
                            const newStages = [...(settings.home?.cicdPipeline?.stages || [])];
                            newStages[index] = { ...newStages[index], stage: e.target.value };
                            updateSetting(['home', 'cicdPipeline', 'stages'], newStages);
                          }}
                          placeholder="e.g., Code Commit"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Icon (Lucide React)</Label>
                        <select
                          className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                          value={stage.icon || 'Code2'}
                          onChange={(e) => {
                            const newStages = [...(settings.home?.cicdPipeline?.stages || [])];
                            newStages[index] = { ...newStages[index], icon: e.target.value };
                            updateSetting(['home', 'cicdPipeline', 'stages'], newStages);
                          }}
                        >
                          <option value="Code2">Code2</option>
                          <option value="Package">Package</option>
                          <option value="TestTube">TestTube</option>
                          <option value="Shield">Shield</option>
                          <option value="FileCheck">FileCheck</option>
                          <option value="Server">Server</option>
                          <option value="Upload">Upload</option>
                          <option value="CheckCircle">CheckCircle</option>
                          <option value="GitBranch">GitBranch</option>
                          <option value="Workflow">Workflow</option>
                          <option value="Database">Database</option>
                          <option value="Cloud">Cloud</option>
                          <option value="Lock">Lock</option>
                          <option value="Activity">Activity</option>
                          <option value="Cpu">Cpu</option>
                        </select>
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          value={stage.description || ''}
                          onChange={(e) => {
                            const newStages = [...(settings.home?.cicdPipeline?.stages || [])];
                            newStages[index] = { ...newStages[index], description: e.target.value };
                            updateSetting(['home', 'cicdPipeline', 'stages'], newStages);
                          }}
                          rows={2}
                          placeholder="Description of this pipeline stage"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Color Gradient</Label>
                        <select
                          className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                          value={stage.color || 'from-cyan-500 to-blue-600'}
                          onChange={(e) => {
                            const newStages = [...(settings.home?.cicdPipeline?.stages || [])];
                            newStages[index] = { ...newStages[index], color: e.target.value };
                            updateSetting(['home', 'cicdPipeline', 'stages'], newStages);
                          }}
                        >
                          <option value="from-cyan-500 to-blue-600">Cyan to Blue</option>
                          <option value="from-blue-500 to-purple-600">Blue to Purple</option>
                          <option value="from-purple-500 to-pink-600">Purple to Pink</option>
                          <option value="from-pink-500 to-rose-600">Pink to Rose</option>
                          <option value="from-orange-500 to-red-600">Orange to Red</option>
                          <option value="from-yellow-500 to-orange-600">Yellow to Orange</option>
                          <option value="from-green-500 to-teal-600">Green to Teal</option>
                          <option value="from-teal-500 to-cyan-600">Teal to Cyan</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label>Position</Label>
                        <select
                          className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                          value={stage.position || 'left'}
                          onChange={(e) => {
                            const newStages = [...(settings.home?.cicdPipeline?.stages || [])];
                            newStages[index] = { ...newStages[index], position: e.target.value };
                            updateSetting(['home', 'cicdPipeline', 'stages'], newStages);
                          }}
                        >
                          <option value="left">Left</option>
                          <option value="right">Right</option>
                        </select>
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <Label>Details (comma-separated)</Label>
                        <Input
                          value={(stage.details || []).join(', ')}
                          onChange={(e) => {
                            const newStages = [...(settings.home?.cicdPipeline?.stages || [])];
                            newStages[index] = { ...newStages[index], details: e.target.value.split(',').map((d: string) => d.trim()) };
                            updateSetting(['home', 'cicdPipeline', 'stages'], newStages);
                          }}
                          placeholder="e.g., Git Push, Branch Protection, Code Review"
                        />
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Enter details separated by commas
                        </p>
                      </div>
                    </div>

                    {/* Preview */}
                    <div className="mt-4 p-4 rounded-lg bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700">
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Preview:</p>
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stage.color} flex items-center justify-center flex-shrink-0`}>
                          <GitBranch className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-slate-900 dark:text-white mb-1">{stage.stage}</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{stage.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {(stage.details || []).map((detail: string, idx: number) => (
                              <span key={idx} className="px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs">
                                {detail}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {(!settings.home?.cicdPipeline?.stages || settings.home.cicdPipeline.stages.length === 0) && (
                  <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                    <Workflow className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No pipeline stages yet. Click "Add Stage" to create your first stage.</p>
                  </div>
                )}
              </div>

              {/* Info Banner */}
              <Alert className="mt-6 bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800">
                <GitBranch className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                <AlertDescription className="text-cyan-800 dark:text-cyan-200">
                  <div className="space-y-2">
                    <p className="font-medium">💡 How to use CI/CD Pipeline Editor:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li><strong>Add Stage:</strong> Click the "Add Stage" button to create a new pipeline stage</li>
                      <li><strong>Reorder:</strong> Use the ↑ ↓ buttons to change the order of stages</li>
                      <li><strong>Delete:</strong> Click the 🗑️ button to remove a stage</li>
                      <li><strong>Icon:</strong> Choose from 15+ available Lucide React icons</li>
                      <li><strong>Position:</strong> Set whether the stage appears on left or right side</li>
                      <li><strong>Color:</strong> Select from 8 beautiful gradient combinations</li>
                      <li><strong>Details:</strong> Add comma-separated tags that appear below the description</li>
                      <li>Changes are saved to database and appear immediately on the homepage after saving</li>
                    </ul>
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
