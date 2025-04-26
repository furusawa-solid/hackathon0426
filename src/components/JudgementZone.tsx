import { Rect } from 'react-konva';

const JUDGEMENT_LINE_Y = 500; // キャンバス下のほうに設置

export const JudgementZone = () => {
  return (
    <Rect
      x={0}
      y={JUDGEMENT_LINE_Y}
      width={400}
      height={10}
      fill="red"
      opacity={0.5}
    />
  );
};

export const getJudgementLineY = () => JUDGEMENT_LINE_Y;
