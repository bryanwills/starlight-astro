import { assert, describe, expect, test } from 'vitest';
import type { AstroConfig } from 'astro';
import config from 'virtual:starlight/user-config';
import { processI18nConfig } from '../../utils/i18n';

describe('processI18nConfig', () => {
	test('returns the Astro i18n config for a multilingual site with no root locale', () => {
		const { astroI18nConfig, starlightConfig } = processI18nConfig(config, undefined);

		// The default locale should match its associated custom locale `path`.
		expect(astroI18nConfig.defaultLocale).toBe('en');
		expect(astroI18nConfig.locales).toMatchInlineSnapshot(`
			[
			  {
			    "codes": [
			      "fr",
			    ],
			    "path": "fr",
			  },
			  {
			    "codes": [
			      "en-US",
			    ],
			    "path": "en",
			  },
			  {
			    "codes": [
			      "ar",
			    ],
			    "path": "ar",
			  },
			  {
			    "codes": [
			      "pt-BR",
			    ],
			    "path": "pt-br",
			  },
			]
		`);
		assert(typeof astroI18nConfig.routing !== 'string');
		expect(astroI18nConfig.routing?.prefixDefaultLocale).toBe(true);

		// The Starlight configuration should not be modified.
		expect(config).toStrictEqual(starlightConfig);
	});

	test('throws an error when an Astro i18n config is also provided', () => {
		expect(() =>
			processI18nConfig(config, { defaultLocale: 'en', locales: ['en'] } as AstroConfig['i18n'])
		).toThrowErrorMatchingInlineSnapshot(`
			"[AstroUserError]:
				Cannot provide both an Astro \`i18n\` configuration and a Starlight \`locales\` configuration.
			Hint:
				Remove one of the two configurations.
				See more at https://starlight.astro.build/guides/i18n/"
		`);
	});
});
