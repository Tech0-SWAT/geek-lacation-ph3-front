import { useState } from "react";
import { MdDownload } from "react-icons/md";
import { FaFilePowerpoint, FaFilePdf } from "react-icons/fa";
import Image from "next/image";
import ArrowDownRoundedIcon from "../icon/ArrowDownRoundedIcon";
import { InfoPopup } from "./InfoPopup";
import FileMovieIcon from "../icon/FileMovieIcon";
import FileIcon from "../icon/FileIcon";

type PopupPosition =
  | "top-left"
  | "top"
  | "top-right"
  | "right"
  | "bottom-right"
  | "bottom"
  | "bottom-left"
  | "left";

const fileTypes = [
  { label: "PPTX", icon: <FileMovieIcon size={30} /> },
  { label: "Keynote", icon: <FileMovieIcon size={30} /> },
  { label: "PDF", icon: <FileIcon size={30} /> },
];

const mockWorks = [
  { id: 1, title: "爆爆堂CM", image: "/sample1.jpg" },
  { id: 2, title: "お正月2025", image: "/sample2.jpg" },
  { id: 3, title: "新人2025", image: "/sample3.jpg" },
];

type DownloadPopupProps = {
  position?: PopupPosition;
  icon?: React.ReactNode;
  minWidth?: string;
  maxWidth?: string;
  maxHeight?: string;
  className?: string;
};

export const DownloadPopup = ({
  position = "bottom",
  icon = <MdDownload size={28} />,
  minWidth = "420px",
  maxWidth = "1024px",
  maxHeight = "480px",
  className = "",
}: DownloadPopupProps) => {
  const [selectedFileType, setSelectedFileType] = useState(fileTypes[0]);
  const [fileDropdownOpen, setFileDropdownOpen] = useState(false);
  const [worksDropdownOpen, setWorksDropdownOpen] = useState(false);
  const [selectedWorks, setSelectedWorks] = useState<number[]>(mockWorks.map((w) => w.id));

  const allSelected = selectedWorks.length === mockWorks.length;
  const toggleAll = () => setSelectedWorks(allSelected ? [] : mockWorks.map((w) => w.id));
  const toggleWork = (id: number) =>
    setSelectedWorks((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );

  return (
    <InfoPopup
      position={position}
      minWidth={minWidth}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      icon={icon} // ✅ 純粋なReactNodeのみ（buttonではない）
      className={className}
    >
      <div className="px-4 pt-6 pb-12">
        <div className="mb-6 text-base-primary">
          <label className="text-sm font-semibold text-accent block mb-2">ファイルの種類</label>
          <div
            className="border rounded px-4 py-3 flex items-center justify-between cursor-pointer"
            onClick={() => setFileDropdownOpen(!fileDropdownOpen)}
          >
            <span className="flex items-center gap-2">
              <span className="text-accent">{selectedFileType.icon}</span>
              {selectedFileType.label}
            </span>
            <ArrowDownRoundedIcon
              size={18}
              className={`text-base-primary transition-transform ${fileDropdownOpen ? "rotate-180" : ""}`}
            />
          </div>
          {fileDropdownOpen && (
            <div className="border border-t-0 rounded-b mt-[-1px]">
              {fileTypes.map((type) => (
                <div
                  key={type.label}
                  className={`px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100 ${
                    selectedFileType.label === type.label ? "bg-gray-100" : ""
                  }`}
                  onClick={() => {
                    setSelectedFileType(type);
                    setFileDropdownOpen(false);
                  }}
                >
                  <span className="text-accent">{type.icon}</span> {type.label}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold text-accent block mb-2">対象作品</label>
          <div
            className="border rounded px-4 py-3 flex items-center justify-between cursor-pointer"
            onClick={() => setWorksDropdownOpen(!worksDropdownOpen)}
          >
            <span className="text-gray-500 text-sm">
              {allSelected ? "すべての作品" : `${selectedWorks.length}件を選択中`}
            </span>
            <ArrowDownRoundedIcon
              size={18}
              className={`text-base-primary transition-transform ${worksDropdownOpen ? "rotate-180" : ""}`}
            />
          </div>

          {worksDropdownOpen && (
            <div className="mt-4 rounded-xl shadow-lg p-6 text-base-primary bg-white">
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  className="mr-2 w-4 h-4 accent-blue-600"
                />
                <span className="text-sm font-semibold">すべての作品</span>
              </div>
              <div className="flex flex-col gap-3 max-h-60 overflow-y-auto custom-scroll">
                {mockWorks.map((work) => (
                  <div key={work.id} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedWorks.includes(work.id)}
                      onChange={() => toggleWork(work.id)}
                      className="w-4 h-4 accent-blue-600"
                    />
                    <Image
                      src={work.image}
                      alt={work.title}
                      width={40}
                      height={40}
                      className="rounded object-cover"
                    />
                    <span className="text-xs text-base-primary">{work.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => alert("Download 開始")}
          className="mt-10 w-full py-3 bg-accent text-white rounded text-sm underline"
        >
          Download
        </button>
      </div>
    </InfoPopup>
  );
};
