// import { NextPageContext } from 'next';
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';

export async function myGet(url: string, ctx: any) {
  const cookie = ctx.req?.headers.cookie;

  const response = await fetch(url, {
    headers: {
      cookie: cookie!,
    },
  });

  // check if authorized, if not redirect to /login
  if (response.status === 401 && !ctx.req) {
    Router.replace('/login');
    return {};
  }
  // check if authorized, if not redirect to /login
  // SSR
  if (response.status === 401 && ctx.req) {
    ctx.res?.writeHead(302, {
      Location: 'http://localhost:3000/login',
    });
    ctx.res?.end();
    return;
  }

  const json = response.json();
  return json;
}
