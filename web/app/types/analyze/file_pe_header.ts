import { Interface } from "readline";

export interface FilePeHeaderResultResponse {
  output: {
    "AWPWD32.DLL": number;
    "UMDM32.DLL": number;
    "MSNDUI.DLL": number;
    "WINREG.DLL": number;
    "COMDLG32.DLL": number;
    "NETAPI.DLL": number;
    "WINMM.DLL": number;
    "WS2.DLL": number;
    "LZ32.DLL": number;
    "RPCTLS6.DLL": number;
    "OLEDLG.DLL": number;
    "RPCNS4.DLL": number;
    "GDI32.DLL": number;
    "DCIMAN32.DLL": number;
    "RPCTLS5.DLL": number;
    "SECUR32.DLL": number;
    "NWNET32.DLL": number;
    "RASAPI16.DLL": number;
    "MAPI32.DLL": number;
    "GROUP.DLL": number;
    "ADVAP132.DLL": number;
    "MFC30.DLL": number;
    "RPCTLC3.DLL": number;
    "MSFS32.DLL": number;
    "RPCTLS3.DLL": number;
    "WSOCK32.DLL": number;
    "BHNETB.DLL": number;
    "MPR.DLL": number;
    "NETDI.DLL": number;
    "CCAPI.DLL": number;
    "HYPERTERM.DLL": number;
    "KERNEL32.DLL": number;
    "RPCLTC1.DLL": number;
    "MSSHRUI.DLL": number;
    "CCPSH.DLL": number;
    "NAL.DLL": number;
    "NETAPI32.DLL": number;
    "SHLWAPI.DLL": number;
    "MAPI.DLL": number;
    "AWFAXP32.DLL": number;
    "DSKMAINT.DLL": number;
    "NWAB32.DLL": number;
    "AWRESX32.DLL": number;
    "DCIMAN.DLL": number;
    "RPCTLC5.DLL": number;
    "RSRC32.DLL": number;
    "SAPNSP.DLL": number;
    "RPCRT4.DLL": number;
    "SLENH.DLL": number;
    "KERNL32.DLL": number;
    "AWFXAB32.DLL": number;
    "CCEI.DLL": number;
    "NETSETUP.DLL": number;
    "WININET.DLL": number;
    "RASPI.DLL": number;
    "CRTDLL.DLL": number;
    "AWUTIL32.DLL": number;
    "CMC.DLL": number;
    "RPCTLC6.DLL": number;
    "SHELL32.DLL": number;
    "BHSUPP.DLL": number;
    "RASAPI32.DLL": number;
    "VERSION.DLL": number;
    "MSNET32.DLL": number;
    "WINSOCK.DLL": number;
    "CCTN20.DLL": number;
    "NETBIOS.DLL": number;
    "POWERCFG.DLL": number;
    "NWNP32.DLL": number;
    "NDIS30.DLL": number;
    "USER32.DLL": number;
    "MSPST32.DLL": number;
    "MSVIEWUT.DLL": number;
    "COMCTL32.DLL": number;
    Machine: number;
    NumberOfSections: number;
    TimeDateStamp: number;
    PointerToSymbolTable: number;
    NumberOfSymbols: number;
    SizeOfOptionalHeader: number;
    Characteristics: number;
    Magic: number;
    MajorLinkerVersion: number;
    MinorLinkerVersion: number;
    SizeOfCode: number;
    SizeOfInitializedData: number;
    SizeOfUninitializedData: number;
    AddressOfEntryPoint: number;
    BaseOfCode: number;
    BaseOfData: number;
    ImageBase: number;
    SectionAlignment: number;
    FileAlignment: number;
    MajorOperatingSystemVersion: number;
    MinorOperatingSystemVersion: number;
    MajorImageVersion: number;
    MinorImageVersion: number;
    MajorSubsystemVersion: number;
    MinorSubsystemVersion: number;
    Reserved1: number;
    SizeOfImage: number;
    SizeOfHeaders: number;
    CheckSum: number;
    Subsystem: number;
    DllCharacteristics: number;
    SizeOfStackReserve: number;
    SizeOfStackCommit: number;
    SizeOfHeapReserve: number;
    SizeOfHeapCommit: number;
    LoaderFlags: number;
    NumberOfRvaAndSizes: number;
    "IMAGE_DIRECTORY_ENTRY_EXPORT:VirtualAddress": number;
    "IMAGE_DIRECTORY_ENTRY_EXPORT:Size": number;
    "IMAGE_DIRECTORY_ENTRY_IMPORT:VirtualAddress": number;
    "IMAGE_DIRECTORY_ENTRY_IMPORT:Size": number;
    "IMAGE_DIRECTORY_ENTRY_RESOURCE:VirtualAddress": number;
    "IMAGE_DIRECTORY_ENTRY_RESOURCE:Size": number;
    "IMAGE_DIRECTORY_ENTRY_EXCEPTION:VirtualAddress": number;
    "IMAGE_DIRECTORY_ENTRY_EXCEPTION:Size": number;
    "IMAGE_DIRECTORY_ENTRY_SECURITY:VirtualAddress": number;
    "IMAGE_DIRECTORY_ENTRY_SECURITY:Size": number;
    "IMAGE_DIRECTORY_ENTRY_BASERELOC:VirtualAddress": number;
    "IMAGE_DIRECTORY_ENTRY_BASERELOC:Size": number;
    "IMAGE_DIRECTORY_ENTRY_DEBUG:VirtualAddress": number;
    "IMAGE_DIRECTORY_ENTRY_DEBUG:Size": number;
    "IMAGE_DIRECTORY_ENTRY_COPYRIGHT:VirtualAddress": number;
    "IMAGE_DIRECTORY_ENTRY_COPYRIGHT:Size": number;
    "IMAGE_DIRECTORY_ENTRY_GLOBALPTR:VirtualAddress": number;
    "IMAGE_DIRECTORY_ENTRY_GLOBALPTR:Size": number;
    "IMAGE_DIRECTORY_ENTRY_TLS:VirtualAddress": number;
    "IMAGE_DIRECTORY_ENTRY_TLS:Size": number;
    "IMAGE_DIRECTORY_ENTRY_LOAD_CONFIG:VirtualAddress": number;
    "IMAGE_DIRECTORY_ENTRY_LOAD_CONFIG:Size": number;
    "IMAGE_DIRECTORY_ENTRY_BOUND_IMPORT:VirtualAddress": number;
    "IMAGE_DIRECTORY_ENTRY_BOUND_IMPORT:Size": number;
    "IMAGE_DIRECTORY_ENTRY_IAT:VirtualAddress": number;
    "IMAGE_DIRECTORY_ENTRY_IAT:Size": number;
    "IMAGE_DIRECTORY_ENTRY_DELAY_IMPORT:VirtualAddress": number;
    "IMAGE_DIRECTORY_ENTRY_DELAY_IMPORT:Size": number;
    "IMAGE_DIRECTORY_ENTRY_COM_DESCRIPTOR:VirtualAddress": number;
    "IMAGE_DIRECTORY_ENTRY_COM_DESCRIPTOR:Size": number;
    "IMAGE_DIRECTORY_ENTRY_RESERVED:VirtualAddress": number;
    "IMAGE_DIRECTORY_ENTRY_RESERVED:Size": number;
    "text:VirtualSize": number;
    "text:VirtualAddress": number;
    "text:SizeOfRawData": number;
    "text:PointerToRawData": number;
    "text:PointerToRelocations": number;
    "text:PointerToLinenumbers": number;
    "text:NumberOfRelocations": number;
    "text:NumberOfLinenumbers": number;
    "text:Characteristics": number;
    "data:VirtualSize": number;
    "data:VirtualAddress": number;
    "data:SizeOfRawData": number;
    "data:PointerToRawData": number;
    "data:PointerToRelocations": number;
    "data:PointerToLinenumbers": number;
    "data:NumberOfRelocations": number;
    "data:NumberOfLinenumbers": number;
    "data:Characteristics": number;
    "resource:VirtualSize": number;
    "resource:VirtualAddress": number;
    "resource:SizeOfRawData": number;
    "resource:PointerToRawData": number;
    "resource:PointerToRelocations": number;
    "resource:PointerToLinenumbers": number;
    "resource:NumberOfRelocations": number;
    "resource:NumberOfLinenumbers": number;
    "resource:Characteristics": number;
    Cursors: number;
    Bitmaps: number;
    Icons: number;
    Menus: number;
    Dialogs: number;
    Strings: number;
    Fonts: number;
    "Group Cursors": number;
    "Group Icons": number;
    "Resource:Characteristics": number;
    "Resource:MajorVersion": number;
    "Resource:MinorVersion": number;
    "Resource:NumberOfIdEntries": number;
    "Resource:NumberOfNamedEntries": number;
    "Resource:TimeDateStamp": number;
  };
}
export interface FilePeHeaderTableItem {
  idx: string;
  key: string;
  value: string;
  desc: string;
}

