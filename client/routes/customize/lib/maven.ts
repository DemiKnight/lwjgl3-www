import { BuildType, Native } from '../types';
import { generateDependencies, getArtifactName, getVersion, isNativeApplicableToAllPlatforms } from './script';
import { versionNum } from '../reducer';

import type { ScriptState } from '../BuildScript';
import type { Addon } from '../types';

export function generateMaven({
  build,
  version,
  hardcoded,
  compact,
  osgi,
  platform,
  platformSingle,
  artifacts,
  selected,
  addons,
  selectedAddons,
}: ScriptState) {
  const versionAlias = getVersion(version, build);
  const v = hardcoded ? versionAlias : '${lwjgl.version}';
  const nl2 = compact ? '' : '\n\t';
  const nl3 = compact ? '' : '\n\t\t';
  const nl4 = compact ? '' : '\n\t\t\t';
  const nl5 = compact ? '' : '\n\t\t\t\t';
  const classifier = !hardcoded || platformSingle == null ? '${lwjgl.natives}' : `natives-${platformSingle}`;
  const hasBoM = 323 <= versionNum(version);

  let script = '';

  if (!hardcoded) {
    script += `<properties>
\t<lwjgl.version>${versionAlias}</lwjgl.version>`;

    selectedAddons.forEach((id: Addon) => {
      script += `\n\t<${id}.version>${addons[id].maven.version}</${id}.version>`;
    });

    if (platformSingle !== null) {
      script += `\n\t<lwjgl.natives>natives-${platformSingle}</lwjgl.natives>`;
    }

    script += `\n</properties>\n\n`;
  }

  if (platformSingle === null) {
    const generateProfile = (profile: Native, family: string, arch: string, natives: String) => {
      let dependencies = selected
        .filter((binding) => {
          const artifact = artifacts[binding];
          return (
            artifact.natives !== undefined &&
            artifact.natives.includes(profile) &&
            !isNativeApplicableToAllPlatforms(artifact, platform)
          );
        })
        .map((binding) => {
          const groupId = osgi ? 'org.lwjgl.osgi' : 'org.lwjgl';
          const artifactId = osgi ? `org.lwjgl.${getArtifactName(artifacts[binding])}` : binding;
          return `${nl4}<dependency>${nl5}<groupId>${groupId}</groupId>${nl5}<artifactId>${artifactId}</artifactId>${
            hasBoM ? '' : `${nl5}<version>${v}</version>`
          }${nl5}<classifier>${natives}</classifier>${nl4}</dependency>`;
        });

      return `\n\t<profile>${nl3}<id>lwjgl-natives-${profile}-${arch}</id>${nl3}<activation>${nl4}<os>${nl5}<family>${family}</family>${nl5}<arch>${arch}</arch>${nl4}</os>${nl3}</activation>${nl3}<properties>${nl4}<lwjgl.natives>${natives}</lwjgl.natives>${nl3}</properties>${
        dependencies.length === 0 ? '' : `${nl3}<dependencies>${dependencies.join(nl4)}${nl3}</dependencies>`
      }${nl2}</profile>`;
    };

    script += '<profiles>';
    if (platform.linux) {
      script += generateProfile(Native.Linux, 'unix', 'amd64', 'natives-linux');
    }
    if (platform['linux-arm64']) {
      script += generateProfile(Native.Linux, 'unix', 'aarch64', 'natives-linux-arm64');
    }
    if (platform['linux-arm32']) {
      script += generateProfile(Native.Linux, 'unix', 'arm', 'natives-linux-arm32');
      script += generateProfile(Native.Linux, 'unix', 'arm32', 'natives-linux-arm32');
    }
    if (platform.macos) {
      script += generateProfile(Native.MacOS, 'mac', 'x86_64', 'natives-macos');
    }
    if (platform['macos-arm64']) {
      script += generateProfile(Native.MacOS, 'mac', 'aarch64', 'natives-macos-arm64');
    }
    if (platform.windows) {
      script += generateProfile(Native.Windows, 'windows', 'amd64', 'natives-windows');
    }
    if (platform['windows-x86']) {
      script += generateProfile(Native.Windows, 'windows', 'x86', 'natives-windows-x86');
    }
    if (platform['windows-arm64']) {
      script += generateProfile(Native.Windows, 'windows', 'aarch64', 'natives-windows-arm64');
    }
    script += '\n</profiles>\n\n';
  }

  if (build !== BuildType.Release) {
    script += `\t<repositories>
\t\t<repository>
\t\t\t<id>sonatype-snapshots</id>
\t\t\t<url>https://oss.sonatype.org/content/repositories/snapshots</url>
\t\t\t<releases><enabled>false</enabled></releases>
\t\t\t<snapshots><enabled>true</enabled></snapshots>
\t\t</repository>
\t</repositories>\n\n`;
  }

  if (hasBoM) {
    script += `<dependencyManagement>
\t<dependencies>
\t\t<dependency>
\t\t\t<groupId>org.lwjgl</groupId>
\t\t\t<artifactId>lwjgl-bom</artifactId>
\t\t\t<version>${v}</version>
\t\t\t<scope>import</scope>
\t\t\t<type>pom</type>
\t\t</dependency>
\t</dependencies>
</dependencyManagement>\n\n`;
  }

  script += `<dependencies>`;

  script += generateDependencies(
    selected,
    artifacts,
    platform,
    osgi,
    (artifact, groupId, artifactId) =>
      `\n\t<dependency>${nl3}<groupId>${groupId}</groupId>${nl3}<artifactId>${artifactId}</artifactId>${
        hasBoM ? '' : `${nl3}<version>${v}</version>`
      }${nl2}</dependency>`,
    (artifact, groupId, artifactId) => {
      if (!isNativeApplicableToAllPlatforms(artifact, platform)) {
        return '';
      }
      return `\n\t<dependency>${nl3}<groupId>${groupId}</groupId>${nl3}<artifactId>${artifactId}</artifactId>${
        hasBoM ? '' : `${nl3}<version>${v}</version>`
      }${nl3}<classifier>${classifier}</classifier>${nl2}</dependency>`;
    }
  );

  selectedAddons.forEach((id: Addon) => {
    const {
      maven: { groupId, artifactId, version },
    } = addons[id];

    script += `\n\t\t<dependency>${nl3}<groupId>${groupId}</groupId>${nl3}<artifactId>${artifactId}</artifactId>${nl3}<version>${
      hardcoded ? version : `\${${id}.version}`
    }</version>${nl2}</dependency>`;
  });

  script += `\n</dependencies>`;

  return script;
}
