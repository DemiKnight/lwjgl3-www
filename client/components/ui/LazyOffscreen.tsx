import { unstable_Offscreen as Offscreen, useEffect, useRef } from 'react';

// Wrapper around the Offscreen API that defers rendering the Offscreen tree initially,
// until it's been explicitly marked as "visible".
//
// This allows UIs that make heavy use of Suspense (such as the Object Inspector)
// to avoid sending a flood of protocol requests when initially mounted.

interface Props {
  mode: 'hidden' | 'visible';
}

export const LazyOffscreen: FCC<Props> = ({ children, mode }) => {
  const hasBeenVisibleRef = useRef(false);
  const hasBeenVisible = hasBeenVisibleRef.current;

  useEffect(() => {
    if (mode === 'visible') {
      hasBeenVisibleRef.current = true;
    }
  });

  if (mode === 'hidden' && !hasBeenVisible) {
    return null;
  }

  return <Offscreen children={children} mode={mode} />;
};
