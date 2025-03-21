import { expect, test, vi } from 'vitest';
import { flattenSidebar, getSidebar } from '../../utils/navigation';

vi.mock('astro:content', async () =>
	(await import('../test-utils')).mockedAstroContent({
		docs: [
			['index.mdx', { title: 'first' }],
			['guides/example.md', { title: 'second' }],
			['reference/example.md', { title: 'third' }],
			['reference/rod/foo.md', { title: 'fourth' }],
			['reference/rod/zip.md', { title: 'fifth' }],
			['reference/zoo.md', { title: 'sixth' }],
		],
	})
);

test('autogenerated sidebar is sorted alphabetically by filename', () => {
	const sidebar = getSidebar('/', undefined);
	const flattened = flattenSidebar(sidebar);

	expect(flattened.map((e) => e.label)).toMatchInlineSnapshot(`
		[
		  "first",
		  "second",
		  "third",
		  "fourth",
		  "fifth",
		  "sixth",
		]
	`);
});
