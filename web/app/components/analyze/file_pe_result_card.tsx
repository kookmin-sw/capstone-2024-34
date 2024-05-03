interface FilePeResultCardProps {
  data: JSON | undefined;
}
const FilePEResultCard = (props: FilePeResultCardProps) => {
  console.log(JSON.stringify(props.data));
  return (
    <div className="focus:ring-brand-300 flex w-full max-w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-4 md:p-5">
      <div className="grid w-full gap-2 lg:grid-cols-2">
        <div>
          <div className="grid grid-cols-4 divide-y divide-neutral-500 border-y border-neutral-700">
            <div className="col-span-4 bg-emerald-100">
              <p className="text-center text-sm text-neutral-600">DOS HEADER</p>
            </div>
            <div className="col-span-4 bg-emerald-100">
              <p className="text-center text-sm text-neutral-600">DOS STUB</p>
            </div>
            <div className="col-span-2 bg-orange-100">
              <p className="text-sm text-neutral-600">Signature 0x50450000</p>
            </div>
            <div className="col-span-1 bg-orange-100">
              <p className="text-sm text-neutral-600">Machine</p>
            </div>
            <div className="col-span-1 bg-orange-100">
              <p className="text-sm text-neutral-600">#NumberOfSections</p>
            </div>
            <div className="col-span-2 bg-orange-100">
              <p className="text-sm text-neutral-600">TimeDateStamp</p>
            </div>
            <div className="col-span-2 bg-orange-100">
              <p className="text-sm text-neutral-600">PointerToSymbolTable</p>
            </div>
            <div className="col-span-2 bg-orange-100">
              <p className="text-sm text-neutral-600"># NumberOfSymbolTable</p>
            </div>
            <div className="col-span-1 bg-orange-100">
              <p className="text-sm text-neutral-600">SizeOfOptionalHeader</p>
            </div>
            <div className="col-span-1 bg-orange-100">
              <p className="text-sm text-neutral-600">Characteristics</p>
            </div>
            <div className="col-span-1 bg-cyan-100">
              <p className="text-sm text-neutral-600">Magic</p>
            </div>
            <div className="col-span-1 bg-cyan-100">
              <p className="text-sm text-neutral-600">
                Major/MinorLinker Version
              </p>
            </div>
            <div className="col-span-2 bg-cyan-100">
              <p className="text-sm text-neutral-600">SizeOfCode</p>
            </div>
            <div className="col-span-2 bg-cyan-100">
              <p className="text-sm text-neutral-600">SizeOfInitializedData</p>
            </div>
            <div className="col-span-2 bg-cyan-100">
              <p className="text-sm text-neutral-600">
                SizeOfUninitializedData
              </p>
            </div>
            <div className="col-span-2 bg-cyan-100">
              <p className="text-sm text-neutral-600">AddressOfEntryPoint</p>
            </div>
            <div className="col-span-2 bg-cyan-100">
              <p className="text-sm text-neutral-600">BaseOfCode</p>
            </div>
            <div className="col-span-2 bg-cyan-100">
              <p className="text-sm text-neutral-600">BaseOfData</p>
            </div>
            <div className="col-span-2 bg-amber-100">
              <p className="text-sm text-neutral-600">ImageBase</p>
            </div>
            <div className="col-span-2 bg-amber-100">
              <p className="text-sm text-neutral-600">SectionAlignment</p>
            </div>
            <div className="col-span-2 bg-amber-100">
              <p className="text-sm text-neutral-600">FileAlignment</p>
            </div>
            <div className="col-span-1 bg-amber-100">
              <p className="text-sm text-neutral-600">MajorOSVersion</p>
            </div>
            <div className="col-span-1 bg-amber-100">
              <p className="text-sm text-neutral-600">MinorOSVersion</p>
            </div>
            <div className="col-span-1 bg-amber-100">
              <p className="text-sm text-neutral-600">MajorImageVersion</p>
            </div>
            <div className="col-span-1 bg-amber-100">
              <p className="text-sm text-neutral-600">MinorImageVersion</p>
            </div>
            <div className="col-span-1 bg-amber-100">
              <p className="text-sm text-neutral-600">MajorSubsystemVersion</p>
            </div>
            <div className="col-span-1 bg-amber-100">
              <p className="text-sm text-neutral-600">MinorSubsystemVersion</p>
            </div>
            <div className="col-span-2 bg-amber-100">
              <p className="text-sm text-neutral-600">Win32VersionValue</p>
            </div>
            <div className="col-span-2 bg-amber-100">
              <p className="text-sm text-neutral-600">SizeOfImage</p>
            </div>
            <div className="col-span-2 bg-amber-100">
              <p className="text-sm text-neutral-600">SizeOfHeaders</p>
            </div>
            <div className="col-span-2 bg-amber-100">
              <p className="text-sm text-neutral-600">CheckSum</p>
            </div>
            <div className="col-span-1 bg-amber-100">
              <p className="text-sm text-neutral-600">Subsystem</p>
            </div>
            <div className="col-span-1 bg-amber-100">
              <p className="text-sm text-neutral-600">DllCharacteristics</p>
            </div>
            <div className="col-span-2 bg-amber-100">
              <p className="text-sm text-neutral-600">SizeOfStackReserve</p>
            </div>
            <div className="col-span-2 bg-amber-100">
              <p className="text-sm text-neutral-600">SizeOfStackCommit</p>
            </div>
            <div className="col-span-2 bg-amber-100">
              <p className="text-sm text-neutral-600">SizeOfHeapReserve</p>
            </div>
            <div className="col-span-2 bg-amber-100">
              <p className="text-sm text-neutral-600">SizeOfHeapCommit</p>
            </div>
            <div className="col-span-2 bg-amber-100">
              <p className="text-sm text-neutral-600">LoaderFlags</p>
            </div>
            <div className="col-span-2 bg-amber-100">
              <p className="text-sm text-neutral-600">#NumberOfRvaAndSizes</p>
            </div>
            <div className="col-span-4 bg-violet-100">
              <p className="text-center text-sm text-neutral-600">
                Optional Header
              </p>
            </div>
            <div className="col-span-2 bg-violet-100">
              <p className="text-sm text-neutral-600">ExportTable</p>
            </div>
            <div className="col-span-2 bg-violet-100">
              <p className="text-sm text-neutral-600">SizeOfExportTable</p>
            </div>
            <div className="col-span-2 bg-violet-100">
              <p className="text-sm text-neutral-600">ImportTable</p>
            </div>
            <div className="col-span-2 bg-violet-100">
              <p className="text-sm text-neutral-600">SizeOfImportTable</p>
            </div>
            <div className="col-span-2 bg-violet-100">
              <p className="text-sm text-neutral-600">ResourceTable</p>
            </div>
            <div className="col-span-2 bg-violet-100">
              <p className="text-sm text-neutral-600">SizeOfResourceTable</p>
            </div>
            <div className="col-span-2 bg-violet-100">
              <p className="text-sm text-neutral-600">ExceptionTable</p>
            </div>
            <div className="col-span-2 bg-violet-100">
              <p className="text-sm text-neutral-600">SizeOfExceptionTable</p>
            </div>
            <div className="col-span-2 bg-violet-100">
              <p className="text-sm text-neutral-600">CertificateTable</p>
            </div>
            <div className="col-span-2 bg-violet-100">
              <p className="text-sm text-neutral-600">SizeOfCertificateTable</p>
            </div>
            <div className="col-span-2 bg-violet-100">
              <p className="text-sm text-neutral-600">BaseRelocationTable</p>
            </div>
            <div className="col-span-2 bg-violet-100">
              <p className="text-sm text-neutral-600">
                SizeOfBaseRelocationTable
              </p>
            </div>
            <div className="col-span-2 bg-violet-100">
              <p className="text-sm text-neutral-600">Debug</p>
            </div>
            <div className="col-span-2 bg-violet-100">
              <p className="text-sm text-neutral-600">SizeOfDebug</p>
            </div>
            <div className="col-span-2 bg-violet-100">
              <p className="text-sm text-neutral-600">GlobalPtr</p>
            </div>
            <div className="col-span-1 bg-violet-100">
              <p className="text-sm text-neutral-600">0000</p>
            </div>
            <div className="col-span-1 bg-violet-100">
              <p className="text-sm text-neutral-600">0000</p>
            </div>
            <div className="col-span-2 bg-violet-100">
              <p className="text-sm text-neutral-600">TLSTable</p>
            </div>
            <div className="col-span-2 bg-violet-100">
              <p className="text-sm text-neutral-600">SizeOfTLSTable</p>
            </div>
            <div className="col-span-2 bg-violet-100">
              <p className="text-sm text-neutral-600">LoadConfigTable</p>
            </div>
            <div className="col-span-2 bg-violet-100">
              <p className="text-sm text-neutral-600">SizeOfLoadConfigTable</p>
            </div>
            <div className="col-span-2 bg-violet-100">
              <p className="text-sm text-neutral-600">BoundImport</p>
            </div>
            <div className="col-span-2 bg-violet-100">
              <p className="text-sm text-neutral-600">SizeOfBoundImport</p>
            </div>
            <div className="col-span-2 bg-violet-100">
              <p className="text-sm text-neutral-600">ImportAddressTable</p>
            </div>
            <div className="col-span-2 bg-violet-100">
              <p className="text-sm text-neutral-600">
                SizeOfImportAddressTable
              </p>
            </div>
            <div className="col-span-2 bg-violet-100">
              <p className="text-sm text-neutral-600">DelayImportDescriptor</p>
            </div>
            <div className="col-span-2 bg-violet-100">
              <p className="text-sm text-neutral-600">
                SizeOfDelayImportDescriptor
              </p>
            </div>
            <div className="col-span-2 bg-violet-100">
              <p className="text-sm text-neutral-600">CLRRuntimeHeader</p>
            </div>
            <div className="col-span-2 bg-violet-100">
              <p className="text-sm text-neutral-600">SizeOfCLRRuntimeHeader</p>
            </div>
            <div className="col-span-1 bg-violet-100">
              <p className="text-sm text-neutral-600">0000</p>
            </div>
            <div className="col-span-1 bg-violet-100">
              <p className="text-sm text-neutral-600">0000</p>
            </div>
            <div className="col-span-1 bg-violet-100">
              <p className="text-sm text-neutral-600">0000</p>
            </div>
            <div className="col-span-1 bg-violet-100">
              <p className="text-sm text-neutral-600">0000</p>
            </div>
            <div className="col-span-4 bg-lime-100">
              <p className="text-sm text-neutral-600">Section Table Name</p>
            </div>
            <div className="col-span-2 bg-lime-100">
              <p className="text-sm text-neutral-600">VirtualSize</p>
            </div>
            <div className="col-span-2 bg-lime-100">
              <p className="text-sm text-neutral-600">VirtualAddress</p>
            </div>
            <div className="col-span-2 bg-lime-100">
              <p className="text-sm text-neutral-600">SizeOfRawData</p>
            </div>
            <div className="col-span-2 bg-lime-100">
              <p className="text-sm text-neutral-600">PointerToRawData</p>
            </div>
            <div className="col-span-2 bg-lime-100">
              <p className="text-sm text-neutral-600">PointerToRelocations</p>
            </div>
            <div className="col-span-2 bg-lime-100">
              <p className="text-sm text-neutral-600">PointerToLinenumbers</p>
            </div>
            <div className="col-span-1 bg-lime-100">
              <p className="text-sm text-neutral-600">NumberOfRelocations</p>
            </div>
            <div className="col-span-1 bg-lime-100">
              <p className="text-sm text-neutral-600">NumberOfLinenumbers</p>
            </div>
            <div className="col-span-2 bg-lime-100">
              <p className="text-sm text-neutral-600">Characteristics</p>
            </div>
          </div>
        </div>
        <p className="whitespace-pre-line text-wrap">
          {JSON.stringify(props.data, null, 2)}
        </p>
      </div>

      <p></p>
    </div>
  );
};
export default FilePEResultCard;
