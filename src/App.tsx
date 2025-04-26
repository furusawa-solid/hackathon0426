import { faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Field, Input, Textarea } from '@headlessui/react';
import './App.css';
import ApiKeyDialog from './components/ApiKeyDialog';
import { IconButton } from './components/IconButtom';

const App = () => {
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const files = e.target.files;

    reader.onload = () => {
      const fileData = reader.result;
      if (fileData) {
        // textRef.current.value = fileData.toString();
      }
    };
    if (files) {
      reader.readAsText(files[0]);
    }
  };

  return (
    <div className="flex flex-col justify-start gap-y-3 p-4">
      <h1>Title is here.</h1>
      <fieldset className="px-3 pt-1 pb-3">
        <legend>Legend</legend>
        {/* <ul className="flex flex-col gap-y-2">
          {[].map((config, index) => (
            <li key={index} className="flex w-60">
              <code className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap rounded-s-md bg-neutral-700 px-2 py-1 text-left text-sm underline decoration-neutral-400 underline-offset-4">
                {config}
              </code>
              <Button className="rounded-e-md bg-red-800" onClick={() => {}}>
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </li>
          ))}
        </ul> */}
        <div className="flex w-60 pt-5">
          <input
            type="text"
            className="box-border flex-1 rounded-s-md border-none bg-neutral-600 px-2 py-1 outline-none"
            placeholder="Placeholder is here."
          />
          <Button onClick={() => {}} className="rounded-e-md bg-teal-700">
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>
      </fieldset>
      <Field className="flex flex-col">
        <h2>TextArea</h2>
        <Textarea
          className="h-[32rem] rounded-md border-none bg-neutral-600 p-3 outline-none"
          defaultValue="デフォルトテキスト"
          placeholder="Placeholder is here."
        />
      </Field>
      <Input className="hidden" type="file" onChange={onFileChange} />
      <IconButton
        label="ファイルを読み込む"
        icon={faUpload}
        onClick={() => {}}
      />
      <ApiKeyDialog isOpen={false} setIsOpen={() => {}} />
    </div>
  );
};

export default App;
