import {NextResponse} from 'next/server';

export function middleware(request: Request) {
  // console.log('---------');
  // Store current request url in a custom header, which you can read later
  const requestHeaders = new Headers(request.headers);
  // console.log(request);

  requestHeaders.set('x-url', request.url);

  return NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    }
  });
}
