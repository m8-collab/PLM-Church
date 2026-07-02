import Link from "next/link";
import CrossMark from "./CrossMark";
import { FaFacebookF, FaWhatsapp, FaTiktok, FaYoutube } from "react-icons/fa6";

const socials = [
  {label: "Facebook", href:"https://www.facebook.com/PLMmtwapa.music", Icon:  FaFacebookF},
  {label: "Tiktok", href:"https://www.tiktok.com/@pamoja_life_ministry?_r=1&_t=ZS-97TSOSCYvjQ", Icon: FaTiktok},
  {label: "Whatsapp", href:"", Icon: FaWhatsapp},
  {label: "Youtube", href:"", Icon: FaYoutube},
]

export default function Footer() {
  return (
    <footer className="bg-ink text-clay px-4 sm:px-8 pt-12 pb-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-[2fr_1fr_1fr] gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <CrossMark size={28} />
              <span className="font-display font-bold text-lg text-clay">Pamoja Life Ministry</span>
            </div>
            <p className="font-body text-sm text-clay/60 leading-relaxed max-w-xs">
              Together we Live, Love and Share the Gospel to become more like Christ. A
              community reaching Mombasa and beyond with the transforming grace of Jesus Christ.
            </p>
          </div>

          <div>
            <h4 className="font-body text-xs font-bold uppercase tracking-widest text-gold mb-4">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2 font-body text-sm">
              <Link href="/about" className="text-clay/65 hover:text-clay">About us</Link>
              <Link href="/sermons" className="text-clay/65 hover:text-clay">Sermons</Link>
              <Link href="/events" className="text-clay/65 hover:text-clay">Events</Link>
              <Link href="/ministries" className="text-clay/65 hover:text-clay">Ministries</Link>
              <Link href="/blog" className="text-clay/65 hover:text-clay">Blog</Link>
              <Link href="/contact" className="text-clay/65 hover:text-clay">Contact</Link>
            </div>
          </div>

          <div>
            <h4 className="font-body text-xs font-bold uppercase tracking-widest text-gold mb-4">
              Service Times
            </h4>
            <div className="flex flex-col gap-2 font-body text-sm text-clay/65">
              <span>Sunday 10:00 AM</span>
              <span>Sunday 12:30 PM</span>
              <span>Thursday 5:30 PM</span>
            </div>
            <h4 className="font-body text-xs font-bold uppercase tracking-widest text-gold mt-5 mb-3">
              Follow Us
            </h4>
            <div className="flex gap-2.5">
              {socials.map(({label, href, Icon}) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-clay/50 text-xs hover:border-gold hover:text-gold transition-colors"
                >
                  <Icon size={14}/>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-5 flex flex-wrap justify-between gap-2 text-xs text-clay/40 font-body">
          <span>© {new Date().getFullYear()} Pamoja Life Ministry. All rights reserved.</span>
          <span>Made with love in Mombasa 🇰🇪</span>
        </div>
      </div>
    </footer>
  );
}
