const fs = require('fs/promises');
const path = require('path');

const {OUTPUT_PATH} = require('./buildApiEaseDocsKnowledgeBase');

const SOURCE_PATH = OUTPUT_PATH;
const TARGET_PATHS = [
  path.resolve(__dirname, '../../apiease-template/knowledge/apiEaseDocsConsolidated.md'),
];

async function syncLocalKnowledgeTargets({check = false} = {}) {
  const sourceBuffer = await fs.readFile(SOURCE_PATH);

  for (const targetPath of TARGET_PATHS) {
    if (check) {
      let targetBuffer;
      try {
        targetBuffer = await fs.readFile(targetPath);
      } catch (error) {
        if (error.code === 'ENOENT') {
          throw new Error(`Missing sync target: ${targetPath}`);
        }

        throw error;
      }

      if (!sourceBuffer.equals(targetBuffer)) {
        throw new Error(`Sync target is out of date: ${targetPath}`);
      }

      console.log(`Verified target: ${targetPath}`);
      continue;
    }

    await fs.mkdir(path.dirname(targetPath), {recursive: true});
    await fs.writeFile(targetPath, sourceBuffer);
    console.log(`Synced target: ${targetPath}`);
  }
}

if (require.main === module) {
  syncLocalKnowledgeTargets({check: process.argv.includes('--check')}).catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

module.exports = {
  SOURCE_PATH,
  TARGET_PATHS,
  syncLocalKnowledgeTargets,
};
