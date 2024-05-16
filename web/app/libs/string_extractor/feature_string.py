import os
import re
import sys
import json

# 수정 되어
SIGNATURES = {'Delete', 'ExitProcess', 'Exception', 'System', 'GetProcAddress', 'LoadLibraryA', 'user32',
              'advapi32', 'RegCloseKey', 'CloseHandle', '!This program cannot be run in DOS mode.', 'kernel32',
              'WriteFile', 'VirtualFree', 'VirtualAlloc', 'gram must be run ', 'GetCurrentThread', 'GetLastError',
              'oleaut32.dll', 'ReadFile', 'KERNEL32.DLL', 'USER32', 'GetFileSize', 'FindClose', 'CharNextA',
              'SetFilePointer', 'EnterCriticalSection', 'GetFileType', 'TObject', 'CreateFileA', 'RtlUnwind', 'LocalFree',
              'TlsSetValue', 'WideCharToMultiByte', 'Windows', '.reloc', 'KERNEL32.dll', 'ADVAPI32.dll', '.rdata', '`.data',
              'StringX', 'CreateDirectoryA', 'ole32.dll', 'Interface', 'MSVBVM60.DLL', 'Boolean', '`.rdat', 'SysFreeString',
              'GetOEMCP', 'C:\\Program Files\\Microsoft Visual Studio\\VB98\\VB6.OLB', 'UpdateResourceA', 'September',
              'version', '[[[[[[', '~ExC[)', '{&8p^)j6', 'LookupPrivilegeValueA', 'result', 'MSVCRT.dll', 'MM/dd/yy',
              'PathFileExistsA', 's`)L$4', 'RtlMoveMemory', 't$t#t$l', 'shlwapi', '! 6J[[', 'lstrcmpiA', '__vbaStrCopy',
              'nKB\\lll', '<<<<<<<<<<<<<<<<<<<<<<<<<<u9l', '[fPFMlllll', '\\HSplit', 'VC20XC00', 'Dvn+|Ax', 'class_main',
              '8x1Mjc<', 'FillRect', '2 x|2 ', 'T!pNJBN4', 'u_:o 8', '. T:At', '8s9S=A', 'invalid window size', '[hU-|x&Q `',
              ':.datu', 'proggam', '"M#m#F', '.pas7k', 'This instance will close.', 'Rich(!', 't"SS9] u', '/scripts/inst_VER103.gz',
              'x@@P4`/!', 'hitechcell.ca', 'InternetConnectW', 'DefWindowProcW'}


# string feature extract
def extract_string(path, min_bytes=6):
    with open(os.path.join(path), 'rb') as f:
        file_data = f.read()
        string = set(s.decode().strip().lower() for s in re.findall(
            b"[\x20-\x7e]{" + bytes(str(min_bytes), 'utf-8') + b",}", file_data))
        
    return set([i for i in string if i != ''])


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python extract_string.py <file_path>")
        sys.exit(1)

    file_path = sys.argv[1]
    strings = extract_string(file_path)

    respone = dict()

    attack = []
    normal = []

    score = 0
    for string in strings:
        if string in SIGNATURES:
            attack.append(string)
            score += 1
        else:
            normal.append(string)

    score /= len(SIGNATURES)
    score = round(score * 100, 2)

    respone['score'] = score
    respone['attack'] = attack
    respone['normal'] = normal
    
    json_data = json.dumps(respone)
    print(json_data, end='')
