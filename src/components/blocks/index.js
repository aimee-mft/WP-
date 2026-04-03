import NavbarBlock from './NavbarBlock'
import HeroBlock from './HeroBlock'
import FeaturesBlock from './FeaturesBlock'
import GalleryBlock from './GalleryBlock'
import TestimonialsBlock from './TestimonialsBlock'
import TextBlock from './TextBlock'
import ImageBlock from './ImageBlock'
import ContactBlock from './ContactBlock'
import FooterBlock from './FooterBlock'

export const BLOCK_REGISTRY = {
  navbar: {
    label: 'Navbar',
    icon: '🧭',
    component: NavbarBlock,
    defaultProps: {
      logo: 'My Site',
      links: [{ label: 'Home', href: '#' }, { label: 'About', href: '#about' }, { label: 'Contact', href: '#contact' }]
    },
  },
  hero: {
    label: 'Hero',
    icon: '🦸',
    component: HeroBlock,
    defaultProps: {
      headline: 'Your Headline Goes Here.',
      subheadline: 'A compelling one or two sentence description of what you do and who you do it for.',
      ctaText: 'Get Started',
      ctaLink: '#',
      backgroundColor: '#0f172a',
      textColor: '#ffffff',
      backgroundImage: '',
    },
  },
  features: {
    label: 'Features',
    icon: '⚡',
    component: FeaturesBlock,
    defaultProps: {
      title: 'Our Features',
      items: [
        { icon: '🚀', title: 'Fast', description: 'Lightning fast performance.' },
        { icon: '🛡️', title: 'Secure', description: 'Enterprise-grade security.' },
        { icon: '📊', title: 'Analytics', description: 'Real-time insights.' },
      ],
    },
  },
  gallery: {
    label: 'Gallery',
    icon: '🖼️',
    component: GalleryBlock,
    defaultProps: {
      title: 'Gallery',
      images: [
        { src: 'https://picsum.photos/seed/g1/600/400', caption: 'Image 1' },
        { src: 'https://picsum.photos/seed/g2/600/400', caption: 'Image 2' },
        { src: 'https://picsum.photos/seed/g3/600/400', caption: 'Image 3' },
      ],
    },
  },
  testimonials: {
    label: 'Testimonials',
    icon: '💬',
    component: TestimonialsBlock,
    defaultProps: {
      title: 'What People Say',
      items: [
        { quote: 'Amazing product! Completely changed how we work.', author: 'Jane Doe', role: 'CEO, Company' },
        { quote: 'Highly recommended. Worth every penny.', author: 'John Smith', role: 'Founder, Startup' },
      ],
    },
  },
  text: {
    label: 'Text',
    icon: '📝',
    component: TextBlock,
    defaultProps: {
      heading: 'About Us',
      content: 'Write something about your company, mission, or values here.',
      align: 'left',
    },
  },
  image: {
    label: 'Image',
    icon: '📸',
    component: ImageBlock,
    defaultProps: {
      src: 'https://picsum.photos/seed/main/1200/500',
      caption: '',
      alt: '',
    },
  },
  contact: {
    label: 'Contact',
    icon: '✉️',
    component: ContactBlock,
    defaultProps: {
      title: 'Get In Touch',
      subtitle: 'We\'d love to hear from you!',
      email: 'hello@example.com',
    },
  },
  footer: {
    label: 'Footer',
    icon: '🔻',
    component: FooterBlock,
    defaultProps: {
      copyright: '© 2025 My Site. All rights reserved.',
      links: [{ label: 'Privacy', href: '#' }, { label: 'Terms', href: '#' }],
      socials: [{ platform: 'Twitter', url: '#' }, { platform: 'LinkedIn', url: '#' }],
    },
  },
}
