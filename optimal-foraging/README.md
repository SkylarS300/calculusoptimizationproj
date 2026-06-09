# Optimal Foraging — AP Calculus AB Final Project

A live interactive presentation exploring the Marginal Value Theorem
through animation, real-time graphs, and calculus.

## What it is

This app models a classic problem in biology: how long should a forager
stay in a resource patch before moving to the next one? The answer comes
from optimising a rate function using derivatives, and it turns out to
predict real animal behaviour with surprising accuracy.

The project is built as a 7-chapter storybook. Each chapter introduces
one piece of the model, from the biological question all the way through
the calculus derivation and real-world verification.

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Deploying

The app is deployed on Vercel. Push to main and Vercel builds automatically.

```bash
git add .
git commit -m "your message"
git push
```

## Speaker notes

Add `?notes` to the URL to open the speaker notes view.
This is designed to be opened on your phone while the main
presentation runs on the board. The two tabs are independent
and both support navigation.

Main view: `https://calculusoptimizationproj.vercel.app/`  
Notes view: `https://calculusoptimizationproj.vercel.app/?notes`

## The math

**Energy gain function**

G(t) = a(1 - e^{-bt})

- a = total energy available in the patch
- b = depletion rate
- As t increases, G(t) approaches a (diminishing returns)

**Objective function**

R(t) = G(t) / (T + t)

- T = travel time between patches (fixed cost)
- t = time spent in the current patch (our variable)
- We want to maximise R(t) over t

**Optimality condition**

Setting dR/dt = 0 via the quotient rule gives:

G'(t*) = R(t*)

The marginal gain rate must equal the average foraging rate.
This is the Marginal Value Theorem (Charnov, 1976).

**Numerical solution**

There is no closed-form solution for t\*, so the app samples
2000 points and finds the maximum numerically.

## Project structure

src/
math.js — all the calculus logic
chapters.jsx — chapter content and state
App.jsx — navigation and layout shell
components/
BeeScene.jsx — animated SVG bee and flowers
ForagingGraph.jsx — recharts graph wrapper
Slider.jsx — labelled range input
StatCard.jsx — metric display card

## Built with

- React + Vite
- Recharts
- Framer Motion
- Deployed on Vercel
