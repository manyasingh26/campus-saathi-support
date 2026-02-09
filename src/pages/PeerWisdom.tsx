import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ThumbsUp, ThumbsDown, MessageCircle, Flag, ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BottomNav from "@/components/BottomNav";

const categories = [
  { id: "academic", emoji: "📚", label: "Academic Stress" },
  { id: "relationships", emoji: "💔", label: "Relationships" },
  { id: "homesickness", emoji: "🏠", label: "Homesickness" },
  { id: "anxiety", emoji: "😰", label: "Anxiety" },
  { id: "career", emoji: "🎯", label: "Career Confusion" },
  { id: "sleep", emoji: "💤", label: "Sleep Issues" },
  { id: "social-media", emoji: "📱", label: "Social Media" },
  { id: "living-alone", emoji: "🍜", label: "Living Alone" },
  { id: "financial", emoji: "💰", label: "Financial Stress" },
  { id: "confidence", emoji: "🎤", label: "Stage Fear" },
];

interface WisdomPost {
  id: string;
  category: string;
  title: string;
  preview: string;
  fullStory: string;
  whatWorked: string;
  advice: string;
  author: string;
  upvotes: number;
  comments: number;
  postedAgo: string;
}

const samplePosts: WisdomPost[] = [
  {
    id: "1", category: "academic", title: "How I dealt with exam burnout",
    preview: "I was studying 12 hours a day and completely burning out. Nothing was sticking anymore...",
    fullStory: "I was studying 12 hours a day before my semester exams. Nothing was sticking. I felt like a failure because everyone else seemed fine.",
    whatWorked: "I switched to the Pomodoro technique - 25 min study, 5 min break. I also started sleeping 7+ hours instead of pulling all-nighters.",
    advice: "Your brain needs rest to learn. Studying less but smarter actually works better. Don't compare your study hours to others.",
    author: "Anonymous 3rd Year Student", upvotes: 47, comments: 12, postedAgo: "2 days ago"
  },
  {
    id: "2", category: "homesickness", title: "First month away from home was the hardest",
    preview: "I cried every night for the first two weeks. The food was different, nobody knew me...",
    fullStory: "Moving to college 800km from home was brutal. I missed my mom's cooking, my room, even the noisy neighbors.",
    whatWorked: "I started a video call ritual with family every evening. I also joined a cooking club and learned to make comfort food from home.",
    advice: "It DOES get better. Give yourself permission to feel homesick. Find one thing that reminds you of home.",
    author: "Anonymous 2nd Year Student", upvotes: 63, comments: 24, postedAgo: "5 days ago"
  },
  {
    id: "3", category: "anxiety", title: "Managing presentation anxiety",
    preview: "I used to literally shake before presentations. My voice would crack and I'd forget everything...",
    fullStory: "Public speaking was my nightmare. I'd avoid any class that had presentations.",
    whatWorked: "I started practicing in front of my mirror, then one friend, then two. I also did breathing exercises before presenting.",
    advice: "Start small. Even talking in a group of 3 is progress. Nobody notices your nervousness as much as you think.",
    author: "Anonymous 4th Year Student", upvotes: 35, comments: 8, postedAgo: "1 week ago"
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const PeerWisdom = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [shareOpen, setShareOpen] = useState(false);
  const [shareStep, setShareStep] = useState(1);
  const [shareData, setShareData] = useState({ category: "", problem: "", tried: "", worked: "", advice: "" });

  const filteredPosts = samplePosts.filter((p) => {
    const matchesCategory = !activeCategory || p.category === activeCategory;
    const matchesSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.preview.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleVote = (postId: string, delta: number) => {
    setVotes((prev) => ({ ...prev, [postId]: (prev[postId] || 0) + delta }));
  };

  const getCategoryEmoji = (catId: string) => categories.find((c) => c.id === catId)?.emoji || "📝";

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="px-6 pt-8 pb-4">
        <motion.h1 initial="hidden" animate="visible" custom={0} variants={fadeUp}
          className="text-2xl font-extrabold text-foreground">Wisdom from Students Like You 💡</motion.h1>
        <motion.p initial="hidden" animate="visible" custom={1} variants={fadeUp}
          className="text-muted-foreground mt-1">Real strategies that worked for real students</motion.p>
      </header>

      {/* Share Button */}
      <motion.div initial="hidden" animate="visible" custom={2} variants={fadeUp} className="px-6 mb-4">
        <Dialog open={shareOpen} onOpenChange={(o) => { setShareOpen(o); if (!o) setShareStep(1); }}>
          <DialogTrigger asChild>
            <Button className="w-full rounded-2xl font-bold h-12">Share Your Story ✍️</Button>
          </DialogTrigger>
          <DialogContent className="rounded-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {shareStep === 1 && "Step 1: Select Category"}
                {shareStep === 2 && "Step 2: Tell Your Story"}
                {shareStep === 3 && "Step 3: Review & Share"}
              </DialogTitle>
            </DialogHeader>
            {shareStep === 1 && (
              <div className="grid grid-cols-2 gap-2 mt-2">
                {categories.map((c) => (
                  <button key={c.id} onClick={() => { setShareData((d) => ({ ...d, category: c.id })); setShareStep(2); }}
                    className="p-3 rounded-xl bg-muted hover:bg-accent text-left text-sm font-semibold transition-colors">
                    {c.emoji} {c.label}
                  </button>
                ))}
              </div>
            )}
            {shareStep === 2 && (
              <div className="space-y-3 mt-2">
                <div>
                  <label className="text-sm font-semibold text-foreground">What was the problem?</label>
                  <Textarea value={shareData.problem} onChange={(e) => setShareData((d) => ({ ...d, problem: e.target.value }))}
                    placeholder="Describe what you were going through..." className="rounded-xl mt-1" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground">What did you try?</label>
                  <Textarea value={shareData.tried} onChange={(e) => setShareData((d) => ({ ...d, tried: e.target.value }))}
                    placeholder="What approaches did you take?" className="rounded-xl mt-1" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground">What actually worked?</label>
                  <Textarea value={shareData.worked} onChange={(e) => setShareData((d) => ({ ...d, worked: e.target.value }))}
                    placeholder="The thing that made a difference..." className="rounded-xl mt-1" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground">Advice for others?</label>
                  <Textarea value={shareData.advice} onChange={(e) => setShareData((d) => ({ ...d, advice: e.target.value }))}
                    placeholder="What would you tell someone going through this?" className="rounded-xl mt-1" />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setShareStep(1)} className="rounded-xl">Back</Button>
                  <Button onClick={() => setShareStep(3)} className="flex-1 rounded-xl font-bold">Preview</Button>
                </div>
              </div>
            )}
            {shareStep === 3 && (
              <div className="space-y-3 mt-2">
                <div className="p-4 rounded-xl bg-muted">
                  <p className="text-xs text-muted-foreground mb-1">{getCategoryEmoji(shareData.category)} {categories.find((c) => c.id === shareData.category)?.label}</p>
                  <p className="text-sm"><strong>Problem:</strong> {shareData.problem}</p>
                  <p className="text-sm"><strong>What worked:</strong> {shareData.worked}</p>
                  <p className="text-sm"><strong>Advice:</strong> {shareData.advice}</p>
                  <p className="text-xs text-muted-foreground mt-2">— Anonymous Student</p>
                </div>
                <p className="text-xs text-muted-foreground text-center">Your identity stays hidden. You're helping others! 💛</p>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setShareStep(2)} className="rounded-xl">Edit</Button>
                  <Button onClick={() => { setShareOpen(false); setShareStep(1); }} className="flex-1 rounded-xl font-bold">
                    Share Anonymously 🚀
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Search */}
      <motion.div initial="hidden" animate="visible" custom={3} variants={fadeUp} className="px-6 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="What are you struggling with?"
            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-xl" />
        </div>
      </motion.div>

      {/* Category Filter */}
      <motion.div initial="hidden" animate="visible" custom={4} variants={fadeUp}
        className="px-6 mb-6 overflow-x-auto">
        <div className="flex gap-2 pb-2">
          <button onClick={() => setActiveCategory(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              !activeCategory ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
            All
          </button>
          {categories.map((c) => (
            <button key={c.id} onClick={() => setActiveCategory(activeCategory === c.id ? null : c.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategory === c.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              {c.emoji} {c.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Top Wisdom Sidebar */}
      <motion.section initial="hidden" animate="visible" custom={5} variants={fadeUp} className="px-6 mb-6">
        <div className="p-4 rounded-2xl bg-soft-peach border border-border">
          <h3 className="font-bold text-foreground text-sm mb-2">🌟 Most Helpful This Week</h3>
          {samplePosts.slice(0, 3).map((p, i) => (
            <p key={p.id} className="text-xs text-muted-foreground mb-1">
              {i + 1}. {p.title} — ⬆️ {p.upvotes + (votes[p.id] || 0)}
            </p>
          ))}
        </div>
      </motion.section>

      {/* Posts Feed */}
      <section className="px-6 space-y-4 mb-6">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-3xl mb-2">🌱</p>
            <p className="font-bold text-foreground">Be the first to share advice about this!</p>
            <p className="text-sm text-muted-foreground">Your experience could help someone.</p>
          </div>
        ) : (
          filteredPosts.map((post, i) => {
            const isExpanded = expandedPost === post.id;
            return (
              <motion.div key={post.id} initial="hidden" animate="visible" custom={6 + i} variants={fadeUp}
                className="p-5 rounded-2xl bg-card border border-border shadow-soft">
                <div className="flex items-start gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold bg-calm-sky text-secondary-foreground`}>
                    {getCategoryEmoji(post.category)} {categories.find((c) => c.id === post.category)?.label}
                  </span>
                  <span className="text-xs text-muted-foreground ml-auto">{post.postedAgo}</span>
                </div>
                <h3 className="font-bold text-foreground mb-1">{post.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{isExpanded ? post.fullStory : post.preview}</p>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="space-y-2 mb-3 pt-2 border-t border-border">
                        <div>
                          <p className="text-xs font-bold text-foreground">What worked:</p>
                          <p className="text-sm text-muted-foreground">{post.whatWorked}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-foreground">Advice:</p>
                          <p className="text-sm text-muted-foreground">{post.advice}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{post.author}</span>
                  <span className="ml-auto flex items-center gap-1">
                    <button onClick={() => handleVote(post.id, 1)}
                      className="hover:text-primary transition-colors"><ThumbsUp className="h-3.5 w-3.5" /></button>
                    {post.upvotes + (votes[post.id] || 0)}
                  </span>
                  <span className="flex items-center gap-1"><MessageCircle className="h-3.5 w-3.5" /> {post.comments}</span>
                  <button onClick={() => setExpandedPost(isExpanded ? null : post.id)}
                    className="hover:text-foreground transition-colors">
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                  <button className="hover:text-destructive transition-colors"><Flag className="h-3.5 w-3.5" /></button>
                </div>
              </motion.div>
            );
          })
        )}
      </section>

      {/* Moderation Note */}
      <div className="px-6 mb-6 text-center">
        <p className="text-xs text-muted-foreground">🛡️ All posts are reviewed to keep this space safe</p>
      </div>

      <BottomNav />
    </div>
  );
};

export default PeerWisdom;
