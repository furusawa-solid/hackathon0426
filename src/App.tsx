import './App.css';
import { useState } from 'react';
import HowToPlayDialog from './components/HowToPlayDialog';
import { RhythmGame } from './components/RhythmGame';

const App = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div className="flex flex-col justify-start gap-y-3 p-4">
      <RhythmGame isUserReady={!isOpen} />
      <HowToPlayDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default App;
