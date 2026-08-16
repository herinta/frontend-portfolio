import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { supabase } from '../../utils/supabase';

gsap.registerPlugin(ScrollTrigger);

interface Comment {
  id: string;
  name: string;
  message: string;
  date: string;
  colorClass: string;
  rotation: number;
  isOutgoing?: boolean;
}

const PASTEL_COLORS = [
  'bg-amber-100/90 text-amber-950 border-amber-200/50 shadow-amber-100/10',
  'bg-rose-100/90 text-rose-950 border-rose-200/50 shadow-rose-100/10',
  'bg-emerald-100/90 text-emerald-950 border-emerald-200/50 shadow-emerald-100/10',
  'bg-sky-100/90 text-sky-950 border-sky-200/50 shadow-sky-100/10',
  'bg-indigo-100/90 text-indigo-950 border-indigo-200/50 shadow-indigo-100/10',
  'bg-purple-100/90 text-purple-950 border-purple-200/50 shadow-purple-100/10',
];

const PRESET_COMMENTS = [
  { name: 'Budi', message: 'Website portofolio paling keren! Animasi tech stacknya luar biasa halus.' },
  { name: 'Alice', message: 'Very clean design and smooth transitions. Love the interactive dots!' },
  { name: 'John Doe', message: 'Highly talented software engineer. Inspiring portfolio layout!' },
  { name: 'Siti Aminah', message: 'Tampilannya fresh banget, transisi planetnya epik abis. Mantap!' },
  { name: 'Rian Kurnia', message: 'Kreatif banget padlet wall-nya. Sukses terus karirnya!' },
  { name: 'Jessica', message: 'Creative workspace showcase! Keep up the good work.' },
  { name: 'David', message: 'Awesome layout! The planet transition is very smooth.' },
  { name: 'Lisa', message: 'Love the pastel sticky note concept! Very interactive.' },
  { name: 'Kevin', message: 'Suka banget sama card tech stacknya, keren parah.' },
  { name: 'Sarah', message: 'Portfolio terbaik yang pernah kulihat tahun ini.' },
];

const CARD_WIDTH = 260; // card width

const FIXED_SLOTS = [
  // Left Column (Top to Bottom: 6 slots - 12% spacing)
  { top: '12%', left: '4%', rotate: -4 },  // Slot 0: Kiri Atas (Newest)
  { top: '24%', left: '2%', rotate: 3 },   // Slot 1
  { top: '36%', left: '5%', rotate: -2 },  // Slot 2
  { top: '48%', left: '3%', rotate: 4 },   // Slot 3
  { top: '60%', left: '2%', rotate: -3 },  // Slot 4
  { top: '72%', left: '4%', rotate: 3 },   // Slot 5: Kiri Bawah
  // Right Column (Top to Bottom: 6 slots - 12% spacing)
  { top: '12%', left: `calc(100% - ${CARD_WIDTH}px - 4%)`, rotate: 5 },   // Slot 6: Kanan Atas
  { top: '24%', left: `calc(100% - ${CARD_WIDTH}px - 2%)`, rotate: -3 },  // Slot 7
  { top: '36%', left: `calc(100% - ${CARD_WIDTH}px - 5%)`, rotate: 3 },   // Slot 8
  { top: '48%', left: `calc(100% - ${CARD_WIDTH}px - 3%)`, rotate: -4 },  // Slot 9
  { top: '60%', left: `calc(100% - ${CARD_WIDTH}px - 2%)`, rotate: 2 },   // Slot 10
  { top: '72%', left: `calc(100% - ${CARD_WIDTH}px - 4%)`, rotate: 4 },   // Slot 11: Kanan Bawah (Oldest)
];

