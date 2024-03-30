import { InstallConfig } from "./config";
import { ConstructArgumentsResult, PackageList } from "./types";
export declare function constructPnpmArguments(packageList: PackageList, config: InstallConfig): ConstructArgumentsResult;
export declare const pnpmProjectInstallArgs: string[];
