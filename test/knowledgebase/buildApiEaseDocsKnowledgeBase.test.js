const assert = require('node:assert/strict');
const {describe, it} = require('node:test');
const path = require('node:path');
const fs = require('node:fs/promises');
const {
  canonicalizeDocumentationLinks,
  generateKnowledgeBaseText,
} = require('../../knowledgebase/buildApiEaseDocsKnowledgeBase.js');

describe('buildApiEaseDocsKnowledgeBase', () => {
  describe('canonicalizeDocumentationLinks', () => {
    const filePath = path.resolve('/docs/general/faq/security.md');
    const sourceUrl = 'https://docs.apiease.com/docs/requests/triggers/storefont-calls';
    const sourceUrlsByFilePath = new Map([
      [path.resolve('/docs/requests/triggers/storefont-calls.md'), sourceUrl],
      [path.resolve('/docs/general/faq/security.md'), 'https://docs.apiease.com/docs/general/faq/security'],
    ]);
    const rewrite = (body) => canonicalizeDocumentationLinks({body, filePath, sourceUrlsByFilePath});

    it('should resolve a relative storefront Markdown link to its exact SOURCE URL', async () => {
      const result = await rewrite('[Storefront calls](../../requests/triggers/storefont-calls.md)');
      assert.equal(result, `[Storefront calls](${sourceUrl})`);
    });

    it('should use the mapped route instead of deriving a route from the filename', async () => {
      const result = await canonicalizeDocumentationLinks({
        body: '[Article](./renamed.mdx)', filePath,
        sourceUrlsByFilePath: new Map([[path.resolve('/docs/general/faq/renamed.mdx'), sourceUrl]]),
      });
      assert.equal(result, `[Article](${sourceUrl})`);
    });

    it('should cite the exact article SOURCE without an anchor or query suffix', async () => {
      const result = await rewrite('[Storefront](../../requests/triggers/storefont-calls.md?view=all#setup "Setup")');
      assert.equal(result, `[Storefront](${sourceUrl} "Setup")`);
    });

    it('should resolve reference-link definitions without changing their labels', async () => {
      const result = await rewrite('[Storefront][guide]\n\n[guide]: <../../requests/triggers/storefont-calls.md> "Guide"');
      assert.equal(result, `[Storefront][guide]\n\n[guide]: <${sourceUrl}> "Guide"`);
    });

    it('should preserve code examples, images, and external links byte for byte', async () => {
      const body = [
        '`[Example](./missing.md)`',
        '```md\n[Example](./missing.md)\n```',
        '![Image](./missing.md)',
        '[External](https://example.com/guide.md)',
      ].join('\n\n');
      assert.equal(await rewrite(body), body);
    });

    it('should fail when a relative article has no emitted SOURCE', async () => {
      await assert.rejects(() => rewrite('[Missing](./missing.md)'), /no SOURCE URL/i);
    });
  });

  describe('generateKnowledgeBaseText', () => {
    it('should generate embedded-parameter examples without requiring backend context', async (context) => {
      const filePath = path.resolve(__dirname, '../../docs/docs/requests/request-parameters/dynamic-embedded-parameters/liquid-parameters.md');
      const example = "apiease.runRequest('lookup', {liquidParamsEmbedded: {reference: 'example'}})";
      const readFile = fs.readFile;
      context.mock.method(fs, 'readFile', (requestedPath, ...options) => requestedPath === filePath
        ? Promise.resolve(`---\ntitle: Liquid parameters\n---\n\n\`\`\`js\n${example}\n\`\`\`\n`)
        : readFile(requestedPath, ...options));

      const {text} = await generateKnowledgeBaseText();

      assert.ok(text.includes(example));
    });

    it('should emit canonical storefront links in the actual knowledge bundle', async () => {
      const {text} = await generateKnowledgeBaseText();
      assert.ok(text.includes('[Storefront calls](https://docs.apiease.com/docs/requests/triggers/storefont-calls)'));
      assert.ok(!text.includes('](../../requests/triggers/storefont-calls.md)'));
    });
  });
});
