import { v4 as uuidv4 } from 'uuid'

const makeBlock = (type, props = {}) => ({ id: uuidv4(), type, props })

const businessBlocks = () => [
  makeBlock('navbar', { logo: 'MyBusiness', links: [{ label: 'Home', href: '#' }, { label: 'About', href: '#about' }, { label: 'Contact', href: '#contact' }] }),
  makeBlock('hero', { headline: 'Grow Your Business Today', subheadline: 'We help companies achieve their goals with powerful tools and expert guidance.', ctaText: 'Get Started', ctaLink: '#contact', backgroundColor: '#1e40af', textColor: '#ffffff' }),
  makeBlock('features', { title: 'Why Choose Us', items: [{ icon: '⚡', title: 'Fast Results', description: 'See measurable improvements within the first 30 days.' }, { icon: '🛡️', title: 'Trusted & Secure', description: 'Your data is safe with enterprise-grade security.' }, { icon: '📊', title: 'Data-Driven', description: 'Make smarter decisions backed by real analytics.' }] }),
  makeBlock('testimonials', { title: 'What Our Clients Say', items: [{ quote: 'This platform transformed the way we work. Incredible product!', author: 'Sarah Johnson', role: 'CEO, TechCorp' }, { quote: 'Best investment we made this year. Highly recommend.', author: 'Mark Williams', role: 'Founder, StartupXYZ' }] }),
  makeBlock('contact', { title: 'Get In Touch', subtitle: 'We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.', email: 'hello@mybusiness.com' }),
  makeBlock('footer', { copyright: '© 2025 MyBusiness. All rights reserved.', links: [{ label: 'Privacy', href: '#' }, { label: 'Terms', href: '#' }], socials: [{ platform: 'Twitter', url: '#' }, { platform: 'LinkedIn', url: '#' }] }),
]

const portfolioBlocks = () => [
  makeBlock('navbar', { logo: 'Portfolio', links: [{ label: 'Work', href: '#gallery' }, { label: 'About', href: '#about' }, { label: 'Contact', href: '#contact' }] }),
  makeBlock('hero', { headline: 'Creative Designer & Developer', subheadline: 'I craft beautiful digital experiences that make people\'s lives easier and more enjoyable.', ctaText: 'View My Work', ctaLink: '#gallery', backgroundColor: '#0f172a', textColor: '#ffffff' }),
  makeBlock('gallery', { title: 'Selected Work', images: [{ src: 'https://picsum.photos/seed/p1/600/400', caption: 'Brand Identity Design' }, { src: 'https://picsum.photos/seed/p2/600/400', caption: 'Web Application' }, { src: 'https://picsum.photos/seed/p3/600/400', caption: 'Mobile App UI' }, { src: 'https://picsum.photos/seed/p4/600/400', caption: 'Print Design' }] }),
  makeBlock('text', { heading: 'About Me', content: 'I\'m a passionate designer and developer with over 8 years of experience creating digital products. I specialize in UI/UX design, frontend development, and brand strategy.', align: 'left' }),
  makeBlock('contact', { title: 'Let\'s Work Together', subtitle: 'Have a project in mind? I\'d love to hear about it.', email: 'hello@portfolio.com' }),
  makeBlock('footer', { copyright: '© 2025 My Portfolio.', links: [], socials: [{ platform: 'Dribbble', url: '#' }, { platform: 'GitHub', url: '#' }] }),
]

const landingBlocks = () => [
  makeBlock('hero', { headline: 'Ship Faster. Grow Smarter.', subheadline: 'The all-in-one platform that helps your team build, launch, and scale products with confidence.', ctaText: 'Start for Free', ctaLink: '#', backgroundColor: '#7c3aed', textColor: '#ffffff' }),
  makeBlock('features', { title: 'Everything You Need', items: [{ icon: '🚀', title: 'Launch Quickly', description: 'Go from idea to production in record time with our streamlined workflows.' }, { icon: '🔄', title: 'Iterate Easily', description: 'Test, learn, and improve with built-in A/B testing and analytics.' }, { icon: '🌍', title: 'Scale Globally', description: 'Handle millions of users with our globally distributed infrastructure.' }] }),
  makeBlock('testimonials', { title: 'Loved by Teams Everywhere', items: [{ quote: 'We cut our development time by 60% in the first month!', author: 'Alex Chen', role: 'CTO, DevCo' }] }),
  makeBlock('footer', { copyright: '© 2025 Product Inc. All rights reserved.', links: [{ label: 'Privacy', href: '#' }, { label: 'Terms', href: '#' }], socials: [] }),
]

export function getTemplatePages(templateId) {
  switch (templateId) {
    case 'business':
      return [{ name: 'Home', slug: '/', blocks: businessBlocks() }]
    case 'portfolio':
      return [{ name: 'Home', slug: '/', blocks: portfolioBlocks() }]
    case 'landing':
      return [{ name: 'Home', slug: '/', blocks: landingBlocks() }]
    default:
      return [{ name: 'Home', slug: '/', blocks: [] }]
  }
}
