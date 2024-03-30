import { InstallConfig, PackageManagerFlag } from "./config";
import { getFlagsToSet } from "./flags";
import { UnreachableCaseError } from "./helpers";
import { ConstructArgumentsResult, PackageList } from "./types";

export function constructPnpmArguments(
  packageList: PackageList,
  config: InstallConfig
): ConstructArgumentsResult {
  const flagsToSet = getFlagsToSet(config);
  const globalCommand = config.global ? ["--global"] : [];
  const cwdCommand = config.forceCwd ? ["--pnpm-prefix", config.cwd] : [];
  const args: string[] = [
    "install",
    ...globalCommand,
    ...cwdCommand,
    "add",
    ...packageList,
  ];

  const ignoredFlags: PackageManagerFlag[] = [];
  flagsToSet.forEach((flag) => {
    switch (flag) {
      case "dev":
        if (!config.global) {
          args.push("--save-dev");
        } else {
          ignoredFlags.push(flag);
        }
        break;
      case "exact":
        args.push("--save-exact");
        break;
      case "verbose":
      case "bundle":
      case "noSave":
        ignoredFlags.push(flag);
        break;
      /* istanbul ignore next */
      default:
        throw new UnreachableCaseError(flag);
    }
  });

  return { args, ignoredFlags };
}

export const pnpmProjectInstallArgs = ["install"];
