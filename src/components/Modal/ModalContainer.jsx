import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';

/**
 * ModalContainer is a reusable component that provides a modal dialog overlay.
 *
 * @param {boolean} showModal - Determines whether the modal is visible or hidden.
 * @param {function} handleModal - Callback function to handle the modal state.
 * @param {ReactNode} children - The content to be displayed within the modal.
 * @param {string} title - The title of the modal.
 * @param {boolean} hideCloseButton - Determines whether the close button is visible or hidden.
 * @param {string} classname - The additional classname to be applied to the modal panel (optional).
 */
const ModalContainer = ({ showModal, handleModal, children, title, hideCloseButton, classname, responsiveWidth }) => {
  const panelClassName = `panel my-8 mb-80 overflow-hidden rounded-2xl border-0 p-0 text-black dark:text-white-dark ${!responsiveWidth ? classname ? classname : "w-1/2" : ""} `;

  return (
    <>
      <Transition appear show={showModal} as={Fragment}>
        <Dialog onClose={() => {}} as="div" static open={showModal} >
          {/* Overlay transition */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0" />
          </Transition.Child>
          <div className="fixed inset-0 z-[999] bg-[black]/60 flex items-center justify-center">
            {/* Modal transition */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={panelClassName}>
                <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                  {/* Modal title */}
                  <h3 className="text-xl font-bold">{title}</h3>
                  {/* Close button */}
                  {
                    !hideCloseButton && <button
                      type="button"
                      onClick={() => handleModal(false)}
                      className="text-white-dark hover:text-dark"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#006600"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  }
                </div>
                {/* Modal content */}
                <div className="p-5">
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ModalContainer;
