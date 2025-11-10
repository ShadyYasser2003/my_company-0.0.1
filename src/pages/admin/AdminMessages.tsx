import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Eye, Trash2, Clock, User, Search, CheckCircle, RefreshCw } from 'lucide-react';
import { supabase } from '../../utils/supabase/client';
import { toast } from 'sonner@2.0.3';

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  read: boolean;
}

export function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setMessages(data || []);
      toast.success('Messages loaded successfully');
    } catch (error) {
      console.error('Error loading messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ read: true, updated_at: new Date().toISOString() })
        .eq('id', messageId);

      if (error) {
        throw error;
      }

      setMessages(messages.map(m => m.id === messageId ? { ...m, read: true } : m));
      if (selectedMessage?.id === messageId) {
        setSelectedMessage({ ...selectedMessage, read: true });
      }
    } catch (error) {
      console.error('Error marking as read:', error);
      toast.error('Failed to mark as read');
    }
  };

  const deleteMessage = async (messageId: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', messageId);

      if (error) {
        throw error;
      }

      setMessages(messages.filter(m => m.id !== messageId));
      if (selectedMessage?.id === messageId) {
        setSelectedMessage(null);
      }
      toast.success('Message deleted successfully');
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error('Failed to delete message');
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = 
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filter === 'all' ? true :
      filter === 'unread' ? !message.read :
      message.read;
    
    return matchesSearch && matchesFilter;
  });

  const unreadCount = messages.filter(m => !m.read).length;

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Mail className="w-8 h-8 text-cyan-500" />
              <h1 className="text-3xl text-slate-900 dark:text-white">Messages</h1>
              {unreadCount > 0 && (
                <span className="px-3 py-1 rounded-full bg-red-500 text-white text-sm">
                  {unreadCount} new
                </span>
              )}
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              View and manage contact form submissions
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={loadMessages}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 text-white hover:bg-cyan-600 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </motion.button>
        </div>

        {/* Filters & Search */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-3 rounded-xl transition-all ${
                filter === 'all'
                  ? 'bg-cyan-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              All ({messages.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-3 rounded-xl transition-all ${
                filter === 'unread'
                  ? 'bg-cyan-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              Unread ({unreadCount})
            </button>
            <button
              onClick={() => setFilter('read')}
              className={`px-4 py-3 rounded-xl transition-all ${
                filter === 'read'
                  ? 'bg-cyan-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              Read ({messages.length - unreadCount})
            </button>
          </div>
        </div>

        {/* Messages Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Messages List */}
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {loading ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-slate-600 dark:text-slate-400">Loading messages...</p>
              </div>
            ) : filteredMessages.length === 0 ? (
              <div className="text-center py-12">
                <Mail className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
                <p className="text-slate-600 dark:text-slate-400">No messages found</p>
              </div>
            ) : (
              filteredMessages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => {
                    setSelectedMessage(message);
                    if (!message.read) {
                      markAsRead(message.id);
                    }
                  }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedMessage?.id === message.id
                      ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20'
                      : message.read
                      ? 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600'
                      : 'border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-900/10 hover:border-cyan-300 dark:hover:border-cyan-700'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-slate-400" />
                      <span className={`${!message.read ? 'font-bold' : ''} text-slate-900 dark:text-white`}>
                        {message.name}
                      </span>
                      {!message.read && (
                        <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <Clock className="w-3 h-3" />
                      {formatDate(message.created_at)}
                    </div>
                  </div>
                  <p className={`text-sm mb-1 ${!message.read ? 'font-semibold' : ''} text-slate-900 dark:text-white`}>
                    {message.subject}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                    {message.message}
                  </p>
                </motion.div>
              ))
            )}
          </div>

          {/* Message Detail */}
          <div className="lg:sticky lg:top-8 h-fit">
            {selectedMessage ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
                  <div>
                    <h2 className="text-xl text-slate-900 dark:text-white mb-2">
                      {selectedMessage.subject}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {selectedMessage.name}
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {selectedMessage.email}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {selectedMessage.read && (
                      <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                    )}
                    <button
                      onClick={() => deleteMessage(selectedMessage.id)}
                      className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                </div>

                {/* Message Body */}
                <div className="mb-6">
                  <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>

                {/* Footer */}
                <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {new Date(selectedMessage.created_at).toLocaleString()}
                    </div>
                    <a
                      href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 transition-all"
                    >
                      Reply via Email
                    </a>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-12 text-center">
                <Mail className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
                <p className="text-slate-600 dark:text-slate-400">
                  Select a message to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
