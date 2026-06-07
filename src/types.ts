/**
 * Types and interfaces for the Rullst Framework Showcase
 */

export interface CodeSnippet {
  title: string;
  language: string;
  code: string;
  explanation: string;
}

export interface FeatureComparison {
  feature: string;
  rullst: string;
  reactSpa: string;
  nextJs: string;
  laravel: string;
  rustAxum: string;
  django: string;
  leptos: string;
  highlight: boolean;
}

export interface BenchmarkMetric {
  name: string;
  unit: string;
  rullst: number;
  nextJs: number;
  rustAxum: number;
  laravel: number;
  django: number;
  leptos: number;
  description: string;
}

export interface TenantData {
  id: string;
  name: string;
  secretContent: string;
  posts: Array<{ id: number; title: string; body: string }>;
}
