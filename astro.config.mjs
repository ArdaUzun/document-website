// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
    site: 'https://ardauzun.github.io',
    base: 'document-website',
    integrations: [starlight({
        title: 'Product Health Scanner Documentation',
        social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/ArdaUzun/product_health_analysis' }],
        sidebar: [
            {
                label: 'Introduction',
                items: [
                    { label: 'Overview', link: 'overview' },
                    { label: 'Architecture', link: 'architecture' },
                ],
            },
            {
                label: 'Technical Details',
                items: [
                    { label: 'Components', link: 'components' },
                    { label: 'Models', link: 'models' },
                    { label: 'Services', link: 'services' },
                    { label: 'API Reference', link: 'api' },
                ],
            },
            {
                label: 'Development',
                items: [
                    { label: 'Installation', link: 'installation' },
                    { label: 'Development', link: 'development' },
                    { label: 'Testing', link: 'testing' },
                    { label: 'Deployment', link: 'deployment' },
                ],
            },
        ],
		}), mdx()],
});