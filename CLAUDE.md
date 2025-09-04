# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application called "chill-fm" bootstrapped with `create-next-app`, using the App Router architecture. The project is configured with TypeScript, Tailwind CSS v4, and Biome for linting and formatting.

## Development Commands

- **Start development server**: `npm run dev` or `pnpm dev` (uses Turbopack)
- **Build for production**: `npm run build` (uses Turbopack)
- **Start production server**: `npm run start`
- **Lint code**: `npm run lint` (uses Biome)
- **Format code**: `npm run format` (uses Biome with --write flag)

## Architecture

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS v4 with PostCSS
- **Linting/Formatting**: Biome (replaces ESLint + Prettier)
- **Package Manager**: pnpm (based on pnpm-lock.yaml)

## Project Structure

- `src/app/` - Next.js App Router pages and layouts
- `src/app/layout.tsx` - Root layout with font configuration (Geist fonts)
- `src/app/page.tsx` - Home page component
- `public/` - Static assets
- Path alias `@/*` maps to `./src/*`

## Configuration Notes

- **Biome**: Configured with Next.js and React recommended rules, 2-space indentation
- **TypeScript**: Uses bundler module resolution, includes path mapping for `@/*`
- **Next.js**: Uses Turbopack for both dev and build processes
- **Fonts**: Project uses Geist and Geist Mono fonts from next/font/google

## Development Server

The application runs on http://localhost:3000 by default. The development server uses Turbopack for faster builds and hot reloading.