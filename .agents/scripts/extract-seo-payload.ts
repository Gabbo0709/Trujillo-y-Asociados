import fs from 'node:fs';
import path from 'node:path';
import * as cheerio from 'cheerio';

/**
 * Type definition for the SEO payload extracted from the HTML content.
 */
export interface HeadingItem {
    level: 'H1' | 'H2' | 'H3' | string;
    text: string;
}

export interface RouteSeoPayload {
    route: string;
    filePath: string;
    title: string;
    description: string;
    canonical: string;
    headings: HeadingItem[];
    jsonLd: Record<string, unknown>[] | null;
    cleanText: string;
}

const TARGET_ROUTES = [
    'index.html',
    'contacto/index.html',
    'corporate-advisory/index.html',
    'firm/index.html',
    'workers-advisory/index.html'
]

const distDir = path.resolve(process.cwd(), 'dist');

function extractSeoPayload(): RouteSeoPayload[] {
    const payloads: RouteSeoPayload[] = [];

    for (const routeFile of TARGET_ROUTES) {
        const filePath = path.join(distDir, routeFile);

        if (!fs.existsSync(filePath)) {
            console.warn(`File not found: ${filePath}`);
            continue;
        }

        const html = fs.readFileSync(filePath, 'utf-8');
        const $ = cheerio.load(html);

        // Extract headings sequentially to preserve document hierarchy
        const headings: HeadingItem[] = $('h1, h2, h3, h4')
            .map((_: number, el: any) => ({
                level: el.tagName.toUpperCase(),
                text: $(el).text().replace(/\s+/g, ' ').trim(),
            }))
            .get();

        // Extract JSON-LD scripts
        const jsonLd: Record<string, unknown>[] = $('script[type="application/ld+json"]')
            .map((_: number, el: any) => {
                try {
                    const rawContent = $(el).html() ?? '{}';
                    return JSON.parse(rawContent) as Record<string, unknown>;
                } catch {
                    console.warn(`Failed to parse JSON-LD in file: ${filePath}`);
                    return null;
                }
            })
            .get()
            .filter((schema: Record<string, unknown> | null): schema is Record<string, unknown> => schema !== null);

        // Clean main body copy (strip script tags, navigation boilerplate, extra whitespaces)
        $('script, style, svg, nav, footer').remove();
        const cleanText = $('main, body')
            .first()
            .text()
            .replace(/\s+/g, ' ')
            .trim()
            .slice(0, 3000); // Limit to 3000 characters

        const routeName = routeFile === 'index.html' ? '/' : `/${routeFile.replace('/index.html', '')}`

        payloads.push({
            route: routeName,
            filePath,
            title: $('title').text().trim(),
            description: $('meta[name="description"]').attr('content') ?? '',
            canonical: $('link[rel="canonical"]').attr('href') ?? '',
            headings,
            jsonLd,
            cleanText
        })
    }
    return payloads;
}

const payload = extractSeoPayload();
console.log(JSON.stringify(payload, null, 2));