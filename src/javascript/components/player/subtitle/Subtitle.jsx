import React from 'react';

function getPosition(subtitle) {
  const style = {};

  const alignment = subtitle.style.alignment;
  if(alignment.column === 'middle') {
    style['justifyContent'] = 'center';
  } else if (alignment.column === 'left') {
    style['justifyContent'] = 'flex-start';
  } else if (alignment.column === 'right') {
    style['justifyContent'] === 'flex-end';
  }

  if(alignment.row === 'bottom') {
    style['bottom'] = 0;
  } else if (alignment.row === 'middle') {
    style['bottom'] = `calc(100vh - 50px)`;
  } else if (alignment.row === 'top') {
    style['top'] = 0;
  }

  return style;
}

function fontStyles(subtitle) {
  const style = {};

  if(subtitle.style.bold) {
    style.fontWeight = 'bold';
  }
  if(subtitle.style.italic) {
   style.fontStyle = 'italic'; 
  }

  return style;
}

function scaleMargins(margins, scalingFactor) {
  return {
    marginBottom: scale(margins.marginBottom, scalingFactor, 'y'),
    marginLeft: scale(margins.marginLeft, scalingFactor, 'x'),
    marginRight: scale(margins.marginRight, scalingFactor, 'x')
  };
}

function scale(value, scalingFactor, scaleBy = 'x') {
  if(scaleBy === 'y') {
    return value * (window.screen.height / scalingFactor.y);
  }
  if(scaleBy === 'x') {
    return value * (window.screen.width / scalingFactor.x);
  }
}

export default function Subtitle(props) {
  return (
    <section className="subtitle-container" style={{
      ...getPosition(props.subtitle),
      ...props.subtitle.style.margins,
      color: props.subtitle.style.color,
      fontSize: Math.min(scale(props.subtitle.style.fontSize, props.scaling), 55),
      '--outlineColor': props.subtitle.style.outlineColor,
      ...fontStyles(props.subtitle)
    }}>
      <span>{props.subtitle.text}</span>
    </section>
  )
}