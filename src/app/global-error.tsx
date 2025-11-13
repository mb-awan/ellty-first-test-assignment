'use client';

import { useEffect } from 'react';

import NextError from 'next/error';

export default function GlobalError(props: { error: Error }) {
  // Handle the error locally, if needed, or simply log it
  useEffect(() => {
    // You can add error handling logic here if needed
  }, [props.error]);

  return (
    <html lang="en">
      <body>
        {/* `NextError` is the default Next.js error page component. It requires a `statusCode` prop. */}
        {/* For now, passing `0` to render a generic error message. */}
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
