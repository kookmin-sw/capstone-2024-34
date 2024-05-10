import "pe"

rule test1
{
	strings:
		$sig1 = " .Jbjx="
		$sig2 = ",h\"Z;|"
		$sig3 = "Graphics"
		$sig4 = "GetClassNameA"
		$sig5 = "6A6DX{zBc"
		$sig6 = "474U4\\4`4d4h4l4p4t4x4"
		$sig7 = "U]Cf0`0"
		$sig8 = "T7%0y|E"
		$sig9 = "!This program cannot be run in DOS mode."
		$sig10 = "UUCCCDVWX"
		$sig11 = "lstrlenW"
		$sig12 = "Exception"
		$sig13 = "KERNEL32.DLL"
		$sig14 = "advapi32.dll"
		$sig15 = "ExitProcess"
		$sig16 = "Variant"
		$sig17 = "System"
		$sig18 = "RegCloseKey"
		$sig19 = "GetCurrentThread"
		$sig20 = "Yellow"
		$sig21 = "FindClose"
		$sig22 = "Windows"
		$sig23 = "ReadFile"
		$sig24 = "LocalFree"
		$sig25 = "GetProcAddress"
		$sig26 = "CreateFileA"
		$sig27 = "kernel32"
		$sig28 = "MSVBVM60.DLL"
		$sig29 = "gram must be run "
		$sig30 = "user32"
	condition:
		18 of (#sig1, #sig2, #sig3, #sig4, #sig5, #sig6, #sig7, #sig8, #sig9, #sig10, #sig11, #sig12, #sig13, #sig14, #sig15, #sig16, #sig17, #sig18, #sig19, #sig20, #sig21, #sig22, #sig23, #sig24, #sig25, #sig26, #sig27, #sig28, #sig29, #sig30)
}