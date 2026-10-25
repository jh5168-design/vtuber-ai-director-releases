// Facts about the current public release. Update these together when a new tag ships.
const repoUrl = 'https://github.com/jh5168-design/vtuber-ai-director-releases';
const downloadBase = `${repoUrl}/releases/latest/download`;

export const release = {
  version: '0.1.2',
  repoUrl,
  latestUrl: `${repoUrl}/releases/latest`,
  checksumsUrl: `${downloadBase}/SHA256SUMS.txt`,
  mac: {
    dmgUrl: `${downloadBase}/VTuber-AI-Director-macOS-arm64.dmg`,
    zipUrl: `${downloadBase}/VTuber-AI-Director-macOS-arm64.zip`,
    dmgSize: '178 MB',
    zipSize: '179 MB',
  },
} as const;