export const FilePeHeaderTableItems2 = (data: FilePeHeaderResultResponse) => {
  const output = data.output;

  return [
    {
      idx: "0",
      key: "Machine",
      value: output.Machine.toString(),
      desc: "",
    },
    {
      idx: "1",
      key: "NumberOfSections",
      value: output.NumberOfSections.toString(),
      desc: "",
    },
    {
      idx: "2",
      key: "TimeDateStamp",
      value: output.TimeDateStamp.toString(),
      desc: "",
    },
    {
      idx: "3",
      key: "PointerToSymbolTable",
      value: output.PointerToSymbolTable.toString(),
      desc: "",
    },
    {
      idx: "4",
      key: "NumberOfSymbols",
      value: output.NumberOfSymbols.toString(),
      desc: "",
    },
    {
      idx: "5",
      key: "SizeOfOptionalHeader",
      value: output.SizeOfOptionalHeader.toString(),
      desc: "",
    },
    {
      idx: "6",
      key: "Characteristics",
      value: output.Characteristics.toString(),
      desc: "",
    },
  ] as FilePeHeaderTableItem[];
};

export const FilePeHeaderTableItems3 = (data: FilePeHeaderResultResponse) => {
  const output = data.output;
  return [
    {
      idx: "0",
      key: "Magic",
      value: output.Magic.toString(),
      desc: "",
    },
    {
      idx: "1",
      key: "Major/MinorLinker Version",
      value: `${output.MajorLinkerVersion}/${output.MinorLinkerVersion}`,
      desc: "",
    },
    {
      idx: "2",
      key: "SizeOfCode",
      value: output.SizeOfCode.toString(),
      desc: "",
    },
    {
      idx: "3",
      key: "SizeOfInitializedData",
      value: output.SizeOfInitializedData.toString(),
      desc: "",
    },
    {
      idx: "4",
      key: "SizeOfUninitializedData",
      value: output.SizeOfUninitializedData.toString(),
      desc: "",
    },
    {
      idx: "5",
      key: "AddressOfEntryPoint",
      value: output.AddressOfEntryPoint.toString(),
      desc: "",
    },
    {
      idx: "6",
      key: "BaseOfCode",
      value: output.BaseOfCode.toString(),
      desc: "",
    },
    {
      idx: "7",
      key: "BaseOfData",
      value: output.BaseOfData.toString(),
      desc: "",
    },
  ] as FilePeHeaderTableItem[];
};

