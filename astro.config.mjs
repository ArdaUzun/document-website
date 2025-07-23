// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
    site: 'https://ardauzun.github.io',
    base: '/document-website/',
    integrations: [starlight({
        title: 'Product Health Scanner Documentation',
        social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/ArdaUzun/product_health_analysis' }],
        sidebar: [
            {
                label: 'Introduction',
                translations: {
                    tr: 'Giriş'
                },
                items: [
                    { 
                        label: 'Overview', 
                        link: '/overview',
                        translations: {
                            tr: 'Genel Bakış'
                        }
                    },
                    { 
                        label: 'Architecture', 
                        link: '/architecture',
                        translations: {
                            tr: 'Mimari'
                        }
                    },
                ],
            },
            {
                label: 'Technical Details',
                translations: {
                    tr: 'Teknik Detaylar'
                },
                items: [
                    { 
                        label: 'Components', 
                        link: '/components',
                        translations: {
                            tr: 'Bileşenler'
                        }
                    },
                    { 
                        label: 'Models', 
                        link: '/models',
                        translations: {
                            tr: 'Modeller'
                        }
                    },
                    { 
                        label: 'Services', 
                        link: '/services',
                        translations: {
                            tr: 'Servisler'
                        }
                    },
                    { 
                        label: 'API Reference', 
                        link: '/api',
                        translations: {
                            tr: 'API Referansı'
                        }
                    },
                ],
            },
            {
                label: 'Development',
                translations: {
                    tr: 'Geliştirme'
                },
                items: [
                    { 
                        label: 'Installation', 
                        link: '/installation',
                        translations: {
                            tr: 'Kurulum'
                        }
                    },
                    { 
                        label: 'Development', 
                        link: '/development',
                        translations: {
                            tr: 'Geliştirme'
                        }
                    },
                    { 
                        label: 'Testing', 
                        link: '/testing',
                        translations: {
                            tr: 'Test'
                        }
                    },
                    { 
                        label: 'Deployment', 
                        link: '/deployment',
                        translations: {
                            tr: 'Dağıtım'
                        }
                    },
                ],
            },
        ],
        locales: {
            root: { label: 'English', lang: 'en' },
            tr: { label: 'Türkçe', lang: 'tr' },
        }
    }), mdx()],
});