export const Section6: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const formRef = useRef<HTMLDivElement>(null);

  // Helper to format dates relatively
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  };

  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Security Verification States
  const [honeypot, setHoneypot] = useState('');
  const [cooldown, setCooldown] = useState(0);

  // Fetch comments from Supabase on mount and check rate limit
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data, error } = await supabase
          .from('sticky_notes')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data) {
          const mapped: Comment[] = data.map((item: any) => ({
            id: item.id.toString(),
            name: item.name,
            message: item.message,
            date: formatDate(item.created_at),
            colorClass: item.color_class,
            rotation: item.rotation,
          }));
          setComments(mapped);
        }
      } catch (err) {
        console.error('Error fetching comments:', err);
      }
    };

    fetchComments();

    // Check localStorage for active rate-limiting cooldown
    const lastSubmit = localStorage.getItem('last_sticky_note_submit');
    if (lastSubmit) {
      const elapsed = Date.now() - parseInt(lastSubmit, 10);
      const remaining = Math.ceil((60000 - elapsed) / 1000);
      if (remaining > 0) {
        setCooldown(remaining);
      }
    }
  }, []);

  // Cooldown countdown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  useGSAP(() => {
    // Form card slide-up
    gsap.fromTo(formRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
        }
      }
    );
  }, { scope: containerRef });

  const animateEntrance = (id: string) => {
    setTimeout(() => {
      const el = document.getElementById(`comment-${id}`);
      if (el) {
        gsap.fromTo(el,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: 'back.out(1.4)',
          }
        );
      }
    }, 50);
  };

  const animateExit = (id: string, callback: () => void) => {
    const el = document.getElementById(`comment-${id}`);
    if (el) {
      gsap.to(el, {
        x: 200,
        y: 200,
        opacity: 0,
        scale: 0.5,
        duration: 0.6,
        ease: 'power2.in',
        onComplete: callback,
      });
    } else {
      callback();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cooldown > 0) return;
    if (isSubmitting) return;

    // 1. Honeypot check (silent bot blocker)
    if (honeypot) {
      console.log('Bot submission trapped via honeypot field.');
      setName('');
      setMessage('');
      setHoneypot('');
      return;
    }

    if (!name.trim() || !message.trim()) return;

    // 2. URL/Link content block (prevents backlink spam crawlers)
    const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)|(\.[a-zA-Z]{2,6}\b)/i;
    if (urlRegex.test(message) || urlRegex.test(name)) {
      alert('For security reasons, links or URLs are not allowed in messages.');
      return;
    }

    // 3. CAPTCHA verification popup
    const n1 = Math.floor(Math.random() * 8) + 2; // 2 to 9
    const n2 = Math.floor(Math.random() * 8) + 2; // 2 to 9
    const correctAnswer = n1 + n2;
    const answerInput = prompt(`Are you human? Please solve this: ${n1} + ${n2} = ?`);

    if (answerInput === null) return; // User cancelled the prompt

    if (parseInt(answerInput.trim(), 10) !== correctAnswer) {
      alert('Verification failed. Incorrect answer.');
      return;
    }

    setIsSubmitting(true);

    const newRotation = Math.random() * 6 - 3;
    const newColorClass = PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)];

    try {
      // Insert new comment into Supabase
      const { data, error } = await supabase
        .from('sticky_notes')
        .insert([
          {
            name: name.trim(),
            message: message.trim(),
            color_class: newColorClass,
            rotation: newRotation,
          }
        ])
        .select();

      if (error) throw error;

      if (data && data[0]) {
        const inserted = data[0];
        const newComment: Comment = {
          id: inserted.id.toString(),
          name: inserted.name,
          message: inserted.message,
          date: 'Just now',
          colorClass: inserted.color_class,
          rotation: inserted.rotation,
        };

        const activeComments = comments.filter(c => !c.isOutgoing);

        // Max 12 comments on desktop slots
        if (activeComments.length >= 12) {
          const oldestComment = activeComments[11];
          setComments(prev => prev.map(c => 
            c.id === oldestComment.id ? { ...c, isOutgoing: true } : c
          ));

          animateExit(oldestComment.id, () => {
            setComments(prev => {
              const filtered = prev.filter(c => c.id !== oldestComment.id);
              return [newComment, ...filtered];
            });
            animateEntrance(newComment.id);
          });
        } else {
          setComments(prev => [newComment, ...prev]);
          animateEntrance(newComment.id);
        }

        // Set persistent 60s cooldown limit in localStorage
        const now = Date.now();
        localStorage.setItem('last_sticky_note_submit', now.toString());
        setCooldown(60);
      }
    } catch (err) {
      console.error('Error inserting comment:', err);
    } finally {
      setName('');
      setMessage('');
      setHoneypot('');
      setIsSubmitting(false);
    }
  };

  const activeComments = comments.filter(c => !c.isOutgoing);

  return (
    <section
      ref={containerRef}
      id="guestbook"
      className="relative w-full min-h-screen py-28 px-6 bg-gradient-to-b from-white via-sky-100 to-slate-950 text-slate-800 flex flex-col items-center justify-center gap-8 overflow-x-hidden overflow-y-visible md:overflow-hidden"
    >
        {/* Soft atmospheric background glow */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-sky-200/40 rounded-full blur-[140px] pointer-events-none z-0" />

        {/* DESKTOP VIEW: SCATTERED CONVEYOR BELT COMMENTS */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          {comments.map((comment, index) => {
            const isActive = !comment.isOutgoing;
            const slotIndex = isActive ? activeComments.indexOf(comment) : 11;
            const slot = FIXED_SLOTS[slotIndex];
            if (!slot) return null;

            return (
              <div
                key={comment.id}
                id={`comment-${comment.id}`}
                ref={(el) => {
                  if (index < PRESET_COMMENTS.length) {
                    cardsRef.current[index] = el;
                  }
                }}
                style={{
                  position: 'absolute',
                  top: slot.top,
                  left: slot.left,
                  transform: `rotate(${comment.rotation}deg)`,
                }}
                className={`
                  hidden md:flex flex-col p-4 w-[260px] rounded-2xl border shadow-lg backdrop-blur-sm
                  transition-[transform,opacity] duration-700 ease-out pointer-events-auto
                  ${comment.colorClass}
                `}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-extrabold text-xs tracking-wide truncate max-w-[150px]">
                    {comment.name}
                  </span>
                  <span className="text-[9px] opacity-60 font-semibold">{comment.date}</span>
                </div>
                <p className="text-[11px] leading-relaxed font-semibold break-words opacity-95">
                  "{comment.message}"
                </p>
              </div>
            );
          })}
        </div>

        {/* CENTRAL COLUMN: Central Form Card */}
        <div className="flex justify-center w-full z-20">
          <div 
            ref={formRef}
            className="w-full max-w-sm rounded-3xl border border-white/60 bg-white/70 backdrop-blur-xl p-8 shadow-2xl text-left"
          >
            <div className="absolute -top-3 -right-3 w-10 h-10 bg-indigo-500/20 rounded-full blur-xl pointer-events-none" />

            <h3 
              className="text-4xl md:text-5xl font-medium italic text-indigo-950 text-center leading-none mb-3"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              Leave a Trace
            </h3>
            <p className="text-slate-600 text-xs md:text-sm text-center font-medium max-w-[280px] mx-auto mb-6 leading-relaxed">
              Write a message, offer feedback, or just say hi to leave your sticky note on my wall!
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* 1. Honeypot Field (Visually hidden to trap autofill spam bots) */}
              <input
                type="text"
                name="user_confirm_email_secure"
                value={honeypot}
                onChange={e => setHoneypot(e.target.value)}
                className="absolute opacity-0 w-0 h-0 pointer-events-none"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-indigo-950 tracking-wider">YOUR NAME</label>
                <input
                  type="text"
                  placeholder="Name or handle..."
                  value={name}
                  onChange={e => setName(e.target.value)}
                  maxLength={20}
                  required
                  className="px-4 py-2 rounded-lg bg-white/50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors text-xs font-semibold"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-indigo-950 tracking-wider">YOUR STICKY NOTE</label>
                <textarea
                  placeholder="Write your comment here..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  maxLength={100}
                  rows={3}
                  required
                  className="px-4 py-2 rounded-lg bg-white/50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors text-xs font-semibold resize-none"
                />
              </div>

              {/* Submit button with Cooldown Feedback */}
              <button
                type="submit"
                disabled={isSubmitting || cooldown > 0}
                className={`mt-2 w-full py-2.5 rounded-lg text-white font-bold transition-all shadow-md text-xs tracking-wider ${
                  (isSubmitting || cooldown > 0)
                    ? 'bg-slate-400 cursor-not-allowed opacity-80' 
                    : 'bg-indigo-950 hover:bg-indigo-900'
                }`}
              >
                {cooldown > 0 
                  ? `COOLDOWN (${cooldown}s)` 
                  : (isSubmitting ? 'SENDING...' : 'POST STICKY NOTE')
                }
              </button>
            </form>
          </div>
        </div>

        {/* MOBILE VIEW FOR COMMENTS (Rendered inline below the form) */}
        <div className="md:hidden w-full max-w-sm flex flex-col gap-4 z-10">
          <h4 className="text-lg font-bold text-indigo-950/80 text-center mb-1 uppercase tracking-wider">Sticky Notes</h4>
          <div className="flex flex-col gap-4 max-h-[360px] overflow-y-auto pr-1">
            {activeComments.map(comment => (
              <div
                key={comment.id}
                className={`flex flex-col p-4 rounded-xl border shadow-sm ${comment.colorClass}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-extrabold text-sm tracking-wide truncate">{comment.name}</span>
                  <span className="text-[10px] opacity-60 font-semibold">{comment.date}</span>
                </div>
                <p className="text-xs leading-relaxed font-semibold">"{comment.message}"</p>
              </div>
            ))}
          </div>
        </div>

      </section>
  );
};
