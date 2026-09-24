import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import CalloutBox from './CalloutBox';
import PlannerQuote from './PlannerQuote';

const components = {
  CalloutBox,
  PlannerQuote,
};

export default function MdxRenderer({ source, content }: { source?: string; content?: string }) {
  const markdown = source || content || '';
  return <MDXRemote source={markdown} components={components} />;
}
