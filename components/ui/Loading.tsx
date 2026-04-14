"use client";

import React from 'react';

export default function Loading({ message = 'Memuat...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <svg
        className="w-10 h-10 text-pink-600 animate-spin"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      <p className="mt-3 text-sm text-slate-600">{message}</p>
    </div>
  );
}
