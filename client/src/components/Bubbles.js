import React, { useState, useEffect } from "react";
import { Partition } from "@potion/layout";
import { Svg, Rect } from "@potion/element";

const Bubbles = ({ colors }) => {
  const [bubbleData, setBubbleData] = useState([]);
  useEffect(() => {
    const generateBubbleData = colors.map((_, i) => ({
      value: Math.floor(Math.random() * (colors.length * 2)) + 1,
      key: `${i + 1}`
    }));
    setBubbleData(generateBubbleData);
  }, [colors]);

  return (
    <div className="bubble-wrap">
      <p>bubbles</p>
      <Svg width={600} height={100}>
        <Partition
          data={{
            children: bubbleData
          }}
          sum={datum => datum.value}
          size={[600, 100]}
          includeRoot={false}
          nodeEnter={d => ({ ...d, r: 0 })}
          animate
        >
          {nodes =>
            nodes.map(({ key, x0, y0, x1, y1 }, i) => (
              <Rect
                key={key}
                x={x0}
                y={y0}
                width={x1 - x0}
                height={y1 - y0}
                fill={colors[i].code.hex}
                stroke="white"
              />
            ))
          }
        </Partition>
      </Svg>
    </div>
  );
};

export default Bubbles;
