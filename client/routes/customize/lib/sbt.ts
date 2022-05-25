import type { ScriptState } from '../BuildScript';
import {getVersion} from "~/routes/customize/lib/script";
import {Native, PlatformSelection} from "~/routes/customize/types";
import {versionNum} from "~/routes/customize/reducer";

export function generateSbt({
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

  const versionString = getVersion(version, build);
  const hasBoM = 323 <= versionNum(version);

  let script = '';
  // add version variable
  script += `val lwjglVersion: String = "${versionString}"\n`
  script += `val lwjglNativeClassifier: String = ${getNativeClassifierList(platform, platformSingle)}\n`

  console.log(`xxx ${platformSingle} | ${JSON.stringify(platform)}`)
  console.log(platform)

  script += "val lwjglDependencies: Seq[ModuleID] = Seq(\n"
  // todo Normal dependencies

  // S

  script += ")\n"

  // Probably won't ever be used in a real project.
  script += "\nThisBuild / libraryDependencies ++= lwjglDependencies"

  return script;
}

function getNativeClassifierList(platformOptions: PlatformSelection, platformSingle: Native | null): string {
  let returnSequenceStr = ""
  if(platformSingle) {
    returnSequenceStr += `"natives-${platformSingle}"\n`
  } else {

    // todo logic to figure out the arch & os.
  }

  return returnSequenceStr;
}
