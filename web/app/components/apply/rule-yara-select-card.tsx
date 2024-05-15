import Link from "next/link";
import ApplyRuleFilesYarUploadCard from "./rule_yara_upload_yar_card";
import { GenYaraRulePeFilesUploadResponse } from "@customTypes/generate/api";

const SelectYaraRuleCard = () => {
  return (
    <div className="h-full max-w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-4 py-4">
        <h2 className="text-lg font-semibold text-gray-800">Yara Rule 선택</h2>
      </div>
      <div className="flex w-full items-center justify-center gap-4">
        <div className="w-full rounded-lg">
          <div className="border-b border-gray-200 px-4">
            <nav className="flex space-x-2" aria-label="Tabs" role="tablist">
              <button
                type="button"
                className="active inline-flex items-center gap-x-2 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-sm text-gray-500 hover:text-blue-600 disabled:pointer-events-none disabled:opacity-50 hs-tab-active:border-blue-600 hs-tab-active:font-semibold hs-tab-active:text-blue-600"
                id="basic-tabs-item-1"
                data-hs-tab="#basic-tabs-1"
                aria-controls="basic-tabs-1"
                role="tab"
              >
                플랫폼 내 생성 Yara Rule
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-x-2 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-sm text-gray-500 hover:text-blue-600 disabled:pointer-events-none disabled:opacity-50 hs-tab-active:border-blue-600 hs-tab-active:font-semibold hs-tab-active:text-blue-600"
                id="basic-tabs-item-2"
                data-hs-tab="#basic-tabs-2"
                aria-controls="basic-tabs-2"
                role="tab"
              >
                새로운 Yara Rule 업로드
              </button>
            </nav>
          </div>

          <div>
            <div
              id="basic-tabs-1"
              className="px-4"
              role="tabpanel"
              aria-labelledby="basic-tabs-item-1"
            >
              <ul className="flex flex-col">
                <li className="gap-x-2 border-b border-gray-200 bg-white px-1 py-3 text-sm font-medium text-neutral-800 first:border-t-0 last:border-b-0">
                  <div className="relative flex h-full w-full items-center">
                    <div className="flex ">
                      <input
                        id="hs-list-group-item-radio-1"
                        name="hs-list-group-item-radio"
                        type="radio"
                        className="rounded-full border-gray-200 disabled:opacity-50"
                      />
                    </div>
                    <label
                      htmlFor="hs-list-group-item-radio-1"
                      className="ms-3 block w-full text-sm text-gray-600"
                    >
                      <Link className="text-xs text-blue-600" href="#">
                        #123293
                      </Link>
                      <div>12345656.yar</div>
                    </label>
                  </div>
                </li>
                <li className="gap-x-2 border-b border-gray-200 bg-white px-1 py-3 text-sm font-medium text-neutral-800 first:border-t-0 last:border-b-0">
                  <div className="relative flex h-full w-full items-center">
                    <div className="flex ">
                      <input
                        id="hs-list-group-item-radio-1"
                        name="hs-list-group-item-radio"
                        type="radio"
                        className="rounded-full border-gray-200 disabled:opacity-50"
                      />
                    </div>
                    <label
                      htmlFor="hs-list-group-item-radio-1"
                      className="ms-3 block w-full text-sm text-gray-600"
                    >
                      <Link className="text-xs text-blue-600" href="#">
                        #123293
                      </Link>
                      <div>12345656.yar</div>
                    </label>
                  </div>
                </li>
                <li className="gap-x-2 border-b border-gray-200 bg-white px-1 py-3 text-sm font-medium text-neutral-800 first:border-t-0 last:border-b-0">
                  <div className="relative flex h-full w-full items-center">
                    <div className="flex ">
                      <input
                        id="hs-list-group-item-radio-1"
                        name="hs-list-group-item-radio"
                        type="radio"
                        className="rounded-full border-gray-200 disabled:opacity-50"
                      />
                    </div>
                    <label
                      htmlFor="hs-list-group-item-radio-1"
                      className="ms-3 block w-full text-sm text-gray-600"
                    >
                      <Link className="text-xs text-blue-600" href="#">
                        #123293
                      </Link>
                      <div>12345656.yar</div>
                    </label>
                  </div>
                </li>
              </ul>
            </div>
            <div
              id="basic-tabs-2"
              className="hidden p-4"
              role="tabpanel"
              aria-labelledby="basic-tabs-item-2"
            >
              <ApplyRuleFilesYarUploadCard
                onSubmit={function (
                  data: GenYaraRulePeFilesUploadResponse,
                ): void {
                  throw new Error("Function not implemented.");
                }}
                isProgress={false}
                setIsProgress={function (isProgress: boolean): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SelectYaraRuleCard;
