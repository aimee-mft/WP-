import { v4 as uuidv4 } from 'uuid'

const makeBlock = (type, props = {}) => ({ id: uuidv4(), type, props })

// Curated Unsplash images
const IMGS = {
  office:     'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80&auto=format',
  team:       'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=80&auto=format',
  desk:       'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80&auto=format',
  portfolio1: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format',
  portfolio2: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80&auto=format',
  portfolio3: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=800&q=80&auto=format',
  portfolio4: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80&auto=format',
  arch1:      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80&auto=format',
  arch2:      'https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&q=80&auto=format',
  nature1:    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80&auto=format',
  portrait:   'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80&auto=format',
}

const businessBlocks = () => [
  makeBlock('navbar', {
    logo: 'Apex Studio',
    links: [{ label: 'Services', href: '#' }, { label: 'Work', href: '#' }, { label: 'About', href: '#' }, { label: 'Contact', href: '#' }]
  }),
  makeBlock('hero', {
    headline: 'We Build Products People Love.',
    subheadline: 'Apex Studio is a full-service digital agency helping ambitious brands design, build, and launch exceptional products.',
    ctaText: 'Start a Project',
    ctaLink: '#',
    backgroundColor: '#0f172a',
    textColor: '#ffffff',
    backgroundImage: '',
  }),
  makeBlock('features', {
    title: 'Everything You Need to Grow',
    items: [
      { icon: '⚡', title: 'Strategy & Consulting', description: 'We help you define a clear vision, identify opportunities, and build a roadmap that delivers real results.' },
      { icon: '✦', title: 'Design & Branding', description: 'From logo to full brand identity, we craft visual systems that are memorable, scalable, and distinctly yours.' },
      { icon: '🛠', title: 'Development', description: 'Our engineers build fast, reliable, and maintainable software — web, mobile, and everything in between.' },
    ]
  }),
  makeBlock('image', { src: IMGS.office, caption: '', alt: 'Our studio' }),
  makeBlock('testimonials', {
    title: 'Trusted by Forward-Thinking Teams',
    items: [
      { quote: 'Apex completely transformed our digital presence. The results speak for themselves — traffic up 180% in 3 months.', author: 'Sarah Chen', role: 'CEO, NovaTech' },
      { quote: 'The best agency we\'ve worked with. They understood our vision immediately and delivered beyond expectations.', author: 'Marcus Webb', role: 'Founder, Paloma Health' },
    ]
  }),
  makeBlock('contact', {
    title: 'Let\'s Build Something Great.',
    subtitle: 'Tell us about your project. We\'ll get back to you within 24 hours.',
    email: 'hello@apexstudio.co',
  }),
  makeBlock('footer', {
    logo: 'Apex Studio',
    copyright: '© 2025 Apex Studio. All rights reserved.',
    links: [{ label: 'Privacy Policy', href: '#' }, { label: 'Terms', href: '#' }, { label: 'Careers', href: '#' }],
    socials: [{ platform: 'Twitter', url: '#' }, { platform: 'LinkedIn', url: '#' }, { platform: 'Dribbble', url: '#' }],
  }),
]

const portfolioBlocks = () => [
  makeBlock('navbar', {
    logo: 'Jordan Lee',
    links: [{ label: 'Work', href: '#' }, { label: 'About', href: '#' }, { label: 'Contact', href: '#' }]
  }),
  makeBlock('hero', {
    headline: 'Design That Moves People.',
    subheadline: 'I\'m Jordan Lee — an independent designer specialising in brand identity, digital products, and creative direction.',
    ctaText: 'View My Work',
    ctaLink: '#',
    backgroundColor: '#18181b',
    textColor: '#ffffff',
    backgroundImage: '',
  }),
  makeBlock('gallery', {
    title: 'Selected Projects',
    images: [
      { src: IMGS.portfolio1, caption: 'Brand Identity — Halo Collective' },
      { src: IMGS.portfolio2, caption: 'UI Design — Fintech Dashboard' },
      { src: IMGS.portfolio3, caption: 'Creative Direction — Summer Campaign' },
      { src: IMGS.portfolio4, caption: 'Web Design — Startup Launch' },
      { src: IMGS.arch1, caption: 'Photography — Architecture Series' },
      { src: IMGS.arch2, caption: 'Photography — Urban Spaces' },
    ]
  }),
  makeBlock('text', {
    heading: 'About Me',
    content: 'I\'ve spent the last decade working at the intersection of design and technology — collaborating with startups, agencies, and Fortune 500 companies. I believe great design solves real problems and creates lasting connections between brands and people.',
    align: 'left',
  }),
  makeBlock('contact', {
    title: 'Work With Me.',
    subtitle: 'I take on a limited number of projects each quarter. If you have something interesting in mind, I\'d love to hear about it.',
    email: 'hello@jordanlee.design',
  }),
  makeBlock('footer', {
    logo: 'Jordan Lee',
    copyright: '© 2025 Jordan Lee. All rights reserved.',
    links: [{ label: 'Colophon', href: '#' }],
    socials: [{ platform: 'Dribbble', url: '#' }, { platform: 'Instagram', url: '#' }, { platform: 'GitHub', url: '#' }],
  }),
]

const landingBlocks = () => [
  makeBlock('hero', {
    headline: 'Ship Faster. Scale Smarter.',
    subheadline: 'The modern platform for product teams. From idea to launch in days, not months.',
    ctaText: 'Start Free Trial',
    ctaLink: '#',
    backgroundColor: '#4f46e5',
    textColor: '#ffffff',
    backgroundImage: '',
  }),
  makeBlock('features', {
    title: 'Built for How Teams Actually Work',
    items: [
      { icon: '🚀', title: 'Launch in Minutes', description: 'Pre-built integrations and one-click deploys mean your team spends time building, not configuring.' },
      { icon: '📊', title: 'Real-Time Analytics', description: 'Know exactly how your product is performing with dashboards your whole team will actually use.' },
      { icon: '🔐', title: 'Enterprise Security', description: 'SOC 2 Type II certified, end-to-end encrypted, and built to meet the strictest compliance requirements.' },
    ]
  }),
  makeBlock('testimonials', {
    title: 'Loved by 10,000+ Teams',
    items: [
      { quote: 'We cut our release cycle from two weeks to two days. The ROI was immediate and obvious.', author: 'Priya Nair', role: 'CTO, Buildspace' },
      { quote: 'Finally a platform that gets out of your way and lets you focus on what matters — the product.', author: 'Tom Eriksson', role: 'VP Engineering, Relay' },
    ]
  }),
  makeBlock('contact', {
    title: 'Ready to Get Started?',
    subtitle: 'Join thousands of teams already shipping faster. No credit card required.',
    email: 'sales@product.io',
  }),
  makeBlock('footer', {
    logo: 'Product',
    copyright: '© 2025 Product Inc. All rights reserved.',
    links: [{ label: 'Privacy', href: '#' }, { label: 'Terms', href: '#' }, { label: 'Status', href: '#' }],
    socials: [{ platform: 'Twitter', url: '#' }, { platform: 'LinkedIn', url: '#' }],
  }),
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
