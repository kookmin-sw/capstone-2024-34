import { FileResultTableData } from "@customTypes/mock/dashboard";

export const mockTableData: FileResultTableData[] = [
  {
    id: "#35463",
    date: new Date("2024-04-12 09:12:10"),
    fileName: "SUService.exe",
    result: "정상",
    reason: "Windows Update Service",
  },
  {
    id: "#35463",
    date: new Date("2024-04-12 10:23:04"),
    fileName: "vc_redist.x64.exe",
    result: "정상",
    reason: "System Library",
  },
  {
    id: "#35463",
    date: new Date("2024-04-12 11:24:30"),
    fileName: "FBControlSvc.exe",
    result: "정상",
    reason: "Driver File",
  },
  {
    id: "#35462",
    date: new Date("2024-04-12 13:38:07"),
    fileName: "McCSPServiceHost.exe",
    result: "대기",
    reason: "-",
  },
  {
    id: "#35463",
    date: new Date("2024-04-12 14:23:26"),
    fileName: "SearchFilterHost.exe",
    result: "정상",
    reason: "OS Service",
  },
  {
    id: "#35465",
    date: new Date("2024-04-12 17:12:23"),
    fileName: "TbtP2pShortcutService.exe",
    result: "악성",
    reason: "Trojan.StartPage",
  },
  {
    id: "#35465",
    date: new Date("2024-04-12 19:30:22"),
    fileName: "sServiceAgentLauncherSvc.exe",
    result: "악성",
    reason: "Keylogger",
  },
  {
    id: "#35463",
    date: new Date("2024-04-12 20:18:19"),
    fileName: "vc_redist.x64.exe",
    result: "정상",
    reason: "Support Library",
  },
];