export const FilePeHeaderTableItems4 = (data: FilePeHeaderResultResponse) => {
  const output = data.output;
  return [
    {
      idx: "0",
      key: "ImageBase",
      value: output.ImageBase.toString(),
      desc: "",
    },
    {
      idx: "1",
      key: "SectionAlignment",
      value: output.SectionAlignment.toString(),
      desc: "",
    },
    {
      idx: "2",
      key: "FileAlignment",
      value: output.FileAlignment.toString(),
      desc: "",
    },
    {
      idx: "3",
      key: "Major/MinorOperatingSystem Version",
      value: `${output.MajorOperatingSystemVersion}/${output.MinorOperatingSystemVersion}`,
      desc: "",
    },
    {
      idx: "4",
      key: "Major/MinorImage Version",
      value: `${output.MajorImageVersion}/${output.MinorImageVersion}`,
      desc: "",
    },
    {
      idx: "5",
      key: "Major/MinorSubsystem Version",
      value: `${output.MajorSubsystemVersion}/${output.MinorSubsystemVersion}`,
      desc: "",
    },
    {
      idx: "6",
      key: "Reserved1",
      value: output.Reserved1.toString(),
      desc: "",
    },
    {
      idx: "7",
      key: "SizeOfImage",
      value: output.SizeOfImage.toString(),
      desc: "",
    },
    {
      idx: "8",
      key: "SizeOfHeaders",
      value: output.SizeOfHeaders.toString(),
      desc: "",
    },
    {
      idx: "9",
      key: "CheckSum",
      value: output.CheckSum.toString(),
      desc: "",
    },
    {
      idx: "10",
      key: "Subsystem",
      value: output.Subsystem.toString(),
      desc: "",
    },
    {
      idx: "11",
      key: "DllCharacteristics",
      value: output.DllCharacteristics.toString(),
      desc: "",
    },
    {
      idx: "12",
      key: "SizeOfStackReserve",
      value: output.SizeOfStackReserve.toString(),
      desc: "",
    },
    {
      idx: "13",
      key: "SizeOfStackCommit",
      value: output.SizeOfStackCommit.toString(),
      desc: "",
    },
    {
      idx: "14",
      key: "SizeOfHeapReserve",
      value: output.SizeOfHeapReserve.toString(),
      desc: "",
    },
    {
      idx: "15",
      key: "SizeOfHeapCommit",
      value: output.SizeOfHeapCommit.toString(),
      desc: "",
    },
    {
      idx: "16",
      key: "LoaderFlags",
      value: output.LoaderFlags.toString(),
      desc: "",
    },
    {
      idx: "17",
      key: "NumberOfRvaAndSizes",
      value: output.NumberOfRvaAndSizes.toString(),
      desc: "",
    },
  ];
};

