declare module '*.md' {
  // "unknown" would be more detailed depends on how you structure frontmatter
  const attributes: {
    title: string;
    tags: string[];
    description: string;
  }

  import { VoidFunctionComponent } from 'react'
  const ReactComponent: VoidFunctionComponent;
  
  // Modify below per your usage
  export { attributes, ReactComponent };
}