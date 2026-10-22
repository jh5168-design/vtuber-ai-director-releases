# VTuber AI Director

Public downloads and product documentation for VTuber AI Director, a local-first AI live director
and speech-tracked teleprompter for character-driven VTuber chatting streams.

The application source code is maintained in a private repository. This public repository contains
only the product website, release notes, checksums, and distributable desktop binaries.

## Downloads

Download the latest installers from [GitHub Releases](https://github.com/jh5168-design/vtuber-ai-director-releases/releases/latest).

| Platform | Architecture | Package |
| --- | --- | --- |
| macOS | Apple Silicon | DMG or ZIP |
| Windows | x64 | NSIS installer |

Preview builds are currently unsigned. macOS Gatekeeper or Windows SmartScreen may display a warning.
Review the release notes and SHA-256 checksums before installing.

## Documentation

- [Product overview](index.html)
- [Downloads](download.html)
- [First-run onboarding](onboarding.html)
- [Documentation](docs.html)

## Privacy

The desktop backend binds to the local loopback interface. Local Whisper can process microphone audio
on-device. Model service and platform credentials are configured locally and are not included in release
artifacts.

## Support

Use this repository's Issues page for release download and installation problems. Do not include API keys,
identity codes, local database files, or other secrets in issue reports.