export interface FilePeHeaderLibItem {
  name: string;
  value: number;
  desc: string;
}

export const FilePeHeaderLibItems = (data: FilePeHeaderResultResponse) => {
  const output = data.output;
  return [
    {
      name: "ADVAP132.DLL",
      value: output["ADVAP132.DLL"],
      desc: "Advanced Win32 application programming interfaces",
    },
    {
      name: "AWFAXP32.DLL",
      value: output["AWFAXP32.DLL"],
      desc: "Mail API fax transport",
    },
    {
      name: "AWFXAB32.DLL",
      value: output["AWFXAB32.DLL"],
      desc: "Address book",
    },
    {
      name: "AWPWD32.DLL",
      value: output["AWPWD32.DLL"],
      desc: "Security support",
    },
    {
      name: "AWRESX32.DLL",
      value: output["AWRESX32.DLL"],
      desc: "Resource Executor",
    },
    {
      name: "AWUTIL32.DLL",
      value: output["AWUTIL32.DLL"],
      desc: "At Work Security Support",
    },
    {
      name: "BHNETB.DLL",
      value: output["BHNETB.DLL"],
      desc: "Network monitor SMS client",
    },
    {
      name: "BHSUPP.DLL",
      value: output["BHSUPP.DLL"],
      desc: "Network monitor SMS client",
    },
    {
      name: "CCAPI.DLL",
      value: output["CCAPI.DLL"],
      desc: "Microsoft Network component",
    },
    {
      name: "CCEI.DLL",
      value: output["CCEI.DLL"],
      desc: "Microsoft Network component",
    },
    {
      name: "CCPSH.DLL",
      value: output["CCPSH.DLL"],
      desc: "Microsoft Network component",
    },
    {
      name: "CCTN20.DLL",
      value: output["CCTN20.DLL"],
      desc: "Microsoft Network component",
    },
    {
      name: "CMC.DLL",
      value: output["CMC.DLL"],
      desc: "Common messaging calls for Mail API 1.0",
    },
    {
      name: "COMCTL32.DLL",
      value: output["COMCTL32.DLL"],
      desc: "User Experience Controls Library",
    },
    {
      name: "COMDLG32.DLL",
      value: output["COMDLG32.DLL"],
      desc: "Common Dialogue Library",
    },
    {
      name: "CRTDLL.DLL",
      value: output["CRTDLL.DLL"],
      desc: "Microsoft C Runtime Library",
    },
    {
      name: "DCIMAN.DLL",
      value: output["DCIMAN.DLL"],
      desc: "Display Control Interface Manager",
    },
    {
      name: "DCIMAN32.DLL",
      value: output["DCIMAN32.DLL"],
      desc: "Display Control Interface Manager",
    },
    {
      name: "DSKMAINT.DLL",
      value: output["DSKMAINT.DLL"],
      desc: "Disk Utilities engine",
    },
    {
      name: "GDI32.DLL",
      value: output["GDI32.DLL"],
      desc: "GDI Client DLL",
    },
    {
      name: "GROUP.DLL",
      value: output["GROUP.DLL"],
      desc: "policy support",
    },
    {
      name: "HYPERTERM.DLL",
      value: output["HYPERTERM.DLL"],
      desc: "Terminal DLL",
    },
    {
      name: "KERNEL32.DLL",
      value: output["KERNEL32.DLL"],
      desc: "Windows NT BASE API Client DLL",
    },
    {
      name: "LZ32.DLL",
      value: output["LZ32.DLL"],
      desc: "LZ Expand/Compress API DLL",
    },
    {
      name: "MAPI.DLL",
      value: output["MAPI.DLL"],
      desc: "Mail / Exchange component",
    },
    {
      name: "MAPI32.DLL",
      value: output["MAPI32.DLL"],
      desc: "Extended MAPI 1.0 for Windows NT",
    },
    {
      name: "MFC30.DLL",
      value: output["MFC30.DLL"],
      desc: "Shared MFC DLL",
    },
    {
      name: "MPR.DLL",
      value: output["MPR.DLL"],
      desc: "Multiple Provider Router DLL",
    },
    {
      name: "MSPST32.DLL",
      value: output["MSPST32.DLL"],
      desc: "Microsoft Personal Folder/Address Book Service Provider",
    },
    {
      name: "MSFS32.DLL",
      value: output["MSFS32.DLL"],
      desc: "MAPI 1.0 Service Providers for Microsoft Mail",
    },
    {
      name: "MSNDUI.DLL",
      value: output["MSNDUI.DLL"],
      desc: "Microsoft Network component",
    },
    {
      name: "MSNET32.DLL",
      value: output["MSNET32.DLL"],
      desc: "Microsoft 32-bit Network API Library",
    },
    {
      name: "MSSHRUI.DLL",
      value: output["MSSHRUI.DLL"],
      desc: "Shell extensions for sharing",
    },
    {
      name: "MSVIEWUT.DLL",
      value: output["MSVIEWUT.DLL"],
      desc: "Service data-link libraries for display engines",
    },
    {
      name: "NAL.DLL",
      value: output["NAL.DLL"],
      desc: "Network monitor SMS client",
    },
    {
      name: "NDIS30.DLL",
      value: output["NDIS30.DLL"],
      desc: "Network monitor SMS client",
    },
    {
      name: "NETAPI.DLL",
      value: output["NETAPI.DLL"],
      desc: "Network API",
    },
    {
      name: "NETAPI32.DLL",
      value: output["NETAPI32.DLL"],
      desc: "Net Win32 API DLL",
    },
    {
      name: "NETBIOS.DLL",
      value: output["NETBIOS.DLL"],
      desc: "NetBIOS API Library",
    },
    {
      name: "NETDI.DLL",
      value: output["NETDI.DLL"],
      desc: "Net Device installer",
    },
    {
      name: "NETSETUP.DLL",
      value: output["NETSETUP.DLL"],
      desc: "Network server-based setup",
    },
    {
      name: "NWAB32.DLL",
      value: output["NWAB32.DLL"],
      desc: "Address book provider",
    },
    {
      name: "NWNET32.DLL",
      value: output["NWNET32.DLL"],
      desc: "NetWare client",
    },
    {
      name: "NWNP32.DLL",
      value: output["NWNP32.DLL"],
      desc: "NetWare component",
    },
    {
      name: "OLEDLG.DLL",
      value: output["OLEDLG.DLL"],
      desc: "Microsoft Windows OLE 2.0 User Interface Support",
    },
    {
      name: "POWERCFG.DLL",
      value: output["POWERCFG.DLL"],
      desc: "Advanced Power Management Control Panel",
    },
    {
      name: "RASPI.DLL",
      value: output["RASPI.DLL"],
      desc: "Automated Software Profile, Analysis, Removal and Signature Information",
    },
    {
      name: "RASAPI16.DLL",
      value: output["RASAPI16.DLL"],
      desc: "Remote Access Services 16-bit API Library",
    },
    {
      name: "RASAPI32.DLL",
      value: output["RASAPI32.DLL"],
      desc: "Remote Access 16-bit API Library",
    },
    {
      name: "RPCRT4.DLL",
      value: output["RPCRT4.DLL"],
      desc: "Remote Procedure Call Runtime",
    },
    {
      name: "RPCLTC1.DLL",
      value: output["RPCLTC1.DLL"],
      desc: "Remote Procedure Call libraries",
    },
    {
      name: "RPCTLC3.DLL",
      value: output["RPCTLC3.DLL"],
      desc: "Remote Procedure Call libraries",
    },
    {
      name: "RPCTLC5.DLL",
      value: output["RPCTLC5.DLL"],
      desc: "Remote Procedure Call libraries",
    },
    {
      name: "RPCTLC6.DLL",
      value: output["RPCTLC6.DLL"],
      desc: "Remote Procedure Call libraries",
    },
    {
      name: "RPCTLS3.DLL",
      value: output["RPCTLS3.DLL"],
      desc: "Remote Procedure Call libraries",
    },
    {
      name: "RPCTLS5.DLL",
      value: output["RPCTLS5.DLL"],
      desc: "Remote Procedure Call libraries",
    },
    {
      name: "RPCTLS6.DLL",
      value: output["RPCTLS6.DLL"],
      desc: "Remote Procedure Call libraries",
    },
    {
      name: "RPCNS4.DLL",
      value: output["RPCNS4.DLL"],
      desc: "Remote Procedure Call Name Service Client",
    },
    {
      name: "RSRC32.DLL",
      value: output["RSRC32.DLL"],
      desc: "Resource Meter",
    },
    {
      name: "SAPNSP.DLL",
      value: output["SAPNSP.DLL"],
      desc: "Winsock data-link library",
    },
    {
      name: "SECUR32.DLL",
      value: output["SECUR32.DLL"],
      desc: "Security Support Provider Interface",
    },
    {
      name: "SHELL32.DLL",
      value: output["SHELL32.DLL"],
      desc: "Windows Shell Common DLL",
    },
    {
      name: "SLENH.DLL",
      value: output["SLENH.DLL"],
      desc: "Advanced Power Management options",
    },
    {
      name: "SHLWAPI.DLL",
      value: output["SHLWAPI.DLL"],
      desc: "Library for UNC and URL Paths, Registry Entries and Color Settings",
    },
    {
      name: "UMDM32.DLL",
      value: output["UMDM32.DLL"],
      desc: "Universal Modem Driver component",
    },
    {
      name: "USER32.DLL",
      value: output["USER32.DLL"],
      desc: "USER API Client DLL",
    },
    {
      name: "VERSION.DLL",
      value: output["VERSION.DLL"],
      desc: "Version Checking and File Installation Libraries",
    },
    {
      name: "WININET.DLL",
      value: output["WININET.DLL"],
      desc: "Internet Extensions for Win32",
    },
    {
      name: "WINMM.DLL",
      value: output["WINMM.DLL"],
      desc: "MCI API DLL",
    },
    {
      name: "WINREG.DLL",
      value: output["WINREG.DLL"],
      desc: "Remote Registry support",
    },
    {
      name: "WINSOCK.DLL",
      value: output["WINSOCK.DLL"],
      desc: "Socket API for Windows",
    },
    {
      name: "WS2.DLL",
      value: output["WS2.DLL"],
      desc: "Windows Socket 2.0 32-Bit DLL",
    },
    {
      name: "WSOCK32.DLL",
      value: output["WSOCK32.DLL"],
      desc: "Windows Socket 32-Bit DLL",
    },
  ] as FilePeHeaderLibItem[];
};
