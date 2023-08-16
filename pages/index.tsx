import Background from "@/components/background";
import { AiOutlineArrowDown } from "react-icons/ai";
import { CustomModal } from "@/components/CustomModal";
import { useState } from "react";
import { JsonFormatter, dropdownData } from "@/utils/helper";
import { FaCopy } from "react-icons/fa";
import Swal from "sweetalert2";
import CryptoJS from "crypto-js";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export default function HomePage() {
  const [dropdownValue, setDropdownValue] = useState(
    dropdownData.find((data) => data.id === 1)
  );
  const [dropdownModal, setDropdownModal] = useState(false);
  const [finalValue, setFinalValue] = useState("");
  const [textValue, setTextValue] = useState("");
  const [keyValue, setKeyValue] = useState("");
  const clearAllFields = () => {
    setFinalValue("");
    setTextValue("");
    setKeyValue("");
  };
  return (
    <div className="main-container relative text-white">
      <Background />
      <div className="text-white flex min-h-[100vh] justify-center items-center the-container">
        <div className=" w-full flex justify-center items-center">
          <div className="primary-container rounded-xl p-6 sm:w-[520px] sm:min-w-[520px]">
            <div
              onClick={(e) => {
                e.preventDefault();
                setDropdownModal(true);
              }}
              className="flex items-center gap-x-2 cursor-pointer"
            >
              <p className="font-bold text-xl">{dropdownValue?.name}</p>
              <AiOutlineArrowDown />
            </div>
            <div
              className={`rounded-t p-2 from-container mt-2 flex justify-between  ${"border-l border-t border-r border-primaryGray"}`}
            >
              <div className="flex">
                <p className="text-gray">Text to {dropdownValue?.name}:</p>
              </div>
            </div>
            <div
              className={`rounded-b flex-col to-container flex items-center justify-between ${""}`}
            >
              <div className="relative border-gray border px-3 py-[14px] flex w-full items-center overflow-hidden">
                <input
                  value={textValue}
                  onChange={(e) => {
                    e.preventDefault();
                    setTextValue(e.target.value);
                  }}
                  className="skt-w skt-w-input text-socket-primary bg-transparent font-bold pt-0.5 focus-visible:outline-none min-w-full w-full focus:max-w-none text-lg sm:text-xl max-w-[180px] sm:max-w-full"
                  placeholder="Text"
                  spellCheck={false}
                  type="text"
                />
                <div className="invisible absolute w-fit text-xl font-bold"></div>
              </div>
              <div className="relative px-3 py-[14px] border-l border-b border-r border-gray flex w-full items-center overflow-hidden">
                <input
                  value={keyValue}
                  onChange={(e) => {
                    e.preventDefault();
                    setKeyValue(e.target.value);
                  }}
                  className="skt-w skt-w-input text-socket-primary bg-transparent font-bold pt-0.5 focus-visible:outline-none min-w-full w-full focus:max-w-none text-lg sm:text-xl max-w-[180px] sm:max-w-full"
                  placeholder="Key"
                  spellCheck={false}
                  type="text"
                />
                <div className="invisible absolute w-fit text-xl font-bold"></div>
              </div>
            </div>
            <a className="relative mx-auto -mt-2.5 flex z-100 h-[42px] w-[42px] items-center justify-center rounded-full border-4 disabled:opacity-60 middle-btn">
              <AiOutlineArrowDown />
            </a>
            <div className="rounded-t -z-5 p-2 bg-gray from-container -mt-2.5 flex gap-x-1 items-center justify-between">
              <div className="relative flex items-center justify-between w-full">
                <p className="text-gray">Result:</p>
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    navigator.clipboard.writeText(finalValue);
                    Toast.fire({
                      icon: "success",
                      title: "Copied to clipboard!",
                    });
                  }}
                  className="absolute flex right-2 copy-container text-white items-center cursor-pointer z-100"
                >
                  <span>Copy</span>
                  <span className="text-white pl-2">
                    <FaCopy />
                  </span>
                </div>
              </div>
            </div>
            <div className="px-3 py-[14px] to-container border-l border-r border-b border-gray">
              <input
                value={finalValue}
                disabled
                className="skt-w skt-w-input text-white bg-transparent font-bold pt-0.5 focus-visible:outline-none min-w-full w-full focus:max-w-none text-lg sm:text-xl max-w-[180px] sm:max-w-full"
                placeholder={dropdownValue?.name + "ed Value"}
                spellCheck={false}
                type="text"
              />
            </div>
            <button
              onClick={async (e) => {
                e.preventDefault();
                let val: any = null;
                if (dropdownValue?.id === 1) {
                  val = CryptoJS.AES.encrypt(textValue, keyValue, {
                    format: JsonFormatter,
                  });
                  setFinalValue(val.toString());
                } else {
                  val = CryptoJS.AES.decrypt(textValue, keyValue, {
                    format: JsonFormatter,
                  });
                  setFinalValue(val.toString(CryptoJS.enc.Utf8));
                }
              }}
              className={`mt-5 rounded font-bold ${"bg-purple"} w-full leading-[24px] px-4 py-[13px] flex items-center justify-center`}
            >
              {dropdownValue?.name}
            </button>
          </div>
        </div>
      </div>
      <CustomModal
        dropdownModal={dropdownModal}
        setDropdownModal={setDropdownModal}
        dropdownData={dropdownData}
        dropdownValue={dropdownValue}
        setDropdownValue={setDropdownValue}
        clearAllFields={clearAllFields}
      />
    </div>
  );
}
