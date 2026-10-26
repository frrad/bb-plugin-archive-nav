# bb-plugin-archive-nav

A [bb](https://getbb.app) plugin that keeps you in a thread after archiving.

Archiving the thread you're viewing normally drops you on the new-thread
screen. With this plugin bb opens another thread instead:

1. the unread thread that most recently needed attention, else
2. the most recently updated thread.

Only top-level, non-archived threads count. If there are none left, you stay on
the new-thread screen.

## Install

```sh
git clone git@github.com:frrad/bb-plugin-archive-nav.git
cd bb-plugin-archive-nav
npm install
bb plugin install .
```

## Develop

```sh
npm test           # node --test pick.test.ts
npm run typecheck
bb plugin build . && bb plugin reload archive-nav
```
