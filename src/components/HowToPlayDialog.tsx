import { faCheck } from '@fortawesome/free-solid-svg-icons';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import * as Tone from 'tone';
import { IconButton } from './IconButtom';

type DialogProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const HowToPlayDialog: React.FC<DialogProps> = ({ isOpen, setIsOpen }) => {
  const close = async () => {
    await Tone.start();
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
      __demoMode
    >
      <DialogBackdrop className="fixed inset-0 bg-black/75" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="data-[closed]:transform-[scale(95%)] w-full max-w-md rounded-md bg-neutral-700 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
          >
            <DialogTitle as="h3" className="font-medium text-base/7 text-white">
              遊び方
            </DialogTitle>
            <p className="mt-2 text-sm">
              ⚠️音が出ます⚠️
              <br />
              OKを押してスタート！
              <br />
              タイミングよくSpaceを押してね！
              <br />
              ※環境によっては譜面が音ズレするかもしれません。
            </p>
            <div className="flex justify-end">
              <IconButton
                label="OK"
                icon={faCheck}
                onClick={close}
                className=""
              />
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default HowToPlayDialog;
