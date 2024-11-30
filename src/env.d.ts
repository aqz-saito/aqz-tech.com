/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare module 'astro:content' {
  export const getCollection: (collection: string) => Promise<any[]>;
}
