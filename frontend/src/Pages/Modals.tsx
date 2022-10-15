import { Dialog, Transition } from "@headlessui/react"
import React, { Fragment } from "react"

function Modals() {
    let [isOpen, setIsOpen] = React.useState(false)
    return (
        <main className="h-full pb-16 overflow-y-auto">
            <div className="container grid px-6 mx-auto">
                <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                    Modals
                </h2>
                {/* <!-- CTA --> */}
                <a
                    className="flex items-center justify-between p-4 mb-8 text-sm font-semibold text-purple-100 bg-purple-600 rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple"
                    href="https://github.com/estevanmaito/windmill-dashboard"
                >
                    <div className="flex items-center">
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <span>Star this project on GitHub</span>
                    </div>
                    <span>View more &RightArrow;</span>
                </a>

                <div className="max-w-2xl px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <p className="mb-4 text-gray-600 dark:text-gray-400">
                        This is possibly
                        <strong>the most accessible a modal can get</strong>,
                        using JavaScript. When opened, it uses
                        <code>assets/js/focus-trap.js</code>
                        to create a<em>focus trap</em>, which means that if you
                        use your keyboard to navigate around, focus won't leak
                        to the elements behind, staying inside the modal in a
                        loop, until you take any action.
                    </p>

                    <p className="text-gray-600 dark:text-gray-400">
                        Also, on small screens it is placed at the bottom of the
                        screen, to account for larger devices and make it easier
                        to click the larger buttons.
                    </p>
                </div>

                <div>
                    <button
                        onClick={() => setIsOpen(true)}
                        className="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                    >
                        Open Modal
                    </button>
                </div>
                <Transition
                    show={isOpen}
                    enter="transition ease-out duration-150"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    as={Fragment}
                >
                    <Dialog onClose={() => setIsOpen(false)}>
                        <Dialog.Panel>
                            <div className="fixed inset-0 z-30 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center">
                                {/* <!-- Modal --> */}
                                <div
                                    onClick={() => setIsOpen(false)}
                                    className="w-full px-6 py-4 overflow-hidden bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-xl"
                                    role="dialog"
                                    id="modal"
                                >
                                    {/* <!-- Remove header if you don't want a close icon. Use modal body to place modal tile. --> */}
                                    <header className="flex justify-end">
                                        <button
                                            className="inline-flex items-center justify-center w-6 h-6 text-gray-400 transition-colors duration-150 rounded dark:hover:text-gray-200 hover: hover:text-gray-700"
                                            aria-label="close"
                                            // @click="closeModal"
                                        >
                                            <svg
                                                className="w-4 h-4"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                role="img"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                    clip-rule="evenodd"
                                                    fill-rule="evenodd"
                                                ></path>
                                            </svg>
                                        </button>
                                    </header>
                                    {/* <!-- Modal body --> */}
                                    <div className="mt-4 mb-6">
                                        {/* <!-- Modal title --> */}
                                        <p className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                                            Modal header
                                        </p>
                                        {/* <!-- Modal description --> */}
                                        <p className="text-sm text-gray-700 dark:text-gray-400">
                                            Lorem, ipsum dolor sit amet
                                            consectetur adipisicing elit.
                                            Nostrum et eligendi repudiandae
                                            voluptatem tempore!
                                        </p>
                                    </div>
                                    <footer className="flex flex-col items-center justify-end px-6 py-3 -mx-6 -mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row bg-gray-50 dark:bg-gray-800">
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="w-full px-5 py-3 text-sm font-medium leading-5 text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 sm:px-4 sm:py-2 sm:w-auto active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray"
                                        >
                                            Cancel
                                        </button>
                                        <button className="w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                                            Accept
                                        </button>
                                    </footer>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Dialog>
                </Transition>
            </div>
        </main>
    )
}

export default Modals
