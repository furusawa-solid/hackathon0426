import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Field,
  Input,
  Label,
} from '@headlessui/react';
import { useRef } from 'react';

type DialogProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const ApiKeyDialog: React.FC<DialogProps> = ({ isOpen, setIsOpen }) => {
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const inputApiKeyRef = useRef<HTMLInputElement>(null!);

  const close = () => {
    setIsOpen(false);
  };

  const handleSave = () => {
    close();
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
              使用するにはAPIキーが必要です
            </DialogTitle>
            <Field>
              <Label className="mt-2 text-sm/6 text-white/50">
                ChatGPT API Key
              </Label>
              <div className="mt-2 flex w-full">
                <Input
                  ref={inputApiKeyRef}
                  type="text"
                  className="flex-1 rounded-s-md border-none bg-neutral-600 px-3 py-1.5 text-sm/6 text-white focus:outline-none"
                  placeholder="APIキーを入力"
                />
                <Button
                  className="flex items-center justify-center rounded-e-md bg-teal-700 font-semibold text-sm/6 text-white"
                  onClick={handleSave}
                >
                  <FontAwesomeIcon icon={faSave} />
                </Button>
              </div>
            </Field>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ApiKeyDialog;
