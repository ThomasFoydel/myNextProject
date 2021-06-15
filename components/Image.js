import React, { useState } from 'react';

export default function Image(props) {
  const [src, setSrc] = useState(props.src);
  const [errored, setErrored] = useState(false);
  const onError = () => {
    if (!errored) {
      setErrored(true);
      setSrc(props.fallbackSrc);
    }
  };
  return <img src={src} onError={onError} className={props.className} />;
}
