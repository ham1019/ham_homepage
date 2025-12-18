import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface SocialLink {
  number: string;
  label: string;
  href: string;
  isEmail?: boolean;
}

const socialLinks: SocialLink[] = [
  { number: "001", label: "Email", href: "#", isEmail: true },
  { number: "002", label: "LinkedIn", href: "https://www.linkedin.com/in/leanit-hyemi" },
  { number: "003", label: "Threads", href: "https://www.threads.com/@hemi1019?hl=ko" },
  { number: "004", label: "Naver Blog", href: "https://blog.naver.com/hugyourheart" },
  { number: "005", label: "leanIT", href: "https://leanit.kr" },
];

// EmailJS configuration
const EMAILJS_SERVICE_ID = "service_a1gsnar";
const EMAILJS_TEMPLATE_ID = "template_3jln2p5";
const EMAILJS_PUBLIC_KEY = "Wg8op7crzPUhSILSa";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY
      );

      toast.success(t("문의가 정상적으로 접수되었습니다.", "Your inquiry has been submitted successfully."));
      setFormData({ name: "", email: "", message: "" });
      setIsDialogOpen(false);
    } catch (error) {
      toast.error(t("전송에 실패했습니다. 다시 시도해주세요.", "Failed to send. Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const ContactForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <label htmlFor="dialog-name" className="text-sm font-medium mb-2 block">
          Name:
        </label>
        <input
          type="text"
          id="dialog-name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder={t("이름을 입력해주세요", "Enter your name")}
          className="form-input"
          required
          maxLength={100}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <label htmlFor="dialog-email" className="text-sm font-medium mb-2 block">
          Email:
        </label>
        <input
          type="email"
          id="dialog-email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={t("이메일을 입력해주세요", "Enter your email")}
          className="form-input"
          required
          maxLength={255}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <label htmlFor="dialog-message" className="text-sm font-medium mb-2 block">
          Message:
        </label>
        <textarea
          id="dialog-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder={t("메시지를 입력해주세요", "Enter your message")}
          rows={4}
          className="form-input resize-none"
          required
          maxLength={1000}
        />
      </motion.div>
      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-foreground text-background px-8 py-4 font-medium uppercase tracking-wider hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? t("전송 중...", "Sending...") : t("보내기", "Send")}
      </motion.button>
    </form>
  );

  return (
    <section id="contact" className="py-32 px-8 md:px-16 lg:px-24" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex items-baseline gap-4 mb-12"
        >
          <span className="nav-number">04</span>
          <span className="text-sm font-medium tracking-wider uppercase">Contact</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl tracking-tight uppercase leading-[0.9] mb-16"
          style={{ fontFamily: "var(--font-headline-kr)" }}
        >
          {t("궁금한게 있으신가요?", "Have any questions?")}<br />
          <span className="text-accent">{t("편하게 연락주세요", "Feel free to reach out")}</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent className="sm:max-w-md bg-background border-border">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-headline uppercase">
                    Contact
                  </DialogTitle>
                </DialogHeader>
                <ContactForm />
              </DialogContent>
            </Dialog>

            <div className="space-y-8">
              <ContactForm />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {socialLinks.map((link, index) =>
              link.isEmail ? (
                <Dialog
                  key={link.number}
                  open={isDialogOpen}
                  onOpenChange={setIsDialogOpen}
                >
                  <DialogTrigger asChild>
                    <motion.button
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                      whileHover={{ x: 10 }}
                      className="social-link group w-full text-left"
                    >
                      <span className="nav-number text-xs group-hover:bg-foreground group-hover:text-background transition-colors">
                        {link.number}
                      </span>
                      <span>{link.label}</span>
                    </motion.button>
                  </DialogTrigger>
                </Dialog>
              ) : (
                <motion.a
                  key={link.number}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="social-link group flex"
                >
                  <span className="nav-number text-xs group-hover:bg-foreground group-hover:text-background transition-colors">
                    {link.number}
                  </span>
                  <span>{link.label}</span>
                </motion.a>
              )
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
