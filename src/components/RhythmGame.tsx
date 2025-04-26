import { useEffect, useState } from 'react';
import { Layer, Rect, Stage, Text } from 'react-konva';
// import * as Tone from 'tone';
import { v4 as uuidv4 } from 'uuid';
import { noteTimings } from '../utils/noteData';
import { JudgementZone, getJudgementLineY } from './JudgementZone';

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 600;
const NOTE_SPEED = 0.3;

const HIT_ZONE_Y = getJudgementLineY();
const HIT_MARGIN = 50;
const MISS_MARGIN = 100;

type Note = {
  id: string;
  time: number;
  y: number;
  hit: boolean;
  miss: boolean;
};

export const RhythmGame = ({ isUserReady }: { isUserReady: boolean }) => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [lastResult, setLastResult] = useState<'HIT' | 'MISS' | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  // const [isMusicReady, setIsMusicReady] = useState<boolean>(false);

  // const toneStart = async () => await Tone.start(); // ユーザー操作後に必須！
  // const player = new Tone.Player('your-audio.mp3').toDestination();

  // ノーツ・開始時間の初期化
  useEffect(() => {
    const initialNotes = noteTimings.map((time) => ({
      id: uuidv4(),
      time,
      y: 0,
      hit: false,
      miss: false,
    }));
    setNotes(initialNotes);
    setStartTime(performance.now());
  }, []);

  // ノーツを流す
  useEffect(() => {
    if (startTime === null || notes.length === 0 || !isUserReady) return;
    let frameId: number;

    const animate = () => {
      const now = performance.now();
      const elapsed = now - startTime;

      const updatedNotes = notes.map((note) => {
        if (!note.hit && !note.miss && elapsed >= note.time) {
          return { ...note, y: (elapsed - note.time) * NOTE_SPEED };
        }

        // ノーツが判定ゾーンの高さ+ヒットマージンを超えたらMiss扱い
        if (note.y > HIT_ZONE_Y + MISS_MARGIN) {
          return { ...note, missed: true };
        }
        return note;
      });

      setNotes(updatedNotes);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [startTime, notes, isUserReady]);

  // HIT判定
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        const updated = notes.map((note) => {
          if (note.hit && note.miss) return note;

          // ノーツがHITゾーンに近ければHITと判定
          const yDiff = Math.abs(note.y - HIT_ZONE_Y);

          if (yDiff <= HIT_MARGIN) {
            setLastResult('HIT');
            return { ...note, hit: true };
            // biome-ignore lint/style/noUselessElse: <explanation>
          } else if (yDiff <= MISS_MARGIN) {
            setLastResult('MISS');
            return { ...note, miss: true };
          }
          return note;
        });

        setNotes(updated);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [notes]);

  // 0.5秒だけ判定を表示する
  useEffect(() => {
    if (lastResult) {
      const timer = setTimeout(() => setLastResult(null), 500);
      return () => clearTimeout(timer);
    }
  }, [lastResult]);

  useEffect(() => {
    if (notes.length > 0 && notes.every((note) => note.hit || note.miss)) {
      setIsFinished(true);
    }
  }, [notes]);

  return (
    <div className="mt-4 text-center">
      <h2 className="mb-2 font-bold text-xl">リズムゲーム</h2>
      <Stage
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="mx-auto justify-center border border-gray-400"
      >
        <Layer className="mx-auto justify-center">
          {notes.map((note) =>
            !note.hit && !note.miss ? (
              <Rect
                key={note.id}
                x={180}
                y={note.y}
                width={40}
                height={10}
                fill="teal"
                cornerRadius={4}
                aline="center"
              />
            ) : null,
          )}
          {lastResult && !isFinished && (
            <Text
              text={lastResult === 'HIT' ? 'HIT!' : 'MISS!'}
              fontSize={24}
              fill={lastResult === 'HIT' ? '#4ade80' : '#f87171'}
              x={180}
              y={CANVAS_HEIGHT / 2 - 50}
              align="center"
            />
          )}
          {isFinished && (
            <Text
              text={`🎉 リザルト 🎉\nHIT: ${notes.filter((note) => note.hit).length}\nMISS: ${notes.filter((note) => note.miss).length}`}
              fontSize={36}
              fill="white"
              x={CANVAS_WIDTH / 2 - 100}
              y={CANVAS_HEIGHT / 2 - 60}
              align="center"
            />
          )}
          <JudgementZone />
        </Layer>
      </Stage>
    </div>
  );
};